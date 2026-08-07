# Ligar a planilha do Salesforce ao Firebase

Passo a passo pra ser feito **uma vez**. Depois disso roda solto, a cada 15 minutos.

Planilha: **CS - Clientes Carteirizados [Relatório - Salesforce]** (dono: vinicius.silva@stays.net)
Projeto Firebase: **dashboard-de-cs-stays**

---

## Antes de começar

Você precisa ser **Editor nominal** da planilha (não pelo link). O Apps Script exige
permissão de edição pra ser anexado. Pede pro Vinicius adicionar `pedro.ferreira@stays.net`
como Editor, e depois disso a planilha pode voltar a ficar "Restrito" — o script roda de
dentro dela, não precisa de acesso público em nenhum momento.

---

## Parte 1 — Criar a chave no Firebase

1. Abre <https://console.firebase.google.com> e entra no projeto **dashboard-de-cs-stays**.
2. Clica na **engrenagem** ao lado de "Visão geral do projeto" (canto superior esquerdo) →
   **Configurações do projeto**.
3. Vai na aba **Contas de serviço**.
4. Clica em **Gerar nova chave privada** → **Gerar chave**.
5. Vai baixar um arquivo `.json`. **Guarda ele bem:**
   - Esse arquivo é a chave do banco inteiro. Quem tem ele escreve e apaga o que quiser.
   - Não sobe pro GitHub, não manda em chat, não cola em conversa nenhuma (nem pra mim —
     eu não preciso dele e não devo ver).
   - Depois de colar no Apps Script (Parte 2), apaga o arquivo do computador.

---

## Parte 2 — Colar o script na planilha

1. Abre a planilha → menu **Extensões** → **Apps Script**.
2. Apaga o conteúdo do arquivo `Código.gs` que já vem lá e cola **todo** o conteúdo de
   [`Codigo.gs`](Codigo.gs) no lugar.
3. Salva (ícone de disquete ou Ctrl+S).

### Guardar a chave em lugar seguro (não no código)

4. Na barra da esquerda, clica na **engrenagem** (Configurações do projeto).
5. Desce até **Propriedades do script** → **Adicionar propriedade do script**.
6. Preenche:
   - **Propriedade:** `FIREBASE_SA_JSON`
   - **Valor:** cola o conteúdo **inteiro** do arquivo `.json` que baixou (abre com o
     Bloco de Notas, seleciona tudo, copia)
7. **Salvar propriedades do script**.

> A chave fica aqui em vez de no código porque o código vai pro GitHub e a propriedade não.
> Quem for Editor do script (você e o Vinicius) consegue ver — isso é esperado.

---

## Parte 3 — Testar antes de gravar nada

1. No editor, na lista de funções no topo, escolhe **`testarLeitura`** e clica em **Executar**.
2. Na primeira execução o Google vai pedir autorização — **Revisar permissões** → escolhe
   sua conta → **Avançado** → **Acessar (não seguro)** → **Permitir**.
   (O aviso de "não seguro" aparece porque o script não é publicado numa loja. É o seu
   próprio script.)
3. Olha o **Registro de execução** embaixo. Deve mostrar algo assim:

```
Linhas na aba: 814
Contas COM analista (vão pro dashboard): ...
Contas SEM analista (ficam de fora): ...
Analistas diferentes: ...
Inadimplentes de verdade (venceu e não pagou): ...
Com fatura aberta mas ainda a vencer: ...
```

**Confere se o número de contas com analista faz sentido** antes de seguir. Essa função
não escreve nada no Firebase — é só leitura.

Se der erro dizendo que não achou a aba, ajusta a linha `var ABA = 'Página1';` no topo do
script com o nome certo da aba de dados.

---

## Parte 4 — Primeira gravação

1. Escolhe a função **`sincronizar`** e clica em **Executar**.
2. No Registro deve aparecer: `OK: N contas espelhadas em X.Xs`
3. Confere no Firebase: **Firestore Database** → deve existir a coleção **`sheet_accounts`**
   com um documento por sigla, e uma coleção **`sheet_sync`** com o documento `status`
   (o resumo da última rodada).

---

## Parte 5 — Deixar rodando sozinho

1. Escolhe a função **`instalarGatilho`** e clica em **Executar**.
2. Pronto: roda a cada 15 minutos. Dá pra conferir no ícone de **relógio** (Acionadores),
   na barra da esquerda.

Pra desligar o sync sem apagar nada, roda **`removerGatilho`**.

---

## Parte 6 — Regras de segurança do Firestore

No Firebase → **Firestore Database** → aba **Regras**, garante que as duas coleções novas
sejam **legíveis só por quem está logado** e que **ninguém escreva pelo navegador** (só o
script escreve, e ele usa a conta de serviço, que passa por cima das regras):

```
match /sheet_accounts/{doc} {
  allow read: if request.auth != null;
  allow write: if false;
}
match /sheet_sync/{doc} {
  allow read: if request.auth != null;
  allow write: if false;
}
```

---

## O que o script faz e o que ele não faz

**Faz:** copia as contas carteirizadas da planilha pra coleção `sheet_accounts`, uma vez a
cada 15 minutos. Documento por sigla. Sobrescreve o documento inteiro a cada rodada, então
o espelho é sempre igual à planilha.

**Não faz:** nada na coleção `clients`. O script não conhece o cadastro do dashboard e não
tem como estragá-lo. Toda a lógica de "MRR entra sozinho / troca de analista vai pra
revisão do líder" fica no dashboard, na próxima etapa.

**Filtro:** só entram linhas com **Analista de CS** (coluna C) preenchido. Conta sem
analista não é carteirizada e é descartada na leitura.

**Inadimplência:** `Fatura não paga = verdadeiro` **não** basta. A fatura do mês seguinte
é gerada entre os dias 26 e 29 e fica marcada como não paga enquanto ainda nem venceu. O
campo `inadimplente` só fica verdadeiro quando a fatura está aberta **e** a data de
vencimento já passou.

---

## Se algo der errado depois

O documento `sheet_sync/status` guarda a data e hora da última rodada bem-sucedida. Se ele
estiver velho, o sync parou. Pra ver o motivo: Apps Script → ícone de relógio
(**Acionadores**) → aba **Execuções**, que mostra os erros de cada rodada.
