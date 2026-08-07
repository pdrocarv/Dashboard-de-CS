/**
 * ESPELHO DA PLANILHA DO SALESFORCE NO FIREBASE
 * =============================================
 * Este script vive DENTRO da planilha "CS - Clientes Carteirizados
 * [Relatório - Salesforce]" e copia as contas carteirizadas para a coleção
 * `sheet_accounts` do Firestore, de tempos em tempos.
 *
 * O que ele NÃO faz, de propósito:
 *   - Não escreve na coleção `clients`. Nunca. Um erro aqui não tem como
 *     corromper o cadastro que os analistas já fizeram no dashboard — no pior
 *     caso o espelho fica velho, e o dashboard segue com o que tem.
 *   - Não decide nada de negócio. Quem resolve o que fazer com cada mudança
 *     (MRR entra sozinho, troca de analista vai pra revisão do líder) é o
 *     dashboard, onde essa regra pode ser testada.
 *
 * Só entram contas COM analista de CS preenchido na coluna C. Conta sem
 * analista não é carteirizada e não interessa ao dashboard.
 */

// ─────────────────────────────────────────────────────────────
// CONFIGURAÇÃO
// ─────────────────────────────────────────────────────────────
var PROJECT_ID = 'dashboard-de-cs-stays';
var COLECAO    = 'sheet_accounts';
var ABA        = 'Página1';   // aba com os dados (a outra é o log do Salesforce)

// A chave da conta de serviço fica nas Propriedades do Script, não aqui no
// código. Ela dá acesso de escrita ao banco todo: não deve ficar num arquivo
// que vai pro GitHub nem ser colada em conversa nenhuma.
var PROP_CHAVE = 'FIREBASE_SA_JSON';

// Cabeçalhos que o script procura. A busca é pelo NOME, não pela posição —
// assim, se alguém inserir uma coluna no meio da planilha, nada quebra.
var COLUNAS = {
  sigla:            'Sigla',
  nome:             'Nome da conta',
  analista:         'Analista de CS',
  plano:            'Plano',
  tipoPlano:        'Tipo de plano',
  pais:             'País',
  paisOperacao:     'País de operação',
  cidadeCobranca:   'Cidade de cobrança',
  mrr:              'MRR',
  diasSemAtividade: 'Dias sem atividade',
  ultimoLogin:      'Último login no sistema',
  unidades:         'Número de unidades',
  etapa:            'Etapa',
  lifetimeMeses:    'Lifetime (m)',
  faturaNaoPaga:    'Fatura não paga',
  linkFatura:       '1º link fatura cliente',
  vencimentoFatura: 'Vencimento da Fatura',
  financeBan:       'Finance Ban',
  canais:           'App Center Active Channels',
  website:          'Website',
  atrasoDias:       'Atraso da Fatura em dias'
};

// ─────────────────────────────────────────────────────────────
// PONTO DE ENTRADA — é esta função que o gatilho de tempo chama
// ─────────────────────────────────────────────────────────────
function sincronizar() {
  var inicio = new Date();
  var linhas = lerPlanilha_();
  var contas = linhas.map(montarConta_).filter(function (c) { return !!c; });

  if (!contas.length) {
    Logger.log('Nenhuma conta com analista preenchido. Nada enviado.');
    return;
  }

  var token = pegarToken_();
  var enviadas = 0;
  // O Firestore aceita até 500 escritas por commit; 814 contas viram 2 lotes.
  for (var i = 0; i < contas.length; i += 400) {
    enviadas += enviarLote_(token, contas.slice(i, i + 400));
  }

  // Um resumo da própria rodada fica gravado no banco. É por ele que o
  // dashboard sabe se o espelho está fresco ou se o sync parou de rodar.
  gravarResumo_(token, {
    contas: enviadas,
    linhasLidas: linhas.length,
    inadimplentes: contas.filter(function (c) { return c.inadimplente; }).length,
    analistas: contarAnalistas_(contas),
    segundos: (new Date() - inicio) / 1000
  });

  Logger.log('OK: ' + enviadas + ' contas espelhadas em ' +
             ((new Date() - inicio) / 1000).toFixed(1) + 's');
}

// ─────────────────────────────────────────────────────────────
// LEITURA DA PLANILHA
// ─────────────────────────────────────────────────────────────
function lerPlanilha_() {
  var aba = SpreadsheetApp.getActive().getSheetByName(ABA);
  if (!aba) throw new Error('Não achei a aba "' + ABA + '". Confira o nome em ABA.');

  // getDisplayValues devolve o texto como está na tela: o MRR já formatado em
  // padrão brasileiro e a data como dd/mm/aaaa. É mais previsível do que o
  // valor cru, que muda de tipo conforme a formatação da célula.
  var tudo = aba.getDataRange().getDisplayValues();

  // A linha de cabeçalho não é necessariamente a primeira: o relatório do
  // Salesforce às vezes vem com linhas em branco em cima.
  var iCab = -1;
  for (var i = 0; i < Math.min(tudo.length, 20); i++) {
    if (tudo[i].indexOf(COLUNAS.sigla) >= 0) { iCab = i; break; }
  }
  if (iCab < 0) throw new Error('Não achei a linha de cabeçalho (coluna "' + COLUNAS.sigla + '").');

  var cab = tudo[iCab].map(function (h) { return String(h || '').trim(); });
  var idx = {};
  Object.keys(COLUNAS).forEach(function (k) { idx[k] = cab.indexOf(COLUNAS[k]); });

  if (idx.sigla < 0 || idx.analista < 0) {
    throw new Error('Cabeçalho sem "Sigla" ou "Analista de CS". Colunas lidas: ' + cab.join(' | '));
  }

  return tudo.slice(iCab + 1).map(function (linha) {
    var o = {};
    Object.keys(idx).forEach(function (k) {
      o[k] = idx[k] >= 0 ? String(linha[idx[k]] || '').trim() : '';
    });
    return o;
  }).filter(function (o) { return o.sigla; });
}

// ─────────────────────────────────────────────────────────────
// UMA LINHA → UMA CONTA
// ─────────────────────────────────────────────────────────────
function montarConta_(bruto) {
  // O filtro que importa: sem analista de CS, a conta não é carteirizada.
  if (!bruto.analista) return null;

  var venc = dataISO_(bruto.vencimentoFatura);
  var naoPaga = booleano_(bruto.faturaNaoPaga);

  return {
    sigla:            bruto.sigla.toUpperCase(),
    nome:             bruto.nome,
    analistaNome:     bruto.analista,
    plano:            bruto.plano,
    tipoPlano:        bruto.tipoPlano,
    pais:             bruto.pais,
    paisOperacao:     bruto.paisOperacao,
    cidadeCobranca:   bruto.cidadeCobranca,
    mrr:              numeroBR_(bruto.mrr),
    diasSemAtividade: inteiro_(bruto.diasSemAtividade),
    ultimoLogin:      dataISO_(bruto.ultimoLogin),
    unidades:         inteiro_(bruto.unidades),
    etapa:            bruto.etapa,
    lifetimeMeses:    inteiro_(bruto.lifetimeMeses),
    faturaNaoPaga:    naoPaga,
    vencimentoFatura: venc,
    atrasoDias:       inteiro_(bruto.atrasoDias),
    financeBan:       booleano_(bruto.financeBan),
    linkFatura:       extrairURL_(bruto.linkFatura),
    website:          extrairURL_(bruto.website),
    canais:           listaCanais_(bruto.canais),

    // Inadimplente de verdade = tem fatura aberta E já passou do vencimento.
    // Sem essa conta, quase toda a base entraria como inadimplente: a fatura do
    // mês seguinte é gerada entre os dias 26 e 29 e fica marcada como "não
    // paga" enquanto ainda nem venceu.
    inadimplente:     estaInadimplente_(naoPaga, venc)
  };
}

function estaInadimplente_(naoPaga, vencISO) {
  if (!naoPaga || !vencISO) return false;
  var hoje = Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'yyyy-MM-dd');
  return vencISO < hoje;   // comparação de texto funciona no formato aaaa-mm-dd
}

// ─────────────────────────────────────────────────────────────
// CONVERSÕES
// ─────────────────────────────────────────────────────────────
// "1.233,92" → 1233.92 (ponto de milhar sai, vírgula decimal vira ponto)
function numeroBR_(v) {
  var s = String(v || '').replace(/[^\d,.\-]/g, '').split('.').join('').split(',').join('.');
  var n = parseFloat(s);
  return isNaN(n) ? null : n;
}

function inteiro_(v) {
  var n = parseInt(String(v || '').replace(/[^\d\-]/g, ''), 10);
  return isNaN(n) ? null : n;
}

// A planilha escreve "verdadeiro"/"falso" em português.
function booleano_(v) {
  var s = String(v || '').trim().toLowerCase();
  if (s === 'verdadeiro' || s === 'true' || s === 'sim') return true;
  if (s === 'falso' || s === 'false' || s === 'não' || s === 'nao') return false;
  return null;   // em branco continua em branco, não vira "falso"
}

// "06/08/2026" → "2026-08-06". Guardo como texto ISO, não como data: assim não
// existe fuso pra atrapalhar e o dashboard compara direto.
function dataISO_(v) {
  var m = String(v || '').trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!m) return null;
  var d = ('0' + m[1]).slice(-2), mes = ('0' + m[2]).slice(-2);
  return m[3] + '-' + mes + '-' + d;
}

// A célula pode ser um link do Salesforce com HTML em volta; interessa só a URL.
function extrairURL_(v) {
  var s = String(v || '');
  var m = s.match(/https?:\/\/[^\s"'<>)]+/);
  return m ? m[0] : (s || null);
}

// '["VRBO","Airbnb","Bookingcom"]' → ['VRBO','Airbnb','Bookingcom']
function listaCanais_(v) {
  var s = String(v || '').trim();
  if (!s) return [];
  try {
    var arr = JSON.parse(s);
    if (Object.prototype.toString.call(arr) === '[object Array]') {
      return arr.map(function (x) { return String(x).trim(); }).filter(Boolean);
    }
  } catch (e) { /* não era JSON — cai no plano B abaixo */ }
  return s.replace(/[\[\]"]/g, '').split(',')
          .map(function (x) { return x.trim(); }).filter(Boolean);
}

function contarAnalistas_(contas) {
  var vistos = {};
  contas.forEach(function (c) { vistos[c.analistaNome] = true; });
  return Object.keys(vistos).length;
}

// ─────────────────────────────────────────────────────────────
// AUTENTICAÇÃO (conta de serviço → token de acesso)
// ─────────────────────────────────────────────────────────────
function pegarToken_() {
  var cru = PropertiesService.getScriptProperties().getProperty(PROP_CHAVE);
  if (!cru) {
    throw new Error('Falta a chave da conta de serviço. Cole o JSON na propriedade "' +
                    PROP_CHAVE + '" (Configurações do projeto → Propriedades do script).');
  }
  var sa = JSON.parse(cru);
  var agora = Math.floor(Date.now() / 1000);

  var b64 = function (o) {
    return Utilities.base64EncodeWebSafe(JSON.stringify(o)).replace(/=+$/, '');
  };
  var semAssinatura = b64({ alg: 'RS256', typ: 'JWT' }) + '.' + b64({
    iss:   sa.client_email,
    scope: 'https://www.googleapis.com/auth/datastore',
    aud:   'https://oauth2.googleapis.com/token',
    exp:   agora + 3600,
    iat:   agora
  });
  var assinatura = Utilities.base64EncodeWebSafe(
    Utilities.computeRsaSha256Signature(semAssinatura, sa.private_key)
  ).replace(/=+$/, '');

  var res = UrlFetchApp.fetch('https://oauth2.googleapis.com/token', {
    method: 'post',
    payload: {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion:  semAssinatura + '.' + assinatura
    },
    muteHttpExceptions: true
  });
  var corpo = JSON.parse(res.getContentText());
  if (!corpo.access_token) {
    throw new Error('Google recusou a autenticação: ' + res.getContentText());
  }
  return corpo.access_token;
}

// ─────────────────────────────────────────────────────────────
// ESCRITA NO FIRESTORE
// ─────────────────────────────────────────────────────────────
var BASE = 'https://firestore.googleapis.com/v1/projects/';

// Converte um valor do JavaScript no formato tipado que a API do Firestore quer.
function valor_(v) {
  if (v === null || v === undefined || v === '') return { nullValue: null };
  if (typeof v === 'boolean') return { booleanValue: v };
  if (typeof v === 'number') {
    return v % 1 === 0 ? { integerValue: String(v) } : { doubleValue: v };
  }
  if (Object.prototype.toString.call(v) === '[object Array]') {
    return { arrayValue: { values: v.map(valor_) } };
  }
  return { stringValue: String(v) };
}

function campos_(obj) {
  var f = {};
  Object.keys(obj).forEach(function (k) { f[k] = valor_(obj[k]); });
  return f;
}

function enviarLote_(token, contas) {
  var prefixo = 'projects/' + PROJECT_ID + '/databases/(default)/documents/';
  var agora = new Date().toISOString();

  var writes = contas.map(function (c) {
    var doc = {};
    Object.keys(c).forEach(function (k) { doc[k] = c[k]; });
    doc.syncedAt = agora;
    // Sem updateMask o Firestore troca o documento inteiro — que é o que
    // queremos: o espelho reflete a planilha, sem sobra de campo antigo.
    return {
      update: {
        // A sigla é o identificador: é única na planilha e é a mesma chave que
        // o dashboard já usa pra casar cliente na importação manual.
        name:   prefixo + COLECAO + '/' + encodeURIComponent(c.sigla),
        fields: campos_(doc)
      }
    };
  });

  var res = UrlFetchApp.fetch(BASE + PROJECT_ID + '/databases/(default)/documents:commit', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + token },
    payload: JSON.stringify({ writes: writes }),
    muteHttpExceptions: true
  });

  if (res.getResponseCode() !== 200) {
    throw new Error('Firestore recusou o lote (' + res.getResponseCode() + '): ' +
                    res.getContentText().slice(0, 500));
  }
  return contas.length;
}

// Resumo da rodada, num documento fixo. O dashboard lê isso pra mostrar quando
// foi a última atualização — e pra avisar se o sync travou.
function gravarResumo_(token, dados) {
  dados.rodadaEm = new Date().toISOString();
  var res = UrlFetchApp.fetch(BASE + PROJECT_ID + '/databases/(default)/documents:commit', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + token },
    payload: JSON.stringify({
      writes: [{
        update: {
          name: 'projects/' + PROJECT_ID + '/databases/(default)/documents/sheet_sync/status',
          fields: campos_(dados)
        }
      }]
    }),
    muteHttpExceptions: true
  });
  if (res.getResponseCode() !== 200) {
    Logger.log('Aviso: não gravei o resumo — ' + res.getContentText().slice(0, 300));
  }
}

// ─────────────────────────────────────────────────────────────
// AJUDANTES PRA CONFIGURAR (rodar à mão, uma vez)
// ─────────────────────────────────────────────────────────────

/**
 * Confere a leitura SEM enviar nada pro Firebase. Rode esta primeiro: ela
 * mostra quantas contas o filtro pegou e como ficou a primeira delas.
 */
function testarLeitura() {
  var linhas = lerPlanilha_();
  var contas = linhas.map(montarConta_).filter(function (c) { return !!c; });
  Logger.log('Linhas na aba: ' + linhas.length);
  Logger.log('Contas COM analista (vão pro dashboard): ' + contas.length);
  Logger.log('Contas SEM analista (ficam de fora): ' + (linhas.length - contas.length));
  Logger.log('Analistas diferentes: ' + contarAnalistas_(contas));
  Logger.log('Inadimplentes de verdade (venceu e não pagou): ' +
             contas.filter(function (c) { return c.inadimplente; }).length);
  Logger.log('Com fatura aberta mas ainda a vencer: ' +
             contas.filter(function (c) { return c.faturaNaoPaga && !c.inadimplente; }).length);
  Logger.log('--- primeira conta ---');
  Logger.log(JSON.stringify(contas[0], null, 2));
}

/** Cria o gatilho que roda o sync a cada 15 minutos. Rodar uma vez só. */
function instalarGatilho() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'sincronizar') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('sincronizar').timeBased().everyMinutes(15).create();
  Logger.log('Gatilho instalado: sincronizar() a cada 15 minutos.');
}

/** Desliga o sync sem apagar nada. */
function removerGatilho() {
  var n = 0;
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'sincronizar') { ScriptApp.deleteTrigger(t); n++; }
  });
  Logger.log('Gatilhos removidos: ' + n);
}
