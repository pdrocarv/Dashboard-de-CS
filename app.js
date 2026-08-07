const firebaseConfig={apiKey:"AIzaSyALfaLGECoyKNXQ492iq5-aLE1Q7bVzM7E",authDomain:"dashboard-de-cs-stays.firebaseapp.com",projectId:"dashboard-de-cs-stays",storageBucket:"dashboard-de-cs-stays.firebasestorage.app",messagingSenderId:"36682019222",appId:"1:36682019222:web:a929f8e2b1b9e71b326db7"};
firebase.initializeApp(firebaseConfig);
const auth=firebase.auth();
const db=firebase.firestore();
const storage=(firebase.storage?firebase.storage():null);
// ============================================================
// CONSTANTES
// ============================================================
const CATS={crescimento:"Crescimento",digital:"Presenca digital",distribuicao:"Distribuicao e canais",config:"Localizacao e configuracao",financeiro:"Financeiro",tecnologia:"Tecnologia",risco:"Risco",engajamento:"Engajamento"};
const CAT_CSS={crescimento:"ic-c",digital:"ic-d",distribuicao:"ic-ds",config:"ic-co",financeiro:"ic-f",tecnologia:"ic-t",risco:"ic-r",engajamento:"ic-e"};
const MONTHS=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const PLAN_L={superhost:"Super Host",pro:"PRO",administrator:"Administrator",agency:"Agency"};
const CATEGORIA_MIGRATE={'Elite':'elite','High Touch':'gold','Core A/B':'silver','Long Tail':'bronze'};
const CATEGORIA_LABELS={BR:{elite:'Elite',gold:'Gold',silver:'Silver',bronze:'Bronze'},hispano:{elite:'Elite',gold:'High Value',silver:'Core A/B',bronze:'Pareto'}};
const CATEGORIA_CADENCIA_SEMANAS={elite:4.3,gold:8.6,silver:10,bronze:10};
function isHispano(c){return!!(c&&c.country&&c.country!=='Brasil');}
function categoriaLabel(c){if(!c||!c.categoria)return'';var region=isHispano(c)?'hispano':'BR';var lbls=CATEGORIA_LABELS[region];return lbls[c.categoria]||c.categoria;}
const PLAN_S={superhost:{bg:"#f3e8ff",c:"#7c3aed"},pro:{bg:"#dbeafe",c:"#1d4ed8"},administrator:{bg:"#fef3c7",c:"#d97706"},agency:{bg:"#d1fae5",c:"#059669"}};
const COUNTRY_TZ={"Argentina":"America/Argentina/Buenos_Aires","Bolivia":"America/La_Paz","Bolívia":"America/La_Paz","Belice":"America/Belize","Chile":"America/Santiago","Colombia":"America/Bogota","Costa Rica":"America/Costa_Rica","Cuba":"America/Havana","Ecuador":"America/Guayaquil","El Salvador":"America/El_Salvador","Guatemala":"America/Guatemala","Haiti":"America/Port-au-Prince","Honduras":"America/Tegucigalpa","Jamaica":"America/Jamaica","México":"America/Mexico_City","Mexico":"America/Mexico_City","Nicaragua":"America/Managua","Panamá":"America/Panama","Panama":"America/Panama","Paraguay":"America/Asuncion","Perú":"America/Lima","Peru":"America/Lima","Puerto Rico":"America/Puerto_Rico","República Dominicana":"America/Santo_Domingo","Trinidad y Tobago":"America/Port_of_Spain","Uruguay":"America/Montevideo","Venezuela":"America/Caracas","Estados Unidos":"America/New_York","España":"Europe/Madrid","Portugal":"Europe/Lisbon","Canadá":"America/Toronto","França":"Europe/Paris","Itália":"Europe/Rome","Reino Unido":"Europe/London","Alemanha":"Europe/Berlin","Suíça":"Europe/Zurich","Países Baixos":"Europe/Amsterdam","Bélgica":"Europe/Brussels","Grécia":"Europe/Athens","Croácia":"Europe/Zagreb","Tailândia":"Asia/Bangkok","Indonésia":"Asia/Jakarta","Filipinas":"Asia/Manila","Emirados Árabes Unidos":"Asia/Dubai","Marrocos":"Africa/Casablanca","África do Sul":"Africa/Johannesburg","Austrália":"Australia/Sydney","Nova Zelândia":"Pacific/Auckland","Japão":"Asia/Tokyo","Brasil":"America/Sao_Paulo"};
const TOOLTIPS={saude:"Score geral (0-100).\n< 50 = Alto risco\n50-74 = Atencao\n75+ = Estavel\nBaseado no ultimo follow-up.",crescimento:"Unidades, ocupacao, preco\ne oportunidades de upgrade.",digital:"Presenca online: site,\ndominío, fotos e descricao.",distribuicao:"Canais conectados,\nperformance e usabilidade.",financeiro:"Pagamento, inadimplencia,\nmodulo financeiro e negociacao.",risco:"Cancelamento, NPS e casos\nabertos (N2/Website).",engajamento:"Atividade no sistema.\nInativos 30+ dias = risco.",followup:"Prazo para proximo FU (70 dias).\n Verde OK  Amarelo < 15d  Vermelho Vencido",mrr:"Receita recorrente mensal.\nClique no cabecalho para ordenar."};
const CS={"Argentina":["Buenos Aires","CABA","Catamarca","Chaco","Chubut","Cordoba","Corrientes","Entre Rios","Formosa","Jujuy","La Pampa","La Rioja","Mendoza","Misiones","Neuquen","Rio Negro","Salta","San Juan","San Luis","Santa Cruz","Santa Fe","Santiago del Estero","Tierra del Fuego","Tucuman"],"Bolivia":["Beni","Chuquisaca","Cochabamba","La Paz","Oruro","Pando","Potosi","Santa Cruz","Tarija"],"Belice":["Belize","Cayo","Corozal","Orange Walk","Stann Creek","Toledo"],"Chile":["Arica y Parinacota","Tarapaca","Antofagasta","Atacama","Coquimbo","Valparaiso","Metropolitana","OHiggins","Maule","Nuble","Biobio","La Araucania","Los Rios","Los Lagos","Aysen","Magallanes"],"Colombia":["Antioquia","Bogota D.C.","Valle del Cauca","Atlantico","Bolivar","Santander","Narino","Cordoba","Tolima","Cauca","Boyaca","Meta","Huila","Magdalena","Risaralda","Cesar","Sucre","Quindio","Choco","La Guajira","Cundinamarca","Caldas","Norte de Santander","Caqueta","Arauca","Casanare","Putumayo"],"Costa Rica":["Alajuela","Cartago","Guanacaste","Heredia","Limon","Puntarenas","San Jose"],"Cuba":["Artemisa","Camaguey","Ciego de Avila","Cienfuegos","Granma","Guantanamo","Holguin","La Habana","Las Tunas","Matanzas","Mayabeque","Pinar del Rio","Sancti Spiritus","Santiago de Cuba","Villa Clara"],"Ecuador":["Azuay","Bolivar","Canar","Carchi","Chimborazo","Cotopaxi","El Oro","Esmeraldas","Galapagos","Guayas","Imbabura","Loja","Los Rios","Manabi","Morona Santiago","Napo","Orellana","Pastaza","Pichincha","Santa Elena","Santo Domingo","Sucumbios","Tungurahua","Zamora Chinchipe"],"El Salvador":["Ahuachapan","Cabanas","Chalatenango","Cuscatlan","La Libertad","La Paz","La Union","Morazan","San Miguel","San Salvador","San Vicente","Santa Ana","Sonsonate","Usulutan"],"Guatemala":["Alta Verapaz","Baja Verapaz","Chimaltenango","Chiquimula","El Progreso","Escuintla","Guatemala","Huehuetenango","Izabal","Jalapa","Jutiapa","Peten","Quetzaltenango","Quiche","Retalhuleu","Sacatepequez","San Marcos","Santa Rosa","Solola","Suchitepequez","Totonicapan","Zacapa"],"Haiti":["Artibonite","Centre","Grand Anse","Nippes","Nord","Nord-Est","Nord-Ouest","Ouest","Sud","Sud-Est"],"Honduras":["Atlantida","Choluteca","Colon","Comayagua","Copan","Cortes","El Paraiso","Francisco Morazan","Gracias a Dios","Intibuca","Islas de la Bahia","La Paz","Lempira","Ocotepeque","Olancho","Santa Barbara","Valle","Yoro"],"Jamaica":["Clarendon","Hanover","Kingston","Manchester","Portland","Saint Andrew","Saint Ann","Saint Catherine","Saint Elizabeth","Saint James","Saint Mary","Saint Thomas","Trelawny","Westmoreland"],"México":["Aguascalientes","Baja California","Baja California Sur","Campeche","Chiapas","Chihuahua","Ciudad de Mexico","Coahuila","Colima","Durango","Estado de Mexico","Guanajuato","Guerrero","Hidalgo","Jalisco","Michoacan","Morelos","Nayarit","Nuevo Leon","Oaxaca","Puebla","Queretaro","Quintana Roo","San Luis Potosi","Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala","Veracruz","Yucatan","Zacatecas"],"Nicaragua":["Boaco","Carazo","Chinandega","Chontales","Esteli","Granada","Jinotega","Leon","Madriz","Managua","Masaya","Matagalpa","Nueva Segovia","RACCN","RACCS","Rivas","Rio San Juan"],"Panama":["Bocas del Toro","Chiriqui","Cocle","Colon","Darien","Embera","Guna Yala","Heredia","Los Santos","Ngabe-Bugle","Panama","Panama Oeste","Veraguas"],"Paraguay":["Alto Paraguay","Alto Parana","Amambay","Asuncion","Boqueron","Caaguazu","Caazapa","Canindeyu","Central","Concepcion","Cordillera","Guaira","Itapua","Misiones","Neembucu","Paraguari","Presidente Hayes","San Pedro"],"Perú":["Amazonas","Ancash","Apurimac","Arequipa","Ayacucho","Cajamarca","Callao","Cusco","Huancavelica","Huanuco","Ica","Junin","La Libertad","Lambayeque","Lima","Loreto","Madre de Dios","Moquegua","Pasco","Piura","Puno","San Martin","Tacna","Tumbes","Ucayali"],"Puerto Rico":["Aguadilla","Arecibo","Bayamon","Caguas","Carolina","Fajardo","Guaynabo","Humacao","Mayaguez","Ponce","San Juan","Toa Baja","Trujillo Alto"],"República Dominicana":["Azua","Bahoruco","Barahona","Dajabon","Distrito Nacional","Duarte","El Seibo","Elias Pina","Espaillat","Hato Mayor","Hermanas Mirabal","Independencia","La Altagracia","La Romana","La Vega","M.T. Sanchez","Monsenor Nouel","Monte Cristi","Monte Plata","Pedernales","Peravia","Puerto Plata","Samana","San Cristobal","San Jose de Ocoa","San Juan","San Pedro de Macoris","Sanchez Ramirez","Santiago","Santiago Rodriguez","Santo Domingo","Valverde"],"Trinidad y Tobago":["Arima","Chaguanas","Couva-Tabaquite-Talparo","Diego Martin","Penal-Debe","Point Fortin","Port of Spain","Princes Town","Rio Claro-Mayaro","San Fernando","San Juan-Laventille","Sangre Grande","Siparia","Tobago","Tunapuna-Piarco"],"Uruguay":["Artigas","Canelones","Cerro Largo","Colonia","Durazno","Flores","Florida","Lavalleja","Maldonado","Montevideo","Paysandu","Rio Negro","Rivera","Rocha","Salto","San Jose","Soriano","Tacuarembo","Treinta y Tres"],"Venezuela":["Amazonas","Anzoategui","Apure","Aragua","Barinas","Bolivar","Carabobo","Cojedes","Delta Amacuro","Distrito Capital","Falcon","Guarico","Lara","Merida","Miranda","Monagas","Nueva Esparta","Portuguesa","Sucre","Tachira","Trujillo","Vargas","Yaracuy","Zulia"],"España":["Andalucía","Aragón","Asturias","Baleares","Canarias","Cantabria","Castilla-La Mancha","Castilla y León","Cataluña","Ceuta","Comunidad Valenciana","Extremadura","Galicia","La Rioja","Madrid","Melilla","Murcia","Navarra","País Vasco"],"Portugal":["Aveiro","Beja","Braga","Bragança","Castelo Branco","Coimbra","Évora","Faro","Guarda","Leiria","Lisboa","Portalegre","Porto","Santarém","Setúbal","Viana do Castelo","Vila Real","Viseu","Açores","Madeira"],"Estados Unidos":["California","Florida","New York","Texas","Nevada","Hawaii","Arizona","Colorado","Illinois","Georgia","Outro"],"Brasil":["São Paulo","Rio de Janeiro","Minas Gerais","Bahia","Santa Catarina","Paraná","Rio Grande do Sul","Ceará","Pernambuco","Espírito Santo","Goiás","Distrito Federal","Outro"],"Canadá":[],"França":[],"Itália":[],"Reino Unido":[],"Alemanha":[],"Suíça":[],"Países Baixos":[],"Bélgica":[],"Grécia":[],"Croácia":[],"Tailândia":[],"Indonésia":[],"Filipinas":[],"Emirados Árabes Unidos":[],"Marrocos":[],"África do Sul":[],"Austrália":[],"Nova Zelândia":[],"Japão":[],"Outro":[]};
// ============================================================
// ESTADO E AUTH
// ============================================================
const S={appUser:null,appReady:false,clients:[],allUsers:[],customQuestions:[],view:"dashboard",sel:null,selFollow:null,modal:null,theme:localStorage.getItem("stays_theme")||"light",filterCountry:"",filterRisk:"",filterPlan:"",filterFollowUp:"",sortMrr:"",sortName:"",filterAnalyst:"",clientTab:"info",importMsg:"",genText:"",generating:false,copied:false,undoMsg:"",undoCI:null,undoFollow:null,undoFollowIdx:null,clockInterval:null,citiesOpen:false,apiKey:localStorage.getItem("stays_api_key")||"",savedMsg:false,filterStatus:'',filterCategoria:'',filterAlertStatus:'',expandedAnalysts:{},showFilters:false,showAdminFilters:false,adminLog:[],churnEditMode:false,modalArg:null,slidePanel:null,slidePanelTab:'activities',slideAddOpen:false,wiz:{step:0,type:'first',answers:{},humors:{},autoHumors:{},prevAnswers:null},chartType:'timeline',lpFilters:{cat:[],plan:[],analyst:[],country:[],city:[]},lpMrrSort:null,lpOpenPop:null,lpOpen:{churn:false,inad:false,loop:false,quest:false},lpViewMode:'list',lpSearch:'',lpPageSize:{list:20,cards:10},lpPage:{},settingsCat:null,settingsSub:null,wizOrderTab:'first',wizOrderDraft:null,wizOrderDirty:false,wizBlockedMsg:false,ahFilters:{from:'',to:'',user:'',cat:'',action:''},profileMenuOpen:false,userDraft:null,profileDraft:null,newUserCreds:null,busyMsg:'',impClients:null,lpClientMenu:null,lpToast:'',lpPeriod:{key:'30d'},lpPeriodDraft:null,lpBand:'',lpQueue:null,lpChurnBig:false,lpChurnMode:'mes',impFollow:null,_lastView:null,_lastModal:null};
setTheme(S.theme);
function emailPermitido(email){return email&&(email.endsWith('@stays.net')||email==='pdroc.ferreira@gmail.com');}
// pedro.ferreira@stays.net e o admin master: a funcao dele nao muda (nem por ele
// mesmo) e a conta nao aparece na Gestao de ninguem — nem de outro admin, nem do
// usuario teste. Quem precisa mexer no proprio nome/foto usa o Perfil, no topo.
const MASTER_ADMIN_EMAIL='pedro.ferreira@stays.net';
const OWNER_TEST_EMAIL='pdroc.ferreira@gmail.com';
// So o master e blindado. A conta de teste do dono virou conta comum de proposito:
// e ela que recebe o papel "Usuario teste" pra provar as novidades antes do time.
const PROTECTED_ADMIN_EMAILS=[MASTER_ADMIN_EMAIL];
function isProtectedAdmin(u){return u&&PROTECTED_ADMIN_EMAILS.indexOf((u.email||'').toLowerCase())>=0;}
function isMasterAdmin(u){return!!u&&(u.email||'').toLowerCase()===MASTER_ADMIN_EMAIL;}
function iAmMasterAdmin(){return isMasterAdmin(S.appUser);}
// ── Usuario teste: acesso de admin + as novidades em prova ──
// O usuario teste navega o dashboard como um admin. A unica coisa que ele nao
// alcanca e a conta do admin master, que e invisivel pra todo mundo.
function isAdminLike(u){var r=u&&u.role;return r==='admin'||r==='testuser';}
function iAmAdminLike(){return isAdminLike(S.appUser);}
// Porta das novidades. O que ainda esta em prova aparece pra quem tem o papel
// "Usuario teste" e pro admin master (que precisa ver pra decidir se libera); o
// resto do time continua com o dashboard de ontem ate a aprovacao. Uma feature
// "sai da porta" quando esta chamada e removida do codigo dela.
function hasBeta(){return!!(S.appUser&&(S.appUser.role==='testuser'||iAmMasterAdmin()));}
// ── Hierarquia: Gerente -> Supervisor -> Analista ──
// managedUsers do supervisor guarda analistas; managedUsers do gerente guarda supervisores.
function supervisorOfAnalyst(analystUid){
  return(S.allUsers||[]).find(function(u){return(u.role==='leader'||u.role==='admin')&&(u.managedUsers||[]).indexOf(analystUid)>=0;});
}
function gerenteOfSupervisor(supUid){
  return(S.allUsers||[]).find(function(u){return u.role==='gerente'&&(u.managedUsers||[]).indexOf(supUid)>=0;});
}
function supervisorsOfGerente(gerenteUid){
  var g=(S.allUsers||[]).find(function(u){return u.uid===gerenteUid;});
  if(!g)return[];
  return(g.managedUsers||[]).filter(function(id){
    var u=(S.allUsers||[]).find(function(x){return x.uid===id;});
    return!!u&&u.role==='leader';
  });
}
function analystsOfGerente(gerenteUid){
  var out=[];
  supervisorsOfGerente(gerenteUid).forEach(function(supUid){
    var sup=(S.allUsers||[]).find(function(x){return x.uid===supUid;});
    (sup&&sup.managedUsers||[]).forEach(function(aUid){if(out.indexOf(aUid)<0)out.push(aUid);});
  });
  return out;
}
// Funcao, supervisor/gerente responsavel e senha do usuario
function canEditUserRole(target){
  if(!target||!S.appUser)return false;
  if(isMasterAdmin(target))return false;
  if(isProtectedAdmin(target))return iAmMasterAdmin();
  if(target.uid===S.appUser.uid)return false;
  var r=S.appUser.role;
  if(isAdminLike(S.appUser))return true;
  if(target.role==='admin'||target.role==='testuser')return false;
  // Aprovar quem entrou sozinho e ficou pendente: qualquer gerente ou supervisor.
  if(target.role==='pending')return r==='gerente'||r==='leader';
  if(r==='gerente'){
    if(target.role==='gerente')return false;
    if(target.role==='leader')return(S.appUser.managedUsers||[]).indexOf(target.uid)>=0;
    if(target.role==='analyst')return analystsOfGerente(S.appUser.uid).indexOf(target.uid)>=0;
    return false;
  }
  if(r==='leader')return target.role==='analyst'&&(S.appUser.managedUsers||[]).indexOf(target.uid)>=0;
  return false;
}
// Funcoes que cada perfil pode atribuir a outro usuario
function assignableRoles(){
  var r=S.appUser&&S.appUser.role;
  if(isAdminLike(S.appUser))return['pending','analyst','leader','gerente','admin','testuser'];
  if(r==='gerente')return['pending','analyst','leader'];
  if(r==='leader')return['pending','analyst'];
  return[];
}
// Nome, titulo e foto — o proprio usuario sempre pode
function canEditUserProfile(target){
  if(!target||!S.appUser)return false;
  if(target.uid===S.appUser.uid)return true;
  if(isProtectedAdmin(target))return iAmMasterAdmin();
  var r=S.appUser.role;
  if(isAdminLike(S.appUser))return true;
  if(target.role==='admin'||target.role==='testuser')return false;
  return r==='gerente'||r==='leader';
}
// Quem aparece na tela de Gestao: gerente e supervisor nao veem admin nem usuario
// teste. O admin master nao aparece pra ninguem — nem pra ele mesmo, que edita o
// proprio nome/foto pelo Perfil no topo. Assim ninguem tropeca naquela linha.
function adminVisibleUsers(){
  if(!S.appUser)return[];
  var base=(S.allUsers||[]).filter(function(u){return!isMasterAdmin(u);});
  if(iAmAdminLike())return base;
  return base.filter(function(u){return u.role!=='admin'&&u.role!=='testuser';});
}
// ── Historico de atividades: quem enxerga a atividade de quem ──
// Admin ve tudo. Gerente ve a si, os supervisores atribuidos a ele e os analistas.
// Supervisor ve gerentes, analistas e outros supervisores. Analista so ve o proprio.
// Atividade de admin so admin ve.
function canSeeLogOf(actorUid){
  var me=S.appUser;
  if(!me)return false;
  if(isAdminLike(me))return true;
  if(actorUid&&actorUid===me.uid)return true;
  var actor=(S.allUsers||[]).find(function(u){return u.uid===actorUid;});
  if(!actor)return false;
  if(isAdminLike(actor))return false;
  if(me.role==='gerente'){
    if(actor.role==='analyst')return true;
    if(actor.role==='leader')return(me.managedUsers||[]).indexOf(actor.uid)>=0;
    return false;
  }
  if(me.role==='leader')return['gerente','analyst','leader'].indexOf(actor.role)>=0;
  return false;
}
// Regra geral do sistema: seletor de uma funcao lista SO quem tem aquela funcao.
// Usuario teste e pendente nunca aparecem como opcao em lugar nenhum.
function usersWithRole(){
  var roles=[].slice.call(arguments);
  return(S.allUsers||[]).filter(function(u){return roles.indexOf(u.role)>=0;})
    .sort(function(a,b){return String(a.name||'').localeCompare(String(b.name||''));});
}
// Admin ainda conta como supervisor possível, mas só quem é admin enxerga isso —
// pra gerente e supervisor nenhum admin aparece em lugar nenhum da Gestão.
function leaderUsers(){return iAmAdminLike()?usersWithRole('leader','admin'):usersWithRole('leader');}
function gerenteUsers(){return usersWithRole('gerente');}
var _authTimer=setTimeout(function(){if(!S.appReady){console.warn("Auth timeout — reloading");window.location.reload();}},9000);
auth.onAuthStateChanged(async function(fbUser){clearTimeout(_authTimer);
  if(fbUser&&!emailPermitido(fbUser.email)){
    await auth.signOut();
    S.appUser={unauthorized:true,email:fbUser.email};
    S.appReady=true;render();return;
  }
  if(fbUser){
    try{
      var doc=await db.collection("users").doc(fbUser.uid).get();
      if(doc.exists){
        S.appUser=Object.assign({uid:fbUser.uid},doc.data());
        if(S.appUser.role==="pending"){S.appReady=true;render();return;}
      } else {
        var all=await db.collection("users").limit(1).get();
        var profile={name:fbUser.displayName||fbUser.email,email:fbUser.email,photo:fbUser.photoURL||"",managedUsers:[],createdAt:new Date().toISOString()};
        if(all.empty){profile.role="admin";profile.teamId="admin";}
        else{profile.role="pending";profile.teamId="";}
        await db.collection("users").doc(fbUser.uid).set(profile);
        S.appUser=Object.assign({uid:fbUser.uid},profile);
        if(profile.role==="pending"){S.appReady=true;render();return;}
      }
      await loadClients();
      if(["admin","gerente","leader","testuser"].indexOf(S.appUser.role)>=0)await loadAllUsers();
      await loadCustomQuestions();
      // Depois das perguntas customizadas, senão elas ficariam de fora do texto.
      refreshAllSFTexts();
      S.appReady=true;
      migrateFromLocalStorage();
      applyRoute(location.hash);
      render();
    }catch(err){console.error("Auth error:",err);S.appReady=true;render();}
  } else {
    S.appUser=null;S.appReady=true;S.clients=[];render();
  }
});
async function signInWithGoogle(){var p=new firebase.auth.GoogleAuthProvider();try{await auth.signInWithPopup(p);}catch(e){alert("Erro ao entrar: "+e.message);}}
async function signInWithEmail(){var em=document.getElementById("login-email").value.trim(),pw=document.getElementById("login-pw").value;if(!em||!pw){alert("Preencha e-mail e senha.");return;}try{await auth.signInWithEmailAndPassword(em,pw);}catch(e){alert("Erro: "+(e.code==="auth/wrong-password"||e.code==="auth/user-not-found"?"E-mail ou senha incorretos.":e.message));}}
async function doSignOut(){if(!confirmDiscardIfDirty())return;if(!confirm("Sair do Dashboard?"))return;if(S.clockInterval)clearInterval(S.clockInterval);await auth.signOut();}
// ============================================================
// FIRESTORE
// ============================================================
async function loadClients(){
  try{
    var q=db.collection("clients");
    if(S.appUser.role==="analyst")q=q.where("ownerId","==",S.appUser.uid);
    else if(S.appUser.role==="leader"){var uids=[S.appUser.uid].concat(S.appUser.managedUsers||[]);q=q.where("ownerId","in",uids.slice(0,10));}
    var snap=await q.get();
    S.clients=snap.docs.map(function(d){return Object.assign({id:d.id},d.data());});
    S.clients=migrateClients(S.clients);
    purgeExpiredDeleted();
  }catch(e){console.error("Load clients:",e);S.clients=[];}
}
const LIXEIRA_DIAS=7;
// Cliente excluído fica na Lixeira (Arquivados) por 7 dias e depois é removido de vez.
function trashDaysLeft(c){
  if(!c||!c.deletedAt)return null;
  var left=LIXEIRA_DIAS-Math.floor((Date.now()-c.deletedAt)/86400000);
  return left>0?left:0;
}
function purgeExpiredDeleted(){
  var expired=S.clients.filter(function(c){return c.deletedAt&&trashDaysLeft(c)===0;});
  if(!expired.length)return;
  expired.forEach(function(c){
    var i=S.clients.indexOf(c);
    if(i>=0)S.clients.splice(i,1);
    deleteClientFromDB(c.id);
  });
}
async function loadAdminLog(){try{var snap=await db.collection('admin_log').orderBy('at','desc').limit(500).get();S.adminLog=snap.docs.map(function(d){return d.data();});}catch(e){console.error('loadAdminLog:',e);S.adminLog=[];}}
async function loadAllUsers(){try{var s=await db.collection("users").get();S.allUsers=s.docs.map(function(d){return Object.assign({uid:d.id},d.data());});}catch(e){console.error(e);}}
async function loadCustomQuestions(){try{var s=await db.collection("custom_questions").get();S.customQuestions=s.docs.map(function(d){return Object.assign({id:d.id},d.data());});}catch(e){console.error("loadCustomQuestions:",e);S.customQuestions=[];}}
async function saveState(){
  if(!S.appUser||S.appUser.role==="pending")return;
  var c=S.sel!==null?S.clients[S.sel]:null;if(!c)return;
  try{var d=JSON.parse(JSON.stringify(c));if(!d.ownerId)d.ownerId=S.appUser.uid;await db.collection("clients").doc(c.id).set(d);}catch(e){console.error("Save:",e);}
}
// saveState() salva só o cliente selecionado; use este quando a ação não parte da tela do cliente.
async function saveClient(c){
  if(!c||!S.appUser||S.appUser.role==="pending")return;
  try{var d=JSON.parse(JSON.stringify(c));if(!d.ownerId)d.ownerId=S.appUser.uid;await db.collection("clients").doc(c.id).set(d);}catch(e){console.error("Save:",e);}
}
async function deleteClientFromDB(cid){try{await db.collection("clients").doc(cid).delete();}catch(e){console.error(e);}}
// Propaga o erro: quem chama precisa saber se a gravação falhou pra não dizer "Salvo".
async function saveUserProfile(uid,data){await db.collection("users").doc(uid).update(data);}
async function migrateFromLocalStorage(){
  var old=null;try{old=JSON.parse(localStorage.getItem("stays_cs_v4"))||JSON.parse(localStorage.getItem("stays_cs_v3"));}catch(e){}
  if(!old||!old.clients||!old.clients.length||S.clients.length>0)return;
  if(!confirm("Detectamos "+old.clients.length+" clientes salvos localmente. Importar para a nuvem?"))return;
  for(var i=0;i<old.clients.length;i++){var c=old.clients[i];c.ownerId=S.appUser.uid;if(!c.id)c.id=uid();c=migrateClient(c);await db.collection("clients").doc(c.id).set(JSON.parse(JSON.stringify(c)));S.clients.push(c);}
  localStorage.removeItem("stays_cs_v4");localStorage.removeItem("stays_cs_v3");render();
}
// ============================================================
// HELPERS
// ============================================================
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2);}
function e(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
function copyFeedback(btn,text){navigator.clipboard.writeText(text||"");if(!btn)return;var orig=btn.innerHTML;btn.innerHTML="✓ Copiado";btn.disabled=true;setTimeout(function(){btn.innerHTML=orig;btn.disabled=false;},1200);}
function formatDate(d){if(!d)return"—";var p=d.split("-");return p[2]+"/"+p[1]+"/"+p[0];}
function monthName(m){if(!m)return"?";return MONTHS[parseInt(m)-1]||"?";}
function setTheme(t){S.theme=t;document.documentElement.className=t==="dark"?"th-dark":(t==="night"?"th-night":"");localStorage.setItem("stays_theme",t);}
function getTimeInTZ(tz){try{return new Date().toLocaleTimeString("pt-BR",{timeZone:tz,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false});}catch(e){return"--:--:--";}}
function getFollowsSorted(c){if(!c.follows||!c.follows.length)return[];return[...c.follows].sort(function(a,b){return new Date(b.date)-new Date(a.date);});}
function getLatestFollow(c){return getFollowsSorted(c)[0]||null;}
function npsHistoryHTML(c){
  var list=getFollowsSorted(c).filter(function(f){return f.answers&&f.answers.nps_avaliou==='sim'&&f.answers.nps_score!==undefined&&f.answers.nps_score!==null;});
  if(!list.length)return'';
  var html='<div class="section-hdr"><span>Histórico de NPS</span></div><div class="card" style="padding:1rem;margin-bottom:1.5rem"><div style="display:flex;flex-direction:column;gap:8px">';
  list.forEach(function(f){
    var sc=f.answers.nps_score;
    var cls=sc<=4?'#dc2626':(sc<=6?'#f97316':(sc===7?'#eab308':'#16a34a'));
    html+='<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--bd)"><span style="font-size:12px;color:var(--t2)">'+formatDate(f.date)+(f.answers.nps_date?' <span style="color:var(--t3)">(avaliado em '+formatDate(f.answers.nps_date)+')</span>':'')+'</span><span style="font-size:15px;font-weight:700;color:'+cls+'">'+sc+'/10</span></div>';
  });
  html+='</div></div>';
  return html;
}

// ══════════════════════════════════════════════════════════
// SISTEMA DE SAÚDE V2 — baseado no follow do wizard
// Categorias e pesos: Risco 5, Financeiro 4, Distribuição 3,
// Crescimento 2, Digital 2, Engajamento 1
// ══════════════════════════════════════════════════════════
var HEALTH_WEIGHTS={risco:5,financeiro:4,distribuicao:3,crescimento:2,digital:2,engajamento:1};
// Itens de humor (carinha) por categoria — chaves batem com wizFaces
var HEALTH_HUMOR_CATS={
  crescimento:['units','occupation'],
  digital:['domain','site','photos_desc','payment'],
  distribuicao:['channels','price','chperf','usab'],
  financeiro:['nego'],
  risco:['nps','cases','notifs'],
  engajamento:['financial','operational','appcenter']
};
function getEffectiveHealthHumorCats(){
  var cats={};
  Object.keys(HEALTH_HUMOR_CATS).forEach(function(c){cats[c]=HEALTH_HUMOR_CATS[c].slice();});
  (S.customQuestions||[]).forEach(function(q){
    if(q.status==='approved'&&q.category&&cats[q.category])cats[q.category].push('custom_'+q.id);
  });
  return cats;
}
function humorTo100(h){return Math.round((h/4)*100);}
// converte estado de contato (termômetro de atividades do analista) em nota
function contactScore(c){var d=getDaysWithoutContact(c);if(d===null)return 20;if(d<=30)return 100;if(d<=60)return 60;return 20;}
// atividade registrada nos últimos 90 dias
function activityScore(c){var last=getLastActivity(c);if(!last)return 30;var d=Math.floor((Date.now()-new Date(last.date))/(1000*60*60*24));return d<=90?100:40;}
// nota do financeiro do cliente (inadimplência)
function inadScore(c){
  if(isInadimplente(c))return 0;
  var lf=getLatestFollow(c);
  if(lf&&lf.answers&&lf.answers.inadimplencia_opt==='sim')return 40;
  return 100;
}
// DIAS SEM ATIVIDADE (cliente sem logar no sistema — vem da planilha, editável)
// 0-6 saudável (100) · 7-14 atenção (55) · 15-29 ruim (30) · 30+ péssimo (0)
function getDaysInactive(c){var v=(c&&c.daysInactive!==undefined&&c.daysInactive!==null&&c.daysInactive!=='')?parseInt(c.daysInactive):null;return (v!==null&&!isNaN(v))?v:null;}
function inactivityScore(c){var d=getDaysInactive(c);if(d===null)return null;if(d<=6)return 100;if(d<=14)return 55;if(d<=29)return 30;return 0;}
function inactivityLevel(c){var d=getDaysInactive(c);if(d===null)return null;if(d<=6)return'ok';if(d<=14)return'warn';return'risk';}
// NPS 1-2 com DECAIMENTO TEMPORAL a partir da data da avaliação (Q17 nps_date)
// <3 meses: trava vermelha + Péssimo · 3-4 meses: Ruim · >4 meses: Neutro
function npsRiskInfo(f){
  if(!f||!f.answers)return{low:false,trava:false,humor:null};
  var sc=(f.answers.nps_score!==undefined&&f.answers.nps_score!==null&&f.answers.nps_score!=='')?+f.answers.nps_score:null;
  if(sc===null||sc>4)return{low:false,trava:false,humor:null};
  var dateStr=f.answers.nps_date;
  if(!dateStr)return{low:true,trava:true,humor:0}; // sem data: trata como recente
  var months=(Date.now()-new Date(dateStr))/(1000*60*60*24*30.44);
  if(months<3)return{low:true,trava:true,humor:0};      // recente: Péssimo + trava
  if(months<4)return{low:true,trava:false,humor:1};     // 3-4 meses: Ruim
  return{low:true,trava:false,humor:2};                 // >4 meses: Neutro
}
// Calcula a nota (0-100) de cada categoria + saúde geral ponderada + cor separada
function calcHealthV2(c){
  var f=getLatestFollow(c);
  var eff=(f&&f.wizard)?Object.assign({},f.humors||{}):{};
  // Ajuste do NPS por decaimento temporal (sobrescreve o humor de nps salvo)
  var npsInfo=npsRiskInfo(f);
  if(npsInfo.humor!==null)eff.nps=npsInfo.humor;
  var cats={};
  var effCats=getEffectiveHealthHumorCats();
  Object.keys(effCats).forEach(function(cat){
    var parts=[];
    effCats[cat].forEach(function(k){
      if(eff[k]!==undefined&&eff[k]!==null)parts.push(humorTo100(eff[k]));
    });
    if(cat==='financeiro')parts.push(inadScore(c));
    if(cat==='risco'){
      if(isChurnAlert(c))parts.push(0);
      var inact=inactivityScore(c);if(inact!==null)parts.push(inact);
    }
    if(cat==='engajamento'){parts.push(contactScore(c));parts.push(activityScore(c));}
    cats[cat]=parts.length?Math.round(parts.reduce(function(a,b){return a+b;},0)/parts.length):null;
  });
  var wsum=0,acc=0;
  Object.keys(HEALTH_WEIGHTS).forEach(function(cat){
    if(cats[cat]!==null){acc+=cats[cat]*HEALTH_WEIGHTS[cat];wsum+=HEALTH_WEIGHTS[cat];}
  });
  var score=wsum?Math.round(acc/wsum):100;
  // ── TRAVAS E COR ──────────────────────────────────────────────
  // Riscos VERMELHOS: churn ativo, NPS 1-2 recente (<3m), 30+ dias sem atividade
  var diasInativo=getDaysInactive(c);
  var abandono=(diasInativo!==null&&diasInativo>=30);
  var redRisk=isChurnAlert(c)||npsInfo.trava||abandono;
  var inad=isInadimplente(c);
  // Cor: inadimplência sozinha = laranja; qualquer risco vermelho (ou inad+risco) = vermelho
  var color;
  if(redRisk||(inad&&redRisk))color='risk';
  else if(inad)color='warn';
  else color=healthBand(score);
  // Se há risco vermelho, a nota também é puxada pra faixa vermelha
  if(redRisk)score=Math.min(score,30);
  else if(inad)score=Math.min(score,55); // inadimplência sozinha trava no máx. em atenção
  return {score:score,cats:cats,color:color,redRisk:redRisk,inad:inad};
}
function healthBand(s){return s>=70?'ok':(s>=40?'warn':'risk');}
// SCORE PRÓPRIO DO FOLLOW — só os humores daquele follow, sem dados ao vivo do cliente.
// Aplica a trava de NPS 1-2 com decaimento temporal (a data está no próprio follow).
function calcFollowScore(f){
  if(!f||!f.wizard)return null;
  var eff=Object.assign({},f.humors||{});
  var npsInfo=npsRiskInfo(f);
  if(npsInfo.humor!==null)eff.nps=npsInfo.humor;
  var cats={};
  var effCats=getEffectiveHealthHumorCats();
  Object.keys(effCats).forEach(function(cat){
    var parts=[];
    effCats[cat].forEach(function(k){
      if(eff[k]!==undefined&&eff[k]!==null)parts.push(humorTo100(eff[k]));
    });
    cats[cat]=parts.length?Math.round(parts.reduce(function(a,b){return a+b;},0)/parts.length):null;
  });
  var wsum=0,acc=0;
  Object.keys(HEALTH_WEIGHTS).forEach(function(cat){
    if(cats[cat]!==null){acc+=cats[cat]*HEALTH_WEIGHTS[cat];wsum+=HEALTH_WEIGHTS[cat];}
  });
  var score=wsum?Math.round(acc/wsum):null;
  if(score===null)return null;
  var color=healthBand(score);
  if(npsInfo.trava){score=Math.min(score,30);color='risk';} // NPS 1-2 recente derruba o follow
  return {score:score,color:color,cats:cats};
}
function healthColor(c){return healthBand(calcScore(c));}

function followScoreBadge(f){
  var fs=calcFollowScore(f);
  if(!fs)return '<span class="badge b-na">Sem score</span>';
  var col=fs.color==='risk'?'#dc2626':(fs.color==='warn'?'#d97706':'#16a34a');
  var bg=fs.color==='risk'?'#fde8e8':(fs.color==='warn'?'#fff3e0':'#e8f5ec');
  return '<span style="display:inline-flex;align-items:center;gap:5px;background:'+bg+';color:'+col+';border:1px solid '+col+';border-radius:14px;padding:2px 10px;font-size:12px;font-weight:700" title="Score deste follow">'+fs.score+'</span>';
}
function calcScore(c){
  var f=getLatestFollow(c);if(!f)return 100;
  var s=f.wizard?calcHealthV2(c).score:100;
  (c.contacts||[]).slice(-10).forEach(function(ct){if(ct.type==="churn")s-=25;else if(ct.impact==="positive")s+=4;else if(ct.impact==="negative")s-=8;});
  s=Math.max(0,Math.min(100,Math.round(s)));
  if(f.doingWell)s=Math.max(s,80);
  return s;
}
function hl(s){return s>=75?"ok":(s>=50?"warn":"risk");}
function fuSt(c){var f=getLatestFollow(c);if(!f||!f.date)return{label:"Sem data",cls:"fu-warn",days:null};var weeks=(c&&CATEGORIA_CADENCIA_SEMANAS[c.categoria])||10;var cadenceDays=Math.round(weeks*7);var diff=Math.floor((Date.now()-new Date(f.date))/86400000),due=cadenceDays-diff;if(due>14)return{label:due+"d",cls:"fu-ok",days:due};if(due>=0)return{label:due+"d (em breve)",cls:"fu-warn",days:due};return{label:"Vencido "+(-due)+"d",cls:"fu-overdue",days:due};}
function catSt(c,cat){var f=getLatestFollow(c);if(!f)return"na";
  var h=calcHealthV2(c);var v=h.cats[cat];if(v===null||v===undefined)return"na";return v>=70?"ok":(v>=40?"warn":"risk");}
// Resolve a temporada atual a partir de uma lista de cidades (answers.cities do wizard).
// Usa a cidade principal (ou a primeira, se nenhuma marcada); aceita tanto o formato novo
// (seasons.alta/baixa = array de {start,end}) quanto o antigo (season_high_start/end fixos, 1 período).
function resolveCitiesSeason(cities){
  if(!cities||!cities.length)return null;
  var principal=cities.find(function(c){return c.principal;})||cities[0];
  var seasons=principal.seasons;
  if(!seasons&&principal.season_high_start){
    seasons={alta:[{start:principal.season_high_start,end:principal.season_high_end}],baixa:(principal.season_low_start?[{start:principal.season_low_start,end:principal.season_low_end}]:[])};
  }
  if(!seasons)return null;
  var MM={Jan:1,Fev:2,Mar:3,Abr:4,Mai:5,Jun:6,Jul:7,Ago:8,Set:9,Out:10,Nov:11,Dez:12};
  var curM=new Date().getMonth()+1;
  function inAny(periods){
    return(periods||[]).some(function(p){var s=MM[p.start],e=MM[p.end];if(!s||!e)return false;return s<=e?(curM>=s&&curM<=e):(curM>=s||curM<=e);});
  }
  function fmt(periods){var f=(periods||[]).filter(function(p){return p.start&&p.end;}).map(function(p){return p.start+' a '+p.end;});return f.length?f.join(', '):null;}
  var inHigh=inAny(seasons.alta),inLow=inAny(seasons.baixa);
  return{current:inHigh?'high':(inLow?'low':null),highLabel:fmt(seasons.alta),lowLabel:fmt(seasons.baixa),principalName:principal.name};
}
function getCurrentSeason(c){var f=getLatestFollow(c);if(!f)return null;
  if(f.answers&&f.answers.cities&&f.answers.cities.length){
    var r=resolveCitiesSeason(f.answers.cities);
    if(r)return r;
  }
  return null;
}
function getListingCountry(c){return c.country||"";}
function getCities(c){var f=getLatestFollow(c);if(!f)return"";if(f.answers&&f.answers.cities&&f.answers.cities.length){return f.answers.cities.map(function(cy){return cy.name;}).join(", ");}return"";}
function bdg(st,lbl){var m={ok:"OK",warn:"Atencao",risk:"Risco",na:"—"};var cls=st==="ok"?"b-ok":(st==="warn"?"b-warn":(st==="risk"?"b-risk":"b-na"));return'<span class="badge '+cls+'">'+(lbl||m[st]||st)+"</span>";}
function planBdg(plan){if(!plan||!PLAN_S[plan])return'<span class="badge b-na">—</span>';var ps=PLAN_S[plan];return'<span class="badge" style="background:'+ps.bg+';color:'+ps.c+'">'+PLAN_L[plan]+"</span>";}
function bdgSt(st){return{ok:"OK",warn:"Atencao",risk:"Risco",na:"—"}[st]||st;}
function formatMRR(mrr){if(!mrr&&mrr!==0)return"—";var n=parseFloat(mrr);if(isNaN(n))return mrr;return"$ "+n.toLocaleString("pt-BR",{minimumFractionDigits:0,maximumFractionDigits:0});}
function parseBRNumber(str){if(str===undefined||str===null||str==="")return"";var s=String(str).trim().replace(/[^0-9.,\-]/g,"").replace(/\./g,"").replace(",",".");if(s==="")return"";var n=parseFloat(s);return isNaN(n)?"":n;}
function migrateClient(c){if(!c.follows)c.follows=[];if(!c.keyContacts)c.keyContacts=[];if(c.units===undefined)c.units="";if(!c.mrr)c.mrr="";if(!c.clientCountry)c.clientCountry="";if(!c.clientCity)c.clientCity="";if(!c.categoria)c.categoria="";if(CATEGORIA_MIGRATE[c.categoria])c.categoria=CATEGORIA_MIGRATE[c.categoria];if(!c.onboardingStatus)c.onboardingStatus="";if(!c.churnCase)c.churnCase=null;if(!c.churnHistory)c.churnHistory=[];if(c.daysInactive===undefined)c.daysInactive="";if(!c.inadimplencia)c.inadimplencia=[];if(c.archived===undefined)c.archived=false;if(!c.recoveryMode)c.recoveryMode=null;if(!c.activities)c.activities=[];if(!c.reminders)c.reminders=[];return c;}
function migrateClients(cs){return cs.map(migrateClient);}
// ============================================================
// RENDER
// ============================================================
function catBdg(c){if(!c||!c.categoria)return'';var m={elite:'cat-elite',gold:'cat-ht',silver:'cat-core',bronze:'cat-lt'};var cls=m[c.categoria];if(!cls)return'';return'<span class="badge '+cls+'">'+e(categoriaLabel(c))+'</span>';}
function statusBdg(st){if(!st)return'';var cls=st==='Completed'?'st-done':'st-ongoing';return'<span class="badge '+cls+'">'+e(st)+'</span>';}
function isChurnAlert(c){var hasChurnContact=(c.contacts||[]).some(function(ct){return ct.type==='churn';});var hasChurnCase=!!(c.churnCase&&c.churnCase.active);return hasChurnContact||hasChurnCase;}
function isInadimplente(c){return(c.inadimplencia||[]).some(function(m){return!m.paid;});}
function checkRecoveryExpiry(c){if(c.recoveryMode&&c.recoveryMode.active&&Date.now()>c.recoveryMode.endDate){c.recoveryMode=null;saveState();}}
function isInRecovery(c){checkRecoveryExpiry(c);return !!(c.recoveryMode&&c.recoveryMode.active);}
function recoveryDaysLeft(c){if(!isInRecovery(c))return 0;return Math.max(0,Math.ceil((c.recoveryMode.endDate-Date.now())/(1000*60*60*24)));}
function pendingSuggestion(c){var fs=(c.follows||[]).filter(function(f){return f.wizard&&f.type==='recurring';});if(!fs.length)return null;fs.sort(function(a,b){return new Date(b.date)-new Date(a.date);});var lf=fs[0];if(lf.answers&&lf.answers.prodsug_has===true)return lf.answers.prodsug_note||'Sugestão de produto pendente';return null;}
function clientAlertBadges(c){var b=pendingBadge(c);if(isChurnAlert(c))b+='<span class="badge-churn">'+svgIcon('alert',12)+' Churn</span>';if(isInRecovery(c))b+='<span class="badge-recovery">'+svgIcon('refresh',12)+' Em recuperação ('+recoveryDaysLeft(c)+'d)</span>';if(isInadimplente(c))b+='<span class="badge-inadim">'+svgIcon('invoice',12)+' Inadimplente</span>';var ps=pendingSuggestion(c);if(ps)b+='<span class="badge-suggest" title="'+e(ps)+'">'+svgIcon('lightbulb',12)+' Sugestão pendente</span>';var _dia=getDaysInactive(c);if(_dia!==null&&_dia>=7){var _dlv=inactivityLevel(c);b+='<span style="display:inline-flex;align-items:center;gap:3px;background:'+(_dlv==='risk'?'#fde8e8;color:#b91c1c;border:1px solid #f87171':'#fff3e0;color:#c2410c;border:1px solid #fb923c')+';border-radius:5px;font-size:9px;font-weight:700;padding:1px 6px;white-space:nowrap" title="Dias sem o cliente logar no sistema">'+svgIcon('moon',12)+' '+_dia+'d inativo</span>';}return b;}
function calcChurnAlerts(clients){return clients.filter(isChurnAlert).length;}
function calcInadimplentes(clients){return clients.filter(isInadimplente).length;}
var ACT_TYPES={meeting:{label:'Reunião',icon:'user_plus'},whatsapp:{label:'WhatsApp',icon:'chat'},email:{label:'E-mail',icon:'envelope'},nps:{label:'NPS',icon:'star'},support:{label:'Suporte',icon:'headphone'},onboarding:{label:'Onboarding',icon:'lightning'},other:{label:'Outro',icon:'pin'}};
function getLastActivity(c){var acts=(c.activities||[]).filter(function(a){return!a.archived;});if(!acts.length)return null;return acts.sort(function(a,b){return new Date(b.date)-new Date(a.date);})[0];}
function getDaysWithoutContact(c){var last=getLastActivity(c);if(!last)return null;var diff=Math.floor((Date.now()-new Date(last.date))/(1000*60*60*24));return diff;}
function inactivityHTML(c){var d=getDaysInactive(c);if(d===null)return'<span class="thermo" style="background:var(--surf2);color:var(--t3)">—</span>';var lv=inactivityLevel(c);var cls=lv==='ok'?'thermo-green':(lv==='warn'?'thermo-yellow':'thermo-red');return'<span class="thermo '+cls+'" title="Dias sem o cliente logar no sistema">'+d+'d</span>';}
function thermoHTML(c){var days=getDaysWithoutContact(c);if(days===null)return'<span class="thermo thermo-red" title="Sem atividade registrada">Sem contato</span>';if(days===0)return'<span class="thermo thermo-green">Hoje</span>';var cls=days<=30?'thermo-green':(days<=60?'thermo-yellow':'thermo-red');return'<span class="thermo '+cls+'">'+days+'d</span>';}
function getActiveReminders(c){return(c.reminders||[]).filter(function(r){return!r.done&&!r.archived;});}
function getOverdueReminders(c){var today=new Date().toISOString().split('T')[0];return getActiveReminders(c).filter(function(r){return r.dueDate&&r.dueDate<today;});}
function reminderDots(ci,c){var rems=getActiveReminders(c);if(!rems.length)return'';var hasRetorno=rems.some(function(r){return r.type==='retorno';});var hasProativo=rems.some(function(r){return r.type==='proativo';});var dots='<span style="display:inline-flex;gap:3px;align-items:center;cursor:pointer" data-ci="'+ci+'" data-tab="reminders" onclick="openPanel(this)" title="Ver lembretes">';if(hasRetorno)dots+='<span class="rem-dot rem-dot-retorno" title="Lembrete de retorno"></span>';if(hasProativo)dots+='<span class="rem-dot rem-dot-proativo" title="Lembrete proativo"></span>';return dots+'</span>';}
function openPanel(btn){openSlidePanel(+btn.getAttribute("data-ci"),btn.getAttribute("data-tab"));}
function openSlidePanel(ci,tab){S.slidePanel=ci;S.slidePanelTab=tab||'activities';S.slideAddOpen=false;render();}
function closeSlidePanel(){S.slidePanel=null;S.slideAddOpen=false;render();}
function toggleSlidePanelTab(tab){S.slidePanelTab=tab;S.slideAddOpen=false;render();}
function toggleSlideAdd(){S.slideAddOpen=!S.slideAddOpen;render();}

var FACES={
  pessimo:'<svg width="VAR" height="VAR" viewBox="0 0 52 52" fill="none"><circle cx="26" cy="26" r="24" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/><ellipse cx="19" cy="22" rx="2.5" ry="3" fill="#ef4444"/><ellipse cx="33" cy="22" rx="2.5" ry="3" fill="#ef4444"/><path d="M16 36 Q26 28 36 36" stroke="#ef4444" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M16 14 Q19 11 22 14" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M30 14 Q33 11 36 14" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>',
  ruim:'<svg width="VAR" height="VAR" viewBox="0 0 52 52" fill="none"><circle cx="26" cy="26" r="24" fill="#ffedd5" stroke="#f97316" stroke-width="1.5"/><ellipse cx="19" cy="22" rx="2.5" ry="3" fill="#f97316"/><ellipse cx="33" cy="22" rx="2.5" ry="3" fill="#f97316"/><path d="M17 35 Q26 29 35 35" stroke="#f97316" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M16 17 Q19 14 22 17" stroke="#f97316" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M30 17 Q33 14 36 17" stroke="#f97316" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>',
  neutro:'<svg width="VAR" height="VAR" viewBox="0 0 52 52" fill="none"><circle cx="26" cy="26" r="24" fill="#fef9c3" stroke="#eab308" stroke-width="1.5"/><ellipse cx="19" cy="22" rx="2.5" ry="3" fill="#eab308"/><ellipse cx="33" cy="22" rx="2.5" ry="3" fill="#eab308"/><path d="M18 34 H34" stroke="#eab308" stroke-width="2" stroke-linecap="round"/></svg>',
  bom:'<svg width="VAR" height="VAR" viewBox="0 0 52 52" fill="none"><circle cx="26" cy="26" r="24" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5"/><ellipse cx="19" cy="22" rx="2.5" ry="3" fill="#22c55e"/><ellipse cx="33" cy="22" rx="2.5" ry="3" fill="#22c55e"/><path d="M17 30 Q26 38 35 30" stroke="#22c55e" stroke-width="2" stroke-linecap="round" fill="none"/></svg>',
  otimo:'<svg width="VAR" height="VAR" viewBox="0 0 52 52" fill="none"><circle cx="26" cy="26" r="24" fill="#bbf7d0" stroke="#16a34a" stroke-width="1.5"/><ellipse cx="19" cy="21" rx="2.5" ry="3" fill="#16a34a"/><ellipse cx="33" cy="21" rx="2.5" ry="3" fill="#16a34a"/><path d="M15 29 Q26 42 37 29" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" fill="none"/></svg>'
};
var FKEYS=['pessimo','ruim','neutro','bom','otimo'];
var FLABELS=['Péssimo','Ruim','Neutro','Bom','Ótimo'];
var FCOLORS={pessimo:{bg:'#fee2e2',bd:'#ef4444',tx:'#7f1d1d'},ruim:{bg:'#ffedd5',bd:'#f97316',tx:'#9a3412'},neutro:{bg:'#fef9c3',bd:'#eab308',tx:'#854d0e'},bom:{bg:'#dcfce7',bd:'#22c55e',tx:'#166534'},otimo:{bg:'#bbf7d0',bd:'#16a34a',tx:'#14532d'}};
function face(key,sz){return FACES[key].replace(/VAR/g,sz||20);}

// ══════════════════════════════════════════════════
// SISTEMA DE ÍCONES (Basil Icons) — substitui emojis
// ══════════════════════════════════════════════════
var ICON_PATHS={
'alert':'<path fill-rule="evenodd" clip-rule="evenodd" d="M9.72961 3.99262C10.8216 2.39495 13.1784 2.39496 14.2703 3.99262L14.7023 4.62457C17.4083 8.58379 19.7333 12.7904 21.646 17.1881L21.7362 17.3955C22.4103 18.9453 21.3919 20.705 19.7124 20.8927C14.5867 21.4656 9.41323 21.4656 4.2876 20.8927C2.60805 20.705 1.58969 18.9453 2.26374 17.3955L2.35396 17.1881C4.26669 12.7904 6.59165 8.58378 9.29769 4.62457L9.72961 3.99262ZM13 8.99999C13 9.55227 12.5523 9.99999 12 9.99999C11.4477 9.99999 11 9.55227 11 8.99999C11 8.4477 11.4477 7.99999 12 7.99999C12.5523 7.99999 13 8.4477 13 8.99999ZM12 11.75C12.4142 11.75 12.75 12.0858 12.75 12.5V17.5C12.75 17.9142 12.4142 18.25 12 18.25C11.5858 18.25 11.25 17.9142 11.25 17.5V12.5C11.25 12.0858 11.5858 11.75 12 11.75Z"/>',
'invoice':'<path fill-rule="evenodd" clip-rule="evenodd" d="M19 21.5H6C4.067 21.5 2.5 19.933 2.5 18V4.94321C2.5 3.87566 3.55584 3.19886 4.4849 3.52142C4.61762 3.56749 4.74776 3.63397 4.87186 3.72261L5.0469 3.84765C5.91493 4.46766 7.08891 4.46492 7.95938 3.84316C9.17632 2.97391 10.8237 2.97391 12.0406 3.84316C12.9111 4.46492 14.0851 4.46766 14.9531 3.84765L15.1281 3.72261C16.1209 3.01347 17.5 3.72315 17.5 4.94321V12.5H21C21.4142 12.5 21.75 12.8358 21.75 13.25V18.75C21.75 20.2688 20.5188 21.5 19 21.5ZM17.75 14V18.75C17.75 19.4404 18.3096 20 19 20C19.6904 20 20.25 19.4404 20.25 18.75V14H17.75ZM13.5 9.75002C13.5 9.3358 13.1642 9.00002 12.75 9.00002H6.75C6.33579 9.00002 6 9.3358 6 9.75002C6 10.1642 6.33579 10.5 6.75 10.5H12.75C13.1642 10.5 13.5 10.1642 13.5 9.75002ZM12.5 12.75C12.5 12.3358 12.1642 12 11.75 12H6.75C6.33579 12 6 12.3358 6 12.75C6 13.1642 6.33579 13.5 6.75 13.5H11.75C12.1642 13.5 12.5 13.1642 12.5 12.75ZM12.75 15C13.1642 15 13.5 15.3358 13.5 15.75C13.5 16.1642 13.1642 16.5 12.75 16.5H6.75C6.33579 16.5 6 16.1642 6 15.75C6 15.3358 6.33579 15 6.75 15H12.75Z"/>',
'refresh':'<path d="M6.54544 8.16273C6.33022 8.10595 6.15134 7.95651 6.05718 7.75482C5.96302 7.55313 5.96331 7.32004 6.05797 7.11859L7.71872 3.5842C7.84248 3.32081 8.10743 3.15279 8.39845 3.15315C8.68946 3.15351 8.95399 3.32219 9.0771 3.58588L9.80973 5.15511C9.83592 5.14482 9.86297 5.13589 9.8908 5.12843C14.2381 3.96357 18.7067 6.54347 19.8715 10.8908C21.0364 15.2382 18.4565 19.7067 14.1092 20.8716C9.76181 22.0364 5.29328 19.4565 4.12841 15.1092C3.75798 13.7267 3.76632 12.3299 4.09075 11.0311C4.19114 10.6293 4.5983 10.3849 5.00016 10.4853C5.40203 10.5856 5.64642 10.9928 5.54603 11.3947C5.28174 12.4527 5.27445 13.5907 5.5773 14.721C6.52775 18.2681 10.1738 20.3731 13.7209 19.4227C17.2681 18.4722 19.3731 14.8262 18.4227 11.2791C17.4877 7.7899 13.9447 5.69609 10.4531 6.53314L11.1923 8.11644C11.3154 8.38013 11.2748 8.69124 11.0883 8.91457C10.9017 9.1379 10.6028 9.23314 10.3214 9.15891L6.54544 8.16273Z"/>',
'lightbulb':'<path d="M4.5 9.76594C4.5 5.73718 7.87403 2.5 12 2.5C16.126 2.5 19.5 5.73718 19.5 9.76594C19.5 12.1199 18.5269 14.2437 16.7051 15.5831C16.5794 15.6756 16.5033 15.7902 16.4767 15.9028C16.423 16.1308 16.3641 16.3918 16.3035 16.6718C16.2735 16.8103 16.1512 16.9095 16.0095 16.9095H7.99054C7.8488 16.9095 7.72649 16.8103 7.6965 16.6718C7.63588 16.3918 7.57696 16.1308 7.52325 15.9028C7.49675 15.7902 7.42064 15.6756 7.2949 15.5831C5.47313 14.2437 4.5 12.1199 4.5 9.76594Z"/><path d="M8.40053 18.4095C8.21367 18.4095 8.07242 18.5786 8.10352 18.7629C8.19745 19.3194 8.26604 19.8165 8.28682 20.1599C8.34981 21.2011 9.11672 22.0588 10.1422 22.2803L10.3382 22.3227C11.4326 22.5591 12.5674 22.5591 13.6618 22.3227L13.8578 22.2803C14.8833 22.0588 15.6502 21.2011 15.7132 20.1599C15.734 19.8165 15.8026 19.3194 15.8965 18.7629C15.9276 18.5786 15.7863 18.4095 15.5995 18.4095H8.40053Z"/>',
'moon':'<path d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.4176 20.5 20.0476 17.1303 20.4608 12.8207C20.4801 12.6202 20.377 12.4277 20.1995 12.3324C20.0219 12.2372 19.8045 12.2578 19.6481 12.3848C18.7884 13.0824 17.6937 13.5 16.5 13.5C13.7386 13.5 11.5 11.2614 11.5 8.5C11.5 6.8599 12.2892 5.40423 13.5106 4.49167C13.6721 4.37101 13.7453 4.16516 13.6963 3.96961C13.6473 3.77406 13.4857 3.62706 13.2864 3.59678C12.8666 3.53302 12.437 3.5 12 3.5Z"/>',
'document':'<path d="M15.75 13C15.75 12.5858 15.4142 12.25 15 12.25H9C8.58579 12.25 8.25 12.5858 8.25 13C8.25 13.4142 8.58579 13.75 9 13.75H15C15.4142 13.75 15.75 13.4142 15.75 13Z"/><path d="M15.75 17C15.75 16.5858 15.4142 16.25 15 16.25H9C8.58579 16.25 8.25 16.5858 8.25 17C8.25 17.4142 8.58579 17.75 9 17.75H15C15.4142 17.75 15.75 17.4142 15.75 17Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 2.25C5.48122 2.25 4.25 3.48122 4.25 5V19C4.25 20.5188 5.48122 21.75 7 21.75H17C18.5188 21.75 19.75 20.5188 19.75 19V7.96766C19.75 7.58689 19.6258 7.21651 19.3963 6.9127L16.3985 2.94504C16.0677 2.5073 15.5509 2.25 15.0022 2.25H7ZM5.75 5C5.75 4.30964 6.30964 3.75 7 3.75H14.25V8.14705C14.25 8.56126 14.5858 8.89705 15 8.89705H18.25V19C18.25 19.6904 17.6904 20.25 17 20.25H7C6.30964 20.25 5.75 19.6904 5.75 19V5Z"/>',
'chat':'<path d="M8 9.49998C7.30964 9.49998 6.75 10.0596 6.75 10.75C6.75 11.4403 7.30964 12 8 12C8.69036 12 9.25 11.4403 9.25 10.75C9.25 10.0596 8.69036 9.49998 8 9.49998Z"/><path d="M12 9.49998C11.3096 9.49998 10.75 10.0596 10.75 10.75C10.75 11.4403 11.3096 12 12 12C12.6904 12 13.25 11.4403 13.25 10.75C13.25 10.0596 12.6904 9.49998 12 9.49998Z"/><path d="M14.75 10.75C14.75 10.0596 15.3096 9.49998 16 9.49998C16.6904 9.49998 17.25 10.0596 17.25 10.75C17.25 11.4403 16.6904 12 16 12C15.3096 12 14.75 11.4403 14.75 10.75Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M16.1007 4.59277C13.4065 4.36301 10.6983 4.34967 8.00194 4.5529L7.80871 4.56746C5.23741 4.76126 3.25 6.90409 3.25 9.48269V18C3.25 18.2639 3.38867 18.5083 3.61515 18.6437C3.84163 18.7791 4.12261 18.7855 4.35504 18.6606L8.26583 16.5589C8.44774 16.4611 8.65104 16.41 8.85756 16.41H17.834C18.9661 16.41 19.9362 15.6006 20.1392 14.4868C20.5505 12.2296 20.5829 9.91963 20.2353 7.65173L20.1329 6.9834C19.9464 5.76665 18.951 4.83584 17.7245 4.73124L16.1007 4.59277ZM8.11468 6.04865C10.731 5.85146 13.359 5.8644 15.9733 6.08734L17.597 6.22581C18.1334 6.27155 18.5686 6.67859 18.6502 7.21067L18.7526 7.879C19.075 9.98228 19.0449 12.1246 18.6635 14.218C18.5904 14.6187 18.2413 14.91 17.834 14.91H8.85756C8.40322 14.91 7.95596 15.0225 7.55575 15.2376L4.75 16.7455V9.48269C4.75 7.68878 6.13262 6.19804 7.92144 6.06322L8.11468 6.04865Z"/>',
'trash':'<path d="M10 2.25C9.58579 2.25 9.25 2.58579 9.25 3V3.75H5C4.58579 3.75 4.25 4.08579 4.25 4.5C4.25 4.91421 4.58579 5.25 5 5.25H19C19.4142 5.25 19.75 4.91421 19.75 4.5C19.75 4.08579 19.4142 3.75 19 3.75H14.75V3C14.75 2.58579 14.4142 2.25 14 2.25H10Z"/><path d="M10 10.65C10.4142 10.65 10.75 10.9858 10.75 11.4L10.75 18.4C10.75 18.8142 10.4142 19.15 10 19.15C9.58579 19.15 9.25 18.8142 9.25 18.4L9.25 11.4C9.25 10.9858 9.58579 10.65 10 10.65Z"/><path d="M14.75 11.4C14.75 10.9858 14.4142 10.65 14 10.65C13.5858 10.65 13.25 10.9858 13.25 11.4V18.4C13.25 18.8142 13.5858 19.15 14 19.15C14.4142 19.15 14.75 18.8142 14.75 18.4V11.4Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.99142 7.91718C6.03363 7.53735 6.35468 7.25 6.73684 7.25H17.2632C17.6453 7.25 17.9664 7.53735 18.0086 7.91718L18.2087 9.71852C18.5715 12.9838 18.5715 16.2793 18.2087 19.5446L18.189 19.722C18.045 21.0181 17.0404 22.0517 15.7489 22.2325C13.2618 22.5807 10.7382 22.5807 8.25108 22.2325C6.95954 22.0517 5.955 21.0181 5.81098 19.722L5.79128 19.5446C5.42846 16.2793 5.42846 12.9838 5.79128 9.71852L5.99142 7.91718ZM7.40812 8.75L7.2821 9.88417C6.93152 13.0394 6.93152 16.2238 7.2821 19.379L7.3018 19.5563C7.37011 20.171 7.84652 20.6612 8.45905 20.747C10.8082 21.0758 13.1918 21.0758 15.5409 20.747C16.1535 20.6612 16.6299 20.171 16.6982 19.5563L16.7179 19.379C17.0685 16.2238 17.0685 13.0394 16.7179 9.88417L16.5919 8.75H7.40812Z"/>',
'history':'<path d="M6.86461 6.88236C8.17813 5.56432 9.99326 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12C4.75 11.5858 4.41421 11.25 4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 16.8325 7.16751 20.75 12 20.75C16.8325 20.75 20.75 16.8325 20.75 12C20.75 7.16751 16.8325 3.25 12 3.25C9.57851 3.25 7.38558 4.23462 5.80213 5.82352C5.77668 5.84906 5.75345 5.87597 5.73245 5.90401L4.47488 4.64645C4.33769 4.50926 4.13353 4.46382 3.95111 4.52986C3.76869 4.59591 3.64094 4.76152 3.62338 4.95473L3.26982 8.84382C3.25639 8.9916 3.30929 9.13771 3.41422 9.24264C3.51914 9.34757 3.66526 9.40047 3.81304 9.38703L7.70213 9.03348C7.89534 9.01591 8.06095 8.88817 8.12699 8.70575C8.19304 8.52332 8.1476 8.31916 8.01041 8.18198L6.7823 6.95386C6.81101 6.93235 6.83854 6.90852 6.86461 6.88236Z"/><path d="M12.75 7C12.75 6.58579 12.4142 6.25 12 6.25C11.5858 6.25 11.25 6.58579 11.25 7V12C11.25 12.2586 11.3832 12.4989 11.6025 12.636L14.6025 14.511C14.9538 14.7305 15.4165 14.6238 15.636 14.2725C15.8555 13.9212 15.7488 13.4585 15.3975 13.239L12.75 11.5843V7Z"/>',
'save':'<path d="M7.25 7.59998C7.25 8.56647 8.0335 9.34998 9 9.34998H15C15.9665 9.34998 16.75 8.56647 16.75 7.59998V4.27627C16.75 4.12369 16.8737 4 17.0263 4C17.1722 4 17.3108 4.06373 17.4058 4.17448L20.3685 7.62867C20.7791 8.1074 20.9936 8.72364 20.9689 9.35387L20.6273 18.0976C20.5749 19.4393 19.4719 20.5 18.1292 20.5H17.75C17.4739 20.5 17.25 20.2761 17.25 20V15C17.25 14.0335 16.4665 13.25 15.5 13.25H8.5C7.5335 13.25 6.75 14.0335 6.75 15V20C6.75 20.2761 6.52614 20.5 6.25 20.5H6.11291C4.90908 20.5 3.89276 19.6055 3.73989 18.4114C3.24597 14.5534 3.2247 10.6495 3.67653 6.78632L3.73742 6.26575C3.8885 4.97395 4.983 4 6.28361 4H6.75C7.02614 4 7.25 4.22386 7.25 4.5V7.59998Z"/><path d="M8.25 20C8.25 20.2761 8.47386 20.5 8.75 20.5H15.25C15.5261 20.5 15.75 20.2761 15.75 20V15C15.75 14.8619 15.6381 14.75 15.5 14.75H8.5C8.36193 14.75 8.25 14.8619 8.25 15V20Z"/><path d="M15.25 4.5C15.25 4.22386 15.0261 4 14.75 4H9.25C8.97386 4 8.75 4.22386 8.75 4.5V7.59998C8.75 7.73805 8.86193 7.84998 9 7.84998H15C15.1381 7.84998 15.25 7.73805 15.25 7.59998V4.5Z"/>',
'edit':'<path fill-rule="evenodd" clip-rule="evenodd" d="M15.1369 3.46967C14.9963 3.32902 14.8055 3.25 14.6066 3.25C14.4077 3.25 14.2169 3.32902 14.0763 3.46967L4.88388 12.6621C4.78965 12.7563 4.72223 12.8739 4.68856 13.0028L3.68856 16.8313C3.62127 17.0889 3.69561 17.3629 3.88388 17.5511C4.07215 17.7394 4.34614 17.8138 4.60375 17.7465L8.43218 16.7465C8.56111 16.7128 8.67874 16.6454 8.77297 16.5511L17.9654 7.35876C18.2582 7.06586 18.2582 6.59099 17.9654 6.2981L15.1369 3.46967ZM6.08843 13.5788L14.6066 5.06066L16.3744 6.82843L7.8562 15.3466L5.46344 15.9716L6.08843 13.5788Z"/><path d="M4 19.25C3.58579 19.25 3.25 19.5858 3.25 20C3.25 20.4142 3.58579 20.75 4 20.75H19C19.4142 20.75 19.75 20.4142 19.75 20C19.75 19.5858 19.4142 19.25 19 19.25H4Z"/>',
'chart':'<path d="M11.25 2.7454C11.25 2.6288 11.1501 2.53678 11.0341 2.5485C6.24107 3.03249 2.5 7.07936 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5C14.6367 21.5 17.0227 20.4254 18.7434 18.6915C18.8256 18.6087 18.8165 18.4734 18.7258 18.4L11.5286 12.5833C11.3524 12.4409 11.25 12.2265 11.25 12V2.7454Z"/><path d="M19.6695 17.2341C19.7601 17.3074 19.8942 17.2879 19.958 17.1903C20.7671 15.9522 21.2952 14.5134 21.4515 12.9654C21.4632 12.8494 21.3712 12.75 21.2546 12.75H14.6868C14.4983 12.75 14.4145 12.987 14.5611 13.1055L19.6695 17.2341Z"/><path d="M21.2546 11.25C21.3712 11.25 21.4632 11.1502 21.4515 11.0342C20.9996 6.55868 17.4413 3.00039 12.9658 2.54849C12.8498 2.53678 12.75 2.6288 12.75 2.7454V10.95C12.75 11.1157 12.8843 11.25 13.05 11.25H21.2546Z"/>',
'units':'<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5578 5.53423C12.6873 4.69887 11.3127 4.69887 10.4422 5.53423L5.81574 9.97357C5.70239 10.0823 5.62614 10.224 5.5978 10.3785C5.04367 13.4004 5.00277 16.494 5.47681 19.5295L5.58933 20.25H8.56579V14.0387C8.56579 13.6244 8.90158 13.2887 9.31579 13.2887H14.6842C15.0984 13.2887 15.4342 13.6244 15.4342 14.0387V20.25H18.4107L18.5232 19.5295C18.9972 16.494 18.9563 13.4004 18.4022 10.3785C18.3739 10.224 18.2976 10.0823 18.1843 9.97357L13.5578 5.53423ZM9.40363 4.45191C10.8546 3.05965 13.1454 3.05965 14.5964 4.45191L19.2228 8.89125C19.5634 9.21804 19.7925 9.64373 19.8776 10.108C20.4621 13.2956 20.5053 16.559 20.0052 19.7609L19.8245 20.9184C19.7497 21.3971 19.3374 21.75 18.8529 21.75H14.6842C14.27 21.75 13.9342 21.4142 13.9342 21V14.7887H10.0658V21C10.0658 21.4142 9.73 21.75 9.31579 21.75H5.14706C4.66258 21.75 4.25029 21.3971 4.17554 20.9184L3.99478 19.7609C3.49473 16.559 3.53788 13.2956 4.12241 10.108C4.20754 9.64373 4.43662 9.21804 4.77719 8.89125L9.40363 4.45191Z" fill="currentColor"/>',
'cities':'<path fill-rule="evenodd" clip-rule="evenodd" d="M7.24999 10C7.24999 7.37665 9.37664 5.25 12 5.25C14.6233 5.25 16.75 7.37665 16.75 10C16.75 12.6234 14.6233 14.75 12 14.75C9.37664 14.75 7.24999 12.6234 7.24999 10ZM12 6.75C10.2051 6.75 8.74999 8.20507 8.74999 10C8.74999 11.7949 10.2051 13.25 12 13.25C13.7949 13.25 15.25 11.7949 15.25 10C15.25 8.20507 13.7949 6.75 12 6.75Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.52436 8.85685C3.87869 4.55824 7.47084 1.25 11.784 1.25H12.216C16.5292 1.25 20.1213 4.55824 20.4756 8.85685C20.666 11.166 19.9527 13.4589 18.486 15.2526L13.693 21.1144C12.818 22.1845 11.182 22.1845 10.307 21.1144L5.51396 15.2526C4.0473 13.4589 3.33402 11.166 3.52436 8.85685ZM11.784 2.75C8.25149 2.75 5.30948 5.45948 5.01929 8.98008C4.86087 10.9019 5.45452 12.8102 6.67518 14.3031L11.4682 20.1649C11.7431 20.501 12.2569 20.501 12.5318 20.1649L17.3248 14.3031C18.5455 12.8102 19.1391 10.9019 18.9807 8.98008C18.6905 5.45948 15.7485 2.75 12.216 2.75H11.784Z" fill="currentColor"/>',
'pricing':'<path d="M15.5 12C15.5 11.1716 16.1716 10.5 17 10.5C17.8284 10.5 18.5 11.1716 18.5 12C18.5 12.8284 17.8284 13.5 17 13.5C16.1716 13.5 15.5 12.8284 15.5 12Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.4413 6.67402C19.7836 5.12836 18.3302 4.01723 16.6007 3.83523L15.9488 3.76664C12.6565 3.42018 9.33575 3.44303 6.04851 3.83475L5.61657 3.88622C3.94777 4.08508 2.62552 5.38889 2.40324 7.05473C1.96528 10.337 1.96528 13.663 2.40324 16.9453C2.62552 18.6111 3.94777 19.9149 5.61657 20.1138L6.04851 20.1653C9.33575 20.557 12.6565 20.5798 15.9488 20.2334L16.6007 20.1648C18.3302 19.9828 19.7836 18.8717 20.4413 17.326C21.4806 17.0166 22.2738 16.1156 22.404 15.0024C22.6373 13.0076 22.6373 10.9924 22.404 8.99764C22.2738 7.88442 21.4806 6.98344 20.4413 6.67402ZM15.7918 5.2584C12.6107 4.92365 9.40218 4.94573 6.226 5.32421L5.79406 5.37568C4.80524 5.49351 4.02177 6.26606 3.89007 7.25312C3.46967 10.4038 3.46967 13.5963 3.89007 16.7469C4.02177 17.734 4.80525 18.5065 5.79406 18.6243L6.226 18.6758C9.40218 19.0543 12.6107 19.0764 15.7918 18.7416L16.4437 18.673C17.2942 18.5835 18.0468 18.1643 18.5683 17.542C17.0602 17.6299 15.532 17.5906 14.0417 17.4241C12.7724 17.2822 11.7458 16.2826 11.5961 15.0024C11.3628 13.0076 11.3628 10.9924 11.5961 8.99764C11.7458 7.71738 12.7724 6.71784 14.0417 6.57597C15.532 6.40942 17.0602 6.37012 18.5683 6.45806C18.0468 5.83574 17.2942 5.4165 16.4437 5.327L15.7918 5.2584ZM19.2774 8.01471C19.278 8.01855 19.2786 8.02239 19.2792 8.02623L19.2852 8.06511L19.4839 8.03426C19.5867 8.04444 19.6893 8.05524 19.7917 8.06669C20.3791 8.13234 20.8468 8.59648 20.9141 9.17189C21.1339 11.0509 21.1339 12.9491 20.9141 14.8281C20.8468 15.4035 20.3791 15.8677 19.7917 15.9333C19.6893 15.9448 19.5866 15.9556 19.4839 15.9658L19.2852 15.9349L19.2792 15.9738C19.2786 15.9776 19.278 15.9815 19.2774 15.9853C17.5987 16.1372 15.8772 16.1199 14.2084 15.9333C13.621 15.8677 13.1532 15.4035 13.0859 14.8281C12.8661 12.9491 12.8661 11.0509 13.0859 9.17189C13.1532 8.59648 13.621 8.13234 14.2084 8.06669C15.8772 7.88017 17.5987 7.86285 19.2774 8.01471Z" fill="currentColor"/>',
'channels':'<path d="M18.955 2.04505C19.2478 2.33794 19.2478 2.81282 18.955 3.10571L18.4045 3.65616C21.6935 7.48724 21.5235 13.2651 17.8943 16.8943C16.1813 18.6073 13.9897 19.5496 11.75 19.7213V21.25H13.5C13.9142 21.25 14.25 21.5858 14.25 22C14.25 22.4142 13.9142 22.75 13.5 22.75H8.5C8.08579 22.75 7.75 22.4142 7.75 22C7.75 21.5858 8.08579 21.25 8.5 21.25H10.25V19.7213C8.24373 19.5674 6.27594 18.7951 4.65616 17.4045L4.10571 17.955C3.81282 18.2478 3.33794 18.2478 3.04505 17.955C2.75216 17.6621 2.75216 17.1872 3.04505 16.8943L3.75216 16.1872C4.24759 15.6917 5.01746 15.7171 5.49977 16.1493C7.06174 17.5491 9.02922 18.2493 10.997 18.25L11 18.25L11.0032 18.25C13.1135 18.2491 15.2236 17.4437 16.8336 15.8336C19.9465 12.7207 20.0518 7.73853 17.1493 4.49977C16.7171 4.01746 16.6917 3.24759 17.1872 2.75216L17.8943 2.04505C18.1872 1.75216 18.6621 1.75216 18.955 2.04505Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.25 10C4.25 6.27208 7.27208 3.25 11 3.25C14.7279 3.25 17.75 6.27208 17.75 10C17.75 13.7279 14.7279 16.75 11 16.75C7.27208 16.75 4.25 13.7279 4.25 10ZM11 4.75C8.1005 4.75 5.75 7.1005 5.75 10C5.75 10.3348 5.78135 10.6623 5.84126 10.9798C6.25258 10.5312 6.84345 10.25 7.5 10.25C8.74264 10.25 9.75 11.2574 9.75 12.5C9.75 13.4223 9.19501 14.2151 8.40076 14.5624C9.16712 15 10.0544 15.25 11 15.25C13.5434 15.25 15.6643 13.4414 16.147 11.0402C15.4784 12.0694 14.3187 12.75 13 12.75C10.9289 12.75 9.25 11.0711 9.25 9C9.25 6.92893 10.9289 5.25 13 5.25C13.0865 5.25 13.1723 5.25293 13.2573 5.25869C12.5735 4.93256 11.8081 4.75 11 4.75ZM10.75 9C10.75 7.75736 11.7574 6.75 13 6.75C14.2426 6.75 15.25 7.75736 15.25 9C15.25 10.2426 14.2426 11.25 13 11.25C11.7574 11.25 10.75 10.2426 10.75 9ZM7.5 11.75C7.08579 11.75 6.75 12.0858 6.75 12.5C6.75 12.9142 7.08579 13.25 7.5 13.25C7.91421 13.25 8.25 12.9142 8.25 12.5C8.25 12.0858 7.91421 11.75 7.5 11.75Z" fill="currentColor"/>',
'notifs':'<path fill-rule="evenodd" clip-rule="evenodd" d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V3.75H10.4426C8.21751 3.75 6.37591 5.48001 6.23702 7.70074L6.01601 11.2342C5.93175 12.5814 5.47946 13.8797 4.7084 14.9876C4.01172 15.9886 4.63194 17.3712 5.84287 17.5165L9.25 17.9254V19C9.25 20.5188 10.4812 21.75 12 21.75C13.5188 21.75 14.75 20.5188 14.75 19V17.9254L18.1571 17.5165C19.3681 17.3712 19.9883 15.9886 19.2916 14.9876C18.5205 13.8797 18.0682 12.5814 17.984 11.2342L17.763 7.70074C17.6241 5.48001 15.7825 3.75 13.5574 3.75H13V3ZM10.4426 5.25C9.00958 5.25 7.82354 6.36417 7.73409 7.79438L7.51309 11.3278C7.41169 12.949 6.86744 14.5112 5.93959 15.8444C5.88924 15.9168 5.93406 16.0167 6.02159 16.0272L9.75925 16.4757C11.2477 16.6543 12.7523 16.6543 14.2407 16.4757L17.9784 16.0272C18.0659 16.0167 18.1108 15.9168 18.0604 15.8444C17.1326 14.5112 16.5883 12.949 16.4869 11.3278L16.2659 7.79438C16.1764 6.36417 14.9904 5.25 13.5574 5.25H10.4426ZM12 20.25C11.3096 20.25 10.75 19.6904 10.75 19V18.25H13.25V19C13.25 19.6904 12.6904 20.25 12 20.25Z" fill="currentColor"/>',
'ch_perf':'<path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 5.78835C7.59833 6.16364 4.75 9.2492 4.75 13C4.75 17.0041 7.99594 20.25 12 20.25C15.7508 20.25 18.8364 17.4017 19.2117 13.75H12C11.5858 13.75 11.25 13.4142 11.25 13V5.78835ZM3.25 13C3.25 8.16753 7.16751 4.25002 12 4.25002C12.4142 4.25002 12.75 4.58581 12.75 5.00002V12.25H20C20.4142 12.25 20.75 12.5858 20.75 13C20.75 17.8325 16.8325 21.75 12 21.75C7.16751 21.75 3.25 17.8325 3.25 13Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 4.67367V9.50002H20.3264C19.7633 7.11562 17.8844 5.2367 15.5 4.67367ZM14.998 3.06167C18.6183 3.5122 21.4878 6.38169 21.9384 10.002C22.0066 10.5501 21.5523 11 21 11H14.5C14.2239 11 14 10.7762 14 10.5V4.00002C14 3.44774 14.45 2.99347 14.998 3.06167Z" fill="currentColor"/>',
'ch_usab':'<path fill-rule="evenodd" clip-rule="evenodd" d="M8.92916 4.47028C7.65795 4.3282 6.34204 4.3282 5.07082 4.47028C4.76193 4.5048 4.51833 4.74939 4.48359 5.04645C4.33178 6.34439 4.33178 7.6556 4.48359 8.95355C4.51833 9.2506 4.76193 9.49519 5.07082 9.52972C6.34204 9.67179 7.65795 9.67179 8.92916 9.52972C9.23805 9.49519 9.48165 9.2506 9.5164 8.95355C9.6682 7.6556 9.6682 6.34439 9.5164 5.04645C9.48165 4.74939 9.23805 4.5048 8.92916 4.47028ZM4.90421 2.97956C6.28616 2.82511 7.71383 2.82511 9.09577 2.97956C10.0866 3.0903 10.8891 3.87029 11.0062 4.8722C11.1716 6.28591 11.1716 7.71408 11.0062 9.1278C10.8891 10.1297 10.0866 10.9097 9.09577 11.0204C7.71383 11.1749 6.28616 11.1749 4.90421 11.0204C3.91337 10.9097 3.11093 10.1297 2.99375 9.1278C2.8284 7.71408 2.8284 6.28591 2.99375 4.8722C3.11093 3.87029 3.91337 3.0903 4.90421 2.97956Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.92916 14.4703C7.65795 14.3282 6.34204 14.3282 5.07082 14.4703C4.76193 14.5048 4.51833 14.7494 4.48359 15.0465C4.33178 16.3444 4.33178 17.6556 4.48359 18.9535C4.51833 19.2506 4.76193 19.4952 5.07082 19.5297C6.34204 19.6718 7.65795 19.6718 8.92916 19.5297C9.23805 19.4952 9.48165 19.2506 9.5164 18.9535C9.6682 17.6556 9.6682 16.3444 9.5164 15.0465C9.48165 14.7494 9.23805 14.5048 8.92916 14.4703ZM4.90421 12.9796C6.28616 12.8251 7.71383 12.8251 9.09577 12.9796C10.0866 13.0903 10.8891 13.8703 11.0062 14.8722C11.1716 16.2859 11.1716 17.7141 11.0062 19.1278C10.8891 20.1297 10.0866 20.9097 9.09577 21.0204C7.71383 21.1749 6.28616 21.1749 4.90421 21.0204C3.91337 20.9097 3.11093 20.1297 2.99375 19.1278C2.8284 17.7141 2.8284 16.2859 2.99375 14.8722C3.11093 13.8703 3.91337 13.0903 4.90421 12.9796Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9292 4.47028C17.6579 4.3282 16.342 4.3282 15.0708 4.47028C14.7619 4.5048 14.5183 4.74939 14.4836 5.04645C14.3318 6.34439 14.3318 7.6556 14.4836 8.95355C14.5183 9.2506 14.7619 9.49519 15.0708 9.52972C16.342 9.67179 17.6579 9.67179 18.9292 9.52972C19.2381 9.49519 19.4817 9.2506 19.5164 8.95355C19.6682 7.6556 19.6682 6.34439 19.5164 5.04645C19.4817 4.74939 19.2381 4.5048 18.9292 4.47028ZM14.9042 2.97956C16.2862 2.82511 17.7138 2.82511 19.0958 2.97956C20.0866 3.0903 20.8891 3.87029 21.0062 4.8722C21.1716 6.28591 21.1716 7.71408 21.0062 9.1278C20.8891 10.1297 20.0866 10.9097 19.0958 11.0204C17.7138 11.1749 16.2862 11.1749 14.9042 11.0204C13.9134 10.9097 13.1109 10.1297 12.9937 9.1278C12.8284 7.71408 12.8284 6.28591 12.9937 4.8722C13.1109 3.87029 13.9134 3.0903 14.9042 2.97956Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9292 14.4703C17.6579 14.3282 16.342 14.3282 15.0708 14.4703C14.7619 14.5048 14.5183 14.7494 14.4836 15.0465C14.3318 16.3444 14.3318 17.6556 14.4836 18.9535C14.5183 19.2506 14.7619 19.4952 15.0708 19.5297C16.342 19.6718 17.6579 19.6718 18.9292 19.5297C19.2381 19.4952 19.4817 19.2506 19.5164 18.9535C19.6682 17.6556 19.6682 16.3444 19.5164 15.0465C19.4817 14.7494 19.2381 14.5048 18.9292 14.4703ZM14.9042 12.9796C16.2862 12.8251 17.7138 12.8251 19.0958 12.9796C20.0866 13.0903 20.8891 13.8703 21.0062 14.8722C21.1716 16.2859 21.1716 17.7141 21.0062 19.1278C20.8891 20.1297 20.0866 20.9097 19.0958 21.0204C17.7138 21.1749 16.2862 21.1749 14.9042 21.0204C13.9134 20.9097 13.1109 20.1297 12.9937 19.1278C12.8284 17.7141 12.8284 16.2859 12.9937 14.8722C13.1109 13.8703 13.9134 13.0903 14.9042 12.9796Z" fill="currentColor"/>',
'domain':'<path d="M7.53033 6.53033C7.82322 6.23744 7.82322 5.76256 7.53033 5.46967C7.23744 5.17678 6.76256 5.17678 6.46967 5.46967L4.46967 7.46967C4.17678 7.76256 4.17678 8.23744 4.46967 8.53033L6.46967 10.5303C6.76256 10.8232 7.23744 10.8232 7.53033 10.5303C7.82322 10.2374 7.82322 9.76256 7.53033 9.46967L6.81066 8.75H17C17.4142 8.75 17.75 8.41421 17.75 8C17.75 7.58579 17.4142 7.25 17 7.25H6.81066L7.53033 6.53033Z" fill="currentColor"/> <path d="M16.4697 13.4697C16.1768 13.7626 16.1768 14.2374 16.4697 14.5303L17.1893 15.25H7C6.58579 15.25 6.25 15.5858 6.25 16C6.25 16.4142 6.58579 16.75 7 16.75H17.1893L16.4697 17.4697C16.1768 17.7626 16.1768 18.2374 16.4697 18.5303C16.7626 18.8232 17.2374 18.8232 17.5303 18.5303L19.5303 16.5303C19.8232 16.2374 19.8232 15.7626 19.5303 15.4697L17.5303 13.4697C17.2374 13.1768 16.7626 13.1768 16.4697 13.4697Z" fill="currentColor"/>',
'site':'<path d="M8.89007 15.4027C8.34187 15.4698 7.95182 15.9685 8.01886 16.5167C8.0859 17.0649 8.58466 17.455 9.13286 17.3879C9.68106 17.3209 10.0711 16.8221 10.0041 16.2739C9.93703 15.7257 9.43827 15.3357 8.89007 15.4027Z" fill="currentColor"/> <path d="M5.5481 12.7891C5.48105 12.2409 5.87111 11.7421 6.41931 11.6751C6.96751 11.608 7.46626 11.9981 7.53331 12.5463C7.60035 13.0945 7.21029 13.5932 6.66209 13.6603C6.11389 13.7273 5.61514 13.3373 5.5481 12.7891Z" fill="currentColor"/> <path d="M7.91894 7.46188C7.37074 7.52892 6.98069 8.02768 7.04773 8.57588C7.11477 9.12408 7.61352 9.51413 8.16173 9.44709C8.70993 9.38005 9.09998 8.8813 9.03294 8.33309C8.9659 7.78489 8.46714 7.39484 7.91894 7.46188Z" fill="currentColor"/> <path d="M15.6973 9.28111C15.6303 8.73291 16.0203 8.23415 16.5685 8.16711C17.1167 8.10007 17.6155 8.49013 17.6825 9.03833C17.7495 9.58653 17.3595 10.0853 16.8113 10.1523C16.2631 10.2194 15.7643 9.82931 15.6973 9.28111Z" fill="currentColor"/> <path d="M11.9926 10.8786C11.4444 10.9457 11.0544 11.4444 11.1214 11.9926C11.1884 12.5408 11.6872 12.9309 12.2354 12.8638C12.7836 12.7968 13.1737 12.298 13.1066 11.7498C13.0396 11.2016 12.5408 10.8116 11.9926 10.8786Z" fill="currentColor"/> <path d="M11.3931 7.037C11.326 6.4888 11.7161 5.99004 12.2643 5.923C12.8125 5.85596 13.3112 6.24602 13.3783 6.79422C13.4453 7.34242 13.0553 7.84117 12.5071 7.90821C11.9589 7.97525 11.4601 7.5852 11.3931 7.037Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25289 11.7637C2.38339 6.38052 6.85312 2.12236 12.2363 2.25286C17.6195 2.38336 21.8777 6.85308 21.7472 12.2363C21.7389 12.5772 21.6243 12.8887 21.4132 13.1451C21.2113 13.3904 20.9498 13.5512 20.6919 13.6589C20.1898 13.8685 19.5606 13.9342 18.9379 13.9384C16.2492 13.9566 13.9139 16.2692 13.7613 18.9967C13.7256 19.6331 13.6171 20.2803 13.3433 20.7889C13.2015 21.0522 13.0023 21.3027 12.7233 21.4841C12.4377 21.6698 12.1102 21.7555 11.7637 21.7471C6.38055 21.6166 2.12239 17.1469 2.25289 11.7637ZM12.2 3.75242C7.64495 3.642 3.86287 7.24505 3.75245 11.8001C3.64203 16.3551 7.24508 20.1372 11.8001 20.2476C11.8682 20.2492 11.8934 20.2346 11.9057 20.2265C11.9247 20.2142 11.9688 20.1777 12.0226 20.0777C12.1399 19.8598 12.2321 19.4757 12.2636 18.9129C12.458 15.438 15.4045 12.4623 18.9278 12.4385C19.4898 12.4347 19.8843 12.3706 20.114 12.2747C20.1951 12.2408 20.2331 12.2122 20.2476 12.1992C20.3576 7.64449 16.7547 3.86283 12.2 3.75242Z" fill="currentColor"/>',
'photos':'<path fill-rule="evenodd" clip-rule="evenodd" d="M8.25 13C8.25 10.9289 9.92893 9.25 12 9.25C14.0711 9.25 15.75 10.9289 15.75 13C15.75 15.0711 14.0711 16.75 12 16.75C9.92893 16.75 8.25 15.0711 8.25 13ZM12 10.75C10.7574 10.75 9.75 11.7574 9.75 13C9.75 14.2426 10.7574 15.25 12 15.25C13.2426 15.25 14.25 14.2426 14.25 13C14.25 11.7574 13.2426 10.75 12 10.75Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6161 5.75C9.57096 5.75 8.72368 6.59728 8.72368 7.64245C8.72368 8.30841 8.21246 8.86283 7.54868 8.91674L5.31909 9.09782C4.88131 9.13337 4.52129 9.45709 4.43958 9.88864C3.99083 12.2586 3.95737 14.6886 4.34069 17.0701L4.43794 17.6743C4.52978 18.2449 4.99942 18.679 5.57547 18.7258L7.5178 18.8835C10.501 19.1258 13.499 19.1258 16.4822 18.8835L18.4245 18.7258C19.0006 18.679 19.4702 18.2449 19.5621 17.6743L19.6593 17.0701C20.0426 14.6886 20.0092 12.2586 19.5604 9.88864C19.4787 9.45709 19.1187 9.13337 18.6809 9.09782L16.4513 8.91674C15.7875 8.86284 15.2763 8.30841 15.2763 7.64245C15.2763 6.59728 14.429 5.75 13.3839 5.75H10.6161ZM7.22976 7.4377C7.33562 5.65944 8.81128 4.25 10.6161 4.25H13.3839C15.1887 4.25 16.6644 5.65944 16.7702 7.4377L18.8023 7.60274C19.9133 7.69296 20.8269 8.51446 21.0342 9.60958C21.5153 12.1503 21.5512 14.7554 21.1403 17.3084L21.043 17.9126C20.8414 19.1652 19.8105 20.1182 18.5459 20.2209L16.6036 20.3786C13.5396 20.6274 10.4604 20.6274 7.39638 20.3786L5.45405 20.2209C4.18953 20.1182 3.15861 19.1652 2.957 17.9126L2.85975 17.3084C2.44882 14.7554 2.48469 12.1503 2.96576 9.60958C3.17312 8.51446 4.08675 7.69296 5.19767 7.60274L7.22976 7.4377Z" fill="currentColor"/>',
'occupation':'<path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 3.78363C7.04513 4.16255 3.75 7.69647 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C14.3214 20.25 16.4185 19.2919 17.9185 17.7476L11.5286 12.5833C11.3524 12.4409 11.25 12.2265 11.25 12V3.78363ZM12.75 3.78363V11.25H20.2164C19.8597 7.29215 16.7079 4.14029 12.75 3.78363ZM20.2164 12.75H14.1212L18.8621 16.5815C19.6082 15.4664 20.0895 14.1597 20.2164 12.75ZM2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 14.3212 20.9379 16.4548 19.583 18.1291C17.7968 20.3365 15.0632 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12Z" fill="currentColor"/>',
'price':'<path d="M10 13.25C10.4142 13.25 10.75 13.5858 10.75 14V16C10.75 16.4142 10.4142 16.75 10 16.75C9.58579 16.75 9.25 16.4142 9.25 16V14C9.25 13.5858 9.58579 13.25 10 13.25Z" fill="currentColor"/> <path d="M14.75 14C14.75 13.5858 14.4142 13.25 14 13.25C13.5858 13.25 13.25 13.5858 13.25 14V16C13.25 16.4142 13.5858 16.75 14 16.75C14.4142 16.75 14.75 16.4142 14.75 16V14Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.64952 3.375C9.85662 3.01628 9.73372 2.55759 9.375 2.35048C9.01628 2.14338 8.55759 2.26628 8.35048 2.625L6.35048 6.0891C6.32052 6.141 6.29746 6.19499 6.28103 6.25H6C4.48122 6.25 3.25 7.48122 3.25 9C3.25 9.85913 3.64397 10.6262 4.26109 11.1305L4.92803 15.7152L5.37478 17.8084C5.64244 19.0625 6.66623 20.0151 7.93636 20.1918C10.6325 20.567 13.3675 20.567 16.0636 20.1918C17.3338 20.0151 18.3576 19.0625 18.6252 17.8084L19.072 15.7152L19.7389 11.1305C20.356 10.6262 20.75 9.85913 20.75 9C20.75 7.48122 19.5188 6.25 18 6.25H17.719C17.7025 6.19499 17.6795 6.141 17.6495 6.0891L15.6495 2.625C15.4424 2.26628 14.9837 2.14338 14.625 2.35048C14.2663 2.55759 14.1434 3.01628 14.3505 3.375L16.0104 6.25H7.98963L9.64952 3.375ZM18.1335 11.7468C18.0892 11.7489 18.0447 11.75 18 11.75H6C5.95525 11.75 5.91076 11.7489 5.86653 11.7468L6.4053 15.4504L6.84174 17.4953C6.97772 18.1324 7.49783 18.6163 8.14308 18.7061C10.702 19.0622 13.298 19.0622 15.8569 18.7061C16.5022 18.6163 17.0223 18.1324 17.1583 17.4953L17.5947 15.4504L18.1335 11.7468ZM4.75 9C4.75 8.30965 5.30964 7.75 6 7.75H18C18.6904 7.75 19.25 8.30965 19.25 9C19.25 9.69036 18.6904 10.25 18 10.25H6C5.30964 10.25 4.75 9.69036 4.75 9Z" fill="currentColor"/>',
'lastminute':'<path d="M11.4697 8.53033C11.6103 8.67098 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.67098 12.5303 8.53033L13.5303 7.53033C13.7448 7.31583 13.809 6.99324 13.6929 6.71299C13.5768 6.43273 13.3033 6.25 13 6.25H11C10.6966 6.25 10.4232 6.43273 10.3071 6.71299C10.191 6.99324 10.2552 7.31583 10.4697 7.53033L11.4697 8.53033Z" fill="currentColor"/> <path d="M11.4697 15.4697C11.6103 15.329 11.8011 15.25 12 15.25C12.1989 15.25 12.3897 15.329 12.5303 15.4697L13.5303 16.4697C13.7448 16.6842 13.809 17.0068 13.6929 17.287C13.5768 17.5673 13.3033 17.75 13 17.75H11C10.6966 17.75 10.4232 17.5673 10.3071 17.287C10.191 17.0068 10.2552 16.6842 10.4697 16.4697L11.4697 15.4697Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.149 12L13.3363 11.8386C15.3117 10.1366 16.9542 8.08279 18.1802 5.78147C18.6613 4.8784 18.064 3.77732 17.0446 3.6882L15.8711 3.58559C13.2953 3.36038 10.7047 3.36039 8.12888 3.58559L6.95534 3.6882C5.936 3.77732 5.3387 4.8784 5.8198 5.78148C7.04582 8.08279 8.68825 10.1366 10.6637 11.8386L10.851 12L10.6637 12.1614C8.68825 13.8634 7.04582 15.9172 5.8198 18.2185C5.3387 19.1216 5.936 20.2227 6.95534 20.3118L8.12888 20.4144C10.7047 20.6396 13.2953 20.6396 15.8711 20.4144L17.0446 20.3118C18.064 20.2227 18.6613 19.1216 18.1802 18.2185C16.9542 15.9172 15.3117 13.8634 13.3363 12.1614L13.149 12ZM12.0036 11.0063C12.0041 11.0061 12.0049 11.0058 12.0065 11.0044L12.3572 10.7022C14.1643 9.14525 15.6714 7.27129 16.8045 5.17292L15.7405 5.07989C13.2516 4.86229 10.7484 4.86229 8.25953 5.07989L7.19553 5.17292C8.32858 7.27129 9.83567 9.14525 11.6428 10.7022L11.9935 11.0044C11.9945 11.0053 11.9952 11.0057 11.9957 11.006C11.996 11.0061 11.9955 11.0059 11.9957 11.006C11.9965 11.0063 11.9984 11.0068 12 11.0068C12.0016 11.0068 12.0029 11.0065 12.0036 11.0063ZM12.0065 12.9956C12.0049 12.9942 12.0041 12.9939 12.0036 12.9937C12.0033 12.9936 12.0028 12.9935 12.0022 12.9934C12.0016 12.9932 12.0008 12.9932 12 12.9932C11.9984 12.9932 11.9971 12.9935 11.9964 12.9937C11.9959 12.9939 11.9951 12.9942 11.9935 12.9956L11.6428 13.2978C9.83567 14.8547 8.32858 16.7287 7.19553 18.8271L8.25953 18.9201C10.7484 19.1377 13.2516 19.1377 15.7405 18.9201L16.8045 18.8271C15.6714 16.7287 14.1643 14.8547 12.3572 13.2978L12.0065 12.9956Z" fill="currentColor"/>',
'financial':'<path fill-rule="evenodd" clip-rule="evenodd" d="M11.4151 2.39511C11.7962 2.27797 12.2038 2.27797 12.5849 2.39511L15.5706 3.31277C17.1283 3.79152 18.6075 4.49538 19.9616 5.40203C21.0147 6.10722 20.5155 7.74997 19.2481 7.74997H4.75191C3.48446 7.74997 2.98526 6.10722 4.03841 5.40204C5.39244 4.49538 6.87174 3.79152 8.42938 3.31277L11.4151 2.39511ZM12.1442 3.82891C12.0502 3.80003 11.9498 3.80003 11.8558 3.82891L8.87006 4.74658C7.68925 5.1095 6.55791 5.61454 5.50069 6.24997H18.4993C17.4421 5.61454 16.3107 5.1095 15.1299 4.74658L12.1442 3.82891Z" fill="currentColor"/> <path d="M4.25 21C4.25 20.5858 4.58579 20.25 5 20.25H19C19.4142 20.25 19.75 20.5858 19.75 21C19.75 21.4142 19.4142 21.75 19 21.75H5C4.58579 21.75 4.25 21.4142 4.25 21Z" fill="currentColor"/> <path d="M6.25 17C6.25 17.4142 6.58579 17.75 7 17.75C7.41421 17.75 7.75 17.4142 7.75 17L7.75 11C7.75 10.5858 7.41421 10.25 7 10.25C6.58579 10.25 6.25 10.5858 6.25 11L6.25 17Z" fill="currentColor"/> <path d="M12 17.75C11.5858 17.75 11.25 17.4142 11.25 17L11.25 11C11.25 10.5858 11.5858 10.25 12 10.25C12.4142 10.25 12.75 10.5858 12.75 11V17C12.75 17.4142 12.4142 17.75 12 17.75Z" fill="currentColor"/> <path d="M16.25 17C16.25 17.4142 16.5858 17.75 17 17.75C17.4142 17.75 17.75 17.4142 17.75 17V11C17.75 10.5858 17.4142 10.25 17 10.25C16.5858 10.25 16.25 10.5858 16.25 11V17Z" fill="currentColor"/>',
'operational':'<path fill-rule="evenodd" clip-rule="evenodd" d="M11.1987 2.5872C11.697 2.31035 12.303 2.31035 12.8013 2.5872L20.0013 6.5872C20.5251 6.87821 20.85 7.43034 20.85 8.02956V15.9704C20.85 16.5697 20.5251 17.1218 20.0013 17.4128L12.8013 21.4128C12.303 21.6896 11.697 21.6897 11.1987 21.4128L3.99869 17.4128C3.47487 17.1218 3.15 16.5697 3.15 15.9704V8.02956C3.15 7.43034 3.47487 6.87821 3.99869 6.5872L11.1987 2.5872ZM12.0728 3.89844C12.0275 3.87327 11.9725 3.87327 11.9272 3.89844L4.72715 7.89844C4.67953 7.92489 4.65 7.97509 4.65 8.02956V15.9704C4.65 16.0249 4.67953 16.0751 4.72715 16.1016L11.9272 20.1016C11.9725 20.1267 12.0275 20.1267 12.0728 20.1016L19.2728 16.1016C19.3205 16.0751 19.35 16.0249 19.35 15.9704V8.02956C19.35 7.97509 19.3205 7.92489 19.2728 7.89844L12.0728 3.89844Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.25 12C7.25 9.37665 9.37665 7.25 12 7.25C14.6234 7.25 16.75 9.37665 16.75 12C16.75 14.6234 14.6234 16.75 12 16.75C9.37665 16.75 7.25 14.6234 7.25 12ZM12 8.75C10.2051 8.75 8.75 10.2051 8.75 12C8.75 13.7949 10.2051 15.25 12 15.25C13.7949 15.25 15.25 13.7949 15.25 12C15.25 10.2051 13.7949 8.75 12 8.75Z" fill="currentColor"/>',
'appcenter':'<path fill-rule="evenodd" clip-rule="evenodd" d="M6.06668 3.87389C5.364 3.79535 4.636 3.79535 3.93332 3.87389C3.92027 3.87535 3.90735 3.88125 3.89674 3.89172C3.88638 3.90193 3.88233 3.91226 3.88131 3.92103C3.79746 4.6379 3.79746 5.3621 3.88131 6.07897C3.88233 6.08774 3.88638 6.09807 3.89674 6.10829C3.90735 6.11875 3.92027 6.12466 3.93332 6.12611C4.636 6.20465 5.364 6.20465 6.06668 6.12611C6.07973 6.12466 6.09264 6.11875 6.10326 6.10829C6.11362 6.09807 6.11767 6.08774 6.11869 6.07897C6.20254 5.3621 6.20254 4.6379 6.11869 3.92103C6.11767 3.91226 6.11362 3.90193 6.10326 3.89172C6.09264 3.88125 6.07973 3.87535 6.06668 3.87389ZM3.76671 2.38317C4.58012 2.29226 5.41988 2.29226 6.23329 2.38317C6.94562 2.46278 7.52391 3.02322 7.60854 3.74678C7.70592 4.57942 7.70592 5.42058 7.60854 6.25323C7.52391 6.97678 6.94562 7.53722 6.23329 7.61683C5.41988 7.70774 4.58012 7.70774 3.76671 7.61683C3.05438 7.53722 2.47609 6.97679 2.39146 6.25323C2.29408 5.42058 2.29408 4.57942 2.39146 3.74678C2.47609 3.02322 3.05438 2.46278 3.76671 2.38317Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0667 3.87389C12.364 3.79535 11.636 3.79535 10.9333 3.87389C10.9203 3.87535 10.9074 3.88125 10.8967 3.89172C10.8864 3.90193 10.8823 3.91226 10.8813 3.92103C10.7975 4.6379 10.7975 5.3621 10.8813 6.07897C10.8823 6.08774 10.8864 6.09807 10.8967 6.10829C10.9074 6.11875 10.9203 6.12466 10.9333 6.12611C11.636 6.20465 12.364 6.20465 13.0667 6.12611C13.0797 6.12466 13.0926 6.11875 13.1033 6.10829C13.1136 6.09807 13.1177 6.08774 13.1187 6.07897C13.2025 5.3621 13.2025 4.6379 13.1187 3.92103C13.1177 3.91226 13.1136 3.90193 13.1033 3.89172C13.0926 3.88125 13.0797 3.87535 13.0667 3.87389ZM10.7667 2.38317C11.5801 2.29226 12.4199 2.29226 13.2333 2.38317C13.9456 2.46278 14.5239 3.02322 14.6085 3.74678C14.7059 4.57942 14.7059 5.42058 14.6085 6.25323C14.5239 6.97678 13.9456 7.53722 13.2333 7.61683C12.4199 7.70774 11.5801 7.70774 10.7667 7.61683C10.0544 7.53722 9.47609 6.97679 9.39146 6.25323C9.29408 5.42058 9.29408 4.57942 9.39146 3.74678C9.47609 3.02322 10.0544 2.46278 10.7667 2.38317Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0667 3.87389C19.364 3.79535 18.636 3.79535 17.9333 3.87389C17.9203 3.87535 17.9074 3.88125 17.8967 3.89172C17.8864 3.90193 17.8823 3.91226 17.8813 3.92103C17.7975 4.6379 17.7975 5.3621 17.8813 6.07897C17.8823 6.08774 17.8864 6.09807 17.8967 6.10829C17.9074 6.11875 17.9203 6.12466 17.9333 6.12611C18.636 6.20465 19.364 6.20465 20.0667 6.12611C20.0797 6.12466 20.0926 6.11875 20.1033 6.10829C20.1136 6.09807 20.1177 6.08774 20.1187 6.07897C20.2025 5.3621 20.2025 4.6379 20.1187 3.92103C20.1177 3.91226 20.1136 3.90193 20.1033 3.89172C20.0926 3.88125 20.0797 3.87535 20.0667 3.87389ZM17.7667 2.38317C18.5801 2.29226 19.4199 2.29226 20.2333 2.38317C20.9456 2.46278 21.5239 3.02322 21.6085 3.74678C21.7059 4.57942 21.7059 5.42058 21.6085 6.25323C21.5239 6.97678 20.9456 7.53722 20.2333 7.61683C19.4199 7.70774 18.5801 7.70774 17.7667 7.61683C17.0544 7.53722 16.4761 6.97679 16.3915 6.25323C16.2941 5.42058 16.2941 4.57942 16.3915 3.74678C16.4761 3.02322 17.0544 2.46278 17.7667 2.38317Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.06668 10.8739C5.364 10.7954 4.636 10.7954 3.93332 10.8739C3.92027 10.8753 3.90735 10.8813 3.89674 10.8917C3.88638 10.9019 3.88233 10.9123 3.88131 10.921C3.79746 11.6379 3.79746 12.3621 3.88131 13.079C3.88233 13.0877 3.88638 13.0981 3.89674 13.1083C3.90735 13.1187 3.92027 13.1247 3.93332 13.1261C4.636 13.2046 5.364 13.2046 6.06668 13.1261C6.07973 13.1247 6.09264 13.1187 6.10326 13.1083C6.11362 13.0981 6.11767 13.0877 6.11869 13.079C6.20254 12.3621 6.20254 11.6379 6.11869 10.921C6.11767 10.9123 6.11362 10.9019 6.10326 10.8917C6.09264 10.8813 6.07973 10.8753 6.06668 10.8739ZM3.76671 9.38317C4.58012 9.29226 5.41988 9.29226 6.23329 9.38317C6.94562 9.46278 7.52391 10.0232 7.60854 10.7468C7.70592 11.5794 7.70592 12.4206 7.60854 13.2532C7.52391 13.9768 6.94562 14.5372 6.23329 14.6168C5.41988 14.7077 4.58012 14.7077 3.76671 14.6168C3.05438 14.5372 2.47609 13.9768 2.39146 13.2532C2.29408 12.4206 2.29408 11.5794 2.39146 10.7468C2.47609 10.0232 3.05438 9.46278 3.76671 9.38317Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0667 10.8739C12.364 10.7954 11.636 10.7954 10.9333 10.8739C10.9203 10.8753 10.9074 10.8813 10.8967 10.8917C10.8864 10.9019 10.8823 10.9123 10.8813 10.921C10.7975 11.6379 10.7975 12.3621 10.8813 13.079C10.8823 13.0877 10.8864 13.0981 10.8967 13.1083C10.9074 13.1187 10.9203 13.1247 10.9333 13.1261C11.636 13.2046 12.364 13.2046 13.0667 13.1261C13.0797 13.1247 13.0926 13.1187 13.1033 13.1083C13.1136 13.0981 13.1177 13.0877 13.1187 13.079C13.2025 12.3621 13.2025 11.6379 13.1187 10.921C13.1177 10.9123 13.1136 10.9019 13.1033 10.8917C13.0926 10.8813 13.0797 10.8753 13.0667 10.8739ZM10.7667 9.38317C11.5801 9.29226 12.4199 9.29226 13.2333 9.38317C13.9456 9.46278 14.5239 10.0232 14.6085 10.7468C14.7059 11.5794 14.7059 12.4206 14.6085 13.2532C14.5239 13.9768 13.9456 14.5372 13.2333 14.6168C12.4199 14.7077 11.5801 14.7077 10.7667 14.6168C10.0544 14.5372 9.47609 13.9768 9.39146 13.2532C9.29408 12.4206 9.29408 11.5794 9.39146 10.7468C9.47609 10.0232 10.0544 9.46278 10.7667 9.38317Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0667 10.8739C19.364 10.7954 18.636 10.7954 17.9333 10.8739C17.9203 10.8753 17.9074 10.8813 17.8967 10.8917C17.8864 10.9019 17.8823 10.9123 17.8813 10.921C17.7975 11.6379 17.7975 12.3621 17.8813 13.079C17.8823 13.0877 17.8864 13.0981 17.8967 13.1083C17.9074 13.1187 17.9203 13.1247 17.9333 13.1261C18.636 13.2046 19.364 13.2046 20.0667 13.1261C20.0797 13.1247 20.0926 13.1187 20.1033 13.1083C20.1136 13.0981 20.1177 13.0877 20.1187 13.079C20.2025 12.3621 20.2025 11.6379 20.1187 10.921C20.1177 10.9123 20.1136 10.9019 20.1033 10.8917C20.0926 10.8813 20.0797 10.8753 20.0667 10.8739ZM17.7667 9.38317C18.5801 9.29226 19.4199 9.29226 20.2333 9.38317C20.9456 9.46278 21.5239 10.0232 21.6085 10.7468C21.7059 11.5794 21.7059 12.4206 21.6085 13.2532C21.5239 13.9768 20.9456 14.5372 20.2333 14.6168C19.4199 14.7077 18.5801 14.7077 17.7667 14.6168C17.0544 14.5372 16.4761 13.9768 16.3915 13.2532C16.2941 12.4206 16.2941 11.5794 16.3915 10.7468C16.4761 10.0232 17.0544 9.46278 17.7667 9.38317Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.06668 17.8739C5.364 17.7954 4.636 17.7954 3.93332 17.8739C3.92027 17.8753 3.90735 17.8813 3.89674 17.8917C3.88638 17.9019 3.88233 17.9123 3.88131 17.921C3.79746 18.6379 3.79746 19.3621 3.88131 20.079C3.88233 20.0877 3.88638 20.0981 3.89674 20.1083C3.90735 20.1187 3.92027 20.1247 3.93332 20.1261C4.636 20.2046 5.364 20.2046 6.06668 20.1261C6.07973 20.1247 6.09264 20.1187 6.10326 20.1083C6.11362 20.0981 6.11767 20.0877 6.11869 20.079C6.20254 19.3621 6.20254 18.6379 6.11869 17.921C6.11767 17.9123 6.11362 17.9019 6.10326 17.8917C6.09264 17.8813 6.07973 17.8753 6.06668 17.8739ZM3.76671 16.3832C4.58012 16.2923 5.41988 16.2923 6.23329 16.3832C6.94562 16.4628 7.52391 17.0232 7.60854 17.7468C7.70592 18.5794 7.70592 19.4206 7.60854 20.2532C7.52391 20.9768 6.94562 21.5372 6.23329 21.6168C5.41988 21.7077 4.58012 21.7077 3.76671 21.6168C3.05438 21.5372 2.47609 20.9768 2.39146 20.2532C2.29408 19.4206 2.29408 18.5794 2.39146 17.7468C2.47609 17.0232 3.05438 16.4628 3.76671 16.3832Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0667 17.8739C12.364 17.7954 11.636 17.7954 10.9333 17.8739C10.9203 17.8753 10.9074 17.8813 10.8967 17.8917C10.8864 17.9019 10.8823 17.9123 10.8813 17.921C10.7975 18.6379 10.7975 19.3621 10.8813 20.079C10.8823 20.0877 10.8864 20.0981 10.8967 20.1083C10.9074 20.1187 10.9203 20.1247 10.9333 20.1261C11.636 20.2046 12.364 20.2046 13.0667 20.1261C13.0797 20.1247 13.0926 20.1187 13.1033 20.1083C13.1136 20.0981 13.1177 20.0877 13.1187 20.079C13.2025 19.3621 13.2025 18.6379 13.1187 17.921C13.1177 17.9123 13.1136 17.9019 13.1033 17.8917C13.0926 17.8813 13.0797 17.8753 13.0667 17.8739ZM10.7667 16.3832C11.5801 16.2923 12.4199 16.2923 13.2333 16.3832C13.9456 16.4628 14.5239 17.0232 14.6085 17.7468C14.7059 18.5794 14.7059 19.4206 14.6085 20.2532C14.5239 20.9768 13.9456 21.5372 13.2333 21.6168C12.4199 21.7077 11.5801 21.7077 10.7667 21.6168C10.0544 21.5372 9.47609 20.9768 9.39146 20.2532C9.29408 19.4206 9.29408 18.5794 9.39146 17.7468C9.47609 17.0232 10.0544 16.4628 10.7667 16.3832Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0667 17.8739C19.364 17.7954 18.636 17.7954 17.9333 17.8739C17.9203 17.8753 17.9074 17.8813 17.8967 17.8917C17.8864 17.9019 17.8823 17.9123 17.8813 17.921C17.7975 18.6379 17.7975 19.3621 17.8813 20.079C17.8823 20.0877 17.8864 20.0981 17.8967 20.1083C17.9074 20.1187 17.9203 20.1247 17.9333 20.1261C18.636 20.2046 19.364 20.2046 20.0667 20.1261C20.0797 20.1247 20.0926 20.1187 20.1033 20.1083C20.1136 20.0981 20.1177 20.0877 20.1187 20.079C20.2025 19.3621 20.2025 18.6379 20.1187 17.921C20.1177 17.9123 20.1136 17.9019 20.1033 17.8917C20.0926 17.8813 20.0797 17.8753 20.0667 17.8739ZM17.7667 16.3832C18.5801 16.2923 19.4199 16.2923 20.2333 16.3832C20.9456 16.4628 21.5239 17.0232 21.6085 17.7468C21.7059 18.5794 21.7059 19.4206 21.6085 20.2532C21.5239 20.9768 20.9456 21.5372 20.2333 21.6168C19.4199 21.7077 18.5801 21.7077 17.7667 21.6168C17.0544 21.5372 16.4761 20.9768 16.3915 20.2532C16.2941 19.4206 16.2941 18.5794 16.3915 17.7468C16.4761 17.0232 17.0544 16.4628 17.7667 16.3832Z" fill="currentColor"/>',
'openapi':'<path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.0792L9.7872 5.3687C9.55167 5.61239 9.22729 5.75 8.88839 5.75H5.75V8.88839C5.75 9.2273 5.61239 9.55167 5.3687 9.7872L3.0792 12L5.3687 14.2128C5.61239 14.4483 5.75 14.7727 5.75 15.1116V18.25H8.88839C9.22729 18.25 9.55167 18.3876 9.7872 18.6313L12 20.9208L14.2128 18.6313C14.4483 18.3876 14.7727 18.25 15.1116 18.25H18.25V15.1116C18.25 14.7727 18.3876 14.4483 18.6313 14.2128L20.9208 12L18.6313 9.78721C18.3876 9.55168 18.25 9.2273 18.25 8.8884V5.75H15.1116C14.7727 5.75 14.4483 5.61239 14.2128 5.3687L12 3.0792ZM11.1012 1.85077C11.5926 1.34237 12.4074 1.34237 12.8988 1.85077L15.2177 4.25H18.5C19.1904 4.25 19.75 4.80965 19.75 5.5V8.78234L22.1492 11.1012C22.6576 11.5926 22.6576 12.4074 22.1492 12.8988L19.75 15.2177V18.5C19.75 19.1904 19.1904 19.75 18.5 19.75H15.2177L12.8988 22.1492C12.4074 22.6576 11.5926 22.6576 11.1012 22.1492L8.78233 19.75H5.5C4.80964 19.75 4.25 19.1904 4.25 18.5V15.2177L1.85077 12.8988C1.34237 12.4074 1.34236 11.5926 1.85077 11.1012L4.25 8.78233V5.5C4.25 4.80964 4.80964 4.25 5.5 4.25H8.78233L11.1012 1.85077Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.25 12C7.25 9.37665 9.37665 7.25 12 7.25C14.6234 7.25 16.75 9.37665 16.75 12C16.75 14.6234 14.6234 16.75 12 16.75C9.37665 16.75 7.25 14.6234 7.25 12ZM12 8.75C10.2051 8.75 8.75 10.2051 8.75 12C8.75 13.7949 10.2051 15.25 12 15.25C13.7949 15.25 15.25 13.7949 15.25 12C15.25 10.2051 13.7949 8.75 12 8.75Z" fill="currentColor"/>',
'prod_sug':'<path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.75C8.52397 3.75 5.75 6.46727 5.75 9.76594C5.75 11.7705 6.57093 13.4993 8.03534 14.576C8.3581 14.8133 8.63421 15.1672 8.73996 15.6162C8.82675 15.9847 8.92608 16.4337 9.02447 16.9095H14.9755C15.0739 16.4337 15.1732 15.9847 15.26 15.6162C15.3658 15.1672 15.6419 14.8133 15.9647 14.576C17.4291 13.4993 18.25 11.7705 18.25 9.76594C18.25 6.46727 15.476 3.75 12 3.75ZM14.6887 18.4095H9.31128C9.42169 19.0471 9.50831 19.6509 9.53454 20.0844C9.56215 20.5408 9.90326 20.9498 10.4062 21.0585L10.6022 21.1009C11.5226 21.2997 12.4774 21.2997 13.3978 21.1009L13.5938 21.0585C14.0967 20.9498 14.4379 20.5408 14.4655 20.0844C14.4917 19.6509 14.5783 19.0471 14.6887 18.4095ZM4.25 9.76594C4.25 5.59116 7.74404 2.25 12 2.25C16.256 2.25 19.75 5.59116 19.75 9.76594C19.75 12.1898 18.7464 14.3926 16.8532 15.7845C16.7668 15.848 16.7307 15.9148 16.7201 15.9601C16.6017 16.4627 16.4575 17.128 16.326 17.8029C16.1432 18.7412 15.9944 19.6512 15.9627 20.175C15.8927 21.3332 15.0406 22.2805 13.9106 22.5247L13.7146 22.567C12.5854 22.811 11.4146 22.811 10.2854 22.567L10.0894 22.5247C8.95941 22.2805 8.10735 21.3332 8.03727 20.175C8.00558 19.6512 7.85678 18.7412 7.67399 17.8029C7.5425 17.128 7.3983 16.4627 7.27991 15.9601C7.26925 15.9148 7.23315 15.848 7.14681 15.7845C5.25357 14.3926 4.25 12.1898 4.25 9.76594Z" fill="currentColor"/>',
'payment':'<path fill-rule="evenodd" clip-rule="evenodd" d="M19.1837 4.91231L12 4.74982L4.81627 4.91231C3.48511 4.94242 2.35801 5.90304 2.11732 7.2126C1.5356 10.3777 1.5356 13.6223 2.11732 16.7874C2.35801 18.097 3.48511 19.0576 4.81627 19.0877L12 19.2502L19.1837 19.0877C20.5149 19.0576 21.642 18.097 21.8827 16.7874C22.4644 13.6223 22.4644 10.3777 21.8827 7.2126C21.642 5.90303 20.5149 4.94242 19.1837 4.91231ZM4.85019 6.41192L12 6.2502L19.1498 6.41192C19.7701 6.42595 20.2952 6.87355 20.4074 7.48375C20.5607 8.31774 20.6711 9.15758 20.7388 10H3.26121C3.32886 9.15758 3.43933 8.31774 3.59261 7.48375C3.70476 6.87355 4.22993 6.42595 4.85019 6.41192ZM3.18103 12C3.18103 13.5117 3.31822 15.0233 3.59261 16.5163C3.70476 17.1265 4.22993 17.5741 4.85019 17.5881L12 17.7498L19.1498 17.5881C19.7701 17.5741 20.2952 17.1265 20.4074 16.5163C20.6818 15.0233 20.819 13.5117 20.819 12H3.18103Z" fill="currentColor"/>',
'inadimplencia':'<path d="M13.5 9.75002C13.5 9.3358 13.1642 9.00002 12.75 9.00002H6.75C6.33579 9.00002 6 9.3358 6 9.75002C6 10.1642 6.33579 10.5 6.75 10.5H12.75C13.1642 10.5 13.5 10.1642 13.5 9.75002Z" fill="currentColor"/> <path d="M12.5 12.75C12.5 12.3358 12.1642 12 11.75 12H6.75C6.33579 12 6 12.3358 6 12.75C6 13.1642 6.33579 13.5 6.75 13.5H11.75C12.1642 13.5 12.5 13.1642 12.5 12.75Z" fill="currentColor"/> <path d="M12.75 15C13.1642 15 13.5 15.3358 13.5 15.75C13.5 16.1642 13.1642 16.5 12.75 16.5H6.75C6.33579 16.5 6 16.1642 6 15.75C6 15.3358 6.33579 15 6.75 15H12.75Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M6 21.75H19C20.5188 21.75 21.75 20.5188 21.75 19V13.5C21.75 13.0858 21.4142 12.75 21 12.75H17.75V4.94321C17.75 3.51981 16.1411 2.69184 14.9828 3.51918L14.8078 3.64421C14.0273 4.2017 12.9701 4.19983 12.1859 3.63972C10.8821 2.70839 9.11794 2.70839 7.81407 3.63972C7.02992 4.19983 5.9727 4.2017 5.19221 3.64421L5.01717 3.51918C3.8589 2.69184 2.25 3.51981 2.25 4.94321V18C2.25 20.0711 3.92893 21.75 6 21.75ZM8.68593 4.86032C9.46825 4.30152 10.5318 4.30152 11.3141 4.86032C12.6161 5.79035 14.3739 5.79745 15.6796 4.86481L15.8547 4.73978C16.0202 4.62159 16.25 4.73987 16.25 4.94321V19C16.25 19.4501 16.3581 19.875 16.5499 20.25H6C4.75736 20.25 3.75 19.2427 3.75 18V4.94321C3.75 4.73987 3.97984 4.62159 4.14531 4.73978L4.32036 4.86481C5.62605 5.79745 7.3839 5.79034 8.68593 4.86032ZM17.75 19V14.25H20.25V19C20.25 19.6904 19.6904 20.25 19 20.25C18.3096 20.25 17.75 19.6904 17.75 19Z" fill="currentColor"/>',
'nego':'<path fill-rule="evenodd" clip-rule="evenodd" d="M7.25 6.63098V5.4612C7.25 4.59495 7.88374 3.85906 8.7404 3.73056L9.96032 3.54757C11.3125 3.34474 12.6875 3.34474 14.0397 3.54757L15.2596 3.73056C16.1163 3.85906 16.75 4.59495 16.75 5.4612V6.63098L18.464 6.76933C19.7764 6.87527 20.847 7.86341 21.0574 9.16313C21.5226 12.0357 21.5226 14.9643 21.0574 17.8369C20.847 19.1366 19.7764 20.1247 18.464 20.2307L16.5921 20.3818C13.5357 20.6285 10.4643 20.6285 7.40787 20.3818L5.53595 20.2307C4.22357 20.1247 3.15303 19.1366 2.94255 17.8369C2.47736 14.9643 2.47736 12.0357 2.94255 9.16313C3.15303 7.86341 4.22357 6.87527 5.53596 6.76933L7.25 6.63098ZM10.1828 5.03098C11.3875 4.85027 12.6125 4.85027 13.8172 5.03098L15.0371 5.21396C15.1595 5.23232 15.25 5.33745 15.25 5.4612V6.5258C13.0851 6.40233 10.9149 6.40233 8.75 6.5258V5.4612C8.75 5.33745 8.84053 5.23232 8.96291 5.21396L10.1828 5.03098ZM7.52856 8.11337C10.5047 7.87314 13.4953 7.87314 16.4714 8.11337L18.3433 8.26447C18.9675 8.31485 19.4766 8.78479 19.5767 9.40292C19.6391 9.78785 19.6926 10.1738 19.7372 10.5606C14.8596 12.9624 9.14038 12.9624 4.26278 10.5606C4.30743 10.1738 4.36092 9.78785 4.42326 9.40292C4.52336 8.78479 5.03249 8.31485 5.65664 8.26447L7.52856 8.11337ZM4.12889 12.1567C9.12829 14.4304 14.8717 14.4304 19.8711 12.1567C19.9664 13.9728 19.8683 15.7966 19.5767 17.5971C19.4766 18.2152 18.9675 18.6852 18.3433 18.7355L16.4714 18.8866C13.4953 19.1269 10.5047 19.1269 7.52856 18.8866L5.65664 18.7355C5.03249 18.6852 4.52336 18.2152 4.42326 17.5971C4.13169 15.7966 4.03356 13.9728 4.12889 12.1567Z" fill="currentColor"/>',
'nps_churn':'<path fill-rule="evenodd" clip-rule="evenodd" d="M10.4864 4.11419C11.1608 2.95192 12.8392 2.95193 13.5136 4.11419L15.579 7.67355C15.7694 8.00164 16.0984 8.22553 16.4735 8.28218L19.9031 8.80018C21.3981 9.02598 21.9225 10.9136 20.7582 11.8781L18.2593 13.9485C17.9086 14.239 17.7437 14.6974 17.8289 15.1449L18.5289 18.8208C18.8031 20.2608 17.2914 21.3796 15.9944 20.6966L12.5824 18.9001C12.2178 18.7081 11.7822 18.7081 11.4176 18.9001L8.00559 20.6966C6.70858 21.3796 5.19695 20.2608 5.47115 18.8208L6.17113 15.1449C6.25633 14.6974 6.09141 14.239 5.74067 13.9485L3.24177 11.8781C2.07748 10.9136 2.60189 9.02598 4.09688 8.80018L7.52653 8.28218C7.90159 8.22553 8.23064 8.00164 8.42101 7.67355L10.4864 4.11419ZM12.2162 4.86702C12.1199 4.70098 11.8801 4.70098 11.7838 4.86702L9.71841 8.42638C9.29959 9.14817 8.57568 9.64073 7.75054 9.76535L4.3209 10.2834C4.10733 10.3156 4.03241 10.5853 4.19874 10.7231L6.69764 12.7934C7.46927 13.4327 7.8321 14.4411 7.64465 15.4254L6.94467 19.1014C6.9055 19.3071 7.12144 19.467 7.30673 19.3694L10.7188 17.5728C11.5207 17.1505 12.4793 17.1505 13.2812 17.5728L16.6933 19.3694C16.8786 19.467 17.0945 19.3071 17.0553 19.1014L16.3554 15.4254C16.1679 14.4411 16.5307 13.4327 17.3024 12.7934L19.8013 10.7231C19.9676 10.5853 19.8927 10.3156 19.6791 10.2834L16.2495 9.76535C15.4243 9.64073 14.7004 9.14817 14.2816 8.42638L12.2162 4.86702Z" fill="currentColor"/>',
'cases':'<path fill-rule="evenodd" clip-rule="evenodd" d="M15.6501 4.2629L16.4635 4.3642C18.3408 4.59801 19.75 6.19359 19.75 8.08545V18.5749C19.75 20.4118 18.3817 21.961 16.5589 22.188C13.5313 22.5651 10.4687 22.5651 7.44107 22.188C5.61826 21.961 4.25 20.4118 4.25 18.5749V8.08545C4.25 6.19359 5.6592 4.59801 7.53655 4.3642L8.3499 4.2629C8.67208 3.10206 9.73654 2.25 11 2.25H13C14.2635 2.25 15.3279 3.10206 15.6501 4.2629ZM8.25 5.78693L7.72193 5.8527C6.59552 5.99299 5.75 6.95034 5.75 8.08545V18.5749C5.75 19.655 6.55458 20.566 7.62645 20.6995C10.5309 21.0612 13.4691 21.0612 16.3735 20.6995C17.4454 20.566 18.25 19.655 18.25 18.5749V8.08545C18.25 6.95034 17.4045 5.99299 16.2781 5.8527L15.75 5.78693V7C15.75 7.41421 15.4142 7.75 15 7.75H9C8.58579 7.75 8.25 7.41421 8.25 7V5.78693ZM9.75 5C9.75 4.30964 10.3096 3.75 11 3.75H13C13.6904 3.75 14.25 4.30964 14.25 5V6.25H9.75V5Z" fill="currentColor"/> <path d="M15.75 11.75C15.75 11.3358 15.4142 11 15 11H9C8.58579 11 8.25 11.3358 8.25 11.75C8.25 12.1642 8.58579 12.5 9 12.5H15C15.4142 12.5 15.75 12.1642 15.75 11.75Z" fill="currentColor"/> <path d="M14.75 14.75C14.75 14.3358 14.4142 14 14 14H9C8.58579 14 8.25 14.3358 8.25 14.75C8.25 15.1642 8.58579 15.5 9 15.5H14C14.4142 15.5 14.75 15.1642 14.75 14.75Z" fill="currentColor"/>',
'upgrade':'<path d="M8.53033 10.5303C8.23744 10.8232 7.76256 10.8232 7.46967 10.5303C7.17678 10.2374 7.17678 9.76256 7.46967 9.46967L11.4697 5.46967C11.7626 5.17678 12.2374 5.17678 12.5303 5.46967L16.5303 9.46967C16.8232 9.76256 16.8232 10.2374 16.5303 10.5303C16.2374 10.8232 15.7626 10.8232 15.4697 10.5303L12.75 7.81066L12.75 17.5C12.75 17.9142 12.4142 18.25 12 18.25C11.5858 18.25 11.25 17.9142 11.25 17.5L11.25 7.81066L8.53033 10.5303Z" fill="currentColor"/>',
'acct_plan':'<path d="M15.75 13C15.75 12.5858 15.4142 12.25 15 12.25H9C8.58579 12.25 8.25 12.5858 8.25 13C8.25 13.4142 8.58579 13.75 9 13.75H15C15.4142 13.75 15.75 13.4142 15.75 13Z" fill="currentColor"/> <path d="M15.75 17C15.75 16.5858 15.4142 16.25 15 16.25H9C8.58579 16.25 8.25 16.5858 8.25 17C8.25 17.4142 8.58579 17.75 9 17.75H15C15.4142 17.75 15.75 17.4142 15.75 17Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M7 2.25C5.48122 2.25 4.25 3.48122 4.25 5V19C4.25 20.5188 5.48122 21.75 7 21.75H17C18.5188 21.75 19.75 20.5188 19.75 19V7.96766C19.75 7.58689 19.6258 7.21651 19.3963 6.9127L16.3985 2.94504C16.0677 2.5073 15.5509 2.25 15.0022 2.25H7ZM5.75 5C5.75 4.30964 6.30964 3.75 7 3.75H14.25V8.14705C14.25 8.56126 14.5858 8.89705 15 8.89705H18.25V19C18.25 19.6904 17.6904 20.25 17 20.25H7C6.30964 20.25 5.75 19.6904 5.75 19V5Z" fill="currentColor"/>'
,'arrow_down':'<path d="M12.75 16.1893L15.4697 13.4697C15.7626 13.1768 16.2374 13.1768 16.5303 13.4697C16.8232 13.7626 16.8232 14.2374 16.5303 14.5303L12.5303 18.5303C12.2374 18.8232 11.7626 18.8232 11.4697 18.5303L7.46967 14.5303C7.17678 14.2374 7.17678 13.7626 7.46967 13.4697C7.76256 13.1768 8.23744 13.1768 8.53033 13.4697L11.25 16.1893L11.25 6.5C11.25 6.08579 11.5858 5.75 12 5.75C12.4142 5.75 12.75 6.08579 12.75 6.5L12.75 16.1893Z" fill="currentColor"/>','arrow_up':'<path d="M8.53033 10.5303C8.23744 10.8232 7.76256 10.8232 7.46967 10.5303C7.17678 10.2374 7.17678 9.76256 7.46967 9.46967L11.4697 5.46967C11.7626 5.17678 12.2374 5.17678 12.5303 5.46967L16.5303 9.46967C16.8232 9.76256 16.8232 10.2374 16.5303 10.5303C16.2374 10.8232 15.7626 10.8232 15.4697 10.5303L12.75 7.81066L12.75 17.5C12.75 17.9142 12.4142 18.25 12 18.25C11.5858 18.25 11.25 17.9142 11.25 17.5L11.25 7.81066L8.53033 10.5303Z" fill="currentColor"/>','award':'<path d="M10.25 9.5C10.25 8.5335 11.0335 7.75 12 7.75C12.9665 7.75 13.75 8.5335 13.75 9.5C13.75 10.4665 12.9665 11.25 12 11.25C11.0335 11.25 10.25 10.4665 10.25 9.5Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5 9.5C5 5.63401 8.13401 2.5 12 2.5C15.866 2.5 19 5.63401 19 9.5C19 10.8722 18.6052 12.1522 17.9229 13.2325L20.6495 17.9551C20.7967 18.2101 20.7812 18.5276 20.6097 18.767C20.4382 19.0063 20.1425 19.1231 19.8537 19.0657L17.2376 18.5455L16.3801 21.0713C16.2854 21.35 16.0364 21.5477 15.7434 21.5765C15.4504 21.6054 15.1676 21.4601 15.0204 21.2051L12.3002 16.4937C12.2007 16.4979 12.1006 16.5 12 16.5C11.8994 16.5 11.7993 16.4979 11.6998 16.4937L8.97965 21.2051C8.83258 21.4599 8.5502 21.6051 8.25745 21.5766C7.96471 21.5481 7.71564 21.3511 7.62047 21.0728L6.75854 18.5522L4.14467 19.066C3.85606 19.1228 3.56093 19.0056 3.38988 18.7663C3.21882 18.527 3.20342 18.2099 3.35048 17.9551L6.07708 13.2325C5.39483 12.1522 5 10.8722 5 9.5ZM7.08592 14.4852C7.91817 15.3056 8.95488 15.9192 10.1127 16.2426L8.50579 19.0259L7.96599 17.4473C7.84463 17.0924 7.47972 16.8817 7.11167 16.9541L5.4747 17.2759L7.08592 14.4852ZM13.8873 16.2426L15.4918 19.0217L16.0287 17.4406C16.1497 17.0842 16.516 16.8727 16.8851 16.9461L18.5229 17.2717L16.9141 14.4852C16.0818 15.3056 15.0451 15.9192 13.8873 16.2426ZM12 6.25C10.2051 6.25 8.75 7.70507 8.75 9.5C8.75 11.2949 10.2051 12.75 12 12.75C13.7949 12.75 15.25 11.2949 15.25 9.5C15.25 7.70507 13.7949 6.25 12 6.25Z" fill="currentColor"/>','calendar':'<path d="M7.75 4C7.75 3.58579 7.41421 3.25 7 3.25C6.58579 3.25 6.25 3.58579 6.25 4V5.81643C4.75693 6.02751 3.57738 7.20845 3.3777 8.71484L3.29115 9.36779C3.27647 9.47849 3.26244 9.58926 3.24905 9.70008C3.21354 9.99405 3.44514 10.25 3.74125 10.25H20.2587C20.5548 10.25 20.7864 9.99405 20.7509 9.70008C20.7375 9.58926 20.7235 9.47849 20.7088 9.36779L20.6222 8.71484C20.4226 7.20847 19.243 6.02754 17.75 5.81644V4C17.75 3.58579 17.4142 3.25 17 3.25C16.5858 3.25 16.25 3.58579 16.25 4V5.66763C13.4223 5.4158 10.5777 5.4158 7.75 5.66763V4Z" fill="currentColor"/><path d="M20.9446 12.2256C20.9358 11.9591 20.7156 11.75 20.4491 11.75H3.55087C3.28429 11.75 3.06413 11.9591 3.05537 12.2256C2.99598 14.0332 3.10578 15.8446 3.38451 17.6359C3.59552 18.9919 4.69718 20.0335 6.06292 20.1681L7.25593 20.2858C10.411 20.5969 13.589 20.5969 16.744 20.2858L17.937 20.1681C19.3028 20.0335 20.4044 18.9919 20.6154 17.6359C20.8942 15.8446 21.004 14.0332 20.9446 12.2256Z" fill="currentColor"/>','camera':'<path d="M9.75 13C9.75 11.7574 10.7574 10.75 12 10.75C13.2426 10.75 14.25 11.7574 14.25 13C14.25 14.2426 13.2426 15.25 12 15.25C10.7574 15.25 9.75 14.2426 9.75 13Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.47366 7.64245C7.47366 5.90692 8.88058 4.5 10.6161 4.5H13.3838C15.1194 4.5 16.5263 5.90692 16.5263 7.64245C16.5263 7.65729 16.5377 7.66964 16.5525 7.67084L18.7821 7.85192C19.7808 7.93303 20.6022 8.67157 20.7886 9.65609C21.2643 12.1684 21.2997 14.7443 20.8934 17.2687L20.7962 17.8729C20.6128 19.0118 19.6755 19.8783 18.5257 19.9717L16.5834 20.1294C13.5328 20.3772 10.4672 20.3772 7.41659 20.1294L5.47426 19.9717C4.32448 19.8783 3.38711 19.0118 3.2038 17.8729L3.10655 17.2687C2.70022 14.7443 2.73569 12.1684 3.21137 9.65609C3.39778 8.67157 4.21915 7.93303 5.21788 7.85192L7.44747 7.67084C7.46227 7.66964 7.47366 7.65729 7.47366 7.64245ZM12 9.25C9.92893 9.25 8.25 10.9289 8.25 13C8.25 15.0711 9.92893 16.75 12 16.75C14.0711 16.75 15.75 15.0711 15.75 13C15.75 10.9289 14.0711 9.25 12 9.25Z" fill="currentColor"/>','cancel':'<path fill-rule="evenodd" clip-rule="evenodd" d="M7.3445 4.01721C10.4136 3.67419 13.5864 3.67419 16.6555 4.01721C18.3682 4.20863 19.7499 5.55804 19.9511 7.27753C20.318 10.4152 20.318 13.5849 19.9511 16.7225C19.7499 18.442 18.3682 19.7914 16.6555 19.9828C13.5864 20.3258 10.4136 20.3258 7.3445 19.9828C5.63178 19.7914 4.25002 18.442 4.04891 16.7225C3.68194 13.5849 3.68194 10.4152 4.04891 7.27753C4.25002 5.55804 5.63178 4.20863 7.3445 4.01721ZM8.46967 8.46967C8.76256 8.17678 9.23744 8.17678 9.53033 8.46967L12 10.9393L14.4697 8.46968C14.7626 8.17679 15.2374 8.17679 15.5303 8.46968C15.8232 8.76257 15.8232 9.23745 15.5303 9.53034L13.0607 12L15.5303 14.4697C15.8232 14.7626 15.8232 15.2374 15.5303 15.5303C15.2374 15.8232 14.7626 15.8232 14.4697 15.5303L12 13.0607L9.53034 15.5303C9.23744 15.8232 8.76257 15.8232 8.46968 15.5303C8.17678 15.2374 8.17678 14.7626 8.46968 14.4697L10.9393 12L8.46967 9.53033C8.17678 9.23744 8.17678 8.76256 8.46967 8.46967Z" fill="currentColor"/>','card':'<path fill-rule="evenodd" clip-rule="evenodd" d="M19.1841 4.66612L12 4.49982L4.81592 4.66612C3.36417 4.69563 2.13342 5.74215 1.87094 7.17028C1.28407 10.3634 1.28407 13.6367 1.87094 16.8298C2.13342 18.2579 3.36416 19.3044 4.81592 19.3339L12 19.5002L19.1841 19.3339C20.6359 19.3044 21.8666 18.2579 22.1291 16.8298C22.716 13.6367 22.716 10.3634 22.1291 7.17028C21.8666 5.74215 20.6359 4.69563 19.1841 4.66612ZM21 11C21 11.5523 20.5523 12 20 12H4C3.44772 12 3 11.5523 3 11C3 10.4477 3.44772 10 4 10H20C20.5523 10 21 10.4477 21 11Z" fill="currentColor"/>','chart_pie':'<path d="M11.25 2.7454C11.25 2.6288 11.1501 2.53678 11.0341 2.5485C6.24107 3.03249 2.5 7.07936 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5C14.6367 21.5 17.0227 20.4254 18.7434 18.6915C18.8256 18.6087 18.8165 18.4734 18.7258 18.4L11.5286 12.5833C11.3524 12.4409 11.25 12.2265 11.25 12V2.7454Z" fill="currentColor"/><path d="M19.6695 17.2341C19.7601 17.3074 19.8942 17.2879 19.958 17.1903C20.7671 15.9522 21.2952 14.5134 21.4515 12.9654C21.4632 12.8494 21.3712 12.75 21.2546 12.75H14.6868C14.4983 12.75 14.4145 12.987 14.5611 13.1055L19.6695 17.2341Z" fill="currentColor"/><path d="M21.2546 11.25C21.3712 11.25 21.4632 11.1502 21.4515 11.0342C20.9996 6.55868 17.4413 3.00039 12.9658 2.54849C12.8498 2.53678 12.75 2.6288 12.75 2.7454V10.95C12.75 11.1157 12.8843 11.25 13.05 11.25H21.2546Z" fill="currentColor"/>','check':'<path fill-rule="evenodd" clip-rule="evenodd" d="M18.0303 7.96967C18.3232 8.26256 18.3232 8.73744 18.0303 9.03033L11.0303 16.0303C10.7374 16.3232 10.2626 16.3232 9.96967 16.0303L5.96967 12.0303C5.67678 11.7374 5.67678 11.2626 5.96967 10.9697C6.26256 10.6768 6.73744 10.6768 7.03033 10.9697L10.5 14.4393L16.9697 7.96967C17.2626 7.67678 17.7374 7.67678 18.0303 7.96967Z" fill="currentColor"/>','clipboard':'<path fill-rule="evenodd" clip-rule="evenodd" d="M11 2.25C9.48122 2.25 8.25 3.48122 8.25 5V7C8.25 7.41421 8.58579 7.75 9 7.75H15C15.4142 7.75 15.75 7.41421 15.75 7V5C15.75 3.48122 14.5188 2.25 13 2.25H11ZM9.75 5C9.75 4.30964 10.3096 3.75 11 3.75H13C13.6904 3.75 14.25 4.30964 14.25 5V6.25H9.75V5Z" fill="currentColor"/><path d="M6.75346 5.10483C6.75371 4.96463 6.61335 4.86816 6.48693 4.92877C5.30161 5.49701 4.5 6.70697 4.5 8.08545V18.5749C4.5 20.2857 5.77431 21.7285 7.47197 21.9399C10.479 22.3144 13.521 22.3144 16.528 21.9399C18.2257 21.7285 19.5 20.2857 19.5 18.5749V8.08546C19.5 6.70679 18.7016 5.49669 17.5165 4.92855C17.3903 4.868 17.25 4.96422 17.25 5.10426V7.00001C17.25 8.24265 16.2426 9.25001 15 9.25001H9C7.75736 9.25001 6.75 8.24265 6.75 7.00001L6.75346 5.10483Z" fill="currentColor"/>','columns':'<path d="M10.5417 19.2669C11.0144 14.4338 11.0144 9.56617 10.5417 4.73308C10.4992 4.29836 10.2011 3.9323 9.78901 3.79853C8.14609 3.26521 6.35391 3.26521 4.71099 3.79853C4.29893 3.93229 4.00079 4.29836 3.95828 4.73308C3.48563 9.56617 3.48563 14.4338 3.95828 19.2669C4.00079 19.7016 4.29893 20.0677 4.71099 20.2015C6.35391 20.7348 8.14609 20.7348 9.78901 20.2015C10.2011 20.0677 10.4992 19.7016 10.5417 19.2669Z" fill="currentColor"/><path d="M20.0417 19.2669C20.5144 14.4338 20.5144 9.56617 20.0417 4.73308C19.9992 4.29836 19.7011 3.9323 19.289 3.79853C17.6461 3.26521 15.8539 3.26521 14.211 3.79853C13.7989 3.93229 13.5008 4.29836 13.4583 4.73308C12.9856 9.56617 12.9856 14.4338 13.4583 19.2669C13.5008 19.7016 13.7989 20.0677 14.211 20.2015C15.8539 20.7348 17.6461 20.7348 19.289 20.2015C19.7011 20.0677 19.9992 19.7016 20.0417 19.2669Z" fill="currentColor"/>','copy':'<path d="M3.25 9C3.25 5.82436 5.82436 3.25 9 3.25H16.0129C16.4271 3.25 16.7629 3.58579 16.7629 4C16.7629 4.41421 16.4271 4.75 16.0129 4.75H9C6.65279 4.75 4.75 6.65279 4.75 9V16.1069C4.75 16.5211 4.41421 16.8569 4 16.8569C3.58579 16.8569 3.25 16.5211 3.25 16.1069V9Z" fill="currentColor"/><path d="M18.4026 6.79326C15.1616 6.43104 11.8384 6.43104 8.59748 6.79326C7.6742 6.89645 6.93227 7.62304 6.82344 8.55348C6.43906 11.84 6.43906 15.16 6.82344 18.4465C6.93227 19.377 7.6742 20.1035 8.59748 20.2067C11.8384 20.569 15.1616 20.569 18.4026 20.2067C19.3258 20.1035 20.0678 19.377 20.1766 18.4465C20.561 15.16 20.561 11.84 20.1766 8.55348C20.0678 7.62304 19.3258 6.89645 18.4026 6.79326Z" fill="currentColor"/>','diamond':'<path d="M9.37536 20.3998C9.5237 20.5323 9.74858 20.388 9.6929 20.197L7.17342 11.5589C7.12651 11.398 6.9843 11.2835 6.81719 11.2713C6.40945 11.2413 6.0019 11.2078 5.59459 11.1708L2.22417 10.8644C2.06681 10.8501 1.95605 11.0151 2.03055 11.1545C3.85362 14.5643 6.47882 17.8133 9.37536 20.3998Z" fill="currentColor"/><path d="M11.8471 22.2259C11.8675 22.2956 11.9274 22.348 12 22.348C12.0726 22.348 12.1325 22.2956 12.1529 22.2259L15.2368 11.6525C15.2752 11.5208 15.1725 11.3903 15.0354 11.3962C13.0127 11.4831 10.9873 11.4831 8.96465 11.3962C8.82751 11.3903 8.72482 11.5208 8.76325 11.6525L11.8471 22.2259Z" fill="currentColor"/><path d="M14.3071 20.197C14.2514 20.388 14.4763 20.5323 14.6246 20.3998C17.5212 17.8133 20.1464 14.5643 21.9694 11.1545C22.0439 11.0151 21.9332 10.8501 21.7758 10.8644L18.4054 11.1708C17.9981 11.2078 17.5906 11.2413 17.1828 11.2713C17.0157 11.2835 16.8735 11.398 16.8266 11.5589L14.3071 20.197Z" fill="currentColor"/><path d="M21.801 9.35593C21.9534 9.34207 22.0344 9.16918 21.9475 9.0432L18.7097 4.34841C18.4297 3.94243 17.9681 3.70001 17.4749 3.70001H14.9853C14.8431 3.70001 14.7464 3.84409 14.8001 3.97566L17.0569 9.49903C17.1225 9.65958 17.2841 9.75968 17.4569 9.74602C17.7279 9.7246 17.9988 9.70158 18.2696 9.67696L21.801 9.35593Z" fill="currentColor"/><path d="M13.1651 3.94617C13.103 3.79711 12.9573 3.70001 12.7958 3.70001H11.2042C11.0427 3.70001 10.8971 3.79711 10.8349 3.94617L8.47739 9.60429C8.42422 9.7319 8.51347 9.87367 8.65155 9.88036C10.8825 9.98836 13.1175 9.98836 15.3485 9.88035C15.4865 9.87367 15.5758 9.7319 15.5226 9.60429L13.1651 3.94617Z" fill="currentColor"/><path d="M9.19988 3.97566C9.25364 3.84409 9.15687 3.70001 9.01474 3.70001H6.5251C6.03193 3.70001 5.57026 3.94243 5.29028 4.34841L2.05249 9.0432C1.96561 9.16918 2.04663 9.34207 2.19903 9.35593L5.73039 9.67696C6.00118 9.70158 6.27207 9.7246 6.54306 9.74602C6.71595 9.75968 6.87755 9.65958 6.94314 9.49903L9.19988 3.97566Z" fill="currentColor"/>','edit_alt':'<path d="M14.6066 3.5C14.7392 3.5 14.8664 3.55268 14.9602 3.64645L17.7886 6.47487C17.9838 6.67014 17.9838 6.98672 17.7886 7.18198L8.59619 16.3744C8.53337 16.4372 8.45495 16.4821 8.369 16.5046L4.54057 17.5046C4.36883 17.5494 4.18617 17.4999 4.06066 17.3744C3.93514 17.2489 3.88558 17.0662 3.93044 16.8945L4.93044 13.066C4.95289 12.9801 4.99784 12.9017 5.06066 12.8388L14.253 3.64645C14.3468 3.55268 14.474 3.5 14.6066 3.5Z" fill="currentColor"/><path d="M4 19.25C3.58579 19.25 3.25 19.5858 3.25 20C3.25 20.4142 3.58579 20.75 4 20.75H19C19.4142 20.75 19.75 20.4142 19.75 20C19.75 19.5858 19.4142 19.25 19 19.25H4Z" fill="currentColor"/>','envelope':'<path d="M7.28918 4.90761C10.4238 4.63513 13.5762 4.63512 16.7108 4.90761L18.2211 5.03889C19.2264 5.12629 20.0875 5.72596 20.5337 6.58374C20.5907 6.69347 20.5479 6.82633 20.4428 6.89144L14.1768 10.7704C12.833 11.6023 11.1384 11.6197 9.77772 10.8157L3.46989 7.08833C3.36798 7.02811 3.3212 6.90415 3.36713 6.79505C3.77529 5.82548 4.69292 5.1333 5.77895 5.0389L7.28918 4.90761Z" fill="currentColor"/><path d="M3.362 8.76688C3.20603 8.67472 3.00703 8.7739 2.98885 8.95414C2.73512 11.4698 2.79653 14.0092 3.17308 16.5133C3.3716 17.8334 4.44901 18.8455 5.77895 18.9611L7.28918 19.0924C10.4238 19.3649 13.5762 19.3649 16.7108 19.0924L18.2211 18.9611C19.551 18.8455 20.6284 17.8334 20.8269 16.5133C21.2145 13.9363 21.2682 11.3217 20.9882 8.73428C20.9685 8.55276 20.7662 8.45541 20.6109 8.55151L14.9664 12.0458C13.1482 13.1713 10.8556 13.1949 9.01462 12.1071L3.362 8.76688Z" fill="currentColor"/>','fire':'<path d="M12.0625 2.06496C11.7729 1.93798 11.4876 2.02681 11.3041 2.2137C11.1259 2.39524 11.0367 2.67231 11.0992 2.95167C11.1979 3.39261 11.25 3.85136 11.25 4.32258C11.25 5.39842 10.9789 6.15193 10.5123 6.77657C10.038 7.41156 9.35149 7.92851 8.48466 8.5118C8.47103 8.52097 8.45834 8.53146 8.44678 8.54311L8.34179 8.64891C6.48195 9.85046 5.25 11.9426 5.25 14.3226C5.25 18.0505 8.27208 21.0726 12 21.0726C15.7279 21.0726 18.75 18.0505 18.75 14.3226C18.75 13.228 18.4893 12.1936 18.0264 11.2788C17.9887 11.2044 17.9164 11.1537 17.8336 11.1435C17.7508 11.1334 17.6684 11.1653 17.614 11.2284C17.5435 11.3102 17.4744 11.3909 17.4064 11.4704C16.5281 12.4965 15.8193 13.3247 14.3662 13.6946C14.3044 13.7103 14.266 13.6986 14.2387 13.6816C14.2067 13.6616 14.1716 13.6216 14.1476 13.5577C14.0975 13.4246 14.119 13.2548 14.2216 13.1436C14.9988 12.301 15.5509 11.1572 15.7482 9.53005C16.1177 6.48215 14.7325 3.23556 12.0625 2.06496Z" fill="currentColor"/>','folder':'<path d="M20.5852 17.1555C21.0276 14.7345 21.0554 12.2559 20.6675 9.8256L20.6034 9.42416C20.4362 8.37679 19.5328 7.60612 18.4722 7.60612L9.75932 7.60612C9.72654 7.60612 9.69997 7.57955 9.69997 7.54677C9.69997 6.55444 8.89553 5.75 7.9032 5.75H5.61164C4.50844 5.75 3.57921 6.57432 3.44768 7.66965L3.17519 9.93877C2.89151 12.3011 2.96472 14.6927 3.39238 17.0333C3.5669 17.9885 4.36574 18.7045 5.33425 18.7738L6.84826 18.8821C10.2784 19.1275 13.7216 19.1275 17.1517 18.8821L18.7896 18.7649C19.6852 18.7008 20.4239 18.0387 20.5852 17.1555Z" fill="currentColor"/>','globe':'<path d="M18.955 3.10571C19.2478 2.81282 19.2478 2.33794 18.955 2.04505C18.6621 1.75216 18.1872 1.75216 17.8943 2.04505L17.1872 2.75216C16.6917 3.24759 16.7171 4.01746 17.1493 4.49977C20.0518 7.73853 19.9465 12.7207 16.8336 15.8336C15.2236 17.4437 13.1135 18.2491 11.0032 18.25L11 18.25L10.997 18.25C9.02922 18.2493 7.06174 17.5491 5.49977 16.1493C5.01746 15.7171 4.24759 15.6917 3.75216 16.1872L3.04505 16.8943C2.75216 17.1872 2.75216 17.6621 3.04505 17.955C3.33794 18.2478 3.81282 18.2478 4.10571 17.955L4.65616 17.4045C6.27594 18.7951 8.24373 19.5674 10.25 19.7213V21.25H8.5C8.08579 21.25 7.75 21.5858 7.75 22C7.75 22.4142 8.08579 22.75 8.5 22.75H13.5C13.9142 22.75 14.25 22.4142 14.25 22C14.25 21.5858 13.9142 21.25 13.5 21.25H11.75V19.7213C13.9897 19.5496 16.1813 18.6073 17.8943 16.8943C21.5235 13.2651 21.6935 7.48724 18.4045 3.65616L18.955 3.10571Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 10C4.5 6.41015 7.41015 3.5 11 3.5C14.5899 3.5 17.5 6.41015 17.5 10C17.5 13.5899 14.5899 16.5 11 16.5C7.41015 16.5 4.5 13.5899 4.5 10ZM13 6.25C11.4812 6.25 10.25 7.48122 10.25 9C10.25 10.5188 11.4812 11.75 13 11.75C14.5188 11.75 15.75 10.5188 15.75 9C15.75 7.48122 14.5188 6.25 13 6.25ZM6.25 12.5C6.25 11.8096 6.80964 11.25 7.5 11.25C8.19036 11.25 8.75 11.8096 8.75 12.5C8.75 13.1904 8.19036 13.75 7.5 13.75C6.80964 13.75 6.25 13.1904 6.25 12.5Z" fill="currentColor"/>','headphone':'<path d="M12 3.75C8.43559 3.75 5.75 6.2048 5.75 9V10.5123C5.83223 10.5042 5.91563 10.5 6 10.5H8C8.82843 10.5 9.5 11.1716 9.5 12V17C9.5 17.8284 8.82843 18.5 8 18.5H6C4.61929 18.5 3.5 17.3807 3.5 16V13C3.5 12.3007 3.78716 11.6684 4.25 11.2146V9C4.25 5.16778 7.83242 2.25 12 2.25C16.1676 2.25 19.75 5.16778 19.75 9V11.2146C20.2128 11.6684 20.5 12.3007 20.5 13V16C20.5 17.3807 19.3807 18.5 18 18.5H16C15.1716 18.5 14.5 17.8284 14.5 17V12C14.5 11.1716 15.1716 10.5 16 10.5H18C18.0844 10.5 18.1678 10.5042 18.25 10.5123V9C18.25 6.2048 15.5644 3.75 12 3.75Z" fill="currentColor"/>','heart':'<path d="M8.4 5.25C5.61914 5.25 3.25 7.3293 3.25 10.0298C3.25 11.8927 4.12235 13.4612 5.27849 14.7604C6.43066 16.0552 7.91714 17.142 9.26097 18.0516L11.5796 19.6211C11.8335 19.793 12.1665 19.793 12.4204 19.6211L14.739 18.0516C16.0829 17.142 17.5693 16.0552 18.7215 14.7604C19.8777 13.4612 20.75 11.8927 20.75 10.0298C20.75 7.3293 18.3809 5.25 15.6 5.25C14.1665 5.25 12.9052 5.92214 12 6.79183C11.0948 5.92214 9.83347 5.25 8.4 5.25Z" fill="currentColor"/>','info_circle':'<path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 12C3.25 7.16751 7.16751 3.25 12 3.25C16.8325 3.25 20.75 7.16751 20.75 12C20.75 16.8325 16.8325 20.75 12 20.75C7.16751 20.75 3.25 16.8325 3.25 12ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8ZM12 10.75C12.4142 10.75 12.75 11.0858 12.75 11.5V16.5C12.75 16.9142 12.4142 17.25 12 17.25C11.5858 17.25 11.25 16.9142 11.25 16.5V11.5C11.25 11.0858 11.5858 10.75 12 10.75Z" fill="currentColor"/>','info_triangle':'<path fill-rule="evenodd" clip-rule="evenodd" d="M9.72961 3.99262C10.8216 2.39495 13.1784 2.39496 14.2703 3.99262L14.7023 4.62457C17.4083 8.58379 19.7333 12.7904 21.646 17.1881L21.7362 17.3955C22.4103 18.9453 21.3919 20.705 19.7124 20.8927C14.5867 21.4656 9.41323 21.4656 4.2876 20.8927C2.60805 20.705 1.58969 18.9453 2.26374 17.3955L2.35396 17.1881C4.26669 12.7904 6.59165 8.58378 9.29769 4.62457L9.72961 3.99262ZM13 8.99999C13 9.55227 12.5523 9.99999 12 9.99999C11.4477 9.99999 11 9.55227 11 8.99999C11 8.4477 11.4477 7.99999 12 7.99999C12.5523 7.99999 13 8.4477 13 8.99999ZM12 11.75C12.4142 11.75 12.75 12.0858 12.75 12.5V17.5C12.75 17.9142 12.4142 18.25 12 18.25C11.5858 18.25 11.25 17.9142 11.25 17.5V12.5C11.25 12.0858 11.5858 11.75 12 11.75Z" fill="currentColor"/>','lightning':'<path d="M14.6041 2.76067C13.0635 2.58531 11.5079 2.58531 9.96734 2.76067L8.37201 2.94225C8.13603 2.96911 7.95151 3.15827 7.93052 3.39484L7.80789 4.77662C7.60172 7.09985 7.60172 9.43677 7.80789 11.76L7.93052 13.1418C7.95341 13.3998 8.16954 13.5976 8.42856 13.5976H10.5V21C10.5 21.2124 10.6342 21.4017 10.8347 21.4719C11.0351 21.5421 11.2581 21.478 11.3907 21.3121L11.7814 20.8229C14.1108 17.9064 15.9656 14.6408 17.2776 11.1464L17.4681 10.6392C17.5257 10.4856 17.5044 10.3135 17.411 10.1787C17.3176 10.0439 17.164 9.96343 17 9.96343H14.2869L16.6124 3.61092C16.6651 3.46694 16.6488 3.30675 16.5682 3.1763C16.4877 3.04586 16.3517 2.95959 16.1994 2.94225L14.6041 2.76067Z" fill="currentColor"/>','like':'<path d="M11.337 3.75C10.879 3.75001 10.4499 3.97406 10.1882 4.34991L5.95631 10.427C5.16164 11.5682 4.80745 12.9587 4.95934 14.341L5.28477 17.3024C5.42383 18.5679 6.4173 19.5703 7.68151 19.7207L9.79855 19.9725C11.4152 20.1648 13.0544 19.9981 14.5992 19.4843C15.6806 19.1246 16.5467 18.3039 16.964 17.2435L18.6726 12.9014C18.7552 12.6914 18.8123 12.4722 18.8427 12.2485C19.107 10.3014 17.3476 8.68822 15.4306 9.12017L11.5327 9.99848L12.6926 5.49935C12.921 4.61335 12.2519 3.74998 11.337 3.75Z" fill="currentColor"/>','lock':'<path fill-rule="evenodd" clip-rule="evenodd" d="M7.30621 7.75816L7.64927 10.8457L6.95505 10.9011C5.98695 10.9784 5.19645 11.7062 5.03952 12.6646C4.67783 14.8735 4.67783 17.1265 5.03952 19.3354C5.19645 20.2938 5.98695 21.0215 6.95505 21.0988L8.45118 21.2183C10.8133 21.4068 13.1867 21.4068 15.5489 21.2183L17.045 21.0988C18.0131 21.0215 18.8036 20.2938 18.9605 19.3354C19.3222 17.1265 19.3222 14.8735 18.9605 12.6646C18.8036 11.7062 18.0131 10.9784 17.045 10.9011L16.3507 10.8457L16.6937 7.75815C16.7342 7.39418 16.7342 7.02684 16.6937 6.66286L16.671 6.45797C16.4295 4.28458 14.7209 2.56492 12.5491 2.30941C12.1843 2.26649 11.8157 2.26649 11.4509 2.30941C9.27907 2.56492 7.57046 4.28457 7.32898 6.45796L7.30621 6.66286C7.26577 7.02684 7.26577 7.39418 7.30621 7.75816ZM12.3738 3.79914C12.1255 3.76992 11.8745 3.76992 11.6261 3.79914C10.1475 3.97309 8.98422 5.1439 8.8198 6.62361L8.79704 6.82851C8.76883 7.08239 8.76883 7.33862 8.79704 7.59251L9.14583 10.7317C11.0466 10.6098 12.9533 10.6098 14.8541 10.7317L15.2029 7.59251C15.2311 7.33862 15.2311 7.08239 15.2029 6.82851L15.1802 6.62361C15.0157 5.1439 13.8525 3.97309 12.3738 3.79914ZM12 14.5C11.1716 14.5 10.5 15.1716 10.5 16C10.5 16.8284 11.1716 17.5 12 17.5C12.8284 17.5 13.5 16.8284 13.5 16C13.5 15.1716 12.8284 14.5 12 14.5Z" fill="currentColor"/>','notification':'<path fill-rule="evenodd" clip-rule="evenodd" d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V3.75H10.4426C8.21751 3.75 6.37591 5.48001 6.23702 7.70074L6.01601 11.2342C5.93175 12.5814 5.47946 13.8797 4.7084 14.9876C4.01172 15.9886 4.63194 17.3712 5.84287 17.5165L9.25 17.9254V19C9.25 20.5188 10.4812 21.75 12 21.75C13.5188 21.75 14.75 20.5188 14.75 19V17.9254L18.1571 17.5165C19.3681 17.3712 19.9883 15.9886 19.2916 14.9876C18.5205 13.8797 18.0682 12.5814 17.984 11.2342L17.763 7.70074C17.6241 5.48001 15.7825 3.75 13.5574 3.75H13V3ZM10.75 19C10.75 19.6904 11.3096 20.25 12 20.25C12.6904 20.25 13.25 19.6904 13.25 19V18.25H10.75V19Z" fill="currentColor"/>','pin':'<path d="M16.4321 4.07853C15.8067 3.45322 14.7476 3.65719 14.3992 4.47002L12.6399 8.57526C11.1944 8.14698 9.56519 8.50302 8.42358 9.64464L7.06704 11.0012C6.77414 11.2941 6.77414 11.7689 7.06704 12.0618L9.20881 14.2036L3.46961 19.9428C3.17672 20.2357 3.17672 20.7106 3.46961 21.0035C3.7625 21.2964 4.23738 21.2964 4.53027 21.0035L10.2695 15.2643L12.4113 17.4061C12.7042 17.699 13.1791 17.699 13.4719 17.4061L14.8285 16.0496C15.9701 14.9079 16.3262 13.2787 15.8979 11.8333L20.0031 10.0739C20.8159 9.72551 21.0199 8.66637 20.3946 8.04105L16.4321 4.07853Z" fill="currentColor"/>','power':'<path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 12C3.25 7.16751 7.16751 3.25 12 3.25C16.8325 3.25 20.75 7.16751 20.75 12C20.75 16.8325 16.8325 20.75 12 20.75C7.16751 20.75 3.25 16.8325 3.25 12ZM12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12V7C11.25 6.58579 11.5858 6.25 12 6.25ZM10 8.08223C10 7.89948 9.81059 7.7796 9.65181 7.87007C8.21726 8.68749 7.25 10.2308 7.25 12C7.25 14.6234 9.37665 16.75 12 16.75C14.6234 16.75 16.75 14.6234 16.75 12C16.75 10.2308 15.7827 8.68749 14.3482 7.87007C14.1894 7.7796 14 7.89948 14 8.08223V9.31619C14 9.39312 14.0358 9.46532 14.0946 9.51493C14.8012 10.1111 15.25 11.0031 15.25 12C15.25 13.7949 13.7949 15.25 12 15.25C10.2051 15.25 8.75 13.7949 8.75 12C8.75 11.0031 9.19881 10.1111 9.90539 9.51493C9.96419 9.46532 10 9.39312 10 9.31619V8.08223Z" fill="currentColor"/>','sand_watch':'<path fill-rule="evenodd" clip-rule="evenodd" d="M10.6637 11.8386L10.851 12L10.6637 12.1614C8.68826 13.8634 7.04583 15.9172 5.81982 18.2185C5.33871 19.1216 5.93601 20.2227 6.95536 20.3118L8.1289 20.4144C10.7047 20.6396 13.2953 20.6396 15.8711 20.4144L17.0447 20.3118C18.064 20.2227 18.6613 19.1216 18.1802 18.2185C16.9542 15.9172 15.3118 13.8634 13.3363 12.1614L13.149 12L13.3363 11.8386C15.3118 10.1366 16.9542 8.08279 18.1802 5.78147C18.6613 4.8784 18.064 3.77732 17.0447 3.6882L15.8711 3.58559C13.2953 3.36038 10.7047 3.36039 8.1289 3.58559L6.95536 3.6882C5.93601 3.77732 5.33871 4.8784 5.81982 5.78148C7.04583 8.08279 8.68826 10.1366 10.6637 11.8386ZM12 9.75C11.801 9.75 11.6103 9.67098 11.4696 9.53033L9.46963 7.53033C9.25513 7.31583 9.19097 6.99324 9.30705 6.71298C9.42314 6.43273 9.69661 6.25 9.99996 6.25H14C14.3033 6.25 14.5768 6.43273 14.6929 6.71298C14.809 6.99324 14.7448 7.31583 14.5303 7.53033L12.5303 9.53033C12.3896 9.67098 12.1989 9.75 12 9.75ZM12 14.25C11.801 14.25 11.6103 14.329 11.4696 14.4697L9.46963 16.4697C9.25513 16.6842 9.19097 17.0068 9.30705 17.287C9.42314 17.5673 9.69661 17.75 9.99996 17.75H14C14.3033 17.75 14.5768 17.5673 14.6929 17.287C14.809 17.0068 14.7448 16.6842 14.5303 16.4697L12.5303 14.4697C12.3896 14.329 12.1989 14.25 12 14.25Z" fill="currentColor"/>','share':'<path d="M17.5 2.5C15.8431 2.5 14.5 3.84315 14.5 5.5C14.5 5.76447 14.5342 6.02096 14.5985 6.26526C14.5276 6.2799 14.4577 6.30512 14.3909 6.34157L11.6343 7.84513L8.1279 9.84881C8.09206 9.86929 8.05855 9.89228 8.02747 9.91743C7.58006 9.65224 7.05781 9.5 6.5 9.5C4.84315 9.5 3.5 10.8431 3.5 12.5C3.5 14.1569 4.84315 15.5 6.5 15.5C7.37407 15.5 8.16083 15.1262 8.70915 14.5297L11.6357 16.1556L14.5902 17.7671C14.5313 18.0017 14.5 18.2472 14.5 18.5C14.5 20.1569 15.8431 21.5 17.5 21.5C19.1569 21.5 20.5 20.1569 20.5 18.5C20.5 16.8431 19.1569 15.5 17.5 15.5C16.6356 15.5 15.8565 15.8656 15.3091 16.4506L12.3617 14.843L9.4163 13.2066C9.47101 12.98 9.5 12.7434 9.5 12.5C9.5 11.9603 9.35749 11.4539 9.10805 11.0164L12.3657 9.15486L15.1091 7.65842C15.1762 7.62185 15.2354 7.57653 15.2862 7.52466C15.8347 8.12408 16.6235 8.5 17.5 8.5C19.1569 8.5 20.5 7.15685 20.5 5.5C20.5 3.84315 19.1569 2.5 17.5 2.5Z" fill="currentColor"/>','star':'<path d="M12.8649 2.99622C12.4796 2.33207 11.5204 2.33207 11.1351 2.99622L8.42101 7.67353C8.23064 8.00161 7.90159 8.22551 7.52653 8.28215L2.44021 9.05038C1.58593 9.17941 1.28627 10.258 1.95158 10.8092L5.74067 13.9484C6.09141 14.239 6.25633 14.6974 6.17113 15.1448L5.17996 20.35C5.02327 21.1728 5.88706 21.8121 6.62821 21.4219L11.4176 18.9C11.7821 18.7081 12.2178 18.7081 12.5824 18.9L17.3718 21.4219C18.1129 21.8121 18.9767 21.1728 18.82 20.35L17.8289 15.1448C17.7437 14.6974 17.9086 14.239 18.2593 13.9484L22.0484 10.8092C22.7137 10.258 22.4141 9.17941 21.5598 9.05038L16.4735 8.28215C16.0984 8.22551 15.7694 8.00161 15.579 7.67353L12.8649 2.99622Z" fill="currentColor"/>','sun':'<path d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3C12.75 3.41421 12.4142 3.75 12 3.75C11.5858 3.75 11.25 3.41421 11.25 3V2C11.25 1.58579 11.5858 1.25 12 1.25Z" fill="currentColor"/><path d="M12 6.25C8.82436 6.25 6.25 8.82436 6.25 12C6.25 15.1756 8.82436 17.75 12 17.75C15.1756 17.75 17.75 15.1756 17.75 12C17.75 8.82436 15.1756 6.25 12 6.25Z" fill="currentColor"/><path d="M5.45928 4.39862C5.16638 4.10573 4.69151 4.10573 4.39862 4.39862C4.10572 4.69152 4.10572 5.16639 4.39862 5.45929L5.10572 6.16639C5.39862 6.45929 5.87349 6.45929 6.16638 6.16639C6.45928 5.8735 6.45928 5.39862 6.16638 5.10573L5.45928 4.39862Z" fill="currentColor"/><path d="M22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H21C20.5858 12.75 20.25 12.4142 20.25 12C20.25 11.5858 20.5858 11.25 21 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12Z" fill="currentColor"/><path d="M19.6014 5.45928C19.8943 5.16638 19.8943 4.69151 19.6014 4.39862C19.3085 4.10572 18.8336 4.10572 18.5407 4.39862L17.8336 5.10572C17.5407 5.39862 17.5407 5.87349 17.8336 6.16638C18.1265 6.45928 18.6014 6.45928 18.8943 6.16638L19.6014 5.45928Z" fill="currentColor"/><path d="M12 20.25C12.4142 20.25 12.75 20.5858 12.75 21V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V21C11.25 20.5858 11.5858 20.25 12 20.25Z" fill="currentColor"/><path d="M18.8943 17.8336C18.6014 17.5407 18.1266 17.5407 17.8337 17.8336C17.5408 18.1265 17.5408 18.6014 17.8337 18.8943L18.5408 19.6014C18.8337 19.8943 19.3085 19.8943 19.6014 19.6014C19.8943 19.3085 19.8943 18.8336 19.6014 18.5407L18.8943 17.8336Z" fill="currentColor"/><path d="M3.75 12C3.75 12.4142 3.41421 12.75 3 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3C3.41421 11.25 3.75 11.5858 3.75 12Z" fill="currentColor"/><path d="M6.16632 18.8943C6.45921 18.6014 6.45921 18.1265 6.16632 17.8336C5.87342 17.5407 5.39855 17.5407 5.10566 17.8336L4.39855 18.5407C4.10566 18.8336 4.10566 19.3085 4.39855 19.6014C4.69144 19.8943 5.16632 19.8943 5.45921 19.6014L6.16632 18.8943Z" fill="currentColor"/>','timer':'<path d="M9.99999 3.57843C9.58578 3.57843 9.24999 3.24264 9.24999 2.82843C9.24999 2.41422 9.58578 2.07843 9.99999 2.07843H13.5355C13.9497 2.07843 14.2855 2.41422 14.2855 2.82843C14.2855 3.24264 13.9497 3.57843 13.5355 3.57843H9.99999Z" fill="currentColor"/><path d="M6.53033 4.03033C6.82322 4.32323 6.82322 4.7981 6.53033 5.09099L4.03033 7.59099C3.73744 7.88389 3.26256 7.88389 2.96967 7.59099C2.67678 7.2981 2.67678 6.82323 2.96967 6.53033L5.46967 4.03033C5.76256 3.73744 6.23744 3.73744 6.53033 4.03033Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 5.06066C7.30558 5.06066 3.5 8.86624 3.5 13.5607C3.5 18.2551 7.30558 22.0607 12 22.0607C16.6944 22.0607 20.5 18.2551 20.5 13.5607C20.5 8.86624 16.6944 5.06066 12 5.06066ZM16.9909 8.77144C17.1457 8.5724 17.128 8.28922 16.9497 8.11092C16.7714 7.93261 16.4883 7.91498 16.2892 8.06979L13.1153 10.5384L11.0397 12.021C10.6629 12.2901 10.4393 12.7246 10.4393 13.1876C10.4393 13.9794 11.0812 14.6213 11.873 14.6213C12.3361 14.6213 12.7706 14.3977 13.0397 14.0209L14.5223 11.9454L16.9909 8.77144Z" fill="currentColor"/>','user_plus':'<path d="M11 3.75C8.92893 3.75 7.25 5.42893 7.25 7.5C7.25 9.57107 8.92893 11.25 11 11.25C13.0711 11.25 14.75 9.57107 14.75 7.5C14.75 5.42893 13.0711 3.75 11 3.75Z" fill="currentColor"/><path d="M7 13.25C4.92893 13.25 3.25 14.9289 3.25 17V18.1883C3.25 18.9415 3.79588 19.5837 4.53927 19.7051C8.8181 20.4037 13.1819 20.4037 17.4607 19.7051C18.2041 19.5837 18.75 18.9415 18.75 18.1883V17C18.75 14.9289 17.0711 13.25 15 13.25H14.6591C14.4746 13.25 14.2913 13.2792 14.1159 13.3364L13.2504 13.6191C11.7881 14.0965 10.2119 14.0965 8.74959 13.6191L7.88407 13.3364C7.70869 13.2792 7.52536 13.25 7.34087 13.25H7Z" fill="currentColor"/><path d="M19.5 6.25C19.9142 6.25 20.25 6.58579 20.25 7V8.75H22C22.4142 8.75 22.75 9.08579 22.75 9.5C22.75 9.91421 22.4142 10.25 22 10.25H20.25V12C20.25 12.4142 19.9142 12.75 19.5 12.75C19.0858 12.75 18.75 12.4142 18.75 12V10.25H17C16.5858 10.25 16.25 9.91421 16.25 9.5C16.25 9.08579 16.5858 8.75 17 8.75H18.75V7C18.75 6.58579 19.0858 6.25 19.5 6.25Z" fill="currentColor"/>','wallet':'<path fill-rule="evenodd" clip-rule="evenodd" d="M21.0102 10.1713L21.0128 13.7942C20.9873 14.1393 20.9544 14.484 20.9141 14.8281C20.8468 15.4035 20.3791 15.8677 19.7917 15.9333C17.9519 16.139 16.0481 16.139 14.2084 15.9333C13.621 15.8677 13.1532 15.4035 13.0859 14.8281C12.8661 12.9491 12.8661 11.0509 13.0859 9.17189C13.1532 8.59648 13.621 8.13234 14.2084 8.06669C16.0481 7.86107 17.9519 7.86107 19.7917 8.06669C20.3791 8.13234 20.8468 8.59648 20.9141 9.17189C20.953 9.5045 20.9851 9.8377 21.0102 10.1713ZM17 10.5C16.1716 10.5 15.5 11.1716 15.5 12C15.5 12.8284 16.1716 13.5 17 13.5C17.8284 13.5 18.5 12.8284 18.5 12C18.5 11.1716 17.8284 10.5 17 10.5Z" fill="currentColor"/><path d="M20.4036 6.03973C20.5591 6.30899 20.2673 6.61051 19.9583 6.57597C18.0078 6.35798 15.9922 6.35798 14.0417 6.57597C12.7724 6.71784 11.7458 7.71738 11.5961 8.99764C11.3628 10.9924 11.3628 13.0076 11.5961 15.0024C11.7458 16.2826 12.7724 17.2822 14.0417 17.4241C15.9922 17.642 18.0078 17.642 19.9583 17.4241C20.2693 17.3893 20.5636 17.6929 20.4066 17.9637C19.628 19.3065 18.2399 20.2437 16.6268 20.4134L15.975 20.482C12.6641 20.8304 9.32468 20.8074 6.01893 20.4135L5.58698 20.362C3.80486 20.1497 2.39281 18.7573 2.15544 16.9784C1.71454 13.6741 1.71454 10.3259 2.15544 7.02166C2.39281 5.2427 3.80486 3.85034 5.58698 3.63798L6.01892 3.58651C9.32467 3.19258 12.6641 3.16961 15.975 3.51801L16.6268 3.58661C18.2412 3.75649 19.6271 4.6951 20.4036 6.03973Z" fill="currentColor"/>'};
// Ícones de traço (não preenchidos)
var ICON_STROKE={
'cross':'<path d="M8.46445 15.5355L15.5355 8.46446"/><path d="M8.46446 8.46447L15.5355 15.5355"/>'
};
function svgIcon(name,size,cls){
  size=size||16;cls=cls||'';
  if(ICON_STROKE[name]){
    return '<svg class="'+cls+'" width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" style="display:inline-block;vertical-align:middle;flex-shrink:0">'+ICON_STROKE[name]+'</svg>';
  }
  var p=ICON_PATHS[name];if(!p)return '';
  return '<svg class="'+cls+'" width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block;vertical-align:middle;flex-shrink:0">'+p+'</svg>';
}

function wizFaces(qkey,auto,score){
  if(!score)return '';
  if(!S.wiz.autoHumors)S.wiz.autoHumors={};
  S.wiz.autoHumors[qkey]=auto;
  var cur=S.wiz.humors[qkey];
  var hasOverride=(cur!==undefined&&cur!==null);
  var active=hasOverride?cur:auto;
  var html='<div class="wiz-humor"><div class="wiz-humor-lbl">Humor desta pergunta <span style="color:var(--t3);font-weight:400">(automático · clique para alterar)</span></div><div class="wiz-faces">';
  FKEYS.forEach(function(k,i){
    var fc=FCOLORS[k];
    var isActive=active===i;
    var isAuto=!hasOverride&&auto===i;
    var style='background:'+fc.bg+';border-color:'+fc.bd+';color:'+fc.tx+';'+(isActive?'border-width:2px':'');
    var cls='wiz-face-btn'+(isAuto?' wf-auto':'');
    html+='<div class="'+cls+'" style="'+style+'" onclick="wizSetH(\''+qkey+'\','+i+')">'+face(k,18)+' '+FLABELS[i]+(isAuto?'<span style="font-size:9px;opacity:.6;margin-left:3px;border:1px dashed currentColor;padding:0 4px;border-radius:3px">auto</span>':'')+'</div>';
  });
  return html+'</div></div>';
}
function wizSetH(key,level){
  S.wiz.humors[key]=level;
  if(S.editFollow)S.editFollowDirty=true;
  render();
}
function wizA(key,val){
  S.wiz.answers[key]=val;
  S.wizBlockedMsg=false;
  if(S.editFollow)S.editFollowDirty=true;
  render();
}
function wizAText(key,val){
  S.wiz.answers[key]=val;
  if(S.editFollow)S.editFollowDirty=true;
}
function wizNav(step,total){
  var pct=Math.round((step/total)*100);
  return '<div class="wiz-progress"><div class="wiz-progress-fill" style="width:'+pct+'%"></div></div>';
}
function wizBtnNav(step,total,canNext){
  var isFirst=step===0;
  var isLast=step===total-1;
  return '<div class="wiz-nav">'
    +(isFirst?'<span></span>':'<button class="btn btn-sm" onclick="wizGo('+(step-1)+')">← Anterior</button>')
    +'<span class="wiz-counter">'+( step+1)+' / '+total+'</span>'
    +(isLast?'<button class="btn-primary btn-sm" onclick="wizFinish()">'+svgIcon('check',12)+' Concluir</button>':'<button class="btn-primary btn-sm" onclick="wizGo('+(step+1)+')" '+(canNext===false?'disabled':'')+'>Próxima →</button>')
    +'</div>';
}
function wizAutoSave(){
  var ci=S.sel;var c=S.clients[ci];
  if(!c)return;
  c.wizDraft={step:S.wiz.step,type:S.wiz.type,answers:Object.assign({},S.wiz.answers),humors:Object.assign({},S.wiz.humors),autoHumors:Object.assign({},S.wiz.autoHumors||{}),savedAt:new Date().toISOString()};
  saveState();
}
function wizExitConfirm(){
  if(confirm('Você ainda não terminou seu follow-up. Tem certeza que deseja voltar à página anterior?')){
    wizAutoSave();
    goBackToClient();
  }
}
function delInProgressFollow(){
  if(!confirm('Tem certeza que deseja excluir este follow-up em andamento? O progresso será perdido.'))return;
  var ci=S.sel,c=S.clients[ci];
  if(c&&c.wizDraft){c.wizDraft=null;saveState();}
  S.editFollow=null;
  goBackToClient();
  S.clientTab='follows';
  render();
}
function wizGo(step){S.wiz.step=step;S.wizBlockedMsg=false;wizAutoSave();render();}
function wizLbl(n,total,hint,icon){
  return '<div class="wiz-step-lbl"><span style="font-size:18px">'+icon+'</span>Pergunta '+(n+1)+' de '+total+'</div>'
    +(hint?'<div class="wiz-hint">'+svgIcon('pin',14)+' Verificar: '+hint+'</div>':'');
}

var WIZ_CHANNELS=[
  {key:'airbnb',name:'Airbnb',color:'#FF385C',abbr:'Ai',main:true},
  {key:'booking',name:'Booking',color:'#003580',abbr:'Bk',main:true},
  {key:'decolar',name:'Decolar',color:'#7B2FFF',abbr:'De',main:true},
  {key:'expedia',name:'Expedia',color:'#FFC72C',abbr:'Ex',textColor:'#1D2F6F',main:true},
  {key:'vrbo',name:'VRBO',color:'#1B2A6B',abbr:'VR',main:false},
  {key:'website',name:'Website',color:'#1c383d',abbr:'We',main:false},
  {key:'googlevr',name:'Google VR',color:'#34A853',abbr:'GV',main:false},
  {key:'homesvillas',name:'H&Villas',color:'#c084fc',abbr:'HV',textColor:'#4c1d95',main:false}
];

function wizQ1(){
  var a=S.wiz.answers;
  var isRec=S.wiz.type==='recurring';
  // Pré-preenche o total de unidades a partir do perfil do cliente (editável)
  if((a.units_count===undefined||a.units_count===''||a.units_count===null)&&!isRec){
    var _cli=S.clients[S.sel];
    if(_cli&&_cli.units!==undefined&&_cli.units!==null&&_cli.units!=='')a.units_count=+_cli.units;
  }
  var prevCount=(isRec&&S.wiz.prevAnswers)?+S.wiz.prevAnswers.units_count||0:0;
  var prevBanner=(isRec&&prevCount)?'<div class="wiz-info-banner">'+svgIcon('chart',14)+' No último follow ('+formatDate(S.wiz.prevFollowDate||'')+'): <strong>'+prevCount+' unidades</strong></div>':'';
  // Auto-detect change on recurring based on current vs previous
  if(isRec&&prevCount&&a.units_count!==undefined&&a.units_count!==''){
    var cur=+a.units_count;
    if(cur>prevCount){a.units_changed='ganhou';a.units_delta=cur-prevCount;}
    else if(cur<prevCount){a.units_changed='perdeu';a.units_delta=prevCount-cur;}
    else{a.units_changed='nao';a.units_delta=0;}
  }
  // Humor calc: percentage based on previous base (recurring) or on delta input (first)
  var auto=2;
  var base=isRec?prevCount:((+a.units_count||0)-((a.units_changed==='ganhou'?1:-1)*(+a.units_delta||0)));
  if(a.units_changed==='ganhou'&&a.units_delta){
    var pctG=prevCount>0?(+a.units_delta/prevCount):(base>0?(+a.units_delta/base):1);
    auto=pctG>0.2?4:3;
  }
  if(a.units_changed==='perdeu'&&a.units_delta){
    var pctP=prevCount>0?(+a.units_delta/prevCount):(base>0?(+a.units_delta/base):1);
    auto=pctP>0.2?0:1;
  }
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Quantas unidades o cliente tem atualmente?</div>';
  html+='<div class="wiz-q-sub">Coloque o número ATUAL de unidades (já considerando o que foi adicionado ou removido).</div>';
  html+=prevBanner;
  html+='<input class="wiz-input wiz-input-sm" type="number" placeholder="Ex: 40" value="'+(a.units_count||'')+'" oninput="wizAText(\'units_count\',+this.value)" onchange="wizUnitsChanged()" style="margin-bottom:1.25rem">';
  if(isRec){
    // On recurring, show auto-detected change (read-only info)
    if(a.units_changed==='ganhou')html+='<div class="wiz-info-banner" style="border-color:#22c55e;background:#dcfce7;color:#166534">'+svgIcon('arrow_up',14)+' Detectado automaticamente: <strong>ganhou '+a.units_delta+' unidade(s)</strong> desde o último follow.</div>';
    else if(a.units_changed==='perdeu')html+='<div class="wiz-info-banner" style="border-color:#ef4444;background:#fee2e2;color:#7f1d1d">'+svgIcon('arrow_down',14)+' Detectado automaticamente: <strong>perdeu '+a.units_delta+' unidade(s)</strong> desde o último follow.</div>';
    else if(a.units_changed==='nao'&&a.units_count)html+='<div class="wiz-info-banner">'+svgIcon('columns',14)+' Sem mudança no número de unidades desde o último follow.</div>';
  }else{
    // First analysis: manual selection
    html+='<div class="wiz-sub-section"><div class="wiz-sub-q">As unidades aumentaram ou diminuíram recentemente?</div>';
    html+='<div class="wiz-opts">';
    html+='<div class="wiz-opt'+(a.units_changed==='nao'?' sel':'')+'" onclick="wizA(\'units_changed\',\'nao\')"><span class="wiz-opt-ico">'+svgIcon('columns',16)+'</span><span class="wiz-opt-lbl">Não, manteve igual</span></div>';
    html+='<div class="wiz-opt'+(a.units_changed==='ganhou'?' sel':'')+'" onclick="wizA(\'units_changed\',\'ganhou\')"><span class="wiz-opt-ico">'+svgIcon('arrow_up',16)+'</span><span class="wiz-opt-lbl">Sim, ganhou unidades</span></div>';
    html+='<div class="wiz-opt'+(a.units_changed==='perdeu'?' sel':'')+'" onclick="wizA(\'units_changed\',\'perdeu\')"><span class="wiz-opt-ico">'+svgIcon('arrow_down',16)+'</span><span class="wiz-opt-lbl">Sim, perdeu unidades</span></div>';
    html+='</div>';
    if(a.units_changed==='ganhou'||a.units_changed==='perdeu'){
      html+='<div style="margin-top:.75rem"><label style="font-size:13px;color:var(--t2)">Quantas unidades '+(a.units_changed==='ganhou'?'ganhou':'perdeu')+'? <span style="color:var(--t3);font-size:11px">(não altera o total acima)</span></label><br><input class="wiz-input wiz-input-sm" type="number" style="margin-top:4px" placeholder="Qtd" value="'+(a.units_delta||'')+'" oninput="wizAText(\'units_delta\',+this.value)" onchange="render()"></div>';
    }
    html+='</div>';
  }
  html+=wizFaces('units',auto,true);
  html+='</div>';
  return html;
}
function wizUnitsChanged(){
  if(S.editFollow)S.editFollowDirty=true;
  var a=S.wiz.answers;
  // Sync client's units field with the wizard value
  if(a.units_count!==undefined&&a.units_count!==''){
    S.clients[S.sel].units=+a.units_count;
  }
  render();
}

// ══════════════════════════════════════════════════
// MEMORIA DE CIDADE E TEMPORADA (em prova)
// ══════════════════════════════════════════════════
// Temporada e geografia, nao segredo de carteira: se alguem ja registrou que em
// Sao Paulo a alta vai de Dez a Mar, o proximo analista com cliente em Sao Paulo
// nao precisa descobrir isso de novo. A memoria le o que JA foi preenchido em
// todos os clientes e sugere; o analista confirma ou corrige. Nada e inventado —
// se ninguem nunca registrou aquela cidade, nao ha sugestao nenhuma.
function cityKey(nome){
  return String(nome||'').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
}
var _citySeasonCache=null;
function invalidateCitySeasonMemory(){_citySeasonCache=null;}
function citySeasonMemory(){
  if(_citySeasonCache)return _citySeasonCache;
  var mapa={};
  (S.clients||[]).forEach(function(c){
    var f=getLatestFollow(c);
    var cities=(f&&f.answers&&f.answers.cities)||[];
    cities.forEach(function(ct){
      var k=cityKey(ct.name);if(!k)return;
      var s=ct.seasons||{};
      var alta=(s.alta||[]).filter(function(p){return p.start&&p.end;});
      var baixa=(s.baixa||[]).filter(function(p){return p.start&&p.end;});
      if(!alta.length&&!baixa.length)return; // cidade sem temporada nao tem o que lembrar
      if(!mapa[k])mapa[k]={nome:String(ct.name).trim(),variantes:{}};
      // Clientes que registraram a MESMA temporada contam juntos, pra sugerir a
      // versao mais comum em vez da ultima que apareceu na varredura.
      var sig=JSON.stringify({alta:alta,baixa:baixa});
      if(!mapa[k].variantes[sig])mapa[k].variantes[sig]={alta:alta,baixa:baixa,n:0};
      mapa[k].variantes[sig].n++;
    });
  });
  var out={};
  Object.keys(mapa).forEach(function(k){
    var vars=Object.keys(mapa[k].variantes).map(function(s){return mapa[k].variantes[s];});
    vars.sort(function(x,y){return y.n-x.n;});
    out[k]={nome:mapa[k].nome,alta:vars[0].alta,baixa:vars[0].baixa,
      n:vars[0].n,total:vars.reduce(function(t,v){return t+v.n;},0)};
  });
  _citySeasonCache=out;
  return out;
}
// Cidades ja registradas que combinam com o que esta sendo digitado. Cidade que
// ja esta neste follow nao aparece de novo.
function citySuggestions(termo){
  var t=cityKey(termo);
  var mem=citySeasonMemory();
  var jaTem=((S.wiz&&S.wiz.answers&&S.wiz.answers.cities)||[]).map(function(c){return cityKey(c.name);});
  return Object.keys(mem)
    .filter(function(k){return jaTem.indexOf(k)<0&&(!t||k.indexOf(t)>=0);})
    .sort(function(x,y){
      var ax=t&&x.indexOf(t)===0?0:1,ay=t&&y.indexOf(t)===0?0:1;
      if(ax!==ay)return ax-ay;                          // quem comeca com o termo vem antes
      if(mem[y].total!==mem[x].total)return mem[y].total-mem[x].total; // depois, o mais usado
      return x.localeCompare(y);
    })
    .slice(0,6).map(function(k){return mem[k];});
}
function citySeasonResumo(s){
  var r=[];
  if(s.alta.length)r.push('alta '+s.alta.map(function(p){return p.start+'–'+p.end;}).join(', '));
  if(s.baixa.length)r.push('baixa '+s.baixa.map(function(p){return p.start+'–'+p.end;}).join(', '));
  return r.join(' · ');
}
function wizCitySugHTML(termo){
  var sug=citySuggestions(termo);
  if(!sug.length)return'';
  var h='<div class="wiz-city-sug-hd">Cidades já registradas — clique pra trazer a temporada junto</div>';
  sug.forEach(function(s){
    h+='<button class="wiz-city-sug" onclick="wizPickCitySuggestion(\''+jsq(s.nome)+'\')">'
      +'<span class="wiz-city-sug-n">'+svgIcon('pin',12)+' '+e(s.nome)+'</span>'
      +'<span class="wiz-city-sug-s">'+e(citySeasonResumo(s))+'</span></button>';
  });
  return h;
}
// Atualiza so a lista, sem render() — um render a cada tecla faria o campo perder
// o foco no meio da palavra (o mesmo tropeco do calendario do NPS).
function wizCityInput(v){
  var box=document.getElementById('wiz-city-sug');
  if(box)box.innerHTML=wizCitySugHTML(v);
}
function wizPickCitySuggestion(nome){
  if(S.editFollow)S.editFollowDirty=true;
  var mem=citySeasonMemory()[cityKey(nome)];
  var a=S.wiz.answers;if(!a.cities)a.cities=[];
  var copia=function(arr){return JSON.parse(JSON.stringify(arr||[]));};
  a.cities.push({
    name:mem?mem.nome:nome,units:'',principal:false,
    seasons:{alta:copia(mem&&mem.alta),baixa:copia(mem&&mem.baixa)},
    // Fica marcado como sugestao ate o analista confirmar ou editar: ninguem deve
    // levar adiante um palpite do sistema sem ter olhado.
    seasonSuggested:!!(mem&&(mem.alta.length||mem.baixa.length))
  });
  wizRecalcPrincipal();
  S.wiz.editingCityIdx=a.cities.length-1;
  var inp=document.getElementById('wiz-city-inp');if(inp)inp.value='';
  render();
}
function wizConfirmCitySeason(i){
  var c=((S.wiz.answers||{}).cities||[])[i];if(!c)return;
  delete c.seasonSuggested;
  if(S.editFollow)S.editFollowDirty=true;
  render();
}
// "Todas": copia o total de unidades do cliente pra esta cidade, igual ao atalho
// que ja existe em cada canal de venda.
function wizCityAll(i){
  var a=S.wiz.answers;var c=(a.cities||[])[i];if(!c)return;
  if(S.editFollow)S.editFollowDirty=true;
  c.units=+(a.units_count)||0;
  wizRecalcPrincipal();
  render();
}
function wizQ2(){
  var a=S.wiz.answers;
  var cities=a.cities||[];
  var unitsTotal=+(a.units_count)||0;
  var months=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  function mOpts(sel){return months.map(function(m){return '<option value="'+m+'"'+(sel===m?' selected':'')+'>'+m+'</option>';}).join('');}
  function periodsHTML(i,kind,label,icon){
    var c=cities[i];var periods=(c.seasons&&c.seasons[kind])||[];
    var h='<div style="margin-top:8px"><div style="font-size:12px;color:var(--t2);margin-bottom:4px">'+svgIcon(icon,14)+' '+label+'</div>';
    periods.forEach(function(p,pi){
      h+='<div class="wiz-row" style="margin-bottom:4px"><select class="wiz-input" style="flex:1;font-size:12px" onchange="wizSetSeasonPeriod('+i+',\''+kind+'\','+pi+',\'start\',this.value)"><option value="">Início</option>'+mOpts(p.start)+'</select><select class="wiz-input" style="flex:1;font-size:12px" onchange="wizSetSeasonPeriod('+i+',\''+kind+'\','+pi+',\'end\',this.value)"><option value="">Fim</option>'+mOpts(p.end)+'</select><button style="background:none;border:none;cursor:pointer;color:var(--t3)" onclick="wizRemSeasonPeriod('+i+',\''+kind+'\','+pi+')">×</button></div>';
    });
    h+='<button class="btn btn-sm" onclick="wizAddSeasonPeriod('+i+',\''+kind+'\')">+ Período</button></div>';
    return h;
  }
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Em quais cidades/regiões o cliente anuncia?</div>';
  html+='<div class="wiz-q-sub">Para cada cidade, informe as unidades e os períodos de temporada alta e baixa (pode ter mais de um período cada). A cidade com mais unidades vira a principal automaticamente. Sem score — só informativo.</div>';
  cities.forEach(function(c,i){
    var isOpen=S.wiz.editingCityIdx===i;
    html+='<div style="border:1px solid var(--bd);border-radius:8px;padding:10px 12px;margin-bottom:8px;background:var(--surf2)">';
    html+='<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">';
    html+='<span style="cursor:pointer;flex:1;font-weight:'+(c.principal?'700':'500')+'" onclick="wizOpenCity('+i+')">'+svgIcon('pin',14)+' '+e(c.name)+(c.principal?' <span style="color:var(--b600);font-size:11px">(principal)</span>':'')+'</span>';
    html+='<input class="wiz-input wiz-input-sm" type="number" min="0" placeholder="Unidades" style="width:90px" value="'+(c.units!==undefined&&c.units!==null&&c.units!==''?c.units:'')+'" onchange="wizCitySet('+i+',\'units\',this.value)">';
    if(hasBeta()&&unitsTotal)html+='<button class="btn btn-sm" title="Usar o total de '+unitsTotal+' unidades do cliente" onclick="wizCityAll('+i+')">Todas</button>';
    if(!c.principal)html+='<button class="btn btn-sm" onclick="wizSetPrincipal('+i+')">Marcar principal</button>';
    html+='<button style="background:none;border:none;cursor:pointer;color:var(--t3);font-size:14px" onclick="wizRemCity('+i+')">×</button>';
    html+='</div>';
    if(hasBeta()&&c.seasonSuggested){
      html+='<div class="wiz-city-warn">'+svgIcon('lightbulb',13)+' Temporada sugerida a partir de outros clientes em <strong>'+e(c.name)+'</strong>. Confira e ajuste se precisar. <button class="btn btn-sm" style="margin-left:6px" onclick="wizConfirmCitySeason('+i+')">Confirmar</button></div>';
    }
    if(isOpen){
      html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:8px">'+periodsHTML(i,'alta','Alta temporada','sun')+periodsHTML(i,'baixa','Baixa temporada','moon')+'</div>';
    }else{
      var altaC=((c.seasons&&c.seasons.alta)||[]).length,baixaC=((c.seasons&&c.seasons.baixa)||[]).length;
      html+='<div style="font-size:11px;color:var(--t3);margin-top:4px;cursor:pointer" onclick="wizOpenCity('+i+')">'+((altaC||baixaC)?altaC+' período(s) de alta · '+baixaC+' período(s) de baixa':'Clique para definir a temporada')+'</div>';
    }
    html+='</div>';
  });
  if(hasBeta()){
    html+='<div class="wiz-row" style="margin-bottom:.4rem"><input class="wiz-input" id="wiz-city-inp" type="text" placeholder="Buscar ou escrever a cidade..." autocomplete="off" style="flex:1" oninput="wizCityInput(this.value)"><button class="btn btn-sm" onclick="wizAddCity()">+ Adicionar cidade</button></div>';
    html+='<div class="wiz-city-sug-box" id="wiz-city-sug">'+wizCitySugHTML('')+'</div>';
  }else{
    html+='<div class="wiz-row" style="margin-bottom:.5rem"><input class="wiz-input" id="wiz-city-inp" type="text" placeholder="Nome da cidade..." style="flex:1"><button class="btn btn-sm" onclick="wizAddCity()">+ Adicionar cidade</button></div>';
  }
  html+='</div>';
  return html;
}

function wizRecalcPrincipal(){
  var a=S.wiz.answers;var cities=a.cities||[];if(!cities.length)return;
  if(a.principalManualIdx!==undefined&&a.principalManualIdx!==null&&cities[a.principalManualIdx]){
    cities.forEach(function(c,i){c.principal=(i===a.principalManualIdx);});return;
  }
  var maxI=0,maxU=-1;
  cities.forEach(function(c,i){var u=parseInt(c.units)||0;if(u>maxU){maxU=u;maxI=i;}});
  cities.forEach(function(c,i){c.principal=(i===maxI);});
}
function wizAddCity(){
  if(S.editFollow)S.editFollowDirty=true;
  var inp=document.getElementById('wiz-city-inp');var v=inp?inp.value.trim():'';if(!v)return;
  var a=S.wiz.answers;if(!a.cities)a.cities=[];
  a.cities.push({name:v,units:'',principal:false,seasons:{alta:[],baixa:[]}});
  wizRecalcPrincipal();
  S.wiz.editingCityIdx=a.cities.length-1;
  if(inp)inp.value='';
  render();
}
function wizRemCity(i){
  if(S.editFollow)S.editFollowDirty=true;var a=S.wiz.answers;if(a.cities)a.cities.splice(i,1);
  if(S.wiz.editingCityIdx===i)S.wiz.editingCityIdx=null;else if(S.wiz.editingCityIdx>i)S.wiz.editingCityIdx--;
  if(a.principalManualIdx===i)a.principalManualIdx=null;else if(a.principalManualIdx>i)a.principalManualIdx--;
  wizRecalcPrincipal();render();
}
function wizOpenCity(i){S.wiz.editingCityIdx=(S.wiz.editingCityIdx===i?null:i);render();}
function wizCitySet(i,field,val){
  var a=S.wiz.answers;var c=a.cities&&a.cities[i];if(!c)return;
  if(field==='units'){c.units=val===''?'':(parseInt(val)||0);wizRecalcPrincipal();}else c[field]=val;
  if(S.editFollow)S.editFollowDirty=true;render();
}
function wizSetPrincipal(i){
  var a=S.wiz.answers;(a.cities||[]).forEach(function(c,idx){c.principal=(idx===i);});a.principalManualIdx=i;
  if(S.editFollow)S.editFollowDirty=true;render();
}
function wizAddSeasonPeriod(i,kind){
  var a=S.wiz.answers;var c=a.cities&&a.cities[i];if(!c)return;if(!c.seasons)c.seasons={alta:[],baixa:[]};if(!c.seasons[kind])c.seasons[kind]=[];
  c.seasons[kind].push({start:'',end:''});
  delete c.seasonSuggested;
  if(S.editFollow)S.editFollowDirty=true;render();
}
function wizRemSeasonPeriod(i,kind,pi){
  var a=S.wiz.answers;var c=a.cities&&a.cities[i];if(!c||!c.seasons||!c.seasons[kind])return;
  c.seasons[kind].splice(pi,1);
  delete c.seasonSuggested;
  if(S.editFollow)S.editFollowDirty=true;render();
}
function wizSetSeasonPeriod(i,kind,pi,field,val){
  var a=S.wiz.answers;var c=a.cities&&a.cities[i];if(!c||!c.seasons||!c.seasons[kind]||!c.seasons[kind][pi])return;
  c.seasons[kind][pi][field]=val;
  // Mexer na temporada a mao ja e a conferencia: o aviso de sugestao sai sozinho.
  delete c.seasonSuggested;
  if(S.editFollow)S.editFollowDirty=true;render();
}

function wizQ3(){
  var a=S.wiz.answers;
  var model=a.pricing_model;
  var curSeason=wizCurrentSeason();
  var alert='';
  if(model==='fixo'&&curSeason==='low') alert='<div class="wiz-alert">'+svgIcon('alert',14)+' Este cliente está em <strong>temporada baixa</strong>. Que tal recomendar a troca para o modelo <strong>Flexível</strong>? <button class="btn btn-sm" style="margin-left:8px" onclick="wizCreateReminderPricing()">Criar lembrete (2 dias)</button> <button class="btn btn-sm" style="margin-left:4px" onclick="wizA(\'pricing_alert_ignored\',true)">Ignorar</button></div>';
  if(model==='flexivel'&&curSeason==='high') alert='<div class="wiz-alert">'+svgIcon('alert',14)+' Este cliente está em <strong>temporada alta</strong>. Que tal recomendar a troca para o modelo <strong>Fixo</strong>? <button class="btn btn-sm" style="margin-left:8px" onclick="wizCreateReminderPricing()">Criar lembrete (2 dias)</button> <button class="btn btn-sm" style="margin-left:4px" onclick="wizA(\'pricing_alert_ignored\',true)">Ignorar</button></div>';
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Modelo de precificação</div>';
  html+='<div class="wiz-q-sub">Qual o modelo atual? Sem score — mas o sistema avisa se estiver desalinhado com a temporada.</div>';
  html+='<div class="wiz-opts">';
  html+='<div class="wiz-opt'+(model==='fixo'?' sel':'')+'" onclick="wizA(\'pricing_model\',\'fixo\')"><span class="wiz-opt-ico">'+svgIcon('lock',16)+'</span><span class="wiz-opt-lbl">Fixo (per listing)</span></div>';
  html+='<div class="wiz-opt'+(model==='flexivel'?' sel':'')+'" onclick="wizA(\'pricing_model\',\'flexivel\')"><span class="wiz-opt-ico">'+svgIcon('chart_pie',16)+'</span><span class="wiz-opt-lbl">Flexível</span></div>';
  html+='</div>';
  if(alert&&!a.pricing_alert_ignored)html+=alert;
  html+='</div>';
  return html;
}

function wizCurrentSeason(){
  var r=resolveCitiesSeason(S.wiz.answers.cities||[]);
  return r?r.current:null;
}

function wizCreateReminderPricing(){
  var ci=S.sel;
  var dueDate=new Date(Date.now()+2*24*60*60*1000).toISOString().split('T')[0];
  if(!S.clients[ci].reminders)S.clients[ci].reminders=[];
  S.clients[ci].reminders.push({id:uid(),type:'proativo',title:'Recomendar mudança de modelo de precificação',dueDate:dueDate,note:'Verificar com o cliente se faz sentido trocar o modelo de precificação.',done:false,doneAt:null,archived:false,createdBy:S.appUser.uid,createdByName:S.appUser.name,createdAt:Date.now()});
  saveState();
  wizA('pricing_alert_ignored',true);
}

function wizQ4(){
  var a=S.wiz.answers;
  var chs=a.channels||[];
  function chActive(key){return chs.some(function(c){return c.key===key&&c.active;});}
  function chQty(key){var c=chs.find(function(c){return c.key===key;});return (c&&c.qty)?c.qty:'';}
  var mainActive=WIZ_CHANNELS.filter(function(c){return c.main&&chActive(c.key);}).length;
  var auto=mainActive>=3?4:(mainActive===2?3:(mainActive===1?1:0));
  var showMore=a.channels_show_more||false;
  var toShow=WIZ_CHANNELS.filter(function(c){return c.main||showMore;});
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Listings e canais conectados</div>';
  html+='<div class="wiz-q-sub">Clique nos canais ativos. Informe quantos anúncios estão conectados em cada um.</div>';
  if(S.wiz.type==='recurring'&&S.wiz.prevAnswers&&S.wiz.prevAnswers.channels){var CN={airbnb:'Airbnb',booking:'Booking',decolar:'Decolar',expedia:'Expedia',vrbo:'VRBO',website:'Website',googlevr:'Google VR',homesvillas:'H&Villas'};var prevChs=(S.wiz.prevAnswers.channels.filter(function(x){return x.active;}).map(function(x){return CN[x.key]+(x.qty?' ('+x.qty+')':'');})).join(', ');if(prevChs)html+='<div class="wiz-info-banner">'+svgIcon('chart',14)+' No último follow: <strong>'+prevChs+'</strong> — os dados abaixo já vêm pré-preenchidos, ajuste conforme mudou.</div>';}
  html+='<div class="wiz-ch-grid">';
  WIZ_CHANNELS.filter(function(c){return c.main;}).forEach(function(ch){
    var active=chActive(ch.key);
    var qty=chQty(ch.key);
    var u=+(a.units_count)||999;
    html+='<div class="wiz-ch'+(active?' active':'')+'" onclick="wizToggleCh(\''+ch.key+'\')"><div class="wiz-ch-logo" style="background:'+ch.color+';color:'+(ch.textColor||'#fff')+'">'+ch.abbr+'</div><div class="wiz-ch-name">'+ch.name+'</div>'+(active?'<div class="wiz-ch-qty"><input type="number" min="1" max="'+u+'" placeholder="Qtd" value="'+qty+'" onclick="event.stopPropagation()" oninput="wizChQty(\''+ch.key+'\',+this.value)" style="width:55px;padding:2px 5px;font-size:11px;border:1px solid var(--bd);border-radius:4px;background:var(--surf);color:var(--t)"><br><span style="font-size:10px;color:var(--b600);cursor:pointer" onclick="event.stopPropagation();wizChAll(\''+ch.key+'\')">Todos</span></div>':'')+'</div>';
  });
  html+='</div>';
  if(showMore){
    html+='<div class="wiz-ch-grid">';
    WIZ_CHANNELS.filter(function(c){return !c.main;}).forEach(function(ch){
      var active=chActive(ch.key);var qty=chQty(ch.key);var u=+(a.units_count)||999;
      html+='<div class="wiz-ch'+(active?' active':'')+'" onclick="wizToggleCh(\''+ch.key+'\')"><div class="wiz-ch-logo" style="background:'+ch.color+';color:'+(ch.textColor||'#fff')+'">'+ch.abbr+'</div><div class="wiz-ch-name">'+ch.name+'</div>'+(active?'<div class="wiz-ch-qty"><input type="number" min="1" max="'+u+'" placeholder="Qtd" value="'+qty+'" onclick="event.stopPropagation()" oninput="wizChQty(\''+ch.key+'\',+this.value)" style="width:55px;padding:2px 5px;font-size:11px;border:1px solid var(--bd);border-radius:4px;background:var(--surf);color:var(--t)"><br><span style="font-size:10px;color:var(--b600);cursor:pointer" onclick="event.stopPropagation();wizChAll(\''+ch.key+'\')">Todos</span></div>':'')+'</div>';
    });
    html+='</div>';
  }
  html+='<button class="btn btn-sm" style="font-size:11px;margin-bottom:.75rem" onclick="wizA(\'channels_show_more\','+(showMore?'false':'true')+')">'+(showMore?'− Ocultar outros canais':'+ Ver outros canais')+'</button>';
  html+='<textarea class="wiz-note" rows="2" placeholder="Observações sobre os canais (opcional)..." oninput="wizAText(\'channels_note\',this.value)">'+(a.channels_note||'')+'</textarea>';
  html+=wizFaces('channels',auto,true);
  html+='</div>';
  return html;
}

function wizToggleCh(key){
  if(S.editFollow)S.editFollowDirty=true;
  var a=S.wiz.answers;if(!a.channels)a.channels=[];
  var idx=a.channels.findIndex(function(c){return c.key===key;});
  if(idx>=0){a.channels[idx].active=!a.channels[idx].active;}
  else{a.channels.push({key:key,active:true,qty:'',all:false});}
  render();
}
function wizChQty(key,qty){
  if(S.editFollow)S.editFollowDirty=true;
  var a=S.wiz.answers;if(!a.channels)a.channels=[];
  var c=a.channels.find(function(c){return c.key===key;});
  if(c)c.qty=qty;
}
function wizChAll(key){
  if(S.editFollow)S.editFollowDirty=true;
  var a=S.wiz.answers;if(!a.channels)a.channels=[];
  var c=a.channels.find(function(c){return c.key===key;});
  var units=+(a.units_count)||0;
  if(c){c.qty=units;c.all=true;}
  render();
}

function wizQ5(){
  var a=S.wiz.answers;
  var val=a.domain_migration;
  var auto=val==='sim'?4:(val==='nao'?1:2);
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Migração de domínio</div>';
  html+='<div class="wiz-q-sub">O cliente tem domínio próprio ativo no site da Stays?</div>';
  html+='<div class="wiz-opts">';
  html+='<div class="wiz-opt'+(val==='sim'?' sel':'')+'" onclick="wizA(\'domain_migration\',\'sim\')"><span class="wiz-opt-ico">'+svgIcon('check',16)+'</span><span class="wiz-opt-lbl">Sim, tem domínio próprio ativo</span></div>';
  html+='<div class="wiz-opt'+(val==='nao'?' sel':'')+'" onclick="wizA(\'domain_migration\',\'nao\')"><span class="wiz-opt-ico">'+svgIcon('cancel',16)+'</span><span class="wiz-opt-lbl">Não tem domínio próprio</span></div>';
  html+='</div>';
  // Site do cliente: cadastrado uma vez aqui, some pra frente. Alimenta a
  // pergunta de personalização (link direto pra abrir e julgar) e o perfil
  // do cliente — sem precisar digitar de novo em cada follow.
  if(hasBeta()){
    html+='<div style="margin-top:.75rem"><label style="font-size:13px;color:var(--t2)">Site do cliente (opcional)</label>'
      +'<div class="wiz-row" style="margin-top:4px"><input class="wiz-input" type="text" placeholder="https://..." value="'+e(a.domain_website||'')+'" style="flex:1" onchange="wizA(\'domain_website\',this.value.trim())">'
      +(a.domain_website?'<a href="'+e(a.domain_website)+'" target="_blank" rel="noopener" class="btn btn-sm">'+svgIcon('share',12)+' Abrir</a>':'')
      +'</div></div>';
  }
  html+=wizFaces('domain',auto,true);
  html+='</div>';
  return html;
}

function wizQ6(){
  var a=S.wiz.answers;
  var opts=[
    {label:'Site bem personalizado (fotos, cores, textos próprios)',auto:4,ico:'award'},
    {label:'Personalização básica feita',auto:3,ico:'check'},
    {label:'Tem site mas sem personalização',auto:1,ico:'alert'},
    {label:'Não tem site / não usa',auto:0,ico:'cancel'},
    {label:'Outro (usa site externo ou situação diferente)',auto:-1,ico:'edit'}
  ];
  var sel=a.site_option;
  var auto=sel!==undefined&&sel!==null&&sel>=0?opts[sel].auto:2;
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Personalização de site</div>';
  html+='<div class="wiz-q-sub">Como está o nível de personalização do site do cliente?</div>';
  // Link direto pro site, vindo do que foi cadastrado na pergunta de migração
  // de domínio — abre o site pra julgar a personalização de olho, sem sair do
  // follow pra procurar o link em outro lugar.
  if(hasBeta()&&a.domain_website){
    html+='<div class="wiz-info-banner">'+svgIcon('share',14)+' Site do cliente: <a href="'+e(a.domain_website)+'" target="_blank" rel="noopener" style="font-weight:600">'+e(a.domain_website)+'</a></div>';
  }
  html+='<div class="wiz-opts">';
  opts.forEach(function(o,i){
    html+='<div class="wiz-opt'+(sel===i?' sel':'')+'" onclick="wizA(\'site_option\','+i+')"><span class="wiz-opt-ico">'+svgIcon(o.ico,16)+'</span><span class="wiz-opt-lbl">'+o.label+'</span></div>';
  });
  html+='</div>';
  if(sel===4){
    html+='<div style="margin-top:.75rem"><label style="font-size:13px;color:var(--t2)">Descreva a situação:</label><textarea class="wiz-note" rows="2" oninput="wizAText(\'site_other\',this.value)" placeholder="Ex: Cliente usa WordPress próprio bem personalizado...">'+(a.site_other||'')+'</textarea></div>';
  }
  html+=wizFaces('site',sel===4?2:auto,sel!==4);
  if(sel===4){html+='<div style="margin-top:.5rem;font-size:12px;color:var(--t3)">'+svgIcon('alert',14)+' Humor obrigatório para esta opção — selecione acima.</div>';}
  html+='</div>';
  return html;
}

function wizSetOccOption(key,idx){var a=S.wiz.answers;if(!a[key])a[key]={};a[key].option=idx;if(S.editFollow)S.editFollowDirty=true;render();}
function wizSetDatePart(key,field,part,val){
  var a=S.wiz.answers;var host=key?(a[key]=a[key]||{}):a;
  var pk=field+'_parts';
  if(!host[pk])host[pk]={d:'',m:'',y:''};
  host[pk][part]=val;
  var p=host[pk];
  host[field]=(p.y&&p.m&&p.d)?(p.y+'-'+p.m+'-'+p.d):'';
  if(S.editFollow)S.editFollowDirty=true;render();
}
function wizSetOccLastyearListings(val){var a=S.wiz.answers;if(!a.occ_lastyear)a.occ_lastyear={};var n=parseInt(val);a.occ_lastyear.listings=(val===''||isNaN(n))?'':n;if(S.editFollow)S.editFollowDirty=true;render();}
function dateTripletHTML(key,field,parts){
  parts=parts||{};
  var y=parts.y||'',m=parts.m||'',d=parts.d||'';
  var MESES=[['01','Jan'],['02','Fev'],['03','Mar'],['04','Abr'],['05','Mai'],['06','Jun'],['07','Jul'],['08','Ago'],['09','Set'],['10','Out'],['11','Nov'],['12','Dez']];
  var dayOpts='<option value="">Dia</option>';
  for(var dv=1;dv<=31;dv++){var dd=(dv<10?'0':'')+dv;dayOpts+='<option value="'+dd+'"'+(d===dd?' selected':'')+'>'+dv+'</option>';}
  var monthOpts='<option value="">Mês</option>';
  MESES.forEach(function(mv){monthOpts+='<option value="'+mv[0]+'"'+(m===mv[0]?' selected':'')+'>'+mv[1]+'</option>';});
  var yearNow=new Date().getFullYear();
  var yearOpts='<option value="">Ano</option>';
  for(var yy=yearNow-3;yy<=yearNow+1;yy++){yearOpts+='<option value="'+yy+'"'+(y===String(yy)?' selected':'')+'>'+yy+'</option>';}
  return '<select class="wiz-input wiz-input-sm" style="width:62px" onchange="wizSetDatePart(\''+key+'\',\''+field+'\',\'d\',this.value)">'+dayOpts+'</select>'
    +'<select class="wiz-input wiz-input-sm" style="width:68px" onchange="wizSetDatePart(\''+key+'\',\''+field+'\',\'m\',this.value)">'+monthOpts+'</select>'
    +'<select class="wiz-input wiz-input-sm" style="width:80px" onchange="wizSetDatePart(\''+key+'\',\''+field+'\',\'y\',this.value)">'+yearOpts+'</select>';
}
var OCC_OPT_AUTO=[4,3,2,1,0,2];
var OCC_OPT_SEMDADOS=5;
function calcOccupationHumorQualitative(curOpt,prevOpt,curUnits,prevUnits){
  if(curOpt===undefined||curOpt===null)return 2;
  var base=OCC_OPT_AUTO[curOpt];
  if(prevOpt===undefined||prevOpt===null||prevOpt===OCC_OPT_SEMDADOS||curOpt===OCC_OPT_SEMDADOS)return base;
  var prevAuto=OCC_OPT_AUTO[prevOpt];
  var curU=parseFloat(curUnits),prevU=parseFloat(prevUnits);
  var unitsDiffPct=(!isNaN(prevU)&&prevU>0&&!isNaN(curU))?Math.abs(curU-prevU)/prevU:1;
  if(base<prevAuto&&unitsDiffPct<=0.15)return Math.max(0,base-1);
  if(base>prevAuto)return Math.min(4,base+1);
  return base;
}
function wizQ7(){
  var a=S.wiz.answers;
  var season=wizCurrentSeason();
  var isHigh=season==='high';
  if(!a.occ_current)a.occ_current={};
  if(!a.occ_lastyear)a.occ_lastyear={};
  if(a.units_count!==undefined&&a.units_count!==null&&a.units_count!==''){a.occ_current.listings=a.units_count;}
  var opts_high=[
    {label:'Ótimo (75% ou mais)',ico:'fire'},
    {label:'Bom (50% a 74%)',ico:'check'},
    {label:'Neutro (35% a 49%)',ico:'info_triangle'},
    {label:'Ruim (25% a 34%)',ico:'alert'},
    {label:'Péssimo (abaixo de 25%)',ico:'cancel'},
    {label:'Sem dados / não consegui verificar',ico:'columns'}
  ];
  var opts_low=[
    {label:'Ótimo (50% ou mais)',ico:'fire'},
    {label:'Bom (35% a 49%)',ico:'check'},
    {label:'Neutro (25% a 34%)',ico:'info_triangle'},
    {label:'Ruim (15% a 24%)',ico:'alert'},
    {label:'Péssimo (abaixo de 15%)',ico:'cancel'},
    {label:'Sem dados / não consegui verificar',ico:'columns'}
  ];
  var opts=isHigh||!season?opts_high:opts_low;
  var curSel=a.occ_current.option;
  var prevSel=a.occ_lastyear.option;
  var auto=calcOccupationHumorQualitative(curSel,prevSel,a.occ_current.listings,a.occ_lastyear.listings);
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Ocupação</div>';
  if(season)html+='<div class="wiz-info-banner">'+svgIcon('calendar',14)+' Temporada atual: <strong>'+(isHigh?'Alta':'Baixa')+'</strong> — os percentuais de referência foram ajustados automaticamente.</div>';
  html+='<div class="wiz-q-sub">Avalie a ocupação atual e a do mesmo período no ano passado, para comparação.</div>';
  html+='<div class="wiz-sub-section"><div class="wiz-sub-q">Ocupação atual</div>';
  html+='<div class="wiz-opts">';
  opts.forEach(function(o,i){html+='<div class="wiz-opt'+(curSel===i?' sel':'')+'" onclick="wizSetOccOption(\'occ_current\','+i+')"><span class="wiz-opt-ico">'+svgIcon(o.ico,16)+'</span><span class="wiz-opt-lbl">'+o.label+'</span></div>';});
  html+='</div>';
  html+='<div style="margin-top:8px"><label style="font-size:11px;color:var(--t3)">Período analisado</label><div style="display:flex;align-items:center;gap:6px;margin-top:4px;flex-wrap:wrap">'+dateTripletHTML('occ_current','period_start',a.occ_current.period_start_parts)+'<span style="font-size:11px;color:var(--t3)">até</span>'+dateTripletHTML('occ_current','period_end',a.occ_current.period_end_parts)+'</div></div>';
  if(a.occ_current.listings)html+='<div style="font-size:11px;color:var(--t3);margin-top:4px">'+a.occ_current.listings+' unidades (automático)</div>';
  html+='</div>';
  html+='<div class="wiz-sub-section"><div class="wiz-sub-q">Ocupação no mesmo período do ano passado</div>';
  html+='<div class="wiz-opts">';
  opts.forEach(function(o,i){html+='<div class="wiz-opt'+(prevSel===i?' sel':'')+'" onclick="wizSetOccOption(\'occ_lastyear\','+i+')"><span class="wiz-opt-ico">'+svgIcon(o.ico,16)+'</span><span class="wiz-opt-lbl">'+o.label+'</span></div>';});
  html+='</div>';
  html+='<div style="margin-top:8px"><label style="font-size:11px;color:var(--t3)">Período analisado</label><div style="display:flex;align-items:center;gap:6px;margin-top:4px;flex-wrap:wrap">'+dateTripletHTML('occ_lastyear','period_start',a.occ_lastyear.period_start_parts)+'<span style="font-size:11px;color:var(--t3)">até</span>'+dateTripletHTML('occ_lastyear','period_end',a.occ_lastyear.period_end_parts)+'</div></div>';
  html+='<div style="margin-top:8px"><label style="font-size:11px;color:var(--t3)">Unidades no ano passado (editável)</label><br><input class="wiz-input wiz-input-sm" type="number" min="0" style="margin-top:2px" value="'+(a.occ_lastyear.listings!==undefined&&a.occ_lastyear.listings!==null?a.occ_lastyear.listings:'')+'" onchange="wizSetOccLastyearListings(this.value)"></div>';
  html+='</div>';
  html+=wizFaces('occupation',auto,true);
  html+='</div>';
  return html;
}

function wizQ8(){
  var a=S.wiz.answers;
  var opts=[
    {label:'Preço competitivo e bem posicionado',auto:4,ico:'heart'},
    {label:'Preço na média do mercado',auto:3,ico:'like'},
    {label:'Preço um pouco fora do ideal',auto:1,ico:'alert'},
    {label:'Preço muito fora do mercado',auto:0,ico:'cancel'},
    {label:'Sem dados suficientes',auto:2,ico:'info_triangle'}
  ];
  var sel=a.price_option;
  var auto=sel!==undefined&&sel!==null?opts[sel].auto:2;
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Preço competitivo?</div>';
  html+='<div class="wiz-q-sub">Compare o posicionamento de preço com os concorrentes na região.</div>';
  html+='<div class="wiz-opts">';
  opts.forEach(function(o,i){html+='<div class="wiz-opt'+(sel===i?' sel':'')+'" onclick="wizA(\'price_option\','+i+')"><span class="wiz-opt-ico">'+svgIcon(o.ico,16)+'</span><span class="wiz-opt-lbl">'+o.label+'</span></div>';});
  html+='</div>';
  html+=wizFaces('price',auto,true);
  html+='<div class="wiz-sub-section"><div class="wiz-sub-q">Usa alguma ferramenta de precificação automática?</div>';
  html+='<div class="wiz-opts">';
  html+='<div class="wiz-opt'+(a.pricing_tool==='sim'?' sel':'')+'" onclick="wizA(\'pricing_tool\',\'sim\')"><span class="wiz-opt-ico">'+svgIcon('check',16)+'</span><span class="wiz-opt-lbl">Sim, usa ferramenta de precificação</span></div>';
  html+='<div class="wiz-opt'+(a.pricing_tool==='nao'?' sel':'')+'" onclick="wizA(\'pricing_tool\',\'nao\')"><span class="wiz-opt-ico">'+svgIcon('cancel',16)+'</span><span class="wiz-opt-lbl">Não usa</span></div>';
  html+='</div>';
  if(a.pricing_tool==='sim'){
    html+='<div style="margin-top:.6rem"><label style="font-size:13px;color:var(--t2)">Qual ferramenta?</label><br><select class="wiz-input wiz-input-sm" style="margin-top:4px" onchange="wizA(\'pricing_tool_name\',this.value)"><option value="">Selecionar...</option>'+['Pricelabs','Turbosuite','Beyond Pricing','Outra'].map(function(opt){return'<option value="'+opt+'"'+(a.pricing_tool_name===opt?' selected':'')+'>'+opt+'</option>';}).join('')+'</select></div>';
  }
  // O mesmo conflito PriceLabs x desconto por duracao de estadia tambem aparece
  // aqui: esta pergunta vem DEPOIS da de usabilidade, entao quem escolheu o
  // desconto la atras so descobre o PriceLabs agora.
  if(hasBeta()&&wizPricelabsConflict(a))html+=wizPricelabsAlertHTML();
  html+='</div>';
  html+='</div>';
  return html;
}

function wizQ9(){
  var a=S.wiz.answers;
  var val=a.lastminute;
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Last minute padrão</div>';
  html+='<div class="wiz-q-sub">Só informativo, sem score. Verifique se o cliente tem limite configurado para reservas de última hora.</div>';
  html+='<div class="wiz-opts">';
  html+='<div class="wiz-opt'+(val==='sim'?' sel':'')+'" onclick="wizA(\'lastminute\',\'sim\')"><span class="wiz-opt-ico">'+svgIcon('timer',16)+'</span><span class="wiz-opt-lbl">Sim, tem last minute configurado</span></div>';
  html+='<div class="wiz-opt'+(val==='nao'?' sel':'')+'" onclick="wizA(\'lastminute\',\'nao\')"><span class="wiz-opt-ico">'+svgIcon('columns',16)+'</span><span class="wiz-opt-lbl">Não tem / não usa</span></div>';
  html+='</div>';
  if(val==='sim'){
    html+='<div class="wiz-sub-section"><div class="wiz-sub-q">Qual o horário limite?</div>';
    var hours=[];for(var h=0;h<24;h++){var hh=String(h).padStart(2,'0');hours.push(hh+':00');}
    html+='<select class="wiz-input" style="width:140px" onchange="wizA(\'lastminute_time\',this.value)"><option value="">Selecionar...</option>'+hours.map(function(hr){return'<option value="'+hr+'"'+(a.lastminute_time===hr?' selected':'')+'>'+hr+'</option>';}).join('')+'</select></div>';
    html+='<div class="wiz-sub-section"><div class="wiz-sub-q">Com quantos dias de antecedência é considerado last minute?</div>';
    var dayOpts=[];for(var d=1;d<=10;d++)dayOpts.push(d);
    html+='<select class="wiz-input" style="width:140px" onchange="wizA(\'lastminute_days\',this.value)"><option value="">Selecionar...</option>'+dayOpts.map(function(dv){return'<option value="'+dv+'"'+(String(a.lastminute_days)===String(dv)?' selected':'')+'>'+dv+' dia'+(dv>1?'s':'')+'</option>';}).join('')+'</select></div>';
  }
  html+='</div>';
  return html;
}

function wizQ10(){
  var a=S.wiz.answers;
  var pOpts=[
    {label:'Fotos excelentes, profissionais',auto:4,ico:'camera'},
    {label:'Fotos boas mas podem melhorar',auto:3,ico:'like'},
    {label:'Fotos fracas ou desatualizadas',auto:1,ico:'alert'},
    {label:'Sem fotos',auto:0,ico:'cancel'}
  ];
  var dOpts=[
    {label:'Descrição completa e atrativa',auto:4,ico:'edit_alt'},
    {label:'Descrição básica',auto:3,ico:'like'},
    {label:'Descrição fraca ou incompleta',auto:1,ico:'alert'},
    {label:'Sem descrição',auto:0,ico:'cancel'}
  ];
  var sp=a.photos_option,sd=a.description_option;
  var autoP=sp!==undefined&&sp!==null?pOpts[sp].auto:2;
  var autoD=sd!==undefined&&sd!==null?dOpts[sd].auto:2;
  var avgAuto=(sp!==undefined&&sp!==null&&sd!==undefined&&sd!==null)?Math.round((autoP+autoD)/2):2;
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Boas fotos? Boa descrição?</div>';
  html+='<div class="wiz-q-sub">Avalie separadamente a qualidade visual e textual dos anúncios. O humor final é a média das duas avaliações.</div>';
  html+='<div class="wiz-sub-section"><div class="wiz-sub-q">'+svgIcon('camera',14)+' Fotos dos anúncios</div><div class="wiz-opts">';
  pOpts.forEach(function(o,i){html+='<div class="wiz-opt'+(sp===i?' sel':'')+'" onclick="wizA(\'photos_option\','+i+')"><span class="wiz-opt-ico">'+svgIcon(o.ico,16)+'</span><span class="wiz-opt-lbl">'+o.label+'</span></div>';});
  html+='</div></div>';
  html+='<div class="wiz-sub-section"><div class="wiz-sub-q">'+svgIcon('edit_alt',14)+' Descrição dos anúncios</div><div class="wiz-opts">';
  dOpts.forEach(function(o,i){html+='<div class="wiz-opt'+(sd===i?' sel':'')+'" onclick="wizA(\'description_option\','+i+')"><span class="wiz-opt-ico">'+svgIcon(o.ico,16)+'</span><span class="wiz-opt-lbl">'+o.label+'</span></div>';});
  html+='</div></div>';
  html+=wizFaces('photos_desc',avgAuto,(sp!==undefined&&sp!==null&&sd!==undefined&&sd!==null));
  html+='</div>';
  return html;
}

function wizQ11(){
  var a=S.wiz.answers;
  var opts=[
    {label:'Sim, utiliza ativamente',auto:4,ico:'check'},
    {label:'Sim, mas usa pouco',auto:3,ico:'like'},
    {label:'Não utiliza',auto:1,ico:'cancel'},
    {label:'Não tem acesso / plano não inclui',auto:2,ico:'columns'}
  ];
  var sel=a.financial_option;
  var auto=sel!==undefined&&sel!==null?opts[sel].auto:2;
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Utiliza módulo financeiro?</div>';
  html+='<div class="wiz-q-sub">Centraliza a gestão de prestação de contas aos proprietários. Quanto mais usa, maior o engajamento com a plataforma.</div>';
  html+='<div class="wiz-opts">';
  opts.forEach(function(o,i){html+='<div class="wiz-opt'+(sel===i?' sel':'')+'" onclick="wizA(\'financial_option\','+i+')"><span class="wiz-opt-ico">'+svgIcon(o.ico,16)+'</span><span class="wiz-opt-lbl">'+o.label+'</span></div>';});
  html+='</div>';
  html+=wizFaces('financial',auto,true);
  html+='</div>';
  return html;
}

function wizQ12(){
  var a=S.wiz.answers;
  var opts=[
    {label:'Sim, utiliza ativamente',auto:4,ico:'check'},
    {label:'Sim, mas usa pouco',auto:3,ico:'like'},
    {label:'Não utiliza',auto:1,ico:'cancel'},
    {label:'Não tem acesso / plano não inclui',auto:2,ico:'columns'}
  ];
  var sel=a.operational_option;
  var auto=sel!==undefined&&sel!==null?opts[sel].auto:2;
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Utiliza módulo operacional ou alguma integração?</div>';
  html+='<div class="wiz-q-sub">Limpeza, manutenção, controle de tarefas. Aumenta a dependência e engajamento com a plataforma.</div>';
  html+='<div class="wiz-opts">';
  opts.forEach(function(o,i){html+='<div class="wiz-opt'+(sel===i?' sel':'')+'" onclick="wizA(\'operational_option\','+i+')"><span class="wiz-opt-ico">'+svgIcon(o.ico,16)+'</span><span class="wiz-opt-lbl">'+o.label+'</span></div>';});
  html+='</div>';
  html+=wizFaces('operational',auto,true);
  html+='</div>';
  return html;
}

function wizQ13(){
  var a=S.wiz.answers;
  var opts=[
    {label:'Sim, tem 2 ou mais integrações ativas',auto:4,ico:'share'},
    {label:'Sim, tem 1 integração ativa',auto:3,ico:'check'},
    {label:'Não tem nenhuma',auto:1,ico:'cancel'}
  ];
  var lockNone=a.pricing_tool==='sim';
  if(lockNone&&(a.appcenter_option===undefined||a.appcenter_option===null||a.appcenter_option===2)){a.appcenter_option=1;}
  if(lockNone&&a.pricing_tool_name&&!a.appcenter_detail){a.appcenter_detail=a.pricing_tool_name;}
  var sel=a.appcenter_option;
  var auto=sel!==undefined&&sel!==null?opts[sel].auto:2;
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Tem alguma integração ativa no App Center?</div>';
  html+='<div class="wiz-q-sub">Amplia funcionalidades e aumenta a dificuldade de churn.'+(lockNone?' <span style="color:var(--b600)">Como o cliente usa ferramenta de precificação, já conta como pelo menos 1 integração ativa.</span>':'')+'</div>';
  html+='<div class="wiz-opts">';
  opts.forEach(function(o,i){if(lockNone&&i===2)return;html+='<div class="wiz-opt'+(sel===i?' sel':'')+'" onclick="wizA(\'appcenter_option\','+i+')"><span class="wiz-opt-ico">'+svgIcon(o.ico,16)+'</span><span class="wiz-opt-lbl">'+o.label+'</span></div>';});
  html+='</div>';
  if(sel===0||sel===1){
    html+='<div style="margin-top:.75rem"><label style="font-size:13px;color:var(--t2)">Quais integrações?</label><textarea class="wiz-note" rows="2" placeholder="Ex: Guesty, PriceLabs..." oninput="wizAText(\'appcenter_detail\',this.value)">'+(a.appcenter_detail||'')+'</textarea></div>';
  }
  html+=wizFaces('appcenter',auto,true);
  html+='</div>';
  return html;
}

function wizQ14(){
  var a=S.wiz.answers;
  var val=a.openapi;
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Utiliza Open API?</div>';
  html+='<div class="wiz-q-sub">Só informativo, sem score. Permite automações e integrações avançadas.</div>';
  html+='<div class="wiz-opts">';
  html+='<div class="wiz-opt'+(val==='sim'?' sel':'')+'" onclick="wizA(\'openapi\',\'sim\')"><span class="wiz-opt-ico">'+svgIcon('power',16)+'</span><span class="wiz-opt-lbl">Sim, utiliza Open API</span></div>';
  html+='<div class="wiz-opt'+(val==='nao'?' sel':'')+'" onclick="wizA(\'openapi\',\'nao\')"><span class="wiz-opt-ico">'+svgIcon('columns',16)+'</span><span class="wiz-opt-lbl">Não utiliza</span></div>';
  html+='</div>';
  if(val==='sim'){
    html+='<div class="wiz-sub-section"><div class="wiz-sub-q">O que consome / quais funcionalidades?</div>';
    html+='<textarea class="wiz-note" rows="3" placeholder="Descreva o que o cliente consome via API..." oninput="wizAText(\'openapi_detail\',this.value)">'+(a.openapi_detail||'')+'</textarea>';
    html+='<button class="btn btn-sm" style="margin-top:6px;font-size:11px" onclick="wizA(\'openapi_detail\',\'Não consegui identificar\')">Não consegui identificar</button>';
    html+='</div>';
  }
  html+='</div>';
  return html;
}

var WIZ_PAY_PROVIDERS=['Pagar.me','Cielo','Stripe','Mercado Pago','PayPal','PagBank (PagSeguro)','Koin','PayU','Conta Bancária'];
function wizTogglePayProv(name){
  if(S.editFollow)S.editFollowDirty=true;
  var a=S.wiz.answers;if(!a.payment_providers)a.payment_providers=[];
  var idx=a.payment_providers.indexOf(name);
  if(idx>=0)a.payment_providers.splice(idx,1);else a.payment_providers.push(name);
  render();
}
function wizQ15(){
  var a=S.wiz.answers;
  var val=a.payment;
  var provs=a.payment_providers||[];
  var auto=val==='sim'?(provs.length>3?4:3):(val==='nao'?1:2);
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Canal de pagamento</div>';
  html+='<div class="wiz-q-sub">O cliente tem canal de pagamento configurado para receber reservas diretas pelo site?</div>';
  html+='<div class="wiz-opts">';
  html+='<div class="wiz-opt'+(val==='sim'?' sel':'')+'" onclick="wizA(\'payment\',\'sim\')"><span class="wiz-opt-ico">'+svgIcon('card',16)+'</span><span class="wiz-opt-lbl">Tem canal de pagamento configurado</span></div>';
  html+='<div class="wiz-opt'+(val==='nao'?' sel':'')+'" onclick="wizA(\'payment\',\'nao\')"><span class="wiz-opt-ico">'+svgIcon('cancel',16)+'</span><span class="wiz-opt-lbl">Não tem canal de pagamento</span></div>';
  html+='</div>';
  if(val==='sim'){
    html+='<div style="margin-top:.85rem"><label style="font-size:13px;color:var(--t2);font-weight:600">Quais canais de pagamento? <span style="color:var(--t3);font-weight:400;font-size:11px">(opcional · pode marcar mais de um)</span></label>';
    html+='<div class="wiz-pay-grid">';
    WIZ_PAY_PROVIDERS.forEach(function(p){
      var on=provs.indexOf(p)>=0;
      html+='<div class="wiz-pay-chip'+(on?' on':'')+'" onclick="wizTogglePayProv(\''+p.replace(/'/g,"\\'")+'\')">'+(on?' '+svgIcon('check',12)+' ':'')+e(p)+'</div>';
    });
    html+='</div></div>';
  }
  html+=wizFaces('payment',auto,true);
  html+='</div>';
  return html;
}

function wizQ16(){
  var a=S.wiz.answers;
  var ci=S.sel;var c=S.clients[ci];
  var hasInad=isInadimplente(c);
  var inadCount=(c.inadimplencia||[]).filter(function(m){return!m.paid;}).length;
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Costuma ficar inadimplente?</div>';
  html+='<div class="wiz-q-sub">Só informativo. O sistema já puxa o histórico de inadimplência do dashboard.</div>';
  if(hasInad){html+='<div class="wiz-info-banner" style="border-color:#f97316;background:#fff3e0;color:#9a3412">'+svgIcon('alert',14)+' Este cliente tem <strong>'+inadCount+' fatura(s)</strong> em aberto registradas.</div>';}
  else{html+='<div class="wiz-info-banner" style="border-color:#1f943c;background:#e8f5ec;color:#145f27">'+svgIcon('check',14)+' Sem histórico de inadimplência registrado.</div>';}
  var iv=a.inadimplencia_opt;
  html+='<div class="wiz-opts">';
  html+='<div class="wiz-opt'+(iv==='sim'?' sel':'')+'" onclick="wizA(\'inadimplencia_opt\',\'sim\')"><span class="wiz-opt-ico">'+svgIcon('alert',16)+'</span><span class="wiz-opt-lbl">Sim, costuma ficar inadimplente</span></div>';
  html+='<div class="wiz-opt'+(iv==='nao'?' sel':'')+'" onclick="wizA(\'inadimplencia_opt\',\'nao\')"><span class="wiz-opt-ico">'+svgIcon('check',16)+'</span><span class="wiz-opt-lbl">Não, pagamentos em dia</span></div>';
  html+='</div>';
  html+='<textarea class="wiz-note" rows="2" placeholder="Anotação sobre inadimplência (opcional)..." oninput="wizAText(\'inadimplencia_note\',this.value)">'+(a.inadimplencia_note||'')+'</textarea>';
  html+='</div>';
  return html;
}

function wizQ17(){
  var a=S.wiz.answers;
  var ci=S.sel;var c=S.clients[ci];
  var hasChurn=isChurnAlert(c);
  var npsAval=a.nps_avaliou;
  var npsScore=a.nps_score;
  var npsAuto=(npsScore!==undefined&&npsScore!==null)?[0,0,0,0,0,1,1,2,3,4,4][npsScore]:2;
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Cancelamento, NPS e Reclame Aqui</div>';
  html+='<div class="wiz-sub-section"><div class="wiz-sub-q">'+svgIcon('alert',14)+' Já pediu cancelamento?</div>';
  if(hasChurn){html+='<div class="wiz-info-banner" style="border-color:#ef4444;background:#fee2e2;color:#7f1d1d">'+svgIcon('alert',14)+' Este cliente tem alerta de churn ativo no dashboard.</div>';}
  else{html+='<div class="wiz-info-banner" style="border-color:#1f943c;background:#e8f5ec;color:#145f27">'+svgIcon('check',14)+' Sem alerta de churn ativo.</div>';}
  html+='<textarea class="wiz-note" rows="2" placeholder="Contexto sobre churn / histórico (opcional)..." oninput="wizAText(\'churn_note\',this.value)">'+(a.churn_note||'')+'</textarea></div>';
  html+='<div class="wiz-sub-section"><div class="wiz-sub-q>'+svgIcon('star',14)+' NPS — o cliente já avaliou?</div>';
  html+='<div class="wiz-opts">';
  html+='<div class="wiz-opt'+(npsAval==='sim'?' sel':'')+'" onclick="wizA(\'nps_avaliou\',\'sim\')"><span class="wiz-opt-ico">'+svgIcon('check',16)+'</span><span class="wiz-opt-lbl">Sim, já avaliou</span></div>';
  html+='<div class="wiz-opt'+(npsAval==='nao'?' sel':'')+'" onclick="wizA(\'nps_avaliou\',\'nao\')"><span class="wiz-opt-ico">'+svgIcon('columns',16)+'</span><span class="wiz-opt-lbl">Não avaliou ainda</span></div>';
  html+='</div>';
  if(npsAval==='sim'){
    html+='<div style="margin-top:.75rem"><div class="wiz-sub-q" style="font-size:13px">Qual foi a última avaliação? (0 a 10)</div><div class="wiz-row">';
    for(var i=0;i<=10;i++){
      html+='<div style="width:36px;height:36px;border-radius:50%;border:2px solid '+(npsScore===i?'var(--b600)':'var(--bd)')+';background:'+(npsScore===i?'var(--b50)':'var(--surf)')+';display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;font-weight:500;color:'+(npsScore===i?'var(--b600)':'var(--t2)')+'" onclick="wizA(\'nps_score\','+i+')">'+i+'</div>';
    }
    html+='</div></div>';
    html+='<div style="margin-top:.75rem"><label style="font-size:13px;color:var(--t2)">Quando foi a última avaliação?</label><div style="display:flex;align-items:center;gap:6px;margin-top:4px;flex-wrap:wrap">'+dateTripletHTML('','nps_date',a.nps_date_parts)+'</div></div>';
    if(npsScore!==undefined&&npsScore!==null&&npsScore<=4&&a.nps_date){
      var _dias=Math.floor((Date.now()-new Date(a.nps_date))/(1000*60*60*24));
      if(!isNaN(_dias)){
        var _msg,_cor;
        if(_dias<90){_msg='Avaliação negativa recente ('+_dias+' dias). Trate como ponto quente — vale abordar com cuidado na reunião.';_cor={bd:'#ef4444',bg:'#fee2e2',tx:'#7f1d1d'};}
        else if(_dias<180){_msg='Avaliação negativa de '+_dias+' dias atrás. Já passou o pico — verifique se a percepção melhorou desde então.';_cor={bd:'#f97316',bg:'#fff3e0',tx:'#9a3412'};}
        else{_msg='Avaliação negativa antiga ('+Math.floor(_dias/30)+' meses). Provavelmente já superada — confirme se o cliente ainda tem essa percepção.';_cor={bd:'#eab308',bg:'#fef9c3',tx:'#854d0e'};}
        html+='<div class="wiz-info-banner" style="margin-top:.6rem;border-color:'+_cor.bd+';background:'+_cor.bg+';color:'+_cor.tx+'">'+svgIcon('timer',14)+' '+_msg+'</div>';
      }
    }
    html+=wizFaces('nps',npsAuto,true);
  }
  html+='</div>';
  html+='<div class="wiz-sub-section"><div class="wiz-sub-q">'+svgIcon('globe',14)+' Tem reclamação no Reclame Aqui?</div>';
  html+='<div class="wiz-opts">';
  html+='<div class="wiz-opt'+(a.reclame_aqui==='sim'?' sel':'')+'" onclick="wizA(\'reclame_aqui\',\'sim\')"><span class="wiz-opt-ico">'+svgIcon('alert',16)+'</span><span class="wiz-opt-lbl">Sim, tem reclamação</span></div>';
  html+='<div class="wiz-opt'+(a.reclame_aqui==='nao'?' sel':'')+'" onclick="wizA(\'reclame_aqui\',\'nao\')"><span class="wiz-opt-ico">'+svgIcon('check',16)+'</span><span class="wiz-opt-lbl">Não tem reclamação</span></div>';
  html+='</div></div>';
  html+='</div>';
  return html;
}

function wizQ18(){
  var a=S.wiz.answers;
  var caseOpts=[
    {label:'Sem casos abertos',auto:4,ico:'check'},
    {label:'Poucos casos, nada crítico',auto:3,ico:'like'},
    {label:'Muitos casos abertos',auto:1,ico:'alert'},
    {label:'Casos críticos sem resolução',auto:0,ico:'cancel'}
  ];
  var sel=a.cases_option;
  var hasN2=a.cases_n2==='sim';
  var auto=sel!==undefined&&sel!==null?caseOpts[sel].auto:2;
  if(hasN2)auto=0;
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Como está a abertura de casos?</div>';
  html+='<div class="wiz-q-sub">Verifica volume e criticidade dos chamados. Casos N2 ou Website são mais críticos e puxam o humor para Péssimo automaticamente.</div>';
  html+='<div class="wiz-opts">';
  caseOpts.forEach(function(o,i){html+='<div class="wiz-opt'+(sel===i?' sel':'')+'" onclick="wizA(\'cases_option\','+i+')"><span class="wiz-opt-ico">'+svgIcon(o.ico,16)+'</span><span class="wiz-opt-lbl">'+o.label+'</span></div>';});
  html+='</div>';
  html+='<div class="wiz-sub-section"><div class="wiz-sub-q">Tem casos N2 ou casos de Website em aberto?</div>';
  html+='<div class="wiz-opts">';
  html+='<div class="wiz-opt'+(hasN2?' sel':'')+'" onclick="wizA(\'cases_n2\',\'sim\')"><span class="wiz-opt-ico">'+svgIcon('cancel',16)+'</span><span class="wiz-opt-lbl">Sim, tem N2 ou Website em aberto</span></div>';
  html+='<div class="wiz-opt'+(!hasN2&&a.cases_n2==='nao'?' sel':'')+'" onclick="wizA(\'cases_n2\',\'nao\')"><span class="wiz-opt-ico">'+svgIcon('check',16)+'</span><span class="wiz-opt-lbl">Não tem</span></div>';
  html+='</div>';
  if(hasN2){
    html+='<textarea class="wiz-note" rows="2" placeholder="Descreva os casos N2/Website em aberto..." oninput="wizAText(\'cases_n2_detail\',this.value)">'+(a.cases_n2_detail||'')+'</textarea>';
  }
  html+='</div>';
  html+=wizFaces('cases',auto,true);
  html+='</div>';
  return html;
}

function wizQ19(){
  var a=S.wiz.answers;
  var opts=[
    {label:'Cliente está bem no plano atual, sem limitações',ico:'check'},
    {label:'Cliente tem limitações mas não demonstra interesse',ico:'columns'},
    {label:'Oportunidade clara de upgrade — vale abordar',ico:'arrow_up'},
    {label:'Cliente não conhece os planos superiores',ico:'info_triangle'},
    {label:'Cliente já está no plano máximo (Agency)',ico:'diamond'}
  ];
  var sel=a.upgrade_option;
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Oportunidade de upgrade?</div>';
  html+='<div class="wiz-q-sub">Sem score — apenas identifique se há oportunidade comercial. O contexto fica salvo para a reunião.</div>';
  html+='<div class="wiz-opts">';
  opts.forEach(function(o,i){html+='<div class="wiz-opt'+(sel===i?' sel':'')+'" onclick="wizA(\'upgrade_option\','+i+')"><span class="wiz-opt-ico">'+svgIcon(o.ico,16)+'</span><span class="wiz-opt-lbl">'+o.label+'</span></div>';});
  html+='</div>';
  if(sel===4)html+=wizFaces('upgrade',2,true);
  html+='<textarea class="wiz-note" rows="2" placeholder="Observações sobre upgrade (opcional)..." oninput="wizAText(\'upgrade_note\',this.value)">'+(a.upgrade_note||'')+'</textarea>';
  html+='</div>';
  return html;
}

function wizQ20(){
  var a=S.wiz.answers;
  var val=a.tz_confirmed;
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Fuso horário do sistema</div>';
  html+='<div class="wiz-q-sub">Só informativo, sem score. Confirme dentro do sistema Stays do próprio cliente — isso afeta regras de reserva (last minute, antecipada, check-in/checkout). Não é o mesmo relógio informativo que aparece no perfil.</div>';
  html+='<div class="wiz-opts">';
  html+='<div class="wiz-opt'+(val==='sim'?' sel':'')+'" onclick="wizA(\'tz_confirmed\',\'sim\')"><span class="wiz-opt-ico">'+svgIcon('check',16)+'</span><span class="wiz-opt-lbl">Confirmei — fuso horário está correto</span></div>';
  html+='<div class="wiz-opt'+(val==='nao'?' sel':'')+'" onclick="wizA(\'tz_confirmed\',\'nao\')"><span class="wiz-opt-ico">'+svgIcon('alert',16)+'</span><span class="wiz-opt-lbl">Não / está incorreto</span></div>';
  html+='</div>';
  html+='</div>';
  return html;
}
function wizRenderCustomQuestion(qid){
  var q=(S.customQuestions||[]).find(function(x){return x.id===qid;});
  if(!q)return'<div class="wiz-card"><div class="wiz-q">Pergunta não encontrada</div><div class="wiz-q-sub">Pode ter sido rejeitada ou removida.</div></div>';
  var a=S.wiz.answers;
  if(!a.custom)a.custom={};
  var sel=a.custom[qid];
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">'+e(q.text)+'</div>';
  html+='<div class="wiz-q-sub">'+(q.category?'Pergunta customizada.':'Pergunta customizada — só informativa, sem score.')+'</div>';
  html+='<div class="wiz-opts">';
  q.answers.forEach(function(ans,i){
    html+='<div class="wiz-opt'+(sel===i?' sel':'')+'" onclick="wizSetCustomAnswer(\''+qid+'\','+i+')"><span class="wiz-opt-lbl">'+e(ans.label)+'</span></div>';
  });
  html+='</div>';
  if(q.category&&sel!==undefined&&sel!==null&&q.answers[sel]){
    html+=wizFaces('custom_'+qid,q.answers[sel].humor,true);
  }
  html+='</div>';
  return html;
}
function wizSetCustomAnswer(qid,idx){
  var a=S.wiz.answers;if(!a.custom)a.custom={};a.custom[qid]=idx;
  S.wizBlockedMsg=false;
  if(S.editFollow)S.editFollowDirty=true;
  render();
}

var WIZ_STEPS_FIRST=['units','cities','pricing','channels','domain','tz_check','site','photos','occupation','price','lastminute','financial','operational','appcenter','openapi','payment','inadimplencia','nps_churn','cases','upgrade'];
var WIZ_TOTAL_FIRST=20;
// ── RECORRENTE: 19 perguntas existentes + 6 novas exclusivas (wizR1..wizR6) ──
var WIZ_STEPS_REC=['units','cities','pricing','channels','notifs','ch_perf','ch_usab','domain','tz_check','site','photos','occupation','price','lastminute','financial','operational','appcenter','openapi','prod_sug','payment','inadimplencia','nego','nps_churn','cases','upgrade','acct_plan'];
var WIZ_TOTAL_REC=26;
var WIZ_RENDERERS={units:wizQ1,cities:wizQ2,pricing:wizQ3,channels:wizQ4,notifs:wizR1,ch_perf:wizR2,ch_usab:wizR3,domain:wizQ5,tz_check:wizQ20,site:wizQ6,occupation:wizQ7,price:wizQ8,lastminute:wizQ9,photos:wizQ10,financial:wizQ11,operational:wizQ12,appcenter:wizQ13,openapi:wizQ14,prod_sug:wizR4,payment:wizQ15,inadimplencia:wizQ16,nego:wizR5,nps_churn:wizQ17,cases:wizQ18,upgrade:wizQ19,acct_plan:wizR6};
var STEP_HUMOR_KEY={units:'units',cities:null,pricing:null,channels:'channels',notifs:'notifs',ch_perf:'chperf',ch_usab:'usab',domain:'domain',tz_check:null,site:'site',photos:'photos_desc',occupation:'occupation',price:'price',lastminute:null,financial:'financial',operational:'operational',appcenter:'appcenter',openapi:null,prod_sug:null,payment:'payment',inadimplencia:null,nego:'nego',nps_churn:'nps',cases:'cases',upgrade:'upgrade',acct_plan:null};
var WIZ_REC_HINTS=['SMS da Stays','Sistema do cliente','SMS da Stays','SMS da Stays','SMS da Stays / Painel','SMS da Stays','SMS da Stays','SMS da Stays','Sistema do cliente','Sistema do cliente','SMS da Stays','Sistema do cliente','SMS da Stays','SMS da Stays','SMS da Stays','SMS da Stays','SMS da Stays / Salesforce','Análise do analista','SMS da Stays','Salesforce','Salesforce','Track (NPS) / Salesforce','Salesforce','Análise do plano','Plano de contas / Salesforce'];
// Qual campo em S.wiz.answers conta como "esta pergunta foi respondida"
var STEP_ANSWER_KEY={units:'units_count',cities:'cities',pricing:'pricing_model',channels:'channels',notifs:'notifs_option',ch_perf:'chperf_option',ch_usab:'usab',domain:'domain_migration',tz_check:'tz_confirmed',site:'site_option',photos:'photos_option',occupation:'occupation',price:'price_option',lastminute:'lastminute',financial:'financial_option',operational:'operational_option',appcenter:'appcenter_option',openapi:'openapi',prod_sug:'prodsug_has',payment:'payment',inadimplencia:'inadimplencia_opt',nego:'nego_has',nps_churn:'nps_avaliou',cases:'cases_option',upgrade:'upgrade_option',acct_plan:'acct_has'};
function wizStepAnswered(stepKey){
  var a=S.wiz.answers||{};
  if(stepKey.indexOf('custom_')===0){var qid=stepKey.slice(7);return!!(a.custom&&a.custom[qid]!==undefined&&a.custom[qid]!==null);}
  var key=STEP_ANSWER_KEY[stepKey];
  if(!key)return true;
  if(key==='cities')return!!(a.cities&&a.cities.length);
  if(key==='channels')return!!(a.channels&&a.channels.some(function(c){return c.active;}));
  if(key==='usab')return usabIsV2(a)?wizUsabAnsweredV2(a)
    :WIZ_USAB_ITEMS.every(function(it){return a['usab_'+it.key]!==undefined&&a['usab_'+it.key]!==null;});
  if(key==='occupation')return!!(a.occ_current&&a.occ_current.option!==undefined&&a.occ_current.option!==null);
  var v=a[key];
  return v!==undefined&&v!==null&&v!=='';
}
function wizStepMandatory(stepKey){
  if(stepKey.indexOf('custom_')===0){var q=(S.customQuestions||[]).find(function(x){return x.id===stepKey.slice(7);});return!!(q&&q.mandatory);}
  return true;
}
// Admin, Gerente e Líder sempre podem pular perguntas obrigatórias; analista nunca.
function wizCanSkipMandatory(){return!!(S.appUser&&['admin','gerente','leader','testuser'].indexOf(S.appUser.role)>=0);}
function wizTryAdvance(target){
  var effSteps=getWizOrder(S.wiz.type);
  var stepKey=effSteps[S.wiz.step];
  if(stepKey&&wizStepMandatory(stepKey)&&!wizStepAnswered(stepKey)&&!wizCanSkipMandatory()){
    S.wizBlockedMsg=true;render();return;
  }
  S.wizBlockedMsg=false;
  if(target==='summary')wizGoSummary();else wizGo(target);
}
// Follow ja salvo: regenera SEMPRE do zero, com as perguntas do tipo daquele
// follow e as respostas que estao la agora. Texto antigo (inclusive os que sairam
// errados, com as perguntas da primeira analise num follow recorrente) e
// substituido no clique — nao existe cache.
function genSFForFollow(ci,fi){
  var c=S.clients[ci];
  var f=c&&c.follows[fi];
  if(!f)return;
  if(!f.answers)f.answers={};
  f.answers.sf_text=buildSFText(f.type||'first',f.answers,c);
  saveState();render();
}
function genWhatsForFollow(ci,fi){
  var f=S.clients[ci].follows[fi];
  if(!f)return;
  var backup=S.wiz;
  // Load previous follow for evolution context if recurring
  var prevA=null,prevDate=null,prevH=null;
  if(f.type==='recurring'){
    var wizFollows=(S.clients[ci].follows||[]).filter(function(x){return x.wizard&&x!==f&&new Date(x.date)<=new Date(f.date);}).sort(function(a,b){return new Date(b.date)-new Date(a.date);});
    if(wizFollows[0]){prevA=wizFollows[0].answers;prevDate=wizFollows[0].date;prevH=wizFollows[0].humors||{};}
  }
  S.wiz={step:0,type:f.type||'first',answers:Object.assign({},f.answers),humors:Object.assign({},f.humors||{}),autoHumors:{},prevAnswers:prevA,prevFollowDate:prevDate,prevHumors:prevH||{}};
  wizGenWhats();
  f.answers.whats_prompt=S.wiz.answers.whats_prompt;
  S.wiz=backup;
  saveState();render();
}
function setFollowWhatsLang(ci,fi,lang){var f=S.clients[ci].follows[fi];if(!f)return;f.answers.whats_lang=lang;saveState();if(f.answers.whats_prompt)genWhatsForFollow(ci,fi);else render();}
function setFollowWhatsMode(ci,fi,mode){var f=S.clients[ci].follows[fi];if(!f)return;f.answers.whats_mode=mode;saveState();if(f.answers.whats_prompt)genWhatsForFollow(ci,fi);else render();}
function startEditFollowQ(stepKey){
  var ci=S.sel,fi=S.selFollow,f=S.clients[ci].follows[fi];
  if(!f)return;
  // Se já está editando outra pergunta com alterações não salvas, confirma
  if(S.editFollow&&S.editFollowDirty&&S.editFollow.stepKey!==stepKey){
    if(!confirm('Você tem alterações não salvas nesta pergunta. Descartar e editar outra?'))return;
  }
  // Carrega o follow num contexto de edição do wizard
  var prevA=null,prevDate=null,prevH=null;
  if(f.type==='recurring'){
    var wf=(S.clients[ci].follows||[]).filter(function(x){return x.wizard&&x!==f&&new Date(x.date)<=new Date(f.date);}).sort(function(a,b){return new Date(b.date)-new Date(a.date);});
    if(wf[0]){prevA=wf[0].answers;prevDate=wf[0].date;prevH=wf[0].humors||{};}
  }
  S.wiz={step:0,type:f.type||'first',answers:Object.assign({},f.answers),humors:Object.assign({},f.humors||{}),autoHumors:{},prevAnswers:prevA,prevFollowDate:prevDate,prevHumors:prevH||{}};
  S.editFollow={ci:ci,fi:fi,stepKey:stepKey};
  S.editFollowDirty=false;
  render();
}
function saveEditFollowQ(){
  if(!S.editFollow)return;
  var f=S.clients[S.editFollow.ci].follows[S.editFollow.fi];
  if(f){
    f.answers=Object.assign({},S.wiz.answers);
    f.humors=wizEffectiveHumors();
    // Pergunta pendente que ficou completa sai da lista de pendências.
    refreshFollowPending(f);
    // Pergunta ainda pendente não pontua — o score continua parcial.
    followPendingList(f).forEach(function(p){var hk=STEP_HUMOR_KEY[p.step];if(hk)delete f.humors[hk];});
    // Sincroniza unidades se a pergunta editada foi de unidades
    if(S.wiz.answers.units_count!==undefined&&S.wiz.answers.units_count!=='')S.clients[S.editFollow.ci].units=+S.wiz.answers.units_count;
    if(S.wiz.answers.domain_website)S.clients[S.editFollow.ci].website=S.wiz.answers.domain_website;
  }
  S.editFollow=null;S.editFollowDirty=false;
  saveState();render();
}
function cancelEditFollowQ(){
  if(S.editFollowDirty){if(!confirm('Descartar as alterações não salvas desta pergunta?'))return;}
  S.editFollow=null;S.editFollowDirty=false;
  render();
}
function followWizardView(){
  var c=S.clients[S.sel],ci=S.sel,fi=S.selFollow,f=c.follows[fi];
  if(!f){goBackToClient();return"";}
  var a=f.answers||{};
  var h=f.humors||{};
  var HL=['Péssimo','Ruim','Neutro','Bom','Ótimo'];
  var HC=['#fee2e2','#ffedd5','#fef9c3','#dcfce7','#bbf7d0'];
  var HB=['#ef4444','#f97316','#eab308','#22c55e','#16a34a'];
  var HT=['#7f1d1d','#9a3412','#854d0e','#166534','#14532d'];
  function humorPill(key){
    if(h[key]===undefined||h[key]===null)return'';
    var lv=h[key];
    return'<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:600;background:'+HC[lv]+';border:1px solid '+HB[lv]+';color:'+HT[lv]+'">'+face(FKEYS[lv],14)+' '+HL[lv]+'</span>';
  }
  var CHAN_NAMES={airbnb:'Airbnb',booking:'Booking',decolar:'Decolar',expedia:'Expedia',vrbo:'VRBO',website:'Website',googlevr:'Google VR',homesvillas:'Homes & Villas'};
  function row(num,label,answer,humorKey,stepKey){
    // Modo edição: renderiza o editor do wizard inline para esta pergunta
    var isCustomStep=stepKey&&stepKey.indexOf('custom_')===0;
    if(stepKey&&S.editFollow&&S.editFollow.stepKey===stepKey&&(WIZ_RENDERERS[stepKey]||isCustomStep)){
      var edHtml='<div style="padding:14px;border:2px solid var(--b600);border-radius:12px;margin:10px 0;background:var(--surf2)">';
      edHtml+='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px"><div style="font-size:12px;font-weight:700;color:var(--b600);text-transform:uppercase;letter-spacing:.04em">Editando: '+num+'. '+label+'</div></div>';
      edHtml+=isCustomStep?wizRenderCustomQuestion(stepKey.slice(7)):WIZ_RENDERERS[stepKey]();
      edHtml+='<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;padding-top:12px;border-top:1px solid var(--bd)">';
      edHtml+='<button class="btn btn-sm" onclick="cancelEditFollowQ()">Cancelar</button>';
      edHtml+='<button class="btn-primary" style="padding:6px 16px" onclick="saveEditFollowQ()">'+svgIcon('save',14)+' Salvar</button>';
      edHtml+='</div></div>';
      return edHtml;
    }
    // Pergunta que veio pendente da importação fica em vermelho, com o texto original.
    var pend=stepKey?followPendingList(f).find(function(p){return p.step===stepKey;}):null;
    var clickable=stepKey?' onclick="startEditFollowQ(\''+stepKey+'\')" style="cursor:pointer;padding:12px 8px;margin:0 -8px;border-bottom:1px solid var(--bd);border-radius:6px'+(pend?';background:var(--rd50);border-left:3px solid var(--rd600)':'')+'"':' style="padding:12px 0;border-bottom:1px solid var(--bd)"';
    var editHint=stepKey?'<span style="font-size:11px;color:var(--b600);opacity:.7;margin-left:6px">'+svgIcon('edit',11)+' editar</span>':'';
    var pendBlock='';
    if(pend){
      pendBlock='<div class="fq-pend">'+svgIcon('alert',12)+' <strong>Pendente.</strong> '+e(fiPendingMessage(pend.step,pend))+'</div>';
    }
    var titleColor=pend?'var(--rd600)':'var(--t)';
    return'<div'+clickable+'><div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px"><div style="flex:1"><div style="font-size:13px;font-weight:600;color:'+titleColor+';margin-bottom:3px">'+num+'. '+label+editHint+'</div><div style="font-size:13px;color:var(--t2);line-height:1.5">'+(answer||'<span style="color:var(--t3)">Não respondido</span>')+'</div>'+pendBlock+'</div>'+(humorKey?humorPill(humorKey):'')+'</div></div>';
  }
  var cities=((a.cities||[]).map(function(c){return c.name;})).join(', ')||'—';
  var activeChs=((a.channels||[]).filter(function(x){return x.active;}).map(function(x){return CHAN_NAMES[x.key]+(x.all?' (todos)':(x.qty?' ('+x.qty+')':''));})).join(', ')||'—';
  var SITE=['Bem personalizado','Personalização básica','Sem personalização','Não tem site','Outro'];
  var OCC_H=['Ótimo (75%+)','Bom (50-74%)','Neutro (35-49%)','Ruim (25-34%)','Péssimo (<25%)','Sem dados'];
  var OCC_L=['Ótimo (50%+)','Bom (35-49%)','Neutro (25-34%)','Ruim (15-24%)','Péssimo (<15%)','Sem dados'];
  var PRICE=['Competitivo','Na média','Um pouco fora','Muito fora','Sem dados'];
  var FIN=['Utiliza ativamente','Utiliza pouco','Não utiliza','Sem acesso'];
  var APP=['2+ integrações','1 integração','Nenhuma'];
  var CASES=['Sem casos','Poucos casos','Muitos casos','Casos críticos'];
  var PHOTOS=['Excelentes','Boas','Fracas','Sem fotos'];
  var DESC=['Completa','Básica','Fraca','Sem descrição'];
  var NOTIFS=['Painel limpo, sem pendências','Poucas notificações, nada crítico','Muitas pendências sem acompanhamento','Alertas críticos (overbooking, sem preço)'];
  var CHPERF=['Boa performance em múltiplos canais','Razoável, concentrada em poucos canais','Fraca ou dependência de um único canal','Queda significativa vs. período anterior','Sem dados suficientes'];
  var occArr=wizFollowSeason(a)==='low'?OCC_L:OCC_H;
  function stepAnswerHtml(k){
    switch(k){
      case'units':return a.units_changed==='nao'?'Manteve igual. Total: '+(a.units_count||'?'):(a.units_changed==='ganhou'?'Ganhou '+a.units_delta+'. Total: '+(a.units_count||'?'):(a.units_changed==='perdeu'?'Perdeu '+a.units_delta+'. Total: '+(a.units_count||'?'):'Total: '+(a.units_count||'?')));
      case'cities':return cities;
      case'pricing':return a.pricing_model==='fixo'?'Fixo':(a.pricing_model==='flexivel'?'Flexível':'—');
      case'channels':return activeChs+(a.channels_note?' — '+e(a.channels_note):'');
      case'notifs':return(a.notifs_option!==undefined&&a.notifs_option!==null?NOTIFS[a.notifs_option]:'—')+(a.notifs_note?' — '+e(a.notifs_note):'');
      case'ch_perf':return(a.chperf_option!==undefined&&a.chperf_option!==null?CHPERF[a.chperf_option]:'—')+(a.chperf_note?' — '+e(a.chperf_note):'');
      case'ch_usab':
        if(usabIsV2(a))return e(usabTextV2(a))+(a.usab_note?' — '+e(a.usab_note):'');
        var _uCount=WIZ_USAB_ITEMS.filter(function(it){return a['usab_'+it.key]!==undefined&&a['usab_'+it.key]!==null;}).length;
        return _uCount+' de '+WIZ_USAB_ITEMS.length+' itens avaliados'+(a.usab_note?' — '+e(a.usab_note):'');
      case'domain':return(a.domain_migration==='sim'?'Sim':(a.domain_migration==='nao'?'Não':'—'))+(a.domain_website?' · '+e(a.domain_website):'');
      case'tz_check':return a.tz_confirmed==='sim'?'Confirmado':(a.tz_confirmed==='nao'?'Incorreto / não confirmado':'—');
      case'site':return a.site_option!==undefined&&a.site_option!==null?SITE[a.site_option]+(a.site_other?' — '+e(a.site_other):''):'—';
      case'photos':return(a.photos_option!==undefined?PHOTOS[a.photos_option]:'—')+' / '+(a.description_option!==undefined?DESC[a.description_option]:'—');
      case'occupation':var _oc=a.occ_current,_op=a.occ_lastyear;
        var _occPeriodLbl=function(o){if(!o||(!o.period_start&&!o.period_end))return'';if(o.period_start&&o.period_end)return' ('+formatDate(o.period_start)+' a '+formatDate(o.period_end)+')';return' ('+formatDate(o.period_start||o.period_end)+')';};
        if(!_oc||_oc.option===undefined||_oc.option===null)return'—';
        return occArr[_oc.option]+_occPeriodLbl(_oc)+((_op&&_op.option!==undefined&&_op.option!==null)?' — ano anterior: '+occArr[_op.option]+_occPeriodLbl(_op):'');
      case'price':return a.price_option!==undefined&&a.price_option!==null?PRICE[a.price_option]:'—';
      case'lastminute':return a.lastminute==='sim'?'Sim — '+(a.lastminute_time||'?'):(a.lastminute==='nao'?'Não':'—');
      case'financial':return a.financial_option!==undefined&&a.financial_option!==null?FIN[a.financial_option]:'—';
      case'operational':return a.operational_option!==undefined&&a.operational_option!==null?FIN[a.operational_option]:'—';
      case'appcenter':return a.appcenter_option!==undefined&&a.appcenter_option!==null?APP[a.appcenter_option]+(a.appcenter_detail?' — '+e(a.appcenter_detail):''):'—';
      case'openapi':return a.openapi==='sim'?'Sim — '+e(a.openapi_detail||'?'):(a.openapi==='nao'?'Não':'—');
      case'prod_sug':return a.prodsug_has===true?'Sim — '+e(a.prodsug_note||'?'):(a.prodsug_has===false?'Não':'—');
      case'payment':return a.payment==='sim'?'Tem canal':(a.payment==='nao'?'Não tem':'—');
      case'inadimplencia':return a.inadimplencia_note?e(a.inadimplencia_note):'Ver histórico do cliente';
      case'nego':return a.nego_has===true?'Sim'+(a.nego_note?' — '+e(a.nego_note):''):(a.nego_has===false?'Não'+(a.nego_note?' — '+e(a.nego_note):''):'—');
      case'nps_churn':return(a.churn_note?'Churn: '+e(a.churn_note)+'. ':'')+'NPS: '+(a.nps_avaliou==='sim'?a.nps_score+'/10':'Não avaliou')+'. Reclame Aqui: '+(a.reclame_aqui==='sim'?'Sim':'Não');
      case'cases':return(a.cases_option!==undefined&&a.cases_option!==null?CASES[a.cases_option]:'—')+(a.cases_n2==='sim'?' — N2/Website em aberto'+(a.cases_n2_detail?': '+e(a.cases_n2_detail):''):'');
      case'upgrade':return(a.upgrade_option!==undefined&&a.upgrade_option!==null?['Bem no plano','Tem limitações, sem interesse','Oportunidade clara','Não conhece planos','Já no plano máximo (Agency)'][a.upgrade_option]:'—')+(a.upgrade_note?' — '+e(a.upgrade_note):'');
      case'acct_plan':return(a.acct_has===true?'Plano de contas preenchido':(a.acct_has===false?'Plano de contas não preenchido':'—'))+(a.acct_next?' · Próximos passos: '+e(a.acct_next):'');
      default:
        if(k.indexOf('custom_')===0){
          var _qid=k.slice(7);var _q=(S.customQuestions||[]).find(function(x){return x.id===_qid;});
          if(!_q)return'—';
          var _sel=a.custom&&a.custom[_qid];
          return(_sel!==undefined&&_sel!==null&&_q.answers[_sel])?e(_q.answers[_sel].label):'—';
        }
        return'—';
    }
  }
  var html='<div class="wiz-wrap">';
  html+='<div style="display:flex;align-items:center;gap:10px;margin-bottom:1.25rem"><button class="btn btn-sm" onclick="goBackToClient()">← Voltar</button><div style="font-size:15px;font-weight:500">Follow-up de '+formatDate(f.date)+'</div><span style="font-size:11px;background:var(--b50);color:var(--b600);border:1px solid var(--b600);border-radius:4px;padding:2px 8px">'+(f.type==='recurring'?'Recorrente':'Primeira análise')+'</span></div>';
  var _fs=calcFollowScore(f);
  if(_fs){var _fc=_fs.color==='risk'?'#dc2626':(_fs.color==='warn'?'#d97706':'#16a34a');html+='<div class="card" style="padding:1rem 1.25rem;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;border-left:4px solid '+_fc+'"><div><div style="font-size:12px;color:var(--t3);text-transform:uppercase;letter-spacing:.05em">Score deste follow '+(followScorePartial(f)?'<span class="partial-seal">'+svgIcon('alert',10)+' dados pendentes</span>':'')+'</div><div style="font-size:11px;color:var(--t3);margin-top:2px">'+(followScorePartial(f)?'Score parcial — as perguntas pendentes ainda não contam.':'Diferente do score geral do cliente')+'</div></div><div style="font-size:32px;font-weight:800;color:'+_fc+'">'+_fs.score+'</div></div>';}
  if(f.type==='recurring'){
    var _wfPrev=(c.follows||[]).filter(function(x){return x.wizard&&x!==f&&new Date(x.date)<=new Date(f.date);}).sort(function(x,y){return new Date(y.date)-new Date(x.date);})[0];
    if(_wfPrev)html+=wizEvolutionCard(a,_wfPrev.answers||{},h,_wfPrev.humors||{},_wfPrev.date);
  }
  var _pl=followPendingList(f);
  if(_pl.length){
    html+='<div class="alert alert-red" style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap"><span><strong>'+_pl.length+' pergunta(s) pendente(s)</strong> deste follow importado. Elas estão em vermelho abaixo e não contam no score enquanto não forem resolvidas.</span><button class="btn btn-sm" onclick="startEditFollowQ(\''+jsq(_pl[0].step)+'\')">Resolver pendências</button></div>';
  }
  html+='<div class="card" style="padding:1.5rem">';
  var _steps=(f.type==='recurring'?WIZ_STEPS_REC:WIZ_STEPS_FIRST).concat(customStepsFromAnswers(a));
  _steps.forEach(function(k,idx){
    html+=row(String(idx+1),wizOrderLabel(k),stepAnswerHtml(k),getStepHumorKey(k),k);
  });
  html+='</div>';
  if(a.positive_points||a.attention_points||a.next_steps){
    html+='<div class="card" style="padding:1.5rem;margin-top:1rem"><div style="font-size:13px;font-weight:600;margin-bottom:.75rem">'+svgIcon('edit',14)+' Observações e próximos passos</div>';
    if(a.positive_points)html+='<div style="margin-bottom:.75rem"><div style="font-size:11px;font-weight:600;color:var(--t3);text-transform:uppercase">Pontos positivos</div><div style="font-size:13px;color:var(--t2);white-space:pre-wrap">'+e(a.positive_points)+'</div></div>';
    if(a.attention_points)html+='<div style="margin-bottom:.75rem"><div style="font-size:11px;font-weight:600;color:var(--t3);text-transform:uppercase">Pontos de atenção</div><div style="font-size:13px;color:var(--t2);white-space:pre-wrap">'+e(a.attention_points)+'</div></div>';
    if(a.next_steps)html+='<div><div style="font-size:11px;font-weight:600;color:var(--t3);text-transform:uppercase">Próximos passos</div><div style="font-size:13px;color:var(--t2);white-space:pre-wrap">'+e(a.next_steps)+'</div></div>';
    html+='</div>';
  }
  var _svSteps=(f.type==='recurring'?WIZ_STEPS_REC:WIZ_STEPS_FIRST).concat(customStepsFromAnswers(a));
  var _svAnnots=[];
  _svSteps.forEach(function(k){var n=a['note_'+k];if(n&&n.trim())_svAnnots.push({label:wizOrderLabel(k),note:n.trim()});});
  if(_svAnnots.length){
  html+='<div class="card" style="padding:1rem 1.25rem;margin-top:1rem">';
  html+='<div style="font-size:13px;font-weight:600;margin-bottom:10px">'+svgIcon('edit',14)+' Anotações do follow</div>';
  _svAnnots.forEach(function(it){
  html+='<div style="margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid var(--bd)"><div style="font-size:12px;font-weight:600;color:var(--b600)">'+e(it.label)+'</div><div style="font-size:13px;color:var(--t);white-space:pre-line">'+e(it.note)+'</div></div>';
  });
  html+='</div>';
  }
  html+='<div class="card" style="padding:1rem 1.5rem;margin-top:1rem"><div style="font-size:12px;font-weight:600;color:var(--t2);margin-bottom:10px">Opções da mensagem de WhatsApp</div><div style="display:flex;gap:20px;flex-wrap:wrap">';
  html+='<div><div style="font-size:11px;color:var(--t3);margin-bottom:5px">Idioma</div><div style="display:flex;gap:6px">';
  var _fwl=a.whats_lang||'pt';
  [['pt','Português'],['en','English'],['es','Español']].forEach(function(L){
  html+='<div onclick="setFollowWhatsLang('+ci+','+fi+',\''+L[0]+'\')" style="padding:5px 12px;border-radius:16px;cursor:pointer;font-size:12px;border:1px solid '+(_fwl===L[0]?'var(--b600);background:var(--b50);color:var(--b600);font-weight:600':'var(--bd);background:var(--surf);color:var(--t2)')+'">'+L[1]+'</div>';
  });
  html+='</div></div>';
  html+='<div><div style="font-size:11px;color:var(--t3);margin-bottom:5px">Abordagem</div><div style="display:flex;gap:6px">';
  var _fwm=a.whats_mode||(f.type==='recurring'?'recorrente':'primeiro');
  [['primeiro','Primeiro contato'],['recorrente','Já conheço o cliente']].forEach(function(M){
  html+='<div onclick="setFollowWhatsMode('+ci+','+fi+',\''+M[0]+'\')" style="padding:5px 12px;border-radius:16px;cursor:pointer;font-size:12px;border:1px solid '+(_fwm===M[0]?'var(--b600);background:var(--b50);color:var(--b600);font-weight:600':'var(--bd);background:var(--surf);color:var(--t2)')+'">'+M[1]+'</div>';
  });
  html+='</div></div></div></div>';
  html+='<div class="card" style="padding:1rem 1.5rem;margin-top:1rem;display:flex;gap:8px;flex-wrap:wrap;align-items:center"><span style="font-size:12px;color:var(--t3);margin-right:4px">Gerar textos:</span><button class="btn btn-sm" onclick="genSFForFollow('+ci+','+fi+')">'+svgIcon('document',13)+' Texto Salesforce</button><button class="btn btn-sm" style="background:#25D366;color:#fff;border-color:#25D366" onclick="genWhatsForFollow('+ci+','+fi+')">'+svgIcon('chat',13)+' Prompt WhatsApp</button></div>';
  if(a.sf_text){
    html+='<div class="card" style="padding:1.5rem;margin-top:1rem"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem"><div style="font-size:13px;font-weight:600">Texto do Salesforce</div><button class="btn btn-sm" onclick="copyFeedback(this,S.clients['+ci+'].follows['+fi+'].answers.sf_text)">'+svgIcon('document',14)+' Copiar</button></div><pre style="font-size:12px;color:var(--t2);white-space:pre-wrap;line-height:1.7;max-height:300px;overflow-y:auto;font-family:\'Roboto\',sans-serif">'+e(a.sf_text)+'</pre></div>';
  }
  if(a.whats_prompt){
    html+='<div class="card" style="padding:1.5rem;margin-top:1rem;border-color:#25D366"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.5rem"><div style="font-size:13px;font-weight:600">'+svgIcon('chat',14)+' Prompt do WhatsApp</div><button class="btn btn-sm" style="background:#25D366;color:#fff;border-color:#25D366" onclick="copyFeedback(this,S.clients['+ci+'].follows['+fi+'].answers.whats_prompt)">'+svgIcon('document',14)+' Copiar prompt</button></div><div style="font-size:11px;color:var(--t3);margin-bottom:.75rem">Cole em qualquer IA (Claude, ChatGPT, Gemini) para gerar a mensagem personalizada.</div><div style="font-size:12px;color:var(--t2);white-space:pre-wrap;line-height:1.6;background:var(--surf2);padding:14px;border-radius:8px;border:1px solid var(--bd);max-height:280px;overflow-y:auto">'+e(a.whats_prompt)+'</div></div>';
  }
  html+='</div>';
  return html;
}
function wizFollowSeason(a){
  var r=resolveCitiesSeason(a.cities||[]);
  return r?r.current:null;
}
function followChartsView(){
  var c=S.clients[S.sel],ci=S.sel;
  var wizFollows=(c.follows||[]).filter(function(f){return f.wizard;}).sort(function(a,b){return new Date(a.date)-new Date(b.date);});
  var html='<div class="wiz-wrap" style="max-width:900px">';
  html+='<div style="display:flex;align-items:center;gap:10px;margin-bottom:1.25rem"><button class="btn btn-sm" onclick="goBackToClient()">← Voltar</button><div style="font-size:15px;font-weight:500">Acompanhamento de follow-ups — '+e((c.slug||c.name).toUpperCase())+'</div></div>';
  if(wizFollows.length<1){
    return html+'<div class="card" style="padding:3rem;text-align:center"><div style="font-size:36px;margin-bottom:1rem">'+svgIcon('arrow_up',36)+'</div><p style="color:var(--t2)">Nenhum follow-up registrado ainda.</p></div></div>';
  }
  // Chart type toggle
  html+='<div style="display:flex;gap:8px;margin-bottom:1.5rem">';
  html+='<button class="btn'+(S.chartType==='timeline'?'-primary':'')+' btn-sm" onclick="S.chartType=\'timeline\';render()">'+svgIcon('chart',14)+' Evolução temporal</button>';
  html+='<button class="btn'+(S.chartType==='bars'?'-primary':'')+' btn-sm" onclick="S.chartType=\'bars\';render()">'+svgIcon('chart',13)+' Comparativo de barras</button>';
  html+='</div>';
  if(S.chartType==='timeline'){
    html+=followTimelineCharts(wizFollows);
  }else{
    html+=followBarsCharts(wizFollows);
  }
  html+='</div>';
  return html;
}

function followTimelineCharts(follows){
  // Metrics to track over time
  var metrics=[
    {key:'units_count',label:'Unidades',color:'#3b82f6',get:function(f){return +f.answers.units_count||0;}},
    {key:'channels',label:'Canais conectados',color:'#22c55e',get:function(f){return (f.answers.channels||[]).filter(function(x){return x.active;}).length;}},
    {key:'occupation',label:'Ocupação (nível)',color:'#f59e0b',get:function(f){var o=f.answers.occ_current&&f.answers.occ_current.option;return o!==undefined&&o!==null?OCC_OPT_AUTO[o]:0;}}
  ];
  var html='';
  metrics.forEach(function(m){
    var values=follows.map(m.get);
    var maxV=Math.max.apply(null,values.concat([1]));
    var minV=Math.min.apply(null,values.concat([0]));
    var range=maxV-minV||1;
    var w=Math.max(follows.length*120,400);
    var h=180;var pad=30;
    var chartW=w-pad*2;var chartH=h-pad*2;
    var pts=values.map(function(v,i){
      var x=pad+(follows.length>1?(i/(follows.length-1))*chartW:chartW/2);
      var y=pad+chartH-((v-minV)/range)*chartH;
      return {x:x,y:y,v:v};
    });
    var pathD=pts.map(function(p,i){return (i===0?'M':'L')+p.x+' '+p.y;}).join(' ');
    html+='<div class="card" style="padding:1.25rem;margin-bottom:1rem;overflow-x:auto">';
    html+='<div style="font-size:13px;font-weight:600;color:var(--t);margin-bottom:1rem;display:flex;align-items:center;gap:8px"><span style="width:12px;height:12px;border-radius:50%;background:'+m.color+';display:inline-block"></span>'+m.label+'</div>';
    html+='<svg width="'+w+'" height="'+h+'" style="min-width:100%">';
    // Grid lines
    for(var g=0;g<=4;g++){var gy=pad+(chartH/4)*g;html+='<line x1="'+pad+'" y1="'+gy+'" x2="'+(w-pad)+'" y2="'+gy+'" stroke="var(--bd)" stroke-width="0.5"/>';}
    // Line path
    html+='<path d="'+pathD+'" stroke="'+m.color+'" stroke-width="2" fill="none"/>';
    // Points + labels
    pts.forEach(function(p,i){
      html+='<circle cx="'+p.x+'" cy="'+p.y+'" r="4" fill="'+m.color+'"/>';
      html+='<text x="'+p.x+'" y="'+(p.y-10)+'" text-anchor="middle" font-size="11" font-weight="600" fill="var(--t)">'+p.v+'</text>';
      html+='<text x="'+p.x+'" y="'+(h-8)+'" text-anchor="middle" font-size="9" fill="var(--t3)">'+formatDate(follows[i].date).slice(0,5)+'</text>';
    });
    html+='</svg></div>';
  });
  return html;
}

function followBarsCharts(follows){
  // Horizontal grouped bars comparing key humor scores across follows
  var humorKeys=[
    {key:'units',label:'Unidades'},
    {key:'channels',label:'Canais'},
    {key:'occupation',label:'Ocupação'},
    {key:'financial',label:'Financeiro'},
    {key:'nps',label:'NPS'}
  ];
  var colors=['#3b82f6','#ef4444','#22c55e','#f59e0b','#8b5cf6','#ec4899'];
  var html='<div class="card" style="padding:1.25rem;margin-bottom:1rem;overflow-x:auto">';
  html+='<div style="font-size:13px;font-weight:600;color:var(--t);margin-bottom:.5rem">Comparativo de humores por follow-up</div>';
  html+='<div style="font-size:11px;color:var(--t3);margin-bottom:1.25rem">Cada cor representa um follow-up. Barras mais altas = humor melhor (0=Péssimo, 4=Ótimo).</div>';
  // Legend
  html+='<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:1.25rem">';
  follows.forEach(function(f,i){
    html+='<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--t2)"><span style="width:12px;height:12px;border-radius:2px;background:'+colors[i%colors.length]+'"></span>'+formatDate(f.date)+'</div>';
  });
  html+='</div>';
  // Grouped bars
  var groupW=Math.max(follows.length*22+40,80);
  var totalW=humorKeys.length*groupW;
  var h=220;var pad=30;var chartH=h-pad-20;
  html+='<svg width="'+Math.max(totalW,600)+'" height="'+h+'" style="min-width:100%">';
  for(var g=0;g<=4;g++){var gy=pad+(chartH/4)*g;html+='<line x1="30" y1="'+gy+'" x2="'+Math.max(totalW,600)+'" y2="'+gy+'" stroke="var(--bd)" stroke-width="0.5"/>';html+='<text x="20" y="'+(gy+3)+'" text-anchor="end" font-size="9" fill="var(--t3)">'+(4-g)+'</text>';}
  humorKeys.forEach(function(hk,ki){
    var groupX=40+ki*groupW;
    var barW=Math.min(18,(groupW-20)/follows.length);
    follows.forEach(function(f,fi){
      var lvl=(f.humors&&f.humors[hk.key]!==undefined&&f.humors[hk.key]!==null)?f.humors[hk.key]:null;
      if(lvl===null)return;
      var barH=(lvl/4)*chartH;
      var x=groupX+fi*(barW+2);
      var y=pad+chartH-barH;
      html+='<rect x="'+x+'" y="'+y+'" width="'+barW+'" height="'+barH+'" fill="'+colors[fi%colors.length]+'" rx="2"/>';
    });
    html+='<text x="'+(groupX+(follows.length*barW)/2)+'" y="'+(h-5)+'" text-anchor="middle" font-size="10" fill="var(--t2)">'+hk.label+'</text>';
  });
  html+='</svg></div>';
  return html;
}

// ══════════════════════════════════════════════════
// PERGUNTAS EXCLUSIVAS DO RECORRENTE (wizR1..wizR6)
// ══════════════════════════════════════════════════
// wizR1 — Notificações do painel inicial (entra no humor)
function wizR1(){
  var a=S.wiz.answers;
  var opts=[
    {label:'Painel limpo, sem pendências',auto:4,ico:'diamond'},
    {label:'Poucas notificações, nada crítico',auto:2,ico:'info_circle'},
    {label:'Muitas pendências sem acompanhamento',auto:1,ico:'alert'},
    {label:'Alertas críticos (overbooking, sem preço)',auto:0,ico:'cancel'}
  ];
  var sel=a.notifs_option;
  var auto=sel!==undefined&&sel!==null?opts[sel].auto:2;
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Como estão as notificações do painel inicial?</div>';
  html+='<div class="wiz-q-sub">Olhe o painel inicial do cliente: alertas, pendências e avisos dos canais.</div>';
  html+='<div class="wiz-opts">';
  opts.forEach(function(o,i){html+='<div class="wiz-opt'+(sel===i?' sel':'')+'" onclick="wizA(\'notifs_option\','+i+')"><span class="wiz-opt-ico">'+svgIcon(o.ico,16)+'</span><span class="wiz-opt-lbl">'+o.label+'</span></div>';});
  html+='</div>';
  html+='<div style="margin-top:.75rem"><label style="font-size:13px;color:var(--t2)">Observações (opcional)</label><textarea class="wiz-note" rows="2" placeholder="Ex: 3 mensagens não respondidas no Airbnb..." oninput="wizAText(\'notifs_note\',this.value)">'+(a.notifs_note||'')+'</textarea></div>';
  html+=wizFaces('notifs',auto,true);
  html+='</div>';
  return html;
}
// wizR2 — Performance nos canais (entra no humor, mostra follow anterior)
function wizR2(){
  var a=S.wiz.answers;
  var opts=[
    {label:'Boa performance em múltiplos canais',auto:4,ico:'lightning'},
    {label:'Razoável, concentrada em poucos canais',auto:3,ico:'like'},
    {label:'Fraca ou dependência de um único canal',auto:1,ico:'arrow_down'},
    {label:'Queda significativa vs. período anterior',auto:0,ico:'arrow_down'},
    {label:'Sem dados suficientes',auto:2,ico:'info_circle'}
  ];
  var sel=a.chperf_option;
  var auto=sel!==undefined&&sel!==null?opts[sel].auto:2;
  var prev=S.wiz.prevAnswers;
  var prevNote=(prev&&prev.chperf_note)?prev.chperf_note:'';
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Como está a performance nos canais?</div>';
  html+='<div class="wiz-q-sub">Compare o desempenho atual dos canais com o período anterior.</div>';
  if(prevNote){html+='<div class="wiz-prev-note">'+svgIcon('chart',14)+' No último follow: '+e(prevNote)+'</div>';}
  html+='<div class="wiz-opts">';
  opts.forEach(function(o,i){html+='<div class="wiz-opt'+(sel===i?' sel':'')+'" onclick="wizA(\'chperf_option\','+i+')"><span class="wiz-opt-ico">'+svgIcon(o.ico,16)+'</span><span class="wiz-opt-lbl">'+o.label+'</span></div>';});
  html+='</div>';
  html+='<div style="margin-top:.75rem"><label style="font-size:13px;color:var(--t2)">Detalhes por canal (opcional)</label><textarea class="wiz-note" rows="3" placeholder="Ex: Airbnb forte, Booking caiu 20%, Decolar estável..." oninput="wizAText(\'chperf_note\',this.value)">'+(a.chperf_note||'')+'</textarea></div>';
  html+=wizFaces('chperf',auto,true);
  html+='</div>';
  return html;
}
// wizR3 — Usabilidade dos canais (5 sub-itens, humor por maioria, peso baixo)
var WIZ_USAB_ITEMS=[
  {key:'tarifarios',label:'Planos tarifários',opts:['Sem planos configurados ou totalmente incoerentes','Planos incompletos ou desatualizados','Configuração básica, dá pra otimizar','Planos configurados, pequenos ajustes possíveis','Todos os planos bem configurados e coerentes']},
  {key:'pagbooking',label:'Pagamentos via Booking',opts:['Não configurado / pagamentos travados','Configuração incompleta ou com falhas','Configurado, mas pouco utilizado','Configurado, sem pendências relevantes','Recebimento configurado e funcionando bem']},
  {key:'cancelamento',label:'Política de cancelamento',opts:['Sem política ou gerando conflitos','Política pouco adequada ao negócio','Política padrão, sem personalização','Definida, com espaço para ajuste fino','Política clara, adequada ao perfil do cliente']},
  {key:'disponibilidade',label:'Período de disponibilidade',opts:['Calendário fechado ou quase sem disponibilidade','Janela curta, restringindo reservas','Disponibilidade limitada, mas aceitável','Disponibilidade boa, com pequenas lacunas','Calendário aberto e bem projetado à frente']},
  {key:'promocoes',label:'Promoções ativas',opts:['Nenhuma estratégia promocional em temporada crítica','Falta promoção em período que pediria','Sem promoções, mas sem necessidade no momento','Alguma promoção ativa, boa direção','Promoções ativas e bem alinhadas à temporada']}
];
function wizUsabMajority(){
  var a=S.wiz.answers;
  var counts=[0,0,0,0,0];var answered=0;
  WIZ_USAB_ITEMS.forEach(function(it){var v=a['usab_'+it.key];if(v!==undefined&&v!==null){counts[v]++;answered++;}});
  if(answered===0)return 2;
  // find the level with the most votes; tie -> lean to the middle (Neutro=2)
  var max=Math.max.apply(null,counts);
  var leaders=[];counts.forEach(function(n,i){if(n===max)leaders.push(i);});
  if(leaders.length===1)return leaders[0];
  // tie: pick the one closest to the middle (2)
  leaders.sort(function(x,y){return Math.abs(x-2)-Math.abs(y-2);});
  return leaders[0];
}
function wizR3(){
  if(hasBeta())return wizR3v2();
  var a=S.wiz.answers;
  var auto=wizUsabMajority();
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Usabilidade dos canais de venda</div>';
  html+='<div class="wiz-q-sub">Avalie cada item. O humor final é calculado pela maioria dos itens.</div>';
  WIZ_USAB_ITEMS.forEach(function(it){
    var sel=a['usab_'+it.key];
    html+='<div class="wiz-usab-item"><div class="wiz-usab-lbl">'+it.label+'</div><div class="wiz-usab-faces">';
    FKEYS.forEach(function(k,i){
      var fc=FCOLORS[k];
      var isActive=sel===i;
      var style='background:'+fc.bg+';border-color:'+(isActive?fc.bd:'transparent')+';color:'+fc.tx+';'+(isActive?'border-width:2px;opacity:1':'opacity:.55');
      html+='<button class="wiz-usab-face" title="'+e(it.opts[i])+'" style="'+style+'" onclick="wizA(\'usab_'+it.key+'\','+i+')">'+face(k,26)+'</button>';
    });
    html+='</div>';
    if(sel!==undefined&&sel!==null){html+='<div class="wiz-usab-desc" style="color:'+FCOLORS[FKEYS[sel]].tx+'">'+e(it.opts[sel])+'</div>';}
    html+='</div>';
  });
  html+='<div style="margin-top:.75rem"><label style="font-size:13px;color:var(--t2)">Observações gerais (opcional)</label><textarea class="wiz-note" rows="2" placeholder="Notas sobre usabilidade..." oninput="wizAText(\'usab_note\',this.value)">'+(a.usab_note||'')+'</textarea></div>';
  html+=wizFaces('usab',auto,true);
  html+='</div>';
  return html;
}

// ══════════════════════════════════════════════════
// USABILIDADE DOS CANAIS — VERSAO NOVA (em prova)
// ══════════════════════════════════════════════════
// O que os analistas relataram testando o sistema: as 5 escalas de carinha eram
// ambiguas. Elas pediam uma NOTA DE QUALIDADE pra coisas que sao caracteristica
// do cliente (cobra por noite ou por temporada?) ou fato binario (o pagamento via
// Booking esta configurado?) — nao existe resposta "boa" ou "ruim" ali.
// Agora cada item pergunta o que realmente da pra observar, e so dois deles pesam
// no score: periodo de disponibilidade e promocoes ativas.

// Disponibilidade em meses de calendario aberto. Mesma leitura da pergunta de
// ocupacao: a faixa vem escrita no rotulo, sem campo numerico livre. Ordem da
// melhor pra pior na tela; o indice do humor vai em `h` (0=pessimo, 4=otimo).
var WIZ_DISP_OPTS=[
  {h:4,label:'Ótimo — mais de 12 meses de calendário aberto',ico:'fire'},
  {h:3,label:'Bom — 12 meses de calendário aberto',ico:'check'},
  {h:2,label:'Neutro — de 8 a 11 meses',ico:'info_triangle'},
  {h:1,label:'Ruim — 7 meses',ico:'alert'},
  {h:0,label:'Péssimo — menos de 7 meses',ico:'cancel'}
];
// Só Airbnb e Booking têm promoção; os outros canais não oferecem o recurso,
// então nem entram na pergunta.
var WIZ_PROMO_CHANNELS=['airbnb','booking'];
function wizChannelName(k){var c=WIZ_CHANNELS.find(function(x){return x.key===k;});return c?c.name:k;}
function wizActiveChannelKeys(a){
  return(a.channels||[]).filter(function(c){return c.active;}).map(function(c){return c.key;});
}
function wizPromoChannels(a){
  var act=wizActiveChannelKeys(a);
  return WIZ_PROMO_CHANNELS.filter(function(k){return act.indexOf(k)>=0;});
}
// Promocao ativa sobe o score, mas NAO ter promocao nao derruba: da Neutro, nunca
// Pessimo — nem todo periodo pede promocao. Com os dois canais ativos e respostas
// diferentes, vale a media dos dois.
function wizPromoHumor(a){
  var vals=[];
  wizPromoChannels(a).forEach(function(k){
    var v=a['usab_promo_'+k];
    if(v===true)vals.push(3);
    else if(v===false)vals.push(2);
  });
  if(!vals.length)return null;
  return Math.round(vals.reduce(function(x,y){return x+y;},0)/vals.length);
}
// Com so dois itens pontuando, "maioria" nao faz mais sentido: e a media dos que
// foram respondidos. Nenhum respondido continua Neutro, como antes.
function wizUsabHumorV2(){
  var a=S.wiz.answers;
  var votos=[];
  if(a.usab_disponibilidade!==undefined&&a.usab_disponibilidade!==null)votos.push(a.usab_disponibilidade);
  var p=wizPromoHumor(a);
  if(p!==null)votos.push(p);
  if(!votos.length)return 2;
  return Math.round(votos.reduce(function(x,y){return x+y;},0)/votos.length);
}
// PriceLabs + desconto por duracao de estadia na Stays nao convivem: com os dois
// ligados a Stays nao recebe os precos certos do PriceLabs, e o cliente paga a
// ferramenta a toa. Vale so o PriceLabs — as outras ferramentas nao tem o problema.
// O nome da ferramenta pode nao ter sido respondido ainda neste follow (aquela
// pergunta vem depois desta), entao vale tambem o que o follow anterior registrou.
// So o que ESTE follow registrou. E o que vale pra texto de follow salvo, que
// tem que refletir aquele follow e mais nada.
function answersUsePricelabs(a){
  return a.pricing_tool==='sim'&&String(a.pricing_tool_name||'').toLowerCase()==='pricelabs';
}
function wizUsesPricelabs(a){
  if(answersUsePricelabs(a))return true;
  var p=S.wiz&&S.wiz.prevAnswers;
  return!!(p&&p.pricing_tool==='sim'&&String(p.pricing_tool_name||'').toLowerCase()==='pricelabs');
}
function wizPricelabsConflict(a){
  return a.usab_pricing_noite_mode==='desconto'&&wizUsesPricelabs(a)&&!a.usab_pricelabs_alert_ignored;
}
function wizPricelabsAlertHTML(){
  return'<div class="wiz-alert">'+svgIcon('alert',14)+' Este cliente usa <strong>PriceLabs</strong> e está com <strong>desconto por duração de estadia</strong>. Os dois juntos não funcionam: a Stays não recebe os preços corretos do PriceLabs, e o cliente acaba pagando a ferramenta à toa. O desconto precisa ficar <strong>só no PriceLabs</strong>. <button class="btn btn-sm" style="margin-left:8px" onclick="wizCreateReminderPricelabs()">Criar lembrete (2 dias)</button> <button class="btn btn-sm" style="margin-left:4px" onclick="wizA(\'usab_pricelabs_alert_ignored\',true)">Ignorar</button></div>';
}
function wizCreateReminderPricelabs(){
  var ci=S.sel;
  var dueDate=new Date(Date.now()+2*24*60*60*1000).toISOString().split('T')[0];
  if(!S.clients[ci].reminders)S.clients[ci].reminders=[];
  S.clients[ci].reminders.push({id:uid(),type:'proativo',title:'Desconto por duração de estadia x PriceLabs',dueDate:dueDate,note:'Cliente usa PriceLabs e tem desconto por duração de estadia configurado na Stays. Alinhar: o desconto precisa ficar só no PriceLabs, senão os preços não chegam corretamente e o cliente paga a ferramenta à toa.',done:false,doneAt:null,archived:false,createdBy:S.appUser.uid,createdByName:S.appUser.name,createdAt:Date.now()});
  saveState();
  wizA('usab_pricelabs_alert_ignored',true);
}
function wizSetUsabPricingType(v){
  var a=S.wiz.answers;
  // Trocar pra "por temporada" apaga o detalhe de "por noite" (e o aviso ignorado
  // junto), senao o texto do Salesforce sairia com um detalhe que nao vale mais.
  if(v==='temporada'){delete a.usab_pricing_noite_mode;delete a.usab_pricelabs_alert_ignored;}
  wizA('usab_pricing_type',v);
}
function wizSetCancelStatus(v){
  var a=S.wiz.answers;
  if(v!=='alguns')delete a.usab_cancel_channels;
  wizA('usab_cancel_status',v);
}
function wizToggleCancelChannel(k){
  if(S.editFollow)S.editFollowDirty=true;
  var a=S.wiz.answers;
  if(!a.usab_cancel_channels)a.usab_cancel_channels=[];
  var i=a.usab_cancel_channels.indexOf(k);
  if(i>=0)a.usab_cancel_channels.splice(i,1);else a.usab_cancel_channels.push(k);
  render();
}
// Sim/Nao. O "Sim" carrega o visto verde que o Pedro pediu, mas ficam os dois
// botoes em vez de uma caixinha que so liga/desliga: "nao verifiquei" e "nao tem"
// precisam ser coisas diferentes, senao o texto do Salesforce afirma o que ninguem
// olhou — e esse texto vai pro registro do cliente.
function wizYesNoHTML(key,val,labelSim,labelNao){
  return'<div class="wiz-yn">'
    +'<button class="wiz-yn-b'+(val===true?' on-yes':'')+'" onclick="wizA(\''+key+'\',true)">'
      +'<span class="wiz-yn-box">'+(val===true?svgIcon('check',12):'')+'</span>'+e(labelSim||'Sim')+'</button>'
    +'<button class="wiz-yn-b'+(val===false?' on-no':'')+'" onclick="wizA(\''+key+'\',false)">'
      +'<span class="wiz-yn-box">'+(val===false?svgIcon('cancel',12):'')+'</span>'+e(labelNao||'Não')+'</button>'
    +'</div>';
}
// Follow salvo no formato novo carrega esta marca. E assim que o resumo do wizard
// e o texto do Salesforce sabem qual leitura usar, mesmo meses depois — follow
// antigo continua sendo lido do jeito que foi salvo, sem reescrever historico.
// Respondido = tudo que apareceu na tela foi preenchido. Item de canal inativo
// nao entra na conta, porque nem chegou a ser mostrado.
function wizUsabAnsweredV2(a){
  var falta=function(v){return v===undefined||v===null;};
  if(falta(a.usab_pricing_type))return false;
  if(a.usab_pricing_type==='noite'&&falta(a.usab_pricing_noite_mode))return false;
  var act=wizActiveChannelKeys(a);
  if(act.indexOf('booking')>=0&&falta(a.usab_pagbooking_ok))return false;
  if(falta(a.usab_cancel_status))return false;
  if(a.usab_cancel_status==='alguns'&&act.length&&!(a.usab_cancel_channels||[]).length)return false;
  if(falta(a.usab_disponibilidade))return false;
  return wizPromoChannels(a).every(function(k){return!falta(a['usab_promo_'+k]);});
}
function usabIsV2(a){
  if(a.usab_v2===true)return true;
  return['usab_pricing_type','usab_pagbooking_ok','usab_cancel_status','usab_promo_airbnb','usab_promo_booking']
    .some(function(k){return a[k]!==undefined&&a[k]!==null;});
}
// Texto da usabilidade nova. Uma fonte so pro resumo e pro Salesforce, senao os
// dois acabam discordando com o tempo.
function usabTextV2(a){
  var partes=[];
  if(a.usab_pricing_type==='temporada')partes.push('Precificação: por temporada');
  else if(a.usab_pricing_type==='noite'){
    var det=a.usab_pricing_noite_mode==='desconto'?'desconto por duração de estadia'
      :(a.usab_pricing_noite_mode==='comum'?'planos tarifários comuns':'tipo não informado');
    partes.push('Precificação: por noite ('+det+')');
    if(a.usab_pricing_noite_mode==='desconto'&&answersUsePricelabs(a))
      partes.push('ATENÇÃO: usa PriceLabs junto com desconto por duração de estadia — configuração incompatível');
  }
  if(a.usab_pagbooking_ok===true)partes.push('Pagamentos via Booking: configurado');
  else if(a.usab_pagbooking_ok===false)partes.push('Pagamentos via Booking: não configurado');
  if(a.usab_cancel_status==='todos')partes.push('Política de cancelamento: vinculada em todos os canais de venda');
  else if(a.usab_cancel_status==='nenhum')partes.push('Política de cancelamento: não vinculada em nenhum canal');
  else if(a.usab_cancel_status==='alguns'){
    var chs=(a.usab_cancel_channels||[]).map(wizChannelName);
    partes.push('Política de cancelamento: vinculada só em '+(chs.length?chs.join(', '):'canais não informados'));
  }
  if(a.usab_disponibilidade!==undefined&&a.usab_disponibilidade!==null){
    var d=WIZ_DISP_OPTS.find(function(o){return o.h===a.usab_disponibilidade;});
    partes.push('Período de disponibilidade: '+(d?d.label:'não informado'));
  }
  var promo=[];
  WIZ_PROMO_CHANNELS.forEach(function(k){
    var v=a['usab_promo_'+k];
    if(v===true)promo.push(wizChannelName(k)+': tem promoção');
    else if(v===false)promo.push(wizChannelName(k)+': não tem');
  });
  if(promo.length)partes.push('Promoções ativas — '+promo.join(', '));
  return partes.length?partes.join(' | '):'Não avaliado';
}
function wizR3v2(){
  var a=S.wiz.answers;
  if(!a.usab_v2)a.usab_v2=true;
  var auto=wizUsabHumorV2();
  var actKeys=wizActiveChannelKeys(a);
  var selo=function(conta){return conta
    ?'<span class="wiz-tag wiz-tag-score">conta no score</span>'
    :'<span class="wiz-tag wiz-tag-info">sem score</span>';};
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Usabilidade dos canais de venda</div>';
  html+='<div class="wiz-q-sub">Disponibilidade e promoções entram no score. Precificação, pagamento via Booking e política de cancelamento são registro do que o cliente usa hoje — sem nota.</div>';

  // ── Precificação (era "planos tarifários") ──
  html+='<div class="wiz-sub-section"><div class="wiz-sub-q">Como o cliente precifica '+selo(false)+'</div>';
  html+='<div class="wiz-opts">';
  html+='<div class="wiz-opt'+(a.usab_pricing_type==='noite'?' sel':'')+'" onclick="wizSetUsabPricingType(\'noite\')"><span class="wiz-opt-ico">'+svgIcon('moon',16)+'</span><span class="wiz-opt-lbl">Por noite</span></div>';
  html+='<div class="wiz-opt'+(a.usab_pricing_type==='temporada'?' sel':'')+'" onclick="wizSetUsabPricingType(\'temporada\')"><span class="wiz-opt-ico">'+svgIcon('calendar',16)+'</span><span class="wiz-opt-lbl">Por temporada</span></div>';
  html+='</div>';
  if(a.usab_pricing_type==='noite'){
    html+='<div class="wiz-sub-q" style="margin:12px 0 .75rem">Qual o tipo, dentro de "por noite"?</div><div class="wiz-opts">';
    html+='<div class="wiz-opt'+(a.usab_pricing_noite_mode==='comum'?' sel':'')+'" onclick="wizA(\'usab_pricing_noite_mode\',\'comum\')"><span class="wiz-opt-ico">'+svgIcon('columns',16)+'</span><span class="wiz-opt-lbl">Planos tarifários comuns</span></div>';
    html+='<div class="wiz-opt'+(a.usab_pricing_noite_mode==='desconto'?' sel':'')+'" onclick="wizA(\'usab_pricing_noite_mode\',\'desconto\')"><span class="wiz-opt-ico">'+svgIcon('sand_watch',16)+'</span><span class="wiz-opt-lbl">Desconto por duração de estadia</span></div>';
    html+='</div>';
    if(wizPricelabsConflict(a))html+=wizPricelabsAlertHTML();
  }
  html+='</div>';

  // ── Pagamentos via Booking (só se o cliente vende no Booking) ──
  if(actKeys.indexOf('booking')>=0){
    html+='<div class="wiz-sub-section"><div class="wiz-sub-q">Recebimento de pagamentos via Booking está configurado? '+selo(false)+'</div>';
    html+=wizYesNoHTML('usab_pagbooking_ok',a.usab_pagbooking_ok,'Sim, está configurado','Não está configurado');
    html+='</div>';
  }

  // ── Política de cancelamento ──
  html+='<div class="wiz-sub-section"><div class="wiz-sub-q">Política de cancelamento vinculada aos canais '+selo(false)+'</div>';
  html+='<div class="wiz-opts">';
  [['todos','Tem vinculada em todos os canais de venda','check'],
   ['alguns','Tem em alguns canais','info_triangle'],
   ['nenhum','Não tem vinculada em nenhum canal','cancel']].forEach(function(o){
    html+='<div class="wiz-opt'+(a.usab_cancel_status===o[0]?' sel':'')+'" onclick="wizSetCancelStatus(\''+o[0]+'\')"><span class="wiz-opt-ico">'+svgIcon(o[2],16)+'</span><span class="wiz-opt-lbl">'+o[1]+'</span></div>';
  });
  html+='</div>';
  if(a.usab_cancel_status==='alguns'){
    if(!actKeys.length){
      html+='<div class="wiz-prev-note" style="margin-top:10px;margin-bottom:0">Nenhum canal foi marcado como ativo na pergunta de canais — volte lá pra poder escolher quais têm a política.</div>';
    }else{
      html+='<div class="wiz-sub-q" style="margin:12px 0 .5rem">Quais canais têm a política vinculada?</div><div class="wiz-chips">';
      actKeys.forEach(function(k){
        var on=(a.usab_cancel_channels||[]).indexOf(k)>=0;
        html+='<button class="wiz-chip'+(on?' on':'')+'" onclick="wizToggleCancelChannel(\''+k+'\')">'+(on?svgIcon('check',12)+' ':'')+e(wizChannelName(k))+'</button>';
      });
      html+='</div>';
    }
  }
  html+='</div>';

  // ── Período de disponibilidade (pontua) ──
  html+='<div class="wiz-sub-section"><div class="wiz-sub-q">Período de disponibilidade '+selo(true)+'</div>';
  html+='<div class="wiz-q-sub" style="margin-top:-4px">Quanto tempo de calendário aberto o cliente tem à frente.</div>';
  html+='<div class="wiz-opts">';
  WIZ_DISP_OPTS.forEach(function(o){
    html+='<div class="wiz-opt'+(a.usab_disponibilidade===o.h?' sel':'')+'" onclick="wizA(\'usab_disponibilidade\','+o.h+')"><span class="wiz-opt-ico">'+svgIcon(o.ico,16)+'</span><span class="wiz-opt-lbl">'+o.label+'</span></div>';
  });
  html+='</div></div>';

  // ── Promoções ativas, por canal (pontua) ──
  var promoCh=wizPromoChannels(a);
  html+='<div class="wiz-sub-section"><div class="wiz-sub-q">Promoções ativas '+selo(true)+'</div>';
  if(!promoCh.length){
    html+='<div class="wiz-prev-note" style="margin-bottom:0">Só Airbnb e Booking têm promoção, e nenhum dos dois está marcado como canal ativo — nada a verificar aqui.</div>';
  }else{
    html+='<div class="wiz-q-sub" style="margin-top:-4px">Não ter promoção não derruba o score (fica neutro); ter promoção ativa sobe.</div>';
    promoCh.forEach(function(k){
      html+='<div class="wiz-yn-row"><span class="wiz-yn-lbl">'+e(wizChannelName(k))+'</span>'
        +wizYesNoHTML('usab_promo_'+k,a['usab_promo_'+k],'Tem promoção','Não tem')+'</div>';
    });
  }
  html+='</div>';

  html+='<div style="margin-top:1rem"><label style="font-size:13px;color:var(--t2)">Observações gerais (opcional)</label><textarea class="wiz-note" rows="2" placeholder="Notas sobre usabilidade..." oninput="wizAText(\'usab_note\',this.value)">'+(a.usab_note||'')+'</textarea></div>';
  html+=wizFaces('usab',auto,true);
  html+='</div>';
  return html;
}


// wizR4 — Sugestão de produto pendente (sem humor; gera selo azul no perfil)
function wizR4(){
  var a=S.wiz.answers;
  var sim=a.prodsug_has;
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Há alguma sugestão de produto pendente para este cliente?</div>';
  html+='<div class="wiz-q-sub">Se sim, um selo azul discreto aparecerá no perfil do cliente lembrando dessa oportunidade.</div>';
  html+='<div class="wiz-opts">';
  html+='<div class="wiz-opt'+(sim===true?' sel':'')+'" onclick="wizA(\'prodsug_has\',true)"><span class="wiz-opt-ico">'+svgIcon('lightbulb',16)+'</span><span class="wiz-opt-lbl">Sim, há sugestão pendente</span></div>';
  html+='<div class="wiz-opt'+(sim===false?' sel':'')+'" onclick="wizA(\'prodsug_has\',false)"><span class="wiz-opt-ico">'+svgIcon('columns',16)+'</span><span class="wiz-opt-lbl">Não, nada pendente</span></div>';
  html+='</div>';
  if(sim===true){
    html+='<div style="margin-top:.75rem"><label style="font-size:13px;color:var(--t2)">Qual produto / sugestão?</label><textarea class="wiz-note" rows="3" placeholder="Ex: Sugerir módulo financeiro; oferecer site personalizado..." oninput="wizAText(\'prodsug_note\',this.value)">'+(a.prodsug_note||'')+'</textarea></div>';
    html+='<div class="wiz-prev-note" style="margin-top:10px;margin-bottom:0">'+svgIcon('lightbulb',14)+' Um selo <b>Sugestão pendente</b> ficará visível no perfil do cliente até ser resolvido.</div>';
  }
  html+='</div>';
  return html;
}
// wizR5 — Negociação de mensalidade (sem humor)
function wizR5(){
  var a=S.wiz.answers;
  var sim=a.nego_has;
  var auto=sim===true?1:(sim===false?4:2); // sim=Ruim (risco), não=Ótimo (saudável)
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Há negociação de mensalidade em andamento?</div>';
  html+='<div class="wiz-q-sub">Registre qualquer conversa sobre valores, reajuste, desconto ou renegociação de plano. Negociação em aberto é sinal de risco — ajuste o humor se for uma conversa tranquila ou séria.</div>';
  html+='<div class="wiz-opts">';
  html+='<div class="wiz-opt'+(sim===true?' sel':'')+'" onclick="wizA(\'nego_has\',true)"><span class="wiz-opt-ico">'+svgIcon('user_plus',16)+'</span><span class="wiz-opt-lbl">Sim, há negociação</span></div>';
  html+='<div class="wiz-opt'+(sim===false?' sel':'')+'" onclick="wizA(\'nego_has\',false)"><span class="wiz-opt-ico">'+svgIcon('columns',16)+'</span><span class="wiz-opt-lbl">Não há negociação</span></div>';
  html+='</div>';
  if(sim===true||sim===false){
    html+='<div style="margin-top:.75rem"><label style="font-size:13px;color:var(--t2)">Descreva a situação</label><textarea class="wiz-note" rows="3" placeholder="'+(sim===true?'Ex: Cliente pediu desconto de 10%; avaliando upgrade de plano...':'Ex: Sem pauta de mensalidade neste momento...')+'" oninput="wizAText(\'nego_note\',this.value)">'+(a.nego_note||'')+'</textarea></div>';
    html+=wizFaces('nego',auto,true);
  }
  html+='</div>';
  return html;
}
// wizR6 — Plano de contas + próximos passos (última pergunta, com sugestões automáticas)
function wizR6(){
  var a=S.wiz.answers;
  var tem=a.acct_has;
  var html='<div class="wiz-card">';
  html+='<div class="wiz-q">Plano de contas e próximos passos</div>';
  html+='<div class="wiz-q-sub">Fechamento do follow: consolide o que levar para a reunião com o cliente.</div>';
  // 1. plano de contas preenchido?
  html+='<div style="margin:.5rem 0 .25rem;font-size:13px;font-weight:600;color:var(--t)">O cliente tem plano de contas preenchido?</div>';
  html+='<div class="wiz-opts">';
  html+='<div class="wiz-opt'+(tem===true?' sel':'')+'" onclick="wizA(\'acct_has\',true)"><span class="wiz-opt-ico">'+svgIcon('check',16)+'</span><span class="wiz-opt-lbl">Sim, preenchido</span></div>';
  html+='<div class="wiz-opt'+(tem===false?' sel':'')+'" onclick="wizA(\'acct_has\',false)"><span class="wiz-opt-ico">'+svgIcon('cancel',16)+'</span><span class="wiz-opt-lbl">Não preenchido</span></div>';
  html+='</div>';
  // 2. pontos positivos (auto-sugeridos)
  var pos=wizAutoPositives();
  html+='<div style="margin-top:1rem"><label style="font-size:13px;color:var(--t2);font-weight:600">Pontos positivos para destacar na reunião</label>';
  if(pos.length){html+='<div class="wiz-suggest wiz-suggest-pos">'+svgIcon('lightbulb',14)+' Sugestões do sistema:<ul>'+pos.map(function(p){return '<li>'+e(p)+'</li>';}).join('')+'</ul></div>';}
  html+='<textarea class="wiz-note" rows="3" placeholder="Destaques positivos para a conversa..." oninput="wizAText(\'acct_positives\',this.value)">'+(a.acct_positives||'')+'</textarea></div>';
  // 3. pontos de atenção (auto-sugeridos)
  var att=wizAutoAttention();
  html+='<div style="margin-top:1rem"><label style="font-size:13px;color:var(--t2);font-weight:600">Pontos de atenção</label>';
  if(att){html+='<div class="wiz-suggest wiz-suggest-att">'+svgIcon('alert',14)+' Sugestões do sistema:<div style="white-space:pre-line;margin-top:4px">'+e(att)+'</div></div>';}
  html+='<textarea class="wiz-note" rows="3" placeholder="Pontos que precisam de cuidado..." oninput="wizAText(\'acct_attention\',this.value)">'+(a.acct_attention||'')+'</textarea></div>';
  // 4. próximos passos
  html+='<div style="margin-top:1rem"><label style="font-size:13px;color:var(--t2);font-weight:600">Próximos passos</label><textarea class="wiz-note" rows="3" placeholder="Ações combinadas, agendamentos, follow-ups..." oninput="wizAText(\'acct_next\',this.value)">'+(a.acct_next||'')+'</textarea></div>';
  html+='</div>';
  return html;
}
// Sugere pontos positivos a partir dos humores altos do follow atual
function wizAutoPositives(){
  var eff=wizEffectiveHumors();
  var labels=wizQLabels();
  var out=[];
  Object.keys(eff).forEach(function(k){
    if(eff[k]>=3&&labels[k])out.push(labels[k]+(eff[k]===4?' (ótimo)':' (bom)'));
  });
  return out.slice(0,6);
}
// Mapa de rótulos legíveis por chave de humor (para sugestões automáticas)
function wizQLabels(){
  return {units:'Unidades',channels:'Canais conectados',notifs:'Painel de notificações',chperf:'Performance nos canais',usab:'Usabilidade dos canais',occupation:'Ocupação',price:'Preço competitivo',photos:'Fotos e descrição',financial:'Módulo financeiro',operational:'Módulo operacional',appcenter:'App Center',payment:'Canal de pagamento',domain:'Migração de domínio',site:'Personalização do site',nps:'NPS',cases:'Casos abertos'};
}

function wizView(){
  var step=S.wiz.step;
  var isRec=S.wiz.type==='recurring';
  var effSteps=getWizOrder(S.wiz.type);
  var total=effSteps.length;
  var pct=Math.round(((step+1)/total)*100);
  var stepKey=effSteps[step];
  var renderFn=stepKey&&stepKey.indexOf('custom_')===0?(function(){return wizRenderCustomQuestion(stepKey.slice(7));}):WIZ_RENDERERS[stepKey];
  var HINTMAP={units:'SMS da Stays',cities:'Sistema do cliente',pricing:'SMS da Stays',channels:'SMS da Stays',notifs:'SMS da Stays / Painel',ch_perf:'SMS da Stays',ch_usab:'SMS da Stays',domain:'SMS da Stays',tz_check:'Sistema do cliente',site:'Sistema do cliente',photos:'Sistema do cliente',occupation:'Sistema do cliente',price:'SMS da Stays',lastminute:'Sistema do cliente',financial:'SMS da Stays',operational:'SMS da Stays',appcenter:'SMS da Stays',openapi:'SMS da Stays / Salesforce',prod_sug:'Análise do analista',payment:'SMS da Stays',inadimplencia:'Salesforce',nego:'Salesforce',nps_churn:'Track (NPS) / Salesforce',cases:'Salesforce',upgrade:'Análise do plano',acct_plan:'Plano de contas / Salesforce'};
  var ICONMAP={units:'units',cities:'cities',pricing:'pricing',channels:'channels',notifs:'notifs',ch_perf:'ch_perf',ch_usab:'ch_usab',domain:'domain',tz_check:'timer',site:'site',photos:'photos',occupation:'occupation',price:'price',lastminute:'lastminute',financial:'financial',operational:'operational',appcenter:'appcenter',openapi:'openapi',prod_sug:'prod_sug',payment:'payment',inadimplencia:'inadimplencia',nego:'nego',nps_churn:'nps_churn',cases:'cases',upgrade:'upgrade',acct_plan:'acct_plan'};
  var curHint=HINTMAP[stepKey]||'';
  var curIcon=ICONMAP[stepKey]||'acct_plan';
  var c=S.clients[S.sel];
  var html='<div class="wiz-wrap">';
  html+='<div style="display:flex;align-items:center;gap:10px;margin-bottom:1.25rem">';
  html+='<button class="btn btn-sm" onclick="wizExitConfirm()">← Voltar</button>';
  html+='<div style="font-size:15px;font-weight:500;color:var(--t)">Follow-up — '+e(c?c.name:'')+'</div>';
  html+='</div>';
  html+='<div class="wiz-progress"><div class="wiz-progress-fill" style="width:'+pct+'%"></div></div>';
  html+='<div class="wiz-step-lbl"><span style="font-size:18px;display:inline-flex;vertical-align:middle;color:var(--b600)">'+svgIcon(curIcon,20)+'</span>Pergunta '+(step+1)+' de '+total+' &nbsp;·&nbsp; <span style="color:var(--t3);font-size:10px">'+curHint+'</span></div>';
  html+=renderFn();
  // Campo de Anotações por pergunta (aparece no resumo e alimenta o prompt do WhatsApp)
  html+='<div class="wiz-annot"><label class="wiz-annot-lbl">'+svgIcon('edit',14)+' Anotações desta pergunta <span style="color:var(--t3);font-weight:400">(opcional)</span></label>'
    +'<textarea class="wiz-note" rows="2" placeholder="Observações do analista sobre este ponto..." oninput="wizAText(\'note_'+stepKey+'\',this.value)">'+(S.wiz.answers['note_'+stepKey]||'')+'</textarea></div>';
  var isLast=step===total-1;
  html+='<div class="wiz-nav">'
    +(step===0?'<span></span>':'<button class="btn btn-sm" onclick="wizGo('+(step-1)+')">← Anterior</button>')
    +'<div style="display:flex;gap:8px;align-items:center"><span style="font-size:11px;color:var(--t3);display:flex;align-items:center;gap:4px">'+svgIcon('save',12)+' Salvo automaticamente</span>'
    +'<span class="wiz-counter" style="font-size:13px;color:var(--t3)">'+(step+1)+' / '+total+'</span></div>'
    +(isLast?'<button class="btn-primary" onclick="wizTryAdvance(\'summary\')">Ver resumo →</button>':'<button class="btn-primary" onclick="wizTryAdvance('+(step+1)+')">Próxima →</button>')
    +'</div>';
  if(S.wizBlockedMsg)html+='<div class="alert alert-red" style="margin-top:10px">Selecione uma resposta pra continuar — essa pergunta é obrigatória.</div>';
  html+='</div>';
  return html;
}

function wizSaveProgress(){
  var ci=S.sel;var c=S.clients[ci];
  if(!c.wizDraft)c.wizDraft={};
  c.wizDraft={step:S.wiz.step,type:S.wiz.type,answers:Object.assign({},S.wiz.answers),humors:Object.assign({},S.wiz.humors),autoHumors:Object.assign({},S.wiz.autoHumors||{}),savedAt:new Date().toISOString()};
  saveState();
  alert('Follow-up salvo! Você pode continuar de onde parou depois, abrindo novamente na aba Follow-Ups.');
  S.view='client';S.clientTab='follows';
  render();
}
function wizAnnotationsRecap(){
  var a=S.wiz.answers;
  var steps=getWizOrder(S.wiz.type);
  var items=[];
  steps.forEach(function(k){var n=a['note_'+k];if(n&&n.trim())items.push({label:wizOrderLabel(k),note:n.trim()});});
  return items;
}
function wizStepLabels(){
  return {units:'Unidades',cities:'Localização/temporada',pricing:'Precificação',channels:'Canais',notifs:'Notificações do painel',ch_perf:'Performance nos canais',ch_usab:'Usabilidade dos canais',domain:'Migração de domínio',tz_check:'Fuso horário do sistema',site:'Personalização do site',photos:'Fotos e descrição',occupation:'Ocupação',price:'Preço competitivo',lastminute:'Last minute',financial:'Módulo financeiro',operational:'Módulo operacional',appcenter:'App Center',openapi:'Open API',prod_sug:'Sugestão de produto',payment:'Canal de pagamento',inadimplencia:'Inadimplência',nego:'Negociação de mensalidade',nps_churn:'Churn/NPS/Reclame Aqui',cases:'Casos abertos',upgrade:'Upgrade',acct_plan:'Plano de contas'};
}
function wizGoSummary(){S.wiz.step=getWizOrder(S.wiz.type).length;render();}

function wizEvolutionCard(a,p,curH,prevH,prevDate){
  var usingWiz=arguments.length===0;
  if(usingWiz){
    if(S.wiz.type!=='recurring'||!S.wiz.prevAnswers)return '';
    a=S.wiz.answers;p=S.wiz.prevAnswers;curH=S.wiz.humors||{};prevH=S.wiz.prevHumors||{};prevDate=S.wiz.prevFollowDate;
  }else{
    if(!p)return '';
    curH=curH||{};prevH=prevH||{};
  }
  var EV_HUMOR_LABELS=['Péssimo','Ruim','Neutro','Bom','Ótimo'];
  var rows=[];
  // Unidades e canais: valor bruto (mais preciso que o humor)
  if(p.units_count!==undefined&&a.units_count!==undefined){
    var diff=(+a.units_count)-(+p.units_count);
    var arrow=diff>0?'<span style="color:#16a34a">'+svgIcon('arrow_up',10)+' +'+diff+'</span>':(diff<0?'<span style="color:#dc2626">'+svgIcon('arrow_down',10)+' '+diff+'</span>':'<span style="color:var(--t3)">= igual</span>');
    rows.push({label:'Unidades',prev:p.units_count,cur:a.units_count,change:arrow});
  }
  var prevChCount=(p.channels||[]).filter(function(x){return x.active;}).length;
  var curChCount=(a.channels||[]).filter(function(x){return x.active;}).length;
  if(prevChCount||curChCount){
    var chDiff=curChCount-prevChCount;
    var chArrow=chDiff>0?'<span style="color:#16a34a">'+svgIcon('arrow_up',10)+' +'+chDiff+'</span>':(chDiff<0?'<span style="color:#dc2626">'+svgIcon('arrow_down',10)+' '+chDiff+'</span>':'<span style="color:var(--t3)">= igual</span>');
    rows.push({label:'Canais conectados',prev:prevChCount,cur:curChCount,change:chArrow});
  }
  // Todos os demais indicadores com humor calculado neste follow e no anterior, sem filtro (fixos + customizados)
  var HUMOR_TO_STEP={};Object.keys(STEP_HUMOR_KEY).forEach(function(sk){var hk=STEP_HUMOR_KEY[sk];if(hk)HUMOR_TO_STEP[hk]=sk;});
  Object.keys(Object.assign({},prevH,curH)).forEach(function(hk){
    if(hk==='units'||hk==='channels')return;
    var pv=prevH[hk],cv=curH[hk];
    if(pv===undefined||pv===null||cv===undefined||cv===null)return;
    var d=cv-pv;
    var arrow=d>0?'<span style="color:#16a34a">'+svgIcon('arrow_up',10)+' melhorou</span>':(d<0?'<span style="color:#dc2626">'+svgIcon('arrow_down',10)+' piorou</span>':'<span style="color:var(--t3)">= igual</span>');
    rows.push({label:wizOrderLabel(HUMOR_TO_STEP[hk]||hk),prev:EV_HUMOR_LABELS[pv],cur:EV_HUMOR_LABELS[cv],change:arrow});
  });
  if(!rows.length)return '';
  var html='<div class="card" style="padding:1.25rem;margin-bottom:1rem">';
  html+='<div style="font-size:13px;font-weight:600;color:var(--t);margin-bottom:1rem">'+svgIcon('arrow_up',14)+' Evolução desde o último follow ('+formatDate(prevDate||'')+')</div>';
  html+='<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">';
  rows.forEach(function(r){
    html+='<div style="background:var(--surf2);border:1px solid var(--bd);border-radius:10px;padding:14px">';
    html+='<div style="font-size:11px;color:var(--t3);font-weight:600;text-transform:uppercase;letter-spacing:.03em;margin-bottom:8px">'+r.label+'</div>';
    html+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">';
    html+='<span style="font-size:15px;color:var(--t3)">'+r.prev+'</span>';
    html+='<span style="color:var(--t3);font-size:14px">→</span>';
    html+='<span style="font-size:18px;font-weight:700;color:var(--t)">'+r.cur+'</span>';
    html+='</div>';
    html+='<div style="font-size:12px;font-weight:600">'+r.change+'</div>';
    html+='</div>';
  });
  html+='</div></div>';
  return html;
}
function wizSummaryView(){
  var a=S.wiz.answers;
  var h=S.wiz.humors;
  var c=S.clients[S.sel];
  var HUMOR_LABELS=['Péssimo','Ruim','Neutro','Bom','Ótimo'];
  var HUMOR_COLORS=['#fee2e2','#ffedd5','#fef9c3','#dcfce7','#bbf7d0'];
  var HUMOR_BORDERS=['#ef4444','#f97316','#eab308','#22c55e','#16a34a'];
  var HUMOR_TEXT=['#7f1d1d','#9a3412','#854d0e','#166534','#14532d'];
  var questions=[
    {key:'units',label:'Unidades'},
    {key:'channels',label:'Canais conectados'},
    {key:'domain',label:'Migração de domínio'},
    {key:'site',label:'Personalização do site'},
    {key:'occupation',label:'Ocupação'},
    {key:'price',label:'Preço competitivo'},
    {key:'photos_desc',label:'Fotos e descrição'},
    {key:'financial',label:'Módulo financeiro'},
    {key:'operational',label:'Módulo operacional'},
    {key:'appcenter',label:'App Center'},
    {key:'payment',label:'Canal de pagamento'},
    {key:'nps',label:'NPS'},
    {key:'cases',label:'Casos de suporte'}
  ];
  var html='<div class="wiz-wrap">';
  html+='<div style="display:flex;align-items:center;gap:10px;margin-bottom:1.25rem">';
  html+='<button class="btn btn-sm" onclick="wizGo('+(getWizOrder(S.wiz.type).length-1)+')">← Voltar</button>';
  html+='<div style="font-size:15px;font-weight:500;color:var(--t)">Resumo do follow-up</div>';
  html+='</div>';
  var _fscore=calcFollowScore({wizard:true,humors:wizEffectiveHumors(),answers:S.wiz.answers,type:S.wiz.type});
  if(_fscore){var _fc=_fscore.color==='risk'?'#dc2626':(_fscore.color==='warn'?'#d97706':'#16a34a');var _fbg=_fscore.color==='risk'?'#fde8e8':(_fscore.color==='warn'?'#fff3e0':'#e8f5ec');html+='<div class="card" style="padding:1rem 1.25rem;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;border-left:4px solid '+_fc+'"><div><div style="font-size:12px;color:var(--t3);text-transform:uppercase;letter-spacing:.05em">Score deste follow</div><div style="font-size:11px;color:var(--t3);margin-top:2px">Diferente do score geral do cliente</div></div><div style="font-size:32px;font-weight:800;color:'+_fc+'">'+_fscore.score+'</div></div>';}
  html+='<div class="card" style="padding:1.25rem;margin-bottom:1rem">';
  html+='<div style="font-size:13px;font-weight:600;color:var(--t);margin-bottom:1rem">'+svgIcon('chart',14)+' Humores por pergunta</div>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
  questions.forEach(function(q){
    var level=(h[q.key]!==undefined&&h[q.key]!==null)?h[q.key]:((S.wiz.autoHumors&&S.wiz.autoHumors[q.key]!==undefined)?S.wiz.autoHumors[q.key]:2);
    var bg=HUMOR_COLORS[level];var bd=HUMOR_BORDERS[level];var tx=HUMOR_TEXT[level];
    html+='<div style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;background:'+bg+';border:1px solid '+bd+'">';
    html+=face(FKEYS[level],16);
    html+='<div><div style="font-size:11px;font-weight:600;color:'+tx+'">'+q.label+'</div><div style="font-size:10px;color:'+tx+'">'+HUMOR_LABELS[level]+'</div></div>';
    html+='</div>';
  });
  html+='</div></div>';
  html+=wizEvolutionCard();
  html+='<div class="card" style="padding:1.25rem;margin-bottom:1rem">';
  html+='<div style="font-size:13px;font-weight:600;color:var(--t);margin-bottom:1rem">'+svgIcon('edit',14)+' Próximos passos e observações</div>';
  html+='<div style="font-size:12px;color:var(--t2);margin-bottom:.5rem">Pontos positivos para destacar na reunião:</div>';
  html+='<textarea class="wiz-note" rows="3" placeholder="Ex: Boa ocupação, todos os canais conectados..." oninput="wizAText(\'positive_points\',this.value)">'+(a.positive_points||'')+'</textarea>';
  html+='<div style="font-size:12px;color:var(--t2);margin-bottom:.5rem;margin-top:.75rem">Pontos de atenção para abordar:</div>';
  html+='<textarea class="wiz-note" rows="3" placeholder="Ex: Falta módulo financeiro, last minute não configurado..." oninput="wizAText(\'attention_points\',this.value)">'+(a.attention_points||wizAutoAttention())+'</textarea>';
  html+='<div style="font-size:12px;color:var(--t2);margin-bottom:.5rem;margin-top:.75rem">Próximos passos com o cliente:</div>';
  html+='<textarea class="wiz-note" rows="3" placeholder="Ex: Marcar reunião para configurar módulo financeiro..." oninput="wizAText(\'next_steps\',this.value)">'+(a.next_steps||'')+'</textarea>';
  html+='</div>';
  var _annots=wizAnnotationsRecap();
  if(_annots.length){
  html+='<div class="card" style="padding:1rem 1.25rem;margin-bottom:12px">';
  html+='<div style="font-size:13px;font-weight:600;margin-bottom:10px">'+svgIcon('edit',14)+' Anotações do follow</div>';
  _annots.forEach(function(it){
  html+='<div style="margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid var(--bd)"><div style="font-size:12px;font-weight:600;color:var(--b600)">'+e(it.label)+'</div><div style="font-size:13px;color:var(--t);white-space:pre-line">'+e(it.note)+'</div></div>';
  });
  html+='</div>';
  }
  html+='<div style="background:var(--surf2);border:1px solid var(--bd);border-radius:10px;padding:12px 14px;margin-bottom:12px">';
  html+='<div style="font-size:12px;font-weight:600;color:var(--t2);margin-bottom:10px">Opções da mensagem de WhatsApp</div>';
  html+='<div style="display:flex;gap:20px;flex-wrap:wrap">';
  html+='<div><div style="font-size:11px;color:var(--t3);margin-bottom:5px">Idioma</div><div style="display:flex;gap:6px">';
  var _wl=a.whats_lang||'pt';
  [['pt','Português'],['en','English'],['es','Español']].forEach(function(L){
  var on=_wl===L[0];
  html+='<div onclick="wizA(\'whats_lang\',\''+L[0]+'\')" style="padding:5px 12px;border-radius:16px;cursor:pointer;font-size:12px;border:1px solid '+(on?'var(--b600);background:var(--b50);color:var(--b600);font-weight:600':'var(--bd);background:var(--surf);color:var(--t2)')+'">'+L[1]+'</div>';
  });
  html+='</div></div>';
  html+='<div><div style="font-size:11px;color:var(--t3);margin-bottom:5px">Abordagem</div><div style="display:flex;gap:6px">';
  var _wm=a.whats_mode||(S.wiz.type==='recurring'?'recorrente':'primeiro');
  [['primeiro','Primeiro contato'],['recorrente','Já conheço o cliente']].forEach(function(M){
  var onm=_wm===M[0];
  html+='<div onclick="wizA(\'whats_mode\',\''+M[0]+'\')" style="padding:5px 12px;border-radius:16px;cursor:pointer;font-size:12px;border:1px solid '+(onm?'var(--b600);background:var(--b50);color:var(--b600);font-weight:600':'var(--bd);background:var(--surf);color:var(--t2)')+'">'+M[1]+'</div>';
  });
  html+='</div></div>';
  html+='</div></div>';
  html+='<div style="display:flex;gap:10px;justify-content:flex-end">';
  html+='<button class="btn" onclick="wizGenSF()">'+svgIcon('document',14)+' Gerar texto Salesforce</button>';
  html+='<button class="btn" style="background:#25D366;color:#fff;border-color:#25D366" onclick="wizGenWhats()">'+svgIcon('chat',14)+' Gerar prompt do WhatsApp</button>';
  html+='<button class="btn-primary" onclick="wizFinish()">'+svgIcon('check',12)+' Salvar follow-up</button>';
  html+='</div>';
  if(a.sf_text){
    html+='<div class="card" style="margin-top:1rem;padding:1.25rem">';
    html+='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem"><div style="font-size:13px;font-weight:600;color:var(--t)">Texto para o Salesforce</div><button class="btn btn-sm" onclick="copyFeedback(this,S.wiz.answers.sf_text)">'+svgIcon('document',14)+' Copiar</button></div>';
    html+='<pre style="font-size:12px;color:var(--t2);white-space:pre-wrap;line-height:1.7;max-height:300px;overflow-y:auto;font-family:\'Roboto\',sans-serif">'+e(a.sf_text)+'</pre>';
    html+='</div>';
  }
  if(a.whats_prompt){
    html+='<div class="card" style="margin-top:1rem;padding:1.25rem;border-color:#25D366">';
    html+='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.5rem"><div style="font-size:13px;font-weight:600;color:var(--t)">'+svgIcon('chat',14)+' Prompt para gerar a mensagem do WhatsApp</div><div style="display:flex;gap:6px"><button class="btn btn-sm" onclick="wizGenWhats()">'+svgIcon('refresh',13)+' Atualizar</button><button class="btn btn-sm" style="background:#25D366;color:#fff;border-color:#25D366" onclick="copyFeedback(this,S.wiz.answers.whats_prompt)">'+svgIcon('document',14)+' Copiar prompt</button></div></div>';
    html+='<div style="font-size:12px;color:var(--t3);margin-bottom:.75rem;line-height:1.5">Copie este prompt e cole em qualquer IA gratuita (Claude, ChatGPT, Gemini). Ela vai gerar a mensagem personalizada pronta para enviar ao cliente.</div>';
    html+='<div style="font-size:12px;color:var(--t2);white-space:pre-wrap;line-height:1.6;background:var(--surf2);padding:14px;border-radius:8px;border:1px solid var(--bd);max-height:300px;overflow-y:auto;font-family:\'Roboto\',monospace">'+e(a.whats_prompt)+'</div>';
    html+='</div>';
  }
  html+='</div>';
  return html;
}

function wizAutoAttention(){
  var eff=wizEffectiveHumors();
  var labels=wizQLabels();
  var pts=[];
  Object.keys(eff).forEach(function(k){
    if((eff[k]===0||eff[k]===1)&&labels[k]){
      pts.push(labels[k]+(eff[k]===0?' (péssimo)':' (ruim)'));
    }
  });
  return pts.join('\n');
}

// Gera o texto durante o wizard. A lista de perguntas vem do tipo do follow em
// andamento, entao o recorrente sai com as perguntas dele.
function wizGenSF(){
  S.wiz.answers.sf_text=buildSFText(S.wiz.type,S.wiz.answers,S.clients[S.sel]);
  render();
}

function wizEffectiveHumors(){
  var result={};
  var auto=S.wiz.autoHumors||{};
  var over=S.wiz.humors||{};
  Object.keys(auto).forEach(function(k){result[k]=auto[k];});
  Object.keys(over).forEach(function(k){if(over[k]!==undefined&&over[k]!==null)result[k]=over[k];});
  return result;
}
function wizGenWhats(){
  var a=S.wiz.answers;var c=S.clients[S.sel];
  var isRec=S.wiz.type==='recurring';
  var lang=a.whats_lang||'pt';
  // modo: 'primeiro' = primeiro contato; 'recorrente' = já conhece o cliente
  var mode=a.whats_mode||(isRec?'recorrente':'primeiro');
  var eff=wizEffectiveHumors();
  var qLabels={units:'quantidade de unidades/listings',channels:'canais de venda conectados',notifs:'notificações do painel',chperf:'performance nos canais',usab:'usabilidade dos canais',domain:'domínio próprio do site',site:'personalização do site',occupation:'taxa de ocupação',price:'competitividade de preço',photos_desc:'qualidade das fotos e descrições',financial:'uso do módulo financeiro',operational:'uso do módulo operacional',appcenter:'integrações no App Center',payment:'canal de pagamento',nps:'NPS/satisfação',cases:'casos de suporte em aberto'};
  var goodPts=[],badPts=[];
  Object.keys(qLabels).forEach(function(k){
    var lv=eff[k];
    if(lv===undefined||lv===null)return;
    if(lv>=3)goodPts.push(qLabels[k]);
    if(lv<=1)badPts.push(qLabels[k]);
  });
  var evoLines=[];
  if(isRec&&S.wiz.prevAnswers){
    var p=S.wiz.prevAnswers;
    if(p.units_count!==undefined&&a.units_count!==undefined){
      var ud=(+a.units_count)-(+p.units_count);
      if(ud>0)evoLines.push('O cliente CRESCEU de '+p.units_count+' para '+a.units_count+' unidades (ganhou '+ud+').');
      else if(ud<0)evoLines.push('O cliente DIMINUIU de '+p.units_count+' para '+a.units_count+' unidades (perdeu '+(-ud)+').');
    }
    var prevCh=(p.channels||[]).filter(function(x){return x.active;}).length;
    var curCh=(a.channels||[]).filter(function(x){return x.active;}).length;
    if(curCh>prevCh)evoLines.push('O cliente CONECTOU mais canais de venda (de '+prevCh+' para '+curCh+').');
    else if(curCh<prevCh)evoLines.push('O cliente DESCONECTOU canais de venda (de '+prevCh+' para '+curCh+').');
    if(p.payment==='sim'&&a.payment==='nao')evoLines.push('O cliente DEIXOU de usar canal de pagamento (antes tinha, agora não tem).');
    if(p.payment==='nao'&&a.payment==='sim')evoLines.push('O cliente PASSOU a usar canal de pagamento (antes não tinha, agora tem).');
  }
  // Nome do contato: só usa nome real se houver contato marcado como RESPONSÁVEL pela conta.
  var respContact=(c.keyContacts||[]).find(function(k){return k.responsible;});
  var contactName,hasRealName;
  if(respContact&&respContact.name){contactName=respContact.name.trim().split(/\s+/)[0];hasRealName=true;}
  else{contactName='[Nome do cliente]';hasRealName=false;}
  var analystName=(S.appUser&&S.appUser.name)?S.appUser.name:'[seu nome]';
  var attentionText=a.attention_points||wizAutoAttention()||'';
  var _annotList=(typeof wizAnnotationsRecap==='function')?wizAnnotationsRecap():[];
  var annotText=_annotList.map(function(it){return it.label+': '+it.note;}).join(' | ');

  var LANGNAME={pt:'PORTUGUÊS',en:'INGLÊS',es:'ESPANHOL'};
  var P=[];
  P.push('Você é um analista de Sucesso do Cliente da Stays.net (plataforma de gestão para gestores de aluguel por temporada). Escreva uma mensagem de WhatsApp curta, calorosa e profissional para o cliente, com o objetivo final de AGENDAR UMA REUNIÃO.');
  P.push('');
  P.push('=== IDIOMA DE SAÍDA ===');
  P.push('Escreva a mensagem inteiramente em '+LANGNAME[lang]+'. Adapte a saudação e o tom culturalmente para esse idioma.');
  P.push('');
  P.push('=== DADOS DO CLIENTE ===');
  if(hasRealName){P.push('- Nome do contato (responsável pela conta): '+contactName+' — use este primeiro nome na saudação.');}
  else{P.push('- Não há contato responsável cadastrado. Use exatamente o marcador "[Nome do cliente]" no lugar da saudação para o analista preencher depois. NÃO invente um nome.');}
  P.push('- Assinar como: '+analystName);
  P.push('- NÃO mencione o nome da empresa/cliente na mensagem (não usamos o nome da empresa na abordagem).');
  P.push('');
  P.push('=== O QUE ESTÁ BOM (elogie brevemente para o cliente não ficar na defensiva) ===');
  P.push(goodPts.length?goodPts.join(', ')+'.':'(nenhum ponto de destaque positivo)');
  P.push('');
  P.push('=== PONTOS DE ATENÇÃO (mencione 1 ou 2 dos mais relevantes de forma leve e consultiva) ===');
  P.push(badPts.length?badPts.join(', ')+'.':'(nenhum ponto crítico)');
  if(attentionText){P.push('Observações do analista: '+attentionText.replace(/\n/g,'; '));}
  if(annotText){P.push('');P.push('=== ANOTAÇÕES DO ANALISTA POR TÓPICO (use como referência para personalizar a mensagem) ===');P.push(annotText);}
  if(evoLines.length){
    P.push('');
    P.push('=== EVOLUÇÃO DESDE O ÚLTIMO FOLLOW (demonstre que percebi as mudanças no negócio do cliente) ===');
    P.push(evoLines.join(' '));
  }
  P.push('');
  P.push('=== TIPO DE ABORDAGEM ===');
  if(mode==='primeiro'){
    P.push('Este é o PRIMEIRO contato com este cliente. Apresente-se brevemente como analista de Sucesso do Cliente e novo(a) responsável por acompanhar a conta. Demonstre que já analisou o sistema dele e quer ajudar a melhorar os resultados. Convide para uma primeira reunião de alinhamento. Estrutura de referência (personalize, NÃO copie literalmente): saudação + apresentação curta + objetivo de acompanhar e melhorar resultados + convite para uma conversa rápida (uns 30 minutos) ainda esta semana.');
  }else{
    P.push('Este é um contato RECORRENTE: você JÁ conhece o cliente e a operação dele. NÃO se apresente de novo. Escreva como quem já acompanha a conta e está passando para ver se está tudo bem. Referencie algo concreto que você observou na análise (uma evolução, uma mudança ou um ponto de atenção — use os dados acima), pergunte se está tudo certo e se ele precisa de algo, e conduza naturalmente para agendar uma reunião. Exemplos de tom: "Vi que você cresceu na quantidade de listings, muito bom! Queria entender como está sendo essa fase" ou "Reparei que você não está mais usando os canais de pagamento, deu algum problema? Consigo te ajudar com isso".');
  }
  P.push('');
  P.push('=== REGRAS ===');
  P.push('- Máximo 5-6 linhas. Tom humano e caloroso, no máximo 1 emoji sutil (ou nenhum).');
  P.push('- Termine SEMPRE com uma pergunta que leve ao agendamento de uma reunião.');
  P.push('- '+(hasRealName?'Use o primeiro nome do contato na saudação.':'Use "[Nome do cliente]" como marcador na saudação.'));
  P.push('- Assine com o nome do analista. NÃO cite o nome da empresa. NÃO use markdown nem asteriscos.');
  P.push('- Responda APENAS com o texto final da mensagem, no idioma pedido, sem introdução nem comentários.');

  S.wiz.answers.whats_prompt=P.join('\n');
  render();
}
function wizFinish(){
  var ci=S.sel;
  var c=S.clients[ci];
  var newFollow={
    id:uid(),
    date:new Date().toISOString().split('T')[0],
    type:S.wiz.type,
    wizard:true,
    // Quem respondeu fica gravado no proprio follow. Antes so existia o dono atual
    // do cliente, o que dava a resposta errada depois de uma transferencia: o
    // follow que o analista anterior fez aparecia no nome de quem recebeu.
    byUid:S.appUser&&S.appUser.uid,
    byName:S.appUser&&S.appUser.name,
    answers:Object.assign({},S.wiz.answers),
    humors:wizEffectiveHumors(),
    indicators:{}
  };
  if(!c.follows)c.follows=[];
  // Sync units to client profile
  if(S.wiz.answers.units_count!==undefined&&S.wiz.answers.units_count!=='')c.units=+S.wiz.answers.units_count;
  if(S.wiz.answers.domain_website)c.website=S.wiz.answers.domain_website;
  c.follows.push(newFollow);
  c.wizDraft=null;
  saveState();
  addAdminLog('follow_completed',Object.assign(logClient(c),{followId:newFollow.id,followType:S.wiz.type}));
  S.wiz={step:0,type:'first',answers:{},humors:{},autoHumors:{},prevAnswers:null};
  S.view='client';S.clientTab='follows';
  render();
}

function resumeDraft(ci){S.sel=ci;var c=S.clients[ci];openWizard(c.wizDraft?c.wizDraft.type:'first',true);}
function openFollowCharts(){S.view='follow-charts';S.chartType='timeline';render();}
function openWizard(type,resumeDraft){
  var c=S.clients[S.sel];
  // A memoria de cidade e recalculada a cada follow que abre: se alguem registrou
  // uma cidade nova enquanto isto rodava, a sugestao ja nasce atualizada.
  invalidateCitySeasonMemory();
  if(resumeDraft&&c&&c.wizDraft){
    S.wiz={step:c.wizDraft.step||0,type:c.wizDraft.type||'first',answers:Object.assign({},c.wizDraft.answers),humors:Object.assign({},c.wizDraft.humors),autoHumors:Object.assign({},c.wizDraft.autoHumors||{}),prevAnswers:null};
  }else if(type==='recurring'){
    // Follow recorrente não exige um follow anterior: quem já acompanha o cliente
    // há tempo, fora do dashboard, começa direto no recorrente. Sem histórico, os
    // campos nascem vazios e as comparações com o período anterior simplesmente
    // não aparecem (todas já são condicionais a prevAnswers).
    var prevFollow=getLastWizardFollow(c);
    var prevA=prevFollow?(prevFollow.answers||{}):null;
    var carried={};
    if(prevA){
      // Carry forward reference data
      carried.units_count=prevA.units_count;
      carried.prev_units_count=prevA.units_count;
      carried.cities=JSON.parse(JSON.stringify(prevA.cities||[]));
      carried.pricing_model=prevA.pricing_model;
      carried.channels=JSON.parse(JSON.stringify(prevA.channels||[]));
      carried.prev_channels=JSON.parse(JSON.stringify(prevA.channels||[]));
      carried.domain_migration=prevA.domain_migration;
      carried.domain_website=prevA.domain_website||c.website;
      carried.site_option=prevA.site_option;
      carried.lastminute=prevA.lastminute;
      carried.lastminute_time=prevA.lastminute_time;
      carried.prev_occupation_option=prevA.occupation_option;
      carried.prev_price_option=prevA.price_option;
    }else if(c&&c.units!==undefined&&c.units!==null&&c.units!==''){
      // Sem follow anterior, a única referência confiável é o cadastro do cliente.
      carried.units_count=c.units;
    }
    if(!carried.domain_website&&c&&c.website)carried.domain_website=c.website;
    S.wiz={step:0,type:'recurring',answers:carried,humors:{},autoHumors:{},prevAnswers:prevA,prevFollowDate:prevFollow?prevFollow.date:null,prevHumors:prevFollow?Object.assign({},prevFollow.humors||{}):{}};
  }else{
    S.wiz={step:0,type:type||'first',answers:{},humors:{},autoHumors:{},prevAnswers:null};
  }
  S.view='follow-wizard';
  render();
}
function getLastWizardFollow(c){
  if(!c||!c.follows)return null;
  var wizFollows=c.follows.filter(function(f){return f.wizard;}).sort(function(a,b){return new Date(b.date)-new Date(a.date);});
  return wizFollows[0]||null;
}
function toggleAnalyst(uid){S.expandedAnalysts=S.expandedAnalysts||{};S.expandedAnalysts[uid]=!S.expandedAnalysts[uid];render();}
// O render redesenha a tela inteira. Se as animações de entrada rodassem em todo
// render, cada clique piscaria a tela — que era exatamente o que acontecia.
// Então elas só rodam quando a coisa que anima realmente mudou: a view mudou,
// ou um modal abriu. Nos demais redesenhos a tela troca o conteúdo em silêncio.
function render(){
  if(S.clockInterval){clearInterval(S.clockInterval);S.clockInterval=null;}
  var app=document.getElementById("app");if(!app)return;
  var root=document.documentElement;
  var viewChanged=S._lastView!==S.view;
  var modalOpened=!!(S.modal||S.lpClientMenu||S.lpChurnBig||S.lpCovBig)&&S._lastModal!==(S.modal||(S.lpClientMenu?'lpmenu':'')||(S.lpChurnBig?'churnbig':'')||(S.lpCovBig?'covbig':''));
  S._lastView=S.view;
  var mkNow=S.modal||(S.lpClientMenu?'lpmenu':'')||(S.lpChurnBig?'churnbig':'')||(S.lpCovBig?'covbig':'');
  if(mkNow!==S._lastModal)S.modalDirty=false; // abriu/trocou de modal: nada mexido ainda
  S._lastModal=mkNow;
  root.classList.toggle('quiet-view',!viewChanged);
  root.classList.toggle('quiet-modal',!modalOpened);
  var y=window.scrollY;
  app.innerHTML=buildHTML();
  // Sem isso a página salta pro topo a cada clique e o usuário perde o lugar.
  if(!viewChanged&&y)window.scrollTo(0,y);
  if(S.view==="client")startClocks();
  animateScoreNumber();syncRoute();
}
// ============================================================
// ROTEAMENTO (URL por tela + botão voltar do navegador)
// ============================================================
function confirmDiscardIfDirty(){
  if(S.wizOrderDirty){
    if(!confirm('Você tem alterações não salvas na ordem do follow-up. Deseja sair sem salvar?'))return false;
    S.wizOrderDirty=false;S.wizOrderDraft=null;
  }
  return true;
}
window.onbeforeunload=function(ev){if(S.wizOrderDirty){ev.preventDefault();ev.returnValue='';return'';}};
function computeRoute(){
  if(S.view==='dashboard')return'#/';
  if(S.view==='admin')return'#/admin';
  if(S.view==='settings'){
    var base='#/configuracoes';
    if(S.settingsCat==='followup'){base+='/follow-up';if(S.settingsSub==='order')base+='/ordem';else if(S.settingsSub==='questions')base+='/perguntas';}
    else if(S.settingsCat==='archived')base+='/arquivados';
    else if(S.settingsCat==='adminlog')base+='/log-auditoria';
    return base;
  }
  if(S.view==='leaderpanel')return'#/painel-lider';
  if(S.view==='follow-wizard')return'#/follow-wizard';
  if(S.sel===null||S.sel===undefined)return'#/';
  var c=S.clients[S.sel];if(!c)return'#/';
  if(S.view==='client')return'#/cliente/'+c.id+(S.clientTab==='follows'?'/follows':'');
  if(S.view==='follow-charts')return'#/cliente/'+c.id+'/graficos';
  if((S.view==='follow'||S.view==='follow-view')&&S.selFollow!==null&&S.selFollow!==undefined){
    return'#/cliente/'+c.id+'/'+(S.view==='follow-view'?'follow-view':'follow')+'/'+S.selFollow;
  }
  return'#/cliente/'+c.id;
}
function applyRoute(hash){
  var parts=String(hash||'').replace(/^#\/?/,'').split('/').filter(Boolean);
  if(!parts.length){S.view='dashboard';return;}
  if(parts[0]==='admin'){S.view='admin';return;}
  if(parts[0]==='configuracoes'){
    S.view='settings';
    if(parts[1]==='follow-up'){S.settingsCat='followup';if(parts[2]==='ordem'){S.settingsSub='order';if(!S.wizOrderDraft)initWizOrderDraft();}else if(parts[2]==='perguntas'){S.settingsSub='questions';}else{S.settingsSub=null;}}
    else if(parts[1]==='arquivados'){S.settingsCat='archived';S.settingsSub=null;}
    else if(parts[1]==='log-auditoria'){S.settingsCat='adminlog';S.settingsSub=null;loadAdminLog();}
    else{S.settingsCat=null;S.settingsSub=null;}
    return;
  }
  if(parts[0]==='painel-lider'){S.view='leaderpanel';return;}
  if(parts[0]==='follow-wizard'){if(S.wiz&&S.wiz.step!==undefined)S.view='follow-wizard';else S.view='dashboard';return;}
  if(parts[0]==='cliente'){
    var cid=parts[1];
    var idx=(S.clients||[]).findIndex(function(c){return c.id===cid;});
    if(idx<0){S.view='dashboard';return;}
    S.sel=idx;
    if(parts[2]==='follows'){S.view='client';S.clientTab='follows';return;}
    if(parts[2]==='graficos'){S.view='follow-charts';return;}
    if(parts[2]==='follow'&&parts[3]!==undefined){S.view='follow';S.selFollow=parseInt(parts[3]);return;}
    if(parts[2]==='follow-view'&&parts[3]!==undefined){S.view='follow-view';S.selFollow=parseInt(parts[3]);return;}
    S.view='client';S.clientTab='info';return;
  }
  S.view='dashboard';
}
function syncRoute(){
  if(!S.appUser||S.appUser.unauthorized||S.appUser.role==='pending')return;
  var route=computeRoute();
  if(location.hash!==route)history.pushState(null,'',route);
}
window.addEventListener('popstate',function(){
  if(S.wizOrderDirty){
    if(!confirm('Você tem alterações não salvas na ordem do follow-up. Deseja sair sem salvar?')){history.pushState(null,'',computeRoute());return;}
    S.wizOrderDirty=false;S.wizOrderDraft=null;
  }
  applyRoute(location.hash);render();
});
function animateScoreNumber(){
  if(!S.scoreAnimShown)S.scoreAnimShown={};
  var byCi={};
  document.querySelectorAll('.score-num-live').forEach(function(el){var ci=el.getAttribute('data-ci');if(!byCi[ci])byCi[ci]={};byCi[ci].num=el;});
  document.querySelectorAll('.score-bar-live').forEach(function(el){var ci=el.getAttribute('data-ci');if(!byCi[ci])byCi[ci]={};byCi[ci].bar=el;});
  Object.keys(byCi).forEach(function(ci){
    var pair=byCi[ci];
    var refEl=pair.num||pair.bar;
    var target=parseInt(refEl.getAttribute('data-score'),10);
    if(isNaN(target))return;
    var from=S.scoreAnimShown[ci];
    if(from===undefined||from===target){
      if(pair.num)pair.num.textContent=target;
      if(pair.bar)pair.bar.style.width=target+'%';
      S.scoreAnimShown[ci]=target;
      return;
    }
    var start=Date.now();var dur=500;
    if(pair.num)pair.num.classList.add('score-pulse');
    function tick(){
      var t=Math.min(1,(Date.now()-start)/dur);
      var val=Math.round(from+(target-from)*t);
      if(pair.num)pair.num.textContent=val;
      if(pair.bar)pair.bar.style.width=val+'%';
      if(t<1){requestAnimationFrame(tick);}else{
        if(pair.num){pair.num.textContent=target;pair.num.classList.remove('score-pulse');}
        if(pair.bar)pair.bar.style.width=target+'%';
        S.scoreAnimShown[ci]=target;
      }
    }
    requestAnimationFrame(tick);
  });
}
function smsBtn(c){if(!c.slug)return"";var url="https://stays.cc/web/stays/"+encodeURIComponent(c.slug)+"/dashboard";return'<a href="'+url+'" target="_blank" rel="noopener" title="Abrir no SMS Stays" style="text-decoration:none"><button class="sms-btn"><svg viewBox="0 0 40 40" width="20" height="20"><rect x="2" y="6" width="36" height="8" rx="4" fill="white"/><rect x="2" y="17" width="36" height="8" rx="4" fill="white"/><rect x="2" y="28" width="22" height="8" rx="4" fill="white"/><rect x="28" y="28" width="10" height="8" rx="4" fill="white"/></svg></button></a>';}
function savedBadge(){return S.savedMsg?'<span class="saved-badge">Salvo</span>':"";}
function startClocks(){function tick(){var cc=document.getElementById("clock-client");if(cc&&S.sel!==null){var c=S.clients[S.sel];var tz=COUNTRY_TZ[c.clientCountry];cc.textContent=tz?getTimeInTZ(tz):"--:--:--";}}tick();S.clockInterval=setInterval(tick,1000);}
function buildHTML(){if(!S.appReady)return'<div class="loading-wrap"><div class="spinner" style="width:24px;height:24px"></div><span>Carregando...</span></div>';if(!S.appUser)return loginView();if(S.appUser&&S.appUser.unauthorized)return unauthorizedView();if(S.appUser.role==="pending")return pendingView();var undo=S.undoMsg?'<div class="undo-banner">'+e(S.undoMsg)+'<button class="btn btn-sm" style="background:#fff;color:#1e2329;margin-left:4px" onclick="undoDelete()">Desfazer</button><button class="btn btn-sm" style="color:#fff;border-color:rgba(255,255,255,.3)" onclick="clearUndo()">x</button></div>':"";var isAdmin=isAdminLike(S.appUser);
var isLeader=S.appUser&&S.appUser.role==='leader';
var isGerente=S.appUser&&S.appUser.role==='gerente';
// Supervisor tambem entra na Gestao: precisa aprovar pendente e editar analista.
var canAdmin=isAdmin||isGerente||isLeader;var canGeral=isAdmin||isGerente||isLeader;
var sb='<div class="sidebar-strip"><div class="sb-content"><div class="sb-logo">Stays CS</div>'
  +'<button class="sb-item'+(S.view==="dashboard"?" sb-act":"")+'" onclick="goBack()">Contas</button>'
  +(canAdmin?'<button class="sb-item'+(S.view==="admin"?" sb-act":"")+'" onclick="goAdmin()">Gestão</button>':"")
  +'<button class="sb-item'+(S.view==="settings"?" sb-act":"")+'" onclick="goSettings()">Configurações</button>'
  +(canGeral?'<button class="sb-item'+(S.view==="leaderpanel"?" sb-act":"")+'" onclick="goLeaderPanel()">Painel do líder</button>':"")
  +'</div></div>'
var spOverlay=S.slidePanel!==null?'<div style="position:fixed;inset:0;z-index:89;background:rgba(0,0,0,.18)" onclick="closeSlidePanel()"></div>':'';return sb+nav()+spOverlay+slidePanelHTML()+'<div class="page'+(S.view==="leaderpanel"?" page-wide":"")+'" style="margin:0 auto;padding:1.5rem 2.5rem;box-sizing:border-box;width:100%">'+(S.view==="dashboard"?dashView():(S.view==="client"?clientView():(S.view==="follow-charts"?followChartsView():(S.view==="follow-view"?followWizardView():(S.view==="follow-wizard"?(S.wiz.step>=getWizOrder(S.wiz.type).length?wizSummaryView():wizView()):(S.view==="settings"?settingsView():(S.view==="leaderpanel"?leaderPanelView():(S.view==="import-clients"?clientImportView():(S.view==="import-follow"?followImportView():adminView())))))))))+"</div>"+(S.modal?modal():"")+(S.lpClientMenu?'<div class="modal-ov" onclick="if(event.target===this)lpCloseClientActions()">'+mLpClientActions()+'</div>':"")+lpToastHTML()+undo;}
// ============================================================
// LOGIN / PENDING
// ============================================================
function unauthorizedView(){return'<div class="pending-wrap"><div class="pending-card fade-in"><div style="font-size:40px;margin-bottom:1rem">'+svgIcon('cancel',40)+'</div><div style="font-size:18px;font-weight:500;font-family:\'Roboto Slab\',serif;margin-bottom:.5rem">Acesso nao autorizado</div><p class="muted" style="margin-bottom:.5rem">O e-mail <strong>'+e(S.appUser.email)+'</strong> nao tem permissao para acessar este dashboard.</p><p class="muted" style="margin-bottom:1.5rem">Entre em contato com Pedro Ferreira.</p><button class="btn" onclick="doSignOut()">Tentar outro e-mail</button></div></div>';}
function loginView(){return'<div class="login-wrap"><div class="login-card fade-in"><div class="login-logo">Stays CS</div><div class="login-sub">Dashboard de Customer Success</div><button class="btn-google" onclick="signInWithGoogle()"><svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"/><path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z"/><path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z"/><path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.31z"/></svg>Entrar com Google</button><div class="login-divider">ou</div><div class="form-row"><input id="login-email" type="text" placeholder="E-mail" style="margin-bottom:8px"></div><div class="form-row"><input id="login-pw" type="password" placeholder="Senha"></div><button class="btn-primary" style="width:100%;justify-content:center;margin-top:8px" onclick="signInWithEmail()">Entrar</button></div></div>';}
function pendingView(){return'<div class="pending-wrap"><div class="pending-card fade-in"><div style="font-size:40px;margin-bottom:1rem">'+svgIcon('sand_watch',40)+'</div><div style="font-size:18px;font-weight:500;font-family:\'Roboto Slab\',serif;margin-bottom:.5rem">Aguardando aprovacao</div><p class="muted" style="margin-bottom:1.5rem">Seu acesso esta pendente de aprovacao pelo administrador.</p><button class="btn" onclick="doSignOut()">Sair</button></div></div>';}
// ============================================================
// NAV
// ============================================================
function profileMenuHTML(){
  var u=S.appUser;
  var menu='';
  if(S.profileMenuOpen){
    menu='<div class="pf-ov" onclick="closeProfileMenu()"></div>'
      +'<div class="pf-menu">'
      +'<div class="pf-menu-hdr">'+avatarHTML(u,40)+'<div style="min-width:0"><div class="pf-menu-name">'+e(u.name||'')+'</div>'
      +(u.title?'<div class="pf-menu-title">'+e(u.title)+'</div>':'')
      +'<div class="pf-menu-mail">'+e(u.email||'')+'</div></div></div>'
      +'<button class="pf-menu-item" onclick="openProfile()">'+svgIcon('user_plus',14)+' Perfil</button>'
      +'<button class="pf-menu-item pf-menu-out" onclick="doSignOut()">'+svgIcon('power',14)+' Sair</button>'
      +'</div>';
  }
  return'<div class="pf-wrap"><button class="pf-btn'+(S.profileMenuOpen?' open':'')+'" title="'+e(u.name||'')+'" onclick="toggleProfileMenu(event)">'+avatarHTML(u,30)+'</button>'+menu+'</div>';
}
function nav(){var t=S.theme||"light";var thSel='<select class="theme-select" onchange="setTheme(this.value)"><option value="light"'+(t==="light"?" selected":"")+'>'+svgIcon('sun',14)+' Claro</option><option value="dark"'+(t==="dark"?" selected":"")+'>'+svgIcon('moon',14)+' Escuro</option><option value="night"'+(t==="night"?" selected":"")+'>'+svgIcon('star',14)+' Noite</option></select>';var roleBadge=S.appUser.role==="admin"?'<span class="admin-badge">Admin</span>':(S.appUser.role==="gerente"?'<span class="gerente-badge">Gerente</span>':(S.appUser.role==="leader"?'<span class="leader-badge">Supervisor</span>':(S.appUser.role==="testuser"?'<span class="testuser-badge">Usuario teste</span>':'<span class="analyst-badge">Analista</span>')));var adminBtn=(['admin','gerente','leader','testuser'].indexOf(S.appUser.role)>=0)?'<button class="btn btn-sm'+(S.view==="admin"?" btn-primary":"")+'" onclick="goAdmin()">Gestao</button>':"";var userArea=roleBadge+profileMenuHTML();if(S.view==="dashboard"){return'<nav class="nav"><span class="brand" style="margin-left:52px">Stays CS</span><div class="divider"></div><span class="nav-title">Dashboard</span><div class="nav-right">'+thSel+userArea+'</div></nav>';}
if(S.view==="admin")return'<nav class="nav"><button class="btn btn-sm" onclick="goBack()">← Voltar</button><div class="divider"></div><span style="font-size:14px;font-family:\'Roboto Slab\',serif">Gestao de usuarios</span><div class="nav-right">'+thSel+userArea+'</div></nav>';
if(S.view==="settings")return'<nav class="nav"><button class="btn btn-sm" onclick="goBack()">← Voltar</button><div class="divider"></div><span style="font-size:14px;font-family:\'Roboto Slab\',serif">Configurações</span><div class="nav-right">'+thSel+userArea+'</div></nav>';
if(S.view==="leaderpanel")return'<nav class="nav"><button class="btn btn-sm" onclick="goBack()">← Voltar</button><div class="divider"></div><span style="font-size:14px;font-family:\'Roboto Slab\',serif">Painel do líder</span><div class="nav-right">'+thSel+userArea+'</div></nav>';
if(S.view==="import-clients")return'<nav class="nav"><button class="btn btn-sm" onclick="closeClientImport()">← Painel do líder</button><div class="divider"></div><span style="font-size:14px;font-family:\'Roboto Slab\',serif">Importar clientes</span><div class="nav-right">'+thSel+userArea+'</div></nav>';
if(S.view==="import-follow"){var _ic=S.clients[S.sel]||{};return'<nav class="nav"><button class="btn btn-sm" onclick="closeFollowImport()">← '+e(((_ic.slug||_ic.name)||'').toUpperCase())+'</button><div class="divider"></div><span style="font-size:14px;font-family:\'Roboto Slab\',serif">Importar follow-up</span><div class="nav-right">'+thSel+userArea+'</div></nav>';}
if(S.view==="client"){if(S.view==="archived")return archivedNav();if(S.view==="adminlog")return archivedNav();
var c=S.clients[S.sel];return'<nav class="nav"><button class="btn btn-sm" onclick="goBack()">← Voltar</button><div class="divider"></div><strong style="font-size:14px;font-family:\'Roboto Slab\',serif">'+e((c.slug||c.name).toUpperCase())+'</strong><div class="nav-right">'+thSel+adminBtn+userArea+'<button class="btn btn-sm btn-danger" onclick="delClient('+S.sel+')">Excluir</button></div></nav>';}var c=S.clients[S.sel];
if(S.view==="follow-wizard"){return'<nav class="nav"><button class="btn btn-sm" onclick="wizExitConfirm()">← '+e((c.slug||c.name).toUpperCase())+'</button><div class="divider"></div><span style="font-size:14px;font-family:\'Roboto Slab\',serif">Follow-up em andamento</span><div class="nav-right">'+thSel+userArea+'<button class="btn btn-sm btn-danger" onclick="delInProgressFollow()">Excluir Follow</button></div></nav>';}
if(S.view==="follow-charts"){return'<nav class="nav"><button class="btn btn-sm" onclick="goBackToClient()">← '+e((c.slug||c.name).toUpperCase())+'</button><div class="divider"></div><span style="font-size:14px;font-family:\'Roboto Slab\',serif">Acompanhamento em gráficos</span><div class="nav-right">'+thSel+userArea+'</div></nav>';}
var f=c.follows[S.selFollow];return'<nav class="nav"><button class="btn btn-sm" onclick="goBackToClient()">← '+e((c.slug||c.name).toUpperCase())+'</button><div class="divider"></div><span style="font-size:14px;font-family:\'Roboto Slab\',serif">Follow Up — '+formatDate(f&&f.date)+'</span><div class="nav-right">'+thSel+userArea+'<button class="btn btn-sm btn-danger" onclick="delFollow('+S.sel+','+S.selFollow+')">Excluir Follow</button></div></nav>';}
// ============================================================
// DASHBOARD VIEW
// ============================================================
function dashView(){
var all=S.clients.filter(function(c){return !c.archived;});
var filt=all.filter(function(c){if(S.filterCountry&&getListingCountry(c)!==S.filterCountry)return false;if(S.filterRisk&&hl(calcScore(c))!==S.filterRisk)return false;if(S.filterPlan&&(c.plan||"")!==S.filterPlan)return false;if(S.filterFollowUp){var fu=fuSt(c);if(S.filterFollowUp==="overdue"&&(fu.days===null||fu.days>=0))return false;if(S.filterFollowUp==="soon"&&(fu.days===null||fu.days<0||fu.days>15))return false;}if(S.filterAnalyst&&c.ownerId!==S.filterAnalyst)return false;if(S.filterStatus&&(c.onboardingStatus||'')!==S.filterStatus)return false;if(S.filterCategoria&&(c.categoria||'')!==S.filterCategoria)return false;
if(S.filterAlertStatus){if(S.filterAlertStatus==='churn'&&!isChurnAlert(c))return false;if(S.filterAlertStatus==='inadimplente'&&!isInadimplente(c))return false;if(S.filterAlertStatus==='ativo'&&(isChurnAlert(c)||isInadimplente(c)||isInRecovery(c)))return false;if(S.filterAlertStatus==='recuperacao'&&!isInRecovery(c))return false;}return true;});
if(S.sortMrr==="asc")filt.sort(function(a,b){return(parseFloat(a.mrr)||0)-(parseFloat(b.mrr)||0);});
else if(S.sortMrr==="desc")filt.sort(function(a,b){return(parseFloat(b.mrr)||0)-(parseFloat(a.mrr)||0);});
else filt.sort(function(a,b){return calcScore(a)-calcScore(b);});
var alto=all.filter(function(c){return hl(calcScore(c))==="risk";}).length;
var med=all.filter(function(c){return hl(calcScore(c))==="warn";}).length;
var ok=all.filter(function(c){return hl(calcScore(c))==="ok";}).length;
var urg=all.filter(function(c){var f=fuSt(c);return f.days!==null&&f.days>=0&&f.days<=7;}).length;
var ven=all.filter(function(c){var f=fuSt(c);return f.days!==null&&f.days<0;}).length;
var mrrTotal=all.reduce(function(acc,c){return acc+(parseFloat(c.mrr)||0);},0);
var countries=[...new Set(all.map(function(c){return getListingCountry(c);}).filter(Boolean))].sort();
var pOpts=Object.entries(PLAN_L).map(function(e){return'<option value="'+e[0]+'"'+(S.filterPlan===e[0]?" selected":"")+'>'+e[1]+'</option>';}).join("");
var mrrOpts='<option value=""'+(S.sortMrr===""?" selected":"")+'>Ordenar por MRR</option><option value="desc"'+(S.sortMrr==="desc"?" selected":"")+'>MRR: maior primeiro</option><option value="asc"'+(S.sortMrr==="asc"?" selected":"")+'>MRR: menor primeiro</option>';
var hasActiveFilter=!!(S.filterCountry||S.filterRisk||S.filterPlan||S.filterFollowUp||S.sortMrr||S.filterAnalyst||S.filterStatus||S.filterCategoria||S.filterAlertStatus);var filters='<div style="margin-top:1rem">'+'<div class="flex" style="gap:8px;margin-bottom:6px">'+'<button class="ver-filtros-btn'+(S.showFilters?' active':'')+'" onclick="S.showFilters=!S.showFilters;render()">'+'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>'+(S.showFilters?'Ocultar filtros':'Ver filtros')+'</button>'+(hasActiveFilter?'<span style="font-size:11px;color:var(--b600);font-weight:600;background:var(--b50);padding:3px 8px;border-radius:9999px">'+[S.filterCountry,S.filterRisk,S.filterPlan,S.filterFollowUp,S.filterStatus,S.filterCategoria].filter(Boolean).length+' ativo(s)</span>':'')+(hasActiveFilter?'<button class="btn btn-sm" onclick="S.filterCountry=S.filterRisk=S.filterPlan=S.filterFollowUp=S.sortMrr=S.filterAnalyst=S.filterStatus=S.filterCategoria=S.filterAlertStatus=\'\';render()">Limpar tudo</button>':'')+'</div>'+'<div class="filter-panel'+(S.showFilters?' fp-open':'')+'">'+'<div class="flex" style="flex-wrap:wrap;gap:8px;padding:10px 0">'+'<select style="width:auto" onchange="S.filterCountry=this.value;render()"><option value="">Todos os paises</option>'+countries.map(function(c){return'<option'+(S.filterCountry===c?' selected':'')+'>'+c+'</option>';}).join('')+'</select>'+'<select style="width:auto" onchange="S.filterCategoria=this.value;render()"><option value="">Todas as categorias</option><option value="elite"'+(S.filterCategoria==="elite"?' selected':'')+'>Elite</option><option value="gold"'+(S.filterCategoria==="gold"?' selected':'')+'>Gold / High Value</option><option value="silver"'+(S.filterCategoria==="silver"?' selected':'')+'>Silver / Core A-B</option><option value="bronze"'+(S.filterCategoria==="bronze"?' selected':'')+'>Bronze / Pareto</option></select>'+'<select style="width:auto" onchange="S.filterAlertStatus=this.value;render()"><option value="">Status: todos</option><option value="ativo"'+(S.filterAlertStatus==="ativo"?' selected':'')+'>Ativos</option><option value="churn"'+(S.filterAlertStatus==="churn"?' selected':'')+'>Alerta de Churn</option><option value="inadimplente"'+(S.filterAlertStatus==="inadimplente"?' selected':'')+'>Inadimplentes</option><option value="recuperacao"'+(S.filterAlertStatus==="recuperacao"?' selected':'')+'>Em recuperação</option></select>'+'<select style="width:auto" onchange="S.filterStatus=this.value;render()"><option value="">Onboarding: todos</option><option value="Em andamento"'+(S.filterStatus==="Em andamento"?' selected':'')+'>Em andamento</option><option value="Completed"'+(S.filterStatus==="Completed"?' selected':'')+'>Completed</option></select>'+'<select style="width:auto" onchange="S.filterFollowUp=this.value;render()"><option value="">Follow-up: todos</option><option value="overdue"'+(S.filterFollowUp==="overdue"?' selected':'')+'>Atrasado</option><option value="soon"'+(S.filterFollowUp==="soon"?' selected':'')+'>Proximos 15d</option></select>'+'<select style="width:auto" onchange="S.filterPlan=this.value;render()"><option value="">Todos os planos</option>'+pOpts+'</select>'+'<select style="width:auto" onchange="S.filterRisk=this.value;render()"><option value="">Todos os riscos</option><option value="risk"'+(S.filterRisk==="risk"?' selected':'')+'>Alto risco</option><option value="warn"'+(S.filterRisk==="warn"?' selected':'')+'>Atencao</option><option value="ok"'+(S.filterRisk==="ok"?' selected':'')+'>Estaveis</option></select>'+'<select style="width:auto" onchange="S.sortMrr=this.value;render()">'+mrrOpts+'</select>'+(S.appUser.role==="admin"||S.appUser.role==="leader"?'+'+'<select style="width:auto" onchange="S.filterAnalyst=this.value;render()"><option value="">Todos os analistas</option>'+analystUsers().map(function(u){return'<option value="'+u.uid+'"'+(S.filterAnalyst===u.uid?' selected':'')+'>'+e(String(u.name||'').split(' ')[0])+'</option>';}).join('')+'</select>':"")+'</div></div></div>'+'</div>';
var tbl=filt.length===0?'<div class="card" style="padding:3rem;text-align:center;margin-top:1rem"><div style="font-size:36px;margin-bottom:1rem">'+svgIcon('clipboard',36)+'</div><p style="color:var(--t2);margin-bottom:1.5rem">Nenhum cliente encontrado.</p><button class="btn-primary" onclick="openM(\'add-client\')">+ Primeiro cliente</button></div>'
:'<div class="card" style="margin-top:1rem"><div class="tbl-wrap"><table><thead><tr><th>Cliente</th><th data-tip="'+TOOLTIPS.saude+'">Saude</th><th data-tip="'+TOOLTIPS.mrr+'">MRR</th><th data-tip="'+TOOLTIPS.crescimento+'">Crescimento</th><th data-tip="'+TOOLTIPS.digital+'">Digital</th><th data-tip="'+TOOLTIPS.financeiro+'">Financeiro</th><th data-tip="'+TOOLTIPS.risco+'">Risco</th><th data-tip="'+TOOLTIPS.engajamento+'">Engajamento</th><th data-tip="'+TOOLTIPS.followup+'">Follow-up</th><th>Sem contato</th><th title="Dias sem o cliente logar no sistema">Inatividade</th><th>Lem.</th><th></th></tr></thead><tbody>'
+filt.map(function(c){var ci=S.clients.indexOf(c),score=calcScore(c),h=healthColor(c),fu=fuSt(c);var hC=h==="risk"?"#dc2626":(h==="warn"?"#d97706":"#16a34a");var lf=getLatestFollow(c);var hB=(lf&&lf.doingWell)?'<span class="badge b-blue">Sem necessidade</span>':bdg(h,h==="ok"?"Estavel":(h==="warn"?"Atencao":"Alto risco"));var mrrV=c.mrr?'<span style="font-weight:600;color:var(--t)">'+formatMRR(c.mrr)+'</span>':'<span class="muted">—</span>';return'<tr><td>'+(h==="risk"?'<span style="display:inline-block;border-left:3px solid #dc2626;background:#fde8e8;padding:1px 8px;border-radius:4px">':'<span>')+'<button class="btn-link" onclick="openClient('+ci+')" style="text-transform:uppercase;font-weight:700;letter-spacing:.3px;color:'+hC+'">'+e((c.slug||c.name).toUpperCase())+'</button></span><div class="sub" style="font-size:11px;color:var(--t3)">'+e(c.name)+'</div><div class="sub">'+e(getListingCountry(c))+'</div>'+planBdg(c.plan)+(clientHasPending(c)?' <span class="pend-badge" style="cursor:pointer" title="Resolver pendências de follow-ups importados" onclick="resolvePendencies('+ci+')">'+svgIcon('alert',11)+' '+clientPendingCount(c)+' pendente(s)</span>':'')+'</td><td>'+hB+'<div class="hrow" style="margin-top:6px"><div class="htrack" style="height:9px"><div class="hfill score-bar-live" data-score="'+score+'" data-ci="'+ci+'" style="width:'+score+'%;background:'+hC+'"></div></div><span class="score-num-live" data-score="'+score+'" data-ci="'+ci+'" style="font-size:18px;font-weight:700;color:'+hC+';min-width:28px">'+score+'</span></div></td><td>'+mrrV+'</td>'+["crescimento","digital"].map(function(cat){return"<td>"+bdg(catSt(c,cat))+"</td>";}).join("")+["financeiro"].map(function(cat){return"<td>"+bdg(catSt(c,cat))+"</td>";}).join("")+'<td>'+(catSt(c,"risco")==="risk"?'<span class="badge b-risk">Risco de churn</span>':catSt(c,"risco")==="warn"?'<span class="badge b-warn">Atencao</span>':'<span class="badge b-ok">Sem risco</span>')+'</td>'+["engajamento"].map(function(cat){return"<td>"+bdg(catSt(c,cat))+"</td>";}).join("")+'<td><span class="fu-badge '+fu.cls+'">'+fu.label+'</span></td>'+'<td>'+thermoHTML(c)+'</td>'+'<td>'+inactivityHTML(c)+'</td>'+'<td style="text-align:center">'+reminderDots(ci,c)+'</td>'+'<td style="white-space:nowrap;text-align:right"><button class="btn btn-sm" style="padding:4px 8px" title="Atividades" data-ci='+ci+' data-tab="activities" onclick="openPanel(this)">'+svgIcon('clipboard',14)+'</button> <button class="btn btn-sm" style="padding:4px 8px" title="Lembretes" data-ci='+ci+' data-tab="reminders" onclick="openPanel(this)">'+svgIcon('notification',14)+'</button> <button class="btn btn-sm" onclick="openClient('+ci+')">Abrir</button> <div style="display:inline-block;position:relative"><button class="btn btn-sm" onclick="toggleDropdown(\'dd-'+ci+'\',event)" style="padding:4px 10px;font-size:15px;letter-spacing:2px" title="Mais opcoes">···</button><div id="dd-'+ci+'" class="dd-menu" style="display:none;position:absolute;right:0;top:calc(100% + 4px);background:var(--surf);border:1px solid var(--bd);border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.15);z-index:99;min-width:170px;overflow:hidden"><button onclick="openClientFollows('+ci+')" class="dd-item">'+svgIcon('document',14)+' Ver Follow Ups</button><button onclick="delClient('+ci+')" class="dd-item dd-danger">'+svgIcon('trash',13)+' Excluir conta</button></div></div></td></tr>';}).join("")+'</tbody></table></div></div>';
return'<div class="flex-between"><h1 style="font-size:20px;font-family:\'Roboto Slab\',serif">Minha carteira</h1><button class="btn-primary" onclick="openM(\'add-client\')">+ Novo cliente</button></div>'+filters+'<div style="margin-top:1.25rem"><div class="kpi-group"><div class="kpi-group-lbl">Saude da carteira</div><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px"><div class="metric"><div class="metric-lbl">Total</div><div class="metric-val mv-d">'+all.length+'</div></div><div class="metric"><div class="metric-lbl">Alto risco</div><div class="metric-val mv-r">'+alto+'</div></div><div class="metric"><div class="metric-lbl">Atencao</div><div class="metric-val mv-a">'+med+'</div></div><div class="metric"><div class="metric-lbl">Estaveis</div><div class="metric-val mv-g">'+ok+'</div></div><div class="metric"><div class="metric-lbl">MRR Total</div><div class="metric-val mv-b" style="font-size:18px">'+formatMRR(mrrTotal)+'</div></div></div></div><div class="kpi-group" style="margin-top:10px"><div class="kpi-group-lbl">Follow-ups</div><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px"><div class="metric"><div class="metric-lbl">FU urgente</div><div class="metric-val mv-a">'+urg+'</div></div><div class="metric"><div class="metric-lbl">FU vencido</div><div class="metric-val mv-r">'+ven+'</div></div></div></div></div>'+tbl;}
function archivedView(){
var archived=S.clients.filter(function(c){return c.archived;});
var html='<div class="flex-between" style="margin-bottom:1.25rem">'
  +'<h1 style="font-size:20px;font-family:\'Roboto Slab\',serif">Arquivados</h1>'
  +'</div>';
html+='<div class="alert alert-amber" style="margin-bottom:1rem">'+svgIcon('alert',14)+' Itens excluídos ficam aqui por '+LIXEIRA_DIAS+' dias e depois são removidos permanentemente. Restaure antes desse prazo se precisar recuperar. Clientes arquivados por churn não têm prazo e ficam guardados até você decidir.</div>';
if(!archived.length){
  return html+'<div class="card" style="padding:3rem;text-align:center">'
    +'<div style="font-size:36px;margin-bottom:1rem">'+svgIcon('folder',36)+'</div>'
    +'<p style="color:var(--t2)">Nenhum cliente arquivado.</p>'
    +'</div>';
}
html+=archived.map(function(c){
  var ci=S.clients.indexOf(c);
  var left=trashDaysLeft(c);
  var badge=left!==null?'<span class="badge b-risk" style="margin-left:8px">Removido em '+left+' dia'+(left===1?'':'s')+'</span>':'';
  return'<div class="archived-card">'
    +'<div style="flex:1">'
    +'<div style="font-weight:600;font-size:14px">'+e((c.slug||c.name).toUpperCase())+badge+'</div>'
    +'<div style="font-size:11px;color:var(--t3);margin-top:2px">'
    +(c.churnCase&&c.churnCase.caseNumber?'Caso #'+e(c.churnCase.caseNumber)+' · ':'')
    +(left!==null?'Excluído':'Arquivado')+' em '+e(c.archivedAt||'—')+' por '+e(c.archivedByName||'—')
    +'</div>'
    +'</div>'
    +'<button class="btn btn-sm" onclick="restoreClient('+ci+')">Restaurar</button>'
    +(iAmAdminLike()||S.appUser.role==='gerente'?
      '<button class="btn btn-sm btn-danger" onclick="permanentDelete('+ci+')">Excluir permanentemente</button>'
    :'')
    +'</div>';
}).join('');
return html;}
function permanentDelete(ci){
var c=S.clients[ci];
if(!confirm('EXCLUSÃO PERMANENTE\n\nVocê está prestes a excluir permanentemente "'+c.name+'".\n\nEsta ação é IRREVERSÍVEL. Os dados serão removidos para sempre.\n\nDigite "CONFIRMAR" para prosseguir:'))return;
var typed=prompt('Digite CONFIRMAR para excluir permanentemente:');
if(typed!=='CONFIRMAR'){alert('Exclusão cancelada.');return;}
addAdminLog('permanent_delete',logClient(c));
var cid=c.id;
S.clients.splice(ci,1);
deleteClientFromDB(cid);
render();}
function archivedNav(){return'<nav class="nav" style="padding-left:60px"><div class="divider"></div><span style="font-size:14px;font-family:\'Roboto Slab\',serif">Arquivados</span><div class="nav-right"><select class="theme-select" onchange="setTheme(this.value)"><option value="light"'+(S.theme==="light"?" selected":"")+'>'+svgIcon('sun',14)+' Claro</option><option value="dark"'+(S.theme==="dark"?" selected":"")+'>'+svgIcon('moon',14)+' Escuro</option><option value="night"'+(S.theme==="night"?" selected":"")+'>'+svgIcon('star',14)+' Noite</option></select><span style="font-size:12px;color:var(--t2)">'+e(S.appUser.name.split(' ')[0])+'</span></div></nav>';}
// Cada ação tem uma categoria (pra agrupar/filtrar) e uma frase em português.
var ACT_CATS={
  clientes:{label:'Clientes',color:'#1d9fbf',bg:'#e8f7fb'},
  exclusoes:{label:'Exclusões',color:'#ce1e5a',bg:'#fdeef3'},
  followups:{label:'Follow-ups',color:'#1f943c',bg:'#e8f5ec'},
  atividades:{label:'Contatos e atividades',color:'#7c3aed',bg:'#f3e8ff'},
  lembretes:{label:'Lembretes',color:'#0f5a6e',bg:'#e5f5f7'},
  churn:{label:'Churn',color:'#b91c1c',bg:'#fde8e8'},
  financeiro:{label:'Financeiro',color:'#c2410c',bg:'#fff3e0'},
  perguntas:{label:'Perguntas',color:'#a06b0a',bg:'#fef7e8'},
  acessos:{label:'Usuários e acessos',color:'#4c1d95',bg:'#f0ebfb'}
};
var ACTIONS={
  client_created:{cat:'clientes',label:'criou o cliente'},
  clients_imported:{cat:'clientes',label:'importou clientes por planilha'},
  client_transferred:{cat:'clientes',label:'transferiu o cliente'},
  client_edited:{cat:'clientes',label:'editou os dados de'},
  client_restored:{cat:'clientes',label:'restaurou'},
  follow_completed:{cat:'followups',label:'finalizou um follow-up de'},
  follow_imported:{cat:'followups',label:'importou um follow-up de'},
  contact_added:{cat:'atividades',label:'registrou um contato com'},
  activity_added:{cat:'atividades',label:'registrou uma atividade em'},
  activity_archived:{cat:'atividades',label:'arquivou uma atividade de'},
  reminder_added:{cat:'lembretes',label:'criou um lembrete para'},
  reminder_completed:{cat:'lembretes',label:'concluiu um lembrete de'},
  reminder_archived:{cat:'lembretes',label:'arquivou um lembrete de'},
  churn_opened:{cat:'churn',label:'abriu um caso de churn em'},
  loop_updated:{cat:'churn',label:'atualizou o fechamento de loop de'},
  loop_closed:{cat:'churn',label:'fechou o loop de'},
  churn_recovery:{cat:'churn',label:'colocou em recuperação'},
  churn_resolved:{cat:'churn',label:'resolveu o caso de churn de'},
  archive_client:{cat:'churn',label:'arquivou por churn'},
  inadimplencia_added:{cat:'financeiro',label:'registrou fatura em aberto de'},
  inadimplencia_paid:{cat:'financeiro',label:'marcou fatura como paga de'},
  question_approved:{cat:'perguntas',label:'aprovou uma pergunta customizada'},
  question_rejected:{cat:'perguntas',label:'rejeitou uma pergunta customizada'},
  user_approved:{cat:'acessos',label:'aprovou o acesso de'},
  user_created:{cat:'acessos',label:'criou o acesso de'},
  user_password_reset:{cat:'acessos',label:'enviou redefinição de senha para'},
  profile_updated:{cat:'acessos',label:'atualizou o perfil de'},
  user_role_changed:{cat:'acessos',label:'alterou a função de'},
  leader_assigned:{cat:'acessos',label:'definiu o supervisor responsável de'},
  gerente_assigned:{cat:'acessos',label:'definiu o gerente responsável de'},
  client_deleted:{cat:'exclusoes',label:'excluiu o cliente'},
  follow_deleted:{cat:'exclusoes',label:'excluiu um follow-up de'},
  reminder_deleted:{cat:'exclusoes',label:'excluiu um lembrete de'},
  permanent_delete:{cat:'exclusoes',label:'excluiu permanentemente'}
};
function actLabel(a){return(ACTIONS[a]&&ACTIONS[a].label)||a;}
function actCat(a){return(ACTIONS[a]&&ACTIONS[a].cat)||null;}
function lpVisibleLog(){
  return(S.adminLog||[]).filter(function(l){return canSeeLogOf(l.byUid);})
    .sort(function(a,b){return(b.at||0)-(a.at||0);});
}
function ahSetFilter(k,v){S.ahFilters[k]=v;render();}
// Filtro em árvore: trocar de categoria zera o tipo de ação (que só existe dentro dela).
function ahSetCat(v){S.ahFilters.cat=v;S.ahFilters.action='';render();}
// Campo de data nativo dispara 'change' a cada dígito do ano (o navegador aceita "2" como ano
// válido), e um render() no meio da digitação destruiria o input. Só re-renderiza quando o ano
// está completo — assim funciona tanto digitando quanto pelo calendário.
function ahSetDate(k,v){
  S.ahFilters[k]=v;
  if(!v){render();return;}
  var y=parseInt(String(v).split('-')[0],10);
  if(y>=1000){var el=document.activeElement;render();if(el&&el.id)  {var again=document.getElementById(el.id);if(again)again.focus();}}
}
function ahClearFilters(){S.ahFilters={from:'',to:'',user:'',cat:'',action:''};render();}
function adminLogView(){
  var canSeeAll=['admin','gerente','leader','testuser'].indexOf(S.appUser.role)>=0;
  if(!S.ahFilters)S.ahFilters={from:'',to:'',user:'',cat:'',action:''};
  var f=S.ahFilters;
  var all=lpVisibleLog();
  var userOpts=Array.from(new Set(all.map(function(l){return(l.data&&l.data.by)||'';}).filter(Boolean))).sort();
  var presentActions=Array.from(new Set(all.map(function(l){return l.action;}).filter(Boolean)));
  var rows=all.filter(function(l){
    if(f.user&&((l.data&&l.data.by)||'')!==f.user)return false;
    if(f.cat&&actCat(l.action)!==f.cat)return false;
    if(f.action&&l.action!==f.action)return false;
    if(f.from&&l.at&&new Date(l.at)<new Date(f.from+'T00:00:00'))return false;
    if(f.to&&l.at&&new Date(l.at)>new Date(f.to+'T23:59:59'))return false;
    return true;
  });
  var html='<h1 style="font-size:20px;font-family:\'Roboto Slab\',serif;margin-bottom:1rem">Histórico de atividades</h1>';
  html+='<div class="ah-wrap">';
  html+='<div class="ah-filters">';
  html+='<div class="form-row"><label class="form-lbl">De</label><input id="ah-from" type="date" value="'+e(f.from)+'" oninput="ahSetDate(\'from\',this.value)" onblur="render()"></div>';
  html+='<div class="form-row"><label class="form-lbl">Até</label><input id="ah-to" type="date" value="'+e(f.to)+'" oninput="ahSetDate(\'to\',this.value)" onblur="render()"></div>';
  if(canSeeAll){
    html+='<div class="form-row"><label class="form-lbl">Usuário</label><select onchange="ahSetFilter(\'user\',this.value)"><option value="">Todos</option>'+userOpts.map(function(u){return'<option'+(f.user===u?' selected':'')+'>'+e(u)+'</option>';}).join('')+'</select></div>';
  }
  // Árvore: só aparecem categorias que têm registro; o tipo de ação depende da categoria escolhida.
  var catKeys=Object.keys(ACT_CATS).filter(function(ck){return presentActions.some(function(a){return actCat(a)===ck;});});
  var catSel='<div class="form-row"><label class="form-lbl">Categoria</label><select onchange="ahSetCat(this.value)"><option value="">Todas</option>'
    +catKeys.map(function(ck){return'<option value="'+ck+'"'+(f.cat===ck?' selected':'')+'>'+e(ACT_CATS[ck].label)+'</option>';}).join('')
    +'</select></div>';
  var actsInCat=f.cat?presentActions.filter(function(a){return actCat(a)===f.cat;}).sort():[];
  var actSel='<div class="form-row"><label class="form-lbl">Tipo de ação</label><select '+(f.cat?'':'disabled')+' onchange="ahSetFilter(\'action\',this.value)"><option value="">'
    +(f.cat?'Todas de '+e(ACT_CATS[f.cat].label):'Selecione uma categoria')+'</option>'
    +actsInCat.map(function(a){return'<option value="'+e(a)+'"'+(f.action===a?' selected':'')+'>'+e(actLabel(a))+'</option>';}).join('')
    +'</select></div>';
  html+=catSel+actSel;
  html+='<button class="btn btn-sm" onclick="ahClearFilters()">Limpar filtros</button>';
  if(!canSeeAll)html+='<p class="muted" style="margin-top:12px;font-size:11px">Você vê apenas as suas próprias atividades.</p>';
  html+='</div>';
  html+='<div class="ah-feed">';
  if(!rows.length){
    html+='<p class="muted" style="padding:1rem">Nenhuma atividade registrada com esses filtros.</p>';
  }else{
    var lastDay='';
    rows.forEach(function(l){
      var d=l.at?new Date(l.at):null;
      var dayKey=d?d.toLocaleDateString('pt-BR'):'—';
      if(dayKey!==lastDay){html+='<div class="ah-day">'+e(dayKey)+'</div>';lastDay=dayKey;}
      var time=d?d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}):'--:--';
      var who=(l.data&&l.data.by)||'—';
      var verb=actLabel(l.action);
      var subject='';
      if(l.data&&l.data.clientId){
        var idx=(S.clients||[]).findIndex(function(c){return c.id===l.data.clientId;});
        var lbl=e(String(l.data.clientName||'').toUpperCase());
        subject=idx>=0?' <button class="btn-link" onclick="openClient('+idx+')">'+lbl+'</button>':' <span style="font-weight:600">'+lbl+'</span>';
      }else if(l.data&&l.data.targetName){
        subject=' <span style="font-weight:600">'+e(l.data.targetName)+'</span>';
      }
      var extra='';
      if(l.data&&l.data.newRole)extra=' <span class="muted">→ '+e(l.data.newRole)+'</span>';
      else if(l.data&&l.data.leaderName)extra=' <span class="muted">→ '+e(l.data.leaderName)+'</span>';
      else if(l.data&&l.data.month)extra=' <span class="muted">('+e(l.data.month)+'/'+e(l.data.year)+')</span>';
      else if(l.data&&l.data.title)extra=' <span class="muted">— '+e(l.data.title)+'</span>';
      html+='<div class="ah-row"><span class="ah-time">'+time+'</span><span class="ah-txt"><span style="color:var(--b600);font-weight:600">'+e(who)+'</span> '+verb+subject+extra+'</span></div>';
    });
  }
  html+='</div></div>';
  return html;
}
function clientView(){
var c=S.clients[S.sel],ci=S.sel;
var score=calcScore(c),h=healthColor(c),fu=fuSt(c);
var hC=h==="risk"?"#ce1e5a":(h==="warn"?"#f3b02a":"#1f943c");
var season=getCurrentSeason(c),lf=getLatestFollow(c);
var listingCountry=getListingCountry(c);
var clientTZ=COUNTRY_TZ[c.clientCountry];
var cities=getCities(c);
var wizCities=(lf&&lf.wizard&&lf.answers&&lf.answers.cities)||[];
var latStates=(lf&&lf.indicators&&lf.indicators.ind_states&&(lf.indicators.ind_states.value||lf.indicators.ind_states.notes))||"";
var fuDays=fu.days!==null?fu.days+" dias":"Sem data";
var fuColor=fu.cls==="fu-ok"?"#1f943c":(fu.cls==="fu-warn"?"#f3b02a":"#ce1e5a");
// Season KPI
var seasonHigh=lf&&lf.indicators&&lf.indicators.season_high;
var seasonLow=lf&&lf.indicators&&lf.indicators.season_low;
var hiLabel=seasonHigh&&seasonHigh.start&&seasonHigh.end?monthName(seasonHigh.start)+"–"+monthName(seasonHigh.end):(season&&season.highLabel?season.highLabel:"");
var loLabel=seasonLow&&seasonLow.start&&seasonLow.end?monthName(seasonLow.start)+"–"+monthName(seasonLow.end):(season&&season.lowLabel?season.lowLabel:"");
var isHigh=season&&season.current==="high";
var seasonIcon=isHigh?
  '<svg width="36" height="36" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="8" fill="#f3b02a"/><line x1="20" y1="4" x2="20" y2="8" stroke="#f3b02a" stroke-width="2.5" stroke-linecap="round"/><line x1="20" y1="32" x2="20" y2="36" stroke="#f3b02a" stroke-width="2.5" stroke-linecap="round"/><line x1="4" y1="20" x2="8" y2="20" stroke="#f3b02a" stroke-width="2.5" stroke-linecap="round"/><line x1="32" y1="20" x2="36" y2="20" stroke="#f3b02a" stroke-width="2.5" stroke-linecap="round"/><line x1="8.7" y1="8.7" x2="11.5" y2="11.5" stroke="#f3b02a" stroke-width="2.5" stroke-linecap="round"/><line x1="28.5" y1="28.5" x2="31.3" y2="31.3" stroke="#f3b02a" stroke-width="2.5" stroke-linecap="round"/><line x1="31.3" y1="8.7" x2="28.5" y2="11.5" stroke="#f3b02a" stroke-width="2.5" stroke-linecap="round"/><line x1="11.5" y1="28.5" x2="8.7" y2="31.3" stroke="#f3b02a" stroke-width="2.5" stroke-linecap="round"/></svg>'
  :'<svg width="36" height="36" viewBox="0 0 40 40" fill="none"><path d="M10 22 Q14 14 20 14 Q24 10 30 14 Q36 14 36 20 Q36 26 30 26 L10 26 Q4 26 4 20 Q4 15 10 22Z" fill="#1d9fbf" opacity=".25" stroke="#1d9fbf" stroke-width="1.5"/><line x1="13" y1="29" x2="11" y2="35" stroke="#1d9fbf" stroke-width="2" stroke-linecap="round"/><line x1="19" y1="29" x2="17" y2="35" stroke="#1d9fbf" stroke-width="2" stroke-linecap="round"/><line x1="25" y1="29" x2="23" y2="35" stroke="#1d9fbf" stroke-width="2" stroke-linecap="round"/><line x1="31" y1="29" x2="29" y2="35" stroke="#1d9fbf" stroke-width="2" stroke-linecap="round"/></svg>';
var seasonLabel=season?(isHigh?"ALTA TEMP.":"BAIXA TEMP."):"TEMPORADA";
var seasonBg=isHigh?"#fef7e8":"#e8f7fb";
var seasonBd=isHigh?"#f3b02a":"#1d9fbf";
var seasonTxt=isHigh?"#a06b0a":"#0f5a6e";
var seasonSub=hiLabel||loLabel?
  '<div style="display:flex;gap:5px;align-items:center;margin-top:1px">'+
  (hiLabel?'<span style="font-size:9px;color:#1f943c;font-weight:600;display:flex;align-items:center;gap:1px"><svg width="8" height="8" viewBox="0 0 10 10"><polyline points="1,8 5,2 9,8" stroke="#1f943c" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'+hiLabel+'</span>':"")
  +(hiLabel&&loLabel?'<span style="color:#ccc;font-size:9px">·</span>':"")
  +(loLabel?'<span style="font-size:9px;color:#ce1e5a;font-weight:600;display:flex;align-items:center;gap:1px"><svg width="8" height="8" viewBox="0 0 10 10"><polyline points="1,2 5,8 9,2" stroke="#ce1e5a" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'+loLabel+'</span>':"")
  +'</div>':"";
var mrrVal=formatMRR(c.mrr);
var alerts=pendingBannerHTML(c,ci);
if(fu.days!==null&&fu.days<0)alerts+='<div class="alert alert-red">Follow-up vencido ha '+(-fu.days)+' dias. <button class="btn btn-sm" onclick="openWizard(\'first\')">+ Novo Follow-Up</button></div>';
else if(fu.days!==null&&fu.days<=7)alerts+='<div class="alert alert-amber">Follow-up em '+fu.days+' dias.</div>';
var cn=(c.contacts||[]).filter(function(ct){return ct.type==="churn";}).length;
if(cn>0)alerts+='<div class="alert alert-red">'+cn+' alerta(s) de churn.</div>';
if(S.importMsg)alerts+='<div class="alert alert-green">'+e(S.importMsg)+'<button class="btn btn-sm" style="margin-left:auto" onclick="S.importMsg=\'\';render()">x</button></div>';
var header=
  '<div class="card" style="padding:1.25rem;margin-bottom:1rem">'
  +'<div style="display:flex;align-items:stretch;gap:1.25rem">'
  +'<div style="flex:1;display:flex;flex-direction:column;gap:10px">'
  // Row 1: SMS + name + edit
  +'<div style="display:flex;align-items:center;gap:10px">'
  +smsBtn(c)
  +'<div style="font-size:20px;font-weight:700;color:var(--t)">'
  +e((c.slug||c.name).toUpperCase())
  +(c.slug?'<span style="color:var(--bd);font-weight:300;margin:0 6px">|</span>'+e(c.name):"")
  +'</div>'
  +'<div style="display:flex;gap:6px;margin-left:auto;flex-shrink:0;align-items:center">'+(c.churnCase&&c.churnCase.active?'<button class="btn-churn" onclick="openM(\'churn-alert\','+ci+')">'+svgIcon('alert',13)+' Ver Caso Churn</button>':'<button class="btn-churn" onclick="openM(\'churn-alert\','+ci+')">'+svgIcon('alert',13)+' Marcar Churn</button>')+(c.churnHistory&&c.churnHistory.length?'<button class="btn-churn-hist" onclick="openM(\'churn-history\','+ci+')">'+svgIcon('history',13)+' Histórico de churn</button>':'')+'<button class="btn-inadim" onclick="S.modal=\'inad-\'+'+ci+';render()">'+svgIcon('invoice',13)+' Inadimplência</button>'+'<button class="btn-edit" onclick="openM(\'edit-client\')">Editar</button>'+'</div>'
  +'</div>'
  // Row 2: location + clock + plano
  +'<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:11px;color:var(--t3);margin-top:-4px">'
  +(c.clientCountry?'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>'+e(c.clientCountry)+(c.clientCity?" · "+e(c.clientCity):""):"")
  +(clientTZ?'<span class="client-clock-pill"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span id="clock-client" style="font-variant-numeric:tabular-nums">--:--:--</span><span style="font-size:9px;color:#1d9fbf;font-weight:500">horário do cliente</span></span>':"")
  +(c.categoria?'<span style="color:var(--bd)">·</span>'+catBdg(c):"")+(c.plan?'<span style="color:var(--bd)">·</span>'+planBdg(c.plan):"")+(c.onboardingStatus?'<span style="color:var(--bd)">·</span>'+statusBdg(c.onboardingStatus):"")+(clientAlertBadges(c)?'<span style="color:var(--bd)">·</span>'+clientAlertBadges(c):"")
  // Site do cliente, cadastrado no follow. Fica aqui pra não precisar abrir um
  // follow só pra achar o link quando alguém quiser conferir o site.
  +(hasBeta()&&c.website?'<span style="color:var(--bd)">·</span><a href="'+e(c.website)+'" target="_blank" rel="noopener" class="cli-site-link">'+svgIcon('share',10)+e(String(c.website).replace(/^https?:\/\//,''))+'</a>':"")
  +'</div>'
  // Row 3: 3 KPI cards
  +'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">'
  +'<div class="kpi-card-v8" style="background:'+seasonBg+';border:1px solid '+seasonBd+'">'
  +seasonIcon
  +'<div style="font-size:11px;font-weight:700;color:'+seasonTxt+'">'+seasonLabel+'</div>'
  +seasonSub
  +'</div>'
  +'<div class="kpi-card-v8" style="background:#fef7e8;border:1px solid #f3b02a">'
  +'<svg width="34" height="34" viewBox="0 0 40 40" fill="none"><rect x="4" y="14" width="10" height="22" rx="1.5" fill="#f3b02a" opacity=".7"/><rect x="6" y="17" width="2.5" height="2.5" rx=".5" fill="#fff"/><rect x="9.5" y="17" width="2.5" height="2.5" rx=".5" fill="#fff"/><rect x="6" y="22" width="2.5" height="2.5" rx=".5" fill="#fff"/><rect x="9.5" y="22" width="2.5" height="2.5" rx=".5" fill="#fff"/><rect x="15" y="8" width="12" height="28" rx="1.5" fill="#f3b02a"/><rect x="17.5" y="11" width="3" height="3" rx=".5" fill="#fff"/><rect x="22" y="11" width="3" height="3" rx=".5" fill="#fff"/><rect x="17.5" y="17" width="3" height="3" rx=".5" fill="#fff"/><rect x="22" y="17" width="3" height="3" rx=".5" fill="#fff"/><rect x="17.5" y="23" width="3" height="3" rx=".5" fill="#fff"/><rect x="22" y="23" width="3" height="3" rx=".5" fill="#fff"/><rect x="28" y="16" width="8" height="20" rx="1.5" fill="#f3b02a" opacity=".7"/><rect x="30" y="19" width="2" height="2" rx=".4" fill="#fff"/><rect x="33" y="19" width="2" height="2" rx=".4" fill="#fff"/><rect x="30" y="24" width="2" height="2" rx=".4" fill="#fff"/><rect x="33" y="24" width="2" height="2" rx=".4" fill="#fff"/></svg>'
  +'<div style="font-size:22px;font-weight:700;color:var(--t);line-height:1">'+(c.units||"—")+'</div>'
  +'<div style="font-size:10px;color:#a06b0a">unidades</div>'
  +'</div>'
  +'<div class="kpi-card-v8" style="background:#e8f5ec;border:1px solid #1f943c">'
  +'<svg width="34" height="34" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="#1f943c" stroke-width="2"/><text x="20" y="25" text-anchor="middle" font-family="Roboto,sans-serif" font-size="14" font-weight="700" fill="#1f943c">$</text></svg>'
  +'<div style="font-size:15px;font-weight:700;color:var(--t);line-height:1">'+mrrVal+'</div>'
  +'<div style="font-size:10px;color:#145f27">MRR / mês</div>'
  +'</div>'
  +'</div>'
  // Row 4: Anuncia em
  +'<div class="anuncia-card">'
  +'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" stroke-width="2" stroke-linecap="round" style="flex-shrink:0;margin-top:1px"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>'
  +'<div>'
  +'<div style="font-size:10px;color:var(--t3);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:2px">Anuncia em</div>'
  +(listingCountry?'<div style="font-size:13px;font-weight:500;color:var(--t2)">'+e(listingCountry)+'</div>':'<div class="muted">Não informado</div>')
  +(latStates||cities?'<div style="font-size:11px;color:var(--t3)">'+(latStates?e(latStates.split(",").slice(0,3).join(", ")):"")+(cities?' · '+e(cities.split(",").slice(0,4).map(function(s){return s.trim();}).join(" · ")):"")+(wizCities.length>1?' · <span style="color:var(--b600);cursor:pointer;font-weight:600" onclick="toggleCitiesPanel()">'+(S.citiesOpen?'ocultar':'+'+(wizCities.length-1)+' cidades')+'</span>':"")+'</div>':"")
  +'</div>'
  +'</div>'
  +'</div>'
  // Score card right
  +'<div style="width:138px;background:var(--surf2);border:1px solid var(--bd);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.25rem 1rem;gap:8px;flex-shrink:0;text-align:center">'
  +'<div style="font-size:10px;color:var(--t3);font-weight:600;text-transform:uppercase;letter-spacing:.05em">Score de saúde</div>'
  +'<div id="score-num" class="score-num-live" data-score="'+score+'" data-ci="'+ci+'" style="font-size:50px;font-weight:700;color:'+hC+';line-height:1;transition:transform .25s">'+score+'</div>'
  +'<div style="width:100%;height:6px;border-radius:9999px;background:var(--surf3);overflow:hidden"><div class="score-bar-live" data-score="'+score+'" data-ci="'+ci+'" style="height:100%;width:'+score+'%;background:'+hC+';border-radius:9999px;transition:width .3s"></div></div>'
  +bdg(h,h==="ok"?"Estavel":(h==="warn"?"Atenção":"Alto risco"))
  +'<div style="border-top:1px solid var(--bd);padding-top:8px;width:100%;margin-top:2px">'
  +'<div style="font-size:10px;color:var(--t3);margin-bottom:3px">Próximo Follow Up</div>'
  +'<div style="font-size:15px;font-weight:700;color:'+fuColor+'">'+fuDays+'</div>'
  +'</div>'
  +'</div>'
  +'</div>'
  +'</div>';
var tabs='<div style="display:flex;margin-bottom:0;background:var(--surf);border:1px solid var(--bd);border-radius:8px;padding:3px"><button class="vt-btn'+(S.clientTab==="info"?" active":"")+'" onclick="S.clientTab=\'info\';render()">Informacoes</button><button class="vt-btn'+(S.clientTab==="follows"?" active":"")+'" onclick="S.clientTab=\'follows\';render()">Follow-Ups'+(c.follows&&c.follows.length>0?" ("+c.follows.length+")":"")+'</button></div>';
var citiesPanel="";
if(S.citiesOpen&&wizCities.length){
  citiesPanel='<div class="card" style="padding:1rem 1.25rem;margin-bottom:1rem"><div style="font-size:12px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.04em;margin-bottom:10px">Cidades e temporadas</div>'
  +wizCities.map(function(cy){
    var altaTxt=((cy.seasons&&cy.seasons.alta)||[]).filter(function(p){return p.start&&p.end;}).map(function(p){return p.start+'–'+p.end;}).join(', ')||'—';
    var baixaTxt=((cy.seasons&&cy.seasons.baixa)||[]).filter(function(p){return p.start&&p.end;}).map(function(p){return p.start+'–'+p.end;}).join(', ')||'—';
    return '<div style="padding:8px 0;border-bottom:1px solid var(--bd)"><div style="font-weight:600;font-size:13px">'+e(cy.name)+(cy.principal?' <span style="color:var(--b600);font-size:11px">(principal)</span>':'')+(cy.units?' <span style="color:var(--t3);font-size:11px">· '+e(String(cy.units))+' unidades</span>':'')+'</div><div style="font-size:11px;color:var(--t3);margin-top:2px">Alta: '+e(altaTxt)+' · Baixa: '+e(baixaTxt)+'</div></div>';
  }).join('')
  +'</div>';
}
var tabContent=S.clientTab==="info"?infoTab(c,ci):followsTab(c,ci);
return alerts+header+citiesPanel+tabs+'<div style="padding-top:1rem">'+tabContent+'</div>';}

function infoTab(c,ci){var html="";html+='<div class="section-hdr"><span>Principais contatos</span><button class="btn btn-sm" onclick="openM(\'add-key-contact\')">+ Adicionar</button></div>';if(!c.keyContacts||!c.keyContacts.length){html+='<p class="muted" style="margin-bottom:1.5rem">Nenhum contato-chave cadastrado. (max. 5)</p>';}else{html+='<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px;margin-bottom:1.5rem">';c.keyContacts.forEach(function(kc,idx){var ini=(kc.name||"?").split(" ").slice(0,2).map(function(w){return w[0]||"";}).join("").toUpperCase();html+='<div class="kc-card"><div class="kc-avatar">'+ini+'</div><div style="flex:1;min-width:0"><div style="font-weight:600;font-size:13px">'+e(kc.name)+'</div>'+(kc.role?'<div class="sub">'+e(kc.role)+'</div>':"")+( kc.phone?'<div style="font-size:12px;color:var(--t2);margin-top:2px">'+e(kc.phone)+'</div>':"")+( kc.email?'<div style="font-size:12px;color:var(--t2)">'+e(kc.email)+'</div>':"")+'</div><button class="btn btn-sm btn-danger" onclick="delKeyContact('+ci+','+idx+')">x</button></div>';});html+='</div>';}
html+=npsHistoryHTML(c);var cts=[...(c.contacts||[])].reverse();html+='<div class="section-hdr"><span>Contatos externos</span><button class="btn btn-sm" onclick="openM(\'add-contact\')">+ Registrar</button></div>';if(!cts.length){html+='<p class="muted">Nenhum contato registrado ainda.</p>';}else{cts.forEach(function(ct,idx){var ri=(c.contacts.length-1)-idx;var tl={meeting:"Reuniao",whatsapp:"WhatsApp",email:"E-mail",churn:"Churn Alert"}[ct.type];var il={positive:"+ Positivo",neutral:"Neutro",negative:"- Negativo"}[ct.impact];html+='<div class="contact-entry"><div class="ce-hdr"><span class="ctb ctb-'+ct.type+'">'+tl+'</span><span class="ct-date">'+formatDate(ct.date)+'</span><span class="impb imp-'+ct.impact+'">'+il+'</span><button class="btn btn-sm btn-danger" style="margin-left:auto" onclick="delContact('+ci+','+ri+')">Remover</button></div><div class="ct-summary">'+e(ct.summary)+'</div></div>';});}return html;}

function followsTab(c,ci){var sorted=getFollowsSorted(c);var draftBanner=(c.wizDraft?'<div class="card" style="padding:12px 16px;margin-bottom:1rem;border-color:var(--b600);background:var(--b50);display:flex;align-items:center;justify-content:space-between"><div style="font-size:13px;color:var(--b600)">'+svgIcon('edit',14)+' Você tem um follow-up em andamento (salvo em '+formatDate(c.wizDraft.savedAt?c.wizDraft.savedAt.split("T")[0]:"")+', pergunta '+((c.wizDraft.step||0)+1)+'/'+getWizOrder(c.wizDraft.type).length+'</div><button class="btn-primary btn-sm" onclick="resumeDraft('+ci+')">Continuar →</button></div>':'');var pendBanner=pendingBannerHTML(c,ci);var html=draftBanner+pendBanner+'<div class="flex-between" style="margin-bottom:1rem"><div class="muted">'+sorted.length+' follow-up(s)</div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn-primary" onclick="openWizard(\'first\')">+ Primeiro follow</button><button class="btn-primary" style="background:var(--gn600)" onclick="openWizard(\'recurring\')">↺ Follow recorrente</button><button class="btn" onclick="openFollowImport(\'first\')">'+svgIcon('clipboard',14)+' Importar follow</button><button class="btn-primary" style="background:#8b5cf6" onclick="openFollowCharts()">'+svgIcon('arrow_up',14)+' Acompanhamento em gráficos</button></div></div>';if(!sorted.length)return html+'<div class="card" style="padding:3rem;text-align:center"><div style="font-size:36px;margin-bottom:1rem">'+svgIcon('clipboard',36)+'</div><div style="font-size:15px;font-weight:600;color:var(--t2);margin-bottom:.5rem">Nenhum follow-up ainda</div><button class="btn-primary" onclick="openWizard(\'first\')">+ Primeiro follow-up</button></div>';html+='<div style="display:flex;flex-direction:column;gap:10px">';sorted.forEach(function(f){var ri=c.follows.indexOf(f),isF=f.type==="first";var np=followPendingList(f).length;html+='<div class="follow-card '+(isF?"follow-card-first":"follow-card-recurring")+(np?' follow-card-pend':'')+'" onclick="openFollow('+ri+')"><div class="flex-between"><div><div style="font-family:\'Roboto Slab\',serif;font-size:15px;font-weight:700">Follow Up — '+formatDate(f.date)+'</div><div class="sub" style="margin-top:3px">'+(isF?"Primeira analise":"Analise recorrente")+(f.imported?' · importado':'')+'</div></div><div class="flex" style="gap:8px;align-items:center">'+(np?'<span class="pend-badge">'+svgIcon('alert',11)+' '+np+' pendente(s)</span>':'')+followScoreBadge(f)+'<span style="color:var(--b600);font-size:13px;font-weight:600">Ver →</span></div></div></div>';});return html+'</div>';}
// ============================================================
// ADMIN VIEW
// ============================================================
function adminView(){
  if(['admin','gerente','leader','testuser'].indexOf(S.appUser.role)<0)return'<p>Acesso negado.</p>';
  var canAssign=assignableRoles();
  var html='<div class="flex-between" style="margin-bottom:1.5rem"><h1 style="font-size:20px;font-family:\'Roboto Slab\',serif">Gestao de usuarios</h1><button class="btn-primary" onclick="udInit();openM(\'add-user\')">+ Criar acesso de usuário</button></div>';
  var byRole={admin:[],gerente:[],leader:[],analyst:[],testuser:[],pending:[]};
  adminVisibleUsers().forEach(function(u){if(byRole[u.role])byRole[u.role].push(u);else byRole.analyst.push(u);});
  var roleLabel={admin:"Administrador",gerente:"Gerente",leader:"Supervisor",analyst:"Analista",testuser:"Usuario teste",pending:"Pendentes (aguardando aprovacao)"};
  ["pending","admin","gerente","leader","analyst","testuser"].forEach(function(role){
    var users=byRole[role];if(!users.length)return;
    html+='<div class="section-hdr"><span>'+roleLabel[role]+' ('+users.length+')</span></div><div class="card" style="padding:0">';
    users.forEach(function(u){
      var canRole=canEditUserRole(u),canProf=canEditUserProfile(u);
      var mn=(u.managedUsers||[]).map(function(uid){var found=S.allUsers.find(function(x){return x.uid===uid;});return found?found.name.split(" ")[0]:"?";}).join(", ");
      // Analista tem Supervisor responsável; Supervisor tem Gerente responsável.
      // Cada seletor lista só quem tem a função correspondente.
      var chainSel='';
      if(role==="analyst"){
        var respSup=supervisorOfAnalyst(u.uid);
        chainSel=canRole
          ?'<select class="narrow" onchange="setResponsibleLeader(\''+u.uid+'\',this.value)" title="Supervisor responsável"><option value="">Sem supervisor</option>'+leaderUsers().map(function(ld){return'<option value="'+ld.uid+'"'+(respSup&&respSup.uid===ld.uid?' selected':'')+'>'+e(ld.name)+'</option>';}).join('')+'</select>'
          :'<span class="muted" style="font-size:11px">'+(respSup?e(respSup.name):'Sem supervisor')+'</span>';
      }else if(role==="leader"){
        var respGer=gerenteOfSupervisor(u.uid);
        chainSel=canRole
          ?'<select class="narrow" onchange="setResponsibleGerente(\''+u.uid+'\',this.value)" title="Gerente responsável"><option value="">Sem gerente</option>'+gerenteUsers().map(function(g){return'<option value="'+g.uid+'"'+(respGer&&respGer.uid===g.uid?' selected':'')+'>'+e(g.name)+'</option>';}).join('')+'</select>'
          :'<span class="muted" style="font-size:11px">'+(respGer?e(respGer.name):'Sem gerente')+'</span>';
      }
      var roleSelect;
      if(!canRole){
        roleSelect=u.uid===S.appUser.uid?'<span class="muted" style="font-size:11px">Você</span>'
          :(isMasterAdmin(u)?'<span class="muted" style="font-size:11px" title="Conta de administrador principal do sistema">Admin master</span>':'');
      }else{
        var roleNames={pending:'Pendente',analyst:'Analista',leader:'Supervisor',gerente:'Gerente',admin:'Admin',testuser:'Usuario teste'};
        var offer=canAssign.slice();
        // A função atual sempre aparece, mesmo que quem edita não possa atribuí-la.
        if(offer.indexOf(u.role)<0)offer.unshift(u.role);
        var opts=offer.map(function(rk){return'<option value="'+rk+'"'+(u.role===rk?" selected":"")+'>'+roleNames[rk]+'</option>';}).join('');
        roleSelect='<select class="narrow" onchange="changeRole(\''+u.uid+'\',this.value)" title="Alterar funcao">'+opts+'</select>';
      }
      var editBtn=canProf?'<button class="btn btn-sm" title="Editar nome, título e foto" onclick="openUserProfileEditor(\''+u.uid+'\')">Editar</button>':'';
      var pwBtn=canRole?'<button class="btn btn-sm" title="Enviar e-mail de redefinição de senha" onclick="resetUserPassword(\''+u.uid+'\')">Nova senha</button>':'';
      html+='<div class="user-row"><div class="user-avatar">'+(u.photo?'<img src="'+e(u.photo)+'" style="width:32px;height:32px;border-radius:50%;object-fit:cover" referrerpolicy="no-referrer">':(u.name||"?")[0].toUpperCase())+'</div><div style="flex:1"><div style="font-weight:500">'+e(u.name)+'</div><div class="muted">'+e(u.email)+'</div>'+(u.title?'<div style="font-size:11px;color:var(--t3);margin-top:1px">'+e(u.title)+'</div>':"")+(mn?'<div style="font-size:11px;color:var(--t3);margin-top:1px">Gerencia: '+e(mn)+'</div>':"")+'</div>'+editBtn+pwBtn+chainSel+roleSelect+'</div>';
    });
    html+='</div>';
  });
  html+='<div class="mt3 alert alert-amber">Use "Criar acesso de usuário" para gerar e-mail e senha na hora — o usuário entra direto, sem conta Google. Quem entra por conta própria cai como Pendente até ser aprovado aqui. A hierarquia é <strong>Gerente → Supervisor → Analista</strong>: o seletor de cada linha define o responsável do nível acima, e é ele quem aprova as perguntas customizadas e vê a carteira no Painel do líder.</div>';
  return html;
}
// ============================================================
// MODAIS
// ============================================================
function deleteChurnHistory(ci,idx){
  var c=S.clients[ci];
  if(!c.churnHistory||!c.churnHistory[idx])return;
  var h=c.churnHistory[idx];
  if(!confirm('Excluir este registro do histórico de churn'+(h.caseNumber?' (Caso #'+h.caseNumber+')':'')+'? Esta ação não pode ser desfeita.'))return;
  c.churnHistory.splice(idx,1);
  saveState();
  if(c.churnHistory.length)render();else closeM();
}
function mChurnHistory(ci){
  var c=S.clients[ci];
  var hist=(c.churnHistory||[]).slice().reverse();
  var rows='';
  if(!hist.length){rows='<div style="color:var(--t3);padding:1rem 0">Nenhum histórico de churn registrado.</div>';}
  else{
    var _origLen=(c.churnHistory||[]).length;
    hist.forEach(function(h,j){
      var realIdx=_origLen-1-j;
      var badge=h.outcome==='recovery'?'<span class="badge b-warn">Recuperação</span>':'<span class="badge b-ok">Resolvido</span>';
      rows+='<div style="border:1px solid var(--bd);border-radius:10px;padding:12px 14px;margin-bottom:10px;background:var(--surf2)">';
      rows+='<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px"><div style="font-weight:600;font-size:14px">'+(h.caseNumber?'Caso #'+e(h.caseNumber):'Alerta de churn')+'</div><div style="display:flex;align-items:center;gap:8px">'+badge+'<button class="btn btn-sm" title="Excluir do histórico" style="padding:2px 8px;color:#b91c1c;border-color:#f3b0b0" onclick="deleteChurnHistory('+ci+','+realIdx+')">'+svgIcon('trash',13)+'</button></div></div>';
      rows+='<div style="font-size:12px;color:var(--t2);line-height:1.6">';
      if(h.openedAt)rows+='Aberto em '+e(h.openedAt)+'<br>';
      if(h.closedAt)rows+='Retido em '+e(h.closedAt)+(h.resolvedBy?' · por '+e(h.resolvedBy):'')+'<br>';
      if(h.note)rows+='<div style="margin-top:4px;color:var(--t)">'+e(h.note)+'</div>';
      if(h.sfLink)rows+='<a href="'+e(h.sfLink)+'" target="_blank" style="color:var(--b600);font-size:12px">Abrir no Salesforce ↗</a>';
      rows+='</div></div>';
    });
  }
  return '<div class="modal-box" style="max-width:520px"><div class="modal-title">'+svgIcon('history',16)+' Histórico de churn — '+e(c.slug||c.name)+'</div>'
    +'<div style="font-size:12px;color:var(--t3);margin-bottom:1rem">Alertas de churn que já foram retidos (recuperados ou resolvidos).</div>'
    +rows
    +'<div class="flex" style="justify-content:flex-end;margin-top:1rem"><button class="btn" onclick="closeMSoft()">Fechar</button></div></div>';
}
function mChurnAlert(ci){
var c=S.clients[ci];
var existing=c.churnCase&&c.churnCase.active;
if(existing){
  var editing=S.churnEditMode;
  var caseSection=editing
    ?'<div class="alert-section" style="margin-bottom:1.25rem">'
      +'<div style="font-size:10px;color:var(--t3);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">Caso aberto</div>'
      +'<div class="form-row" style="margin-bottom:8px"><label class="form-lbl">Número do caso</label><input id="ec-num" type="text" value="'+e(c.churnCase.caseNumber||'')+'"></div>'
      +'<div class="form-row" style="margin-bottom:8px"><label class="form-lbl">Link do Salesforce</label><input id="ec-link" type="text" value="'+e(c.churnCase.sfLink||'')+'"></div>'
      +'<div class="form-row" style="margin-bottom:8px"><label class="form-lbl">Anotação</label><textarea id="ec-note" rows="2">'+e(c.churnCase.note||'')+'</textarea></div>'
      +'<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:4px">'
      +'<button class="btn btn-sm" onclick="S.churnEditMode=false;S.modal=\'churn-alert\';S.modalArg='+ci+';render()">Descartar alterações</button>'
      +'<button class="btn-save btn-sm" onclick="saveChurnCaseEdit('+ci+')">Salvar edição</button>'
      +'</div>'
      +'<div style="font-size:10px;color:var(--t3);margin-top:8px">Criado em '+e(c.churnCase.date||'—')+'</div>'
      +'</div>'
    :'<div class="alert-section" style="margin-bottom:1.25rem;cursor:pointer" onclick="S.churnEditMode=true;openM(\'churn-alert\','+ci+')" title="Clique para editar">'
      +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">'
      +'<div style="font-size:10px;color:var(--t3);font-weight:700;text-transform:uppercase;letter-spacing:.05em">Caso aberto</div>'
      +'<span style="font-size:10px;color:var(--b600);font-weight:500">'+svgIcon('edit',11)+' Editar</span>'
      +'</div>'
      +'<div style="font-weight:600;font-size:15px;margin-bottom:4px">Caso #'+e(c.churnCase.caseNumber||'—')+'</div>'
      +(c.churnCase.sfLink?'<a href="'+e(c.churnCase.sfLink)+'" target="_blank" style="font-size:12px;color:var(--b600)" onclick="event.stopPropagation()">Abrir no Salesforce →</a><br>':'')
      +'<div style="font-size:12px;color:var(--t2);margin-top:6px">'+e(c.churnCase.note||'Sem anotação')+'</div>'
      +'<div style="font-size:10px;color:var(--t3);margin-top:6px">Criado em '+e(c.churnCase.date||'—')+'</div>'
      +'</div>';
  return'<div class="modal-box" style="max-width:480px">'
    +'<div class="modal-hdr" style="margin-bottom:1rem">'
    +'<h2 class="modal-title">'+svgIcon('alert',14)+' Caso de Churn Ativo</h2>'
    +'</div>'
    +caseSection
    +'<div style="font-weight:600;font-size:13px;margin-bottom:10px">Como fechar este caso?</div>'
    +'<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:1.25rem">'
    +'<button class="btn" style="text-align:left;padding:12px 14px;border-radius:8px;background:var(--surf2)" onclick="closeChurnResolved('+ci+')">'
    +'<div style="font-weight:600;margin-bottom:2px">'+svgIcon('check',14)+' Cliente ficou — Resolvido</div>'
    +'<div style="font-size:11px;color:var(--t3)">Remove o alerta. Cliente volta ao score normal.</div>'
    +'</button>'
    +'<button class="btn" style="text-align:left;padding:12px 14px;border-radius:8px;background:#fefce8;border-color:#fbbf24" onclick="showRecoveryOptions('+ci+')">'
    +'<div style="font-weight:600;margin-bottom:2px">'+svgIcon('info_circle',14)+' Cliente ficou — Em recuperação</div>'
    +'<div style="font-size:11px;color:var(--t3)">Define um período de observação antes de voltar ao normal.</div>'
    +'</button>'
    +'<button class="btn" style="text-align:left;padding:12px 14px;border-radius:8px;background:#fde8e8;border-color:#f87171" onclick="closeChurnConfirmed('+ci+')">'
    +'<div style="font-weight:600;color:#b91c1c;margin-bottom:2px">'+svgIcon('alert',14)+' Cliente saiu — Churn confirmado</div>'
    +'<div style="font-size:11px;color:var(--t3)">Arquiva o cliente. Some da carteira do analista.</div>'
    +'</button>'
    +'</div>'
    +'<div class="modal-ftr" style="justify-content:flex-end">'
    +'<button class="btn" onclick="S.churnEditMode=false;closeMSoft()">Fechar</button>'
    +'</div>'
    +'</div>';
}
return'<div class="modal-box" style="max-width:460px">'
  +'<div class="modal-hdr" style="margin-bottom:1rem">'
  +'<h2 class="modal-title">Marcar Alerta de Churn</h2>'
  +'</div>'
  +'<div class="form-row"><label class="form-lbl">Número do caso <span style="color:var(--rd)">*</span></label><input id="cc-num" type="text" placeholder="Ex: CASO-1234"></div>'
  +'<div class="form-row"><label class="form-lbl">Link do Salesforce</label><input id="cc-link" type="text" placeholder="https://stays.salesforce.com/..."></div>'
  +'<div class="form-row"><label class="form-lbl">Anotação</label><textarea id="cc-note" rows="3" placeholder="Descreva o motivo do alerta..."></textarea></div>'
  +'<div class="modal-ftr" style="justify-content:flex-end"><button class="btn" onclick="closeMSoft()">Cancelar</button><button class="btn-churn" onclick="saveChurnAlert('+ci+')">'+svgIcon('alert',14)+' Confirmar Alerta de Churn</button></div>'
  +'</div>';}

function saveChurnCaseEdit(ci){
var num=document.getElementById('ec-num').value.trim();
var link=document.getElementById('ec-link').value.trim();
var note=document.getElementById('ec-note').value.trim();
if(!num){alert('Informe o número do caso.');return;}
S.clients[ci].churnCase.caseNumber=num;
S.clients[ci].churnCase.sfLink=link;
S.clients[ci].churnCase.note=note;
S.churnEditMode=false;
saveState();
S.modal='churn-alert';
S.modalArg=ci;
render();
}

function showRecoveryOptions(ci){
var c=S.clients[ci];
document.querySelector('.modal-box').innerHTML='<div class="modal-hdr"><h2 class="modal-title">'+svgIcon('info_circle',14)+' Em recuperação</h2><button class="modal-close press" onclick="closeMSoft()">Fechar</button></div>'
  +'<p style="font-size:13px;color:var(--t2);margin-bottom:14px">Por quantos dias deseja observar este cliente antes de retornar ao normal?</p>'
  +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px">'
  +[5,10,20,30,40,50].map(function(d){return'<button class="btn" style="padding:12px;font-size:14px;font-weight:700" onclick="setRecoveryMode('+ci+','+d+')">'+d+' dias</button>';}).join('')
  +'</div>'
  +'<div class="modal-ftr"><button class="btn" onclick="openM(\'churn-alert\','+ci+')">← Voltar</button></div>';}
function setRecoveryMode(ci,days){
if(!confirm('Colocar '+S.clients[ci].name+' em recuperação por '+days+' dias?'))return;
var endDate=Date.now()+(days*24*60*60*1000);
S.clients[ci].recoveryMode={active:true,endDate:endDate,days:days,startDate:new Date().toLocaleDateString('pt-BR')};
if(!S.clients[ci].churnHistory)S.clients[ci].churnHistory=[];
S.clients[ci].churnHistory.push({caseNumber:S.clients[ci].churnCase.caseNumber,sfLink:S.clients[ci].churnCase.sfLink,note:S.clients[ci].churnCase.note,openedAt:S.clients[ci].churnCase.date,closedAt:new Date().toLocaleDateString('pt-BR'),outcome:'recovery',resolvedBy:S.appUser.name});
S.clients[ci].churnCase.active=false;
S.clients[ci].churnCase.closedAt=new Date().toLocaleDateString('pt-BR');
S.clients[ci].churnCase.closeReason='recovery';
saveClient(S.clients[ci]);addAdminLog('churn_recovery',Object.assign(logClient(S.clients[ci]),{caseNumber:S.clients[ci].churnCase.caseNumber,days:days}));closeM();render();}
function closeChurnResolved(ci){
if(!confirm('Fechar caso de churn como RESOLVIDO? '+S.clients[ci].name+' voltará ao score normal.'))return;
if(!S.clients[ci].churnHistory)S.clients[ci].churnHistory=[];
S.clients[ci].churnHistory.push({caseNumber:S.clients[ci].churnCase.caseNumber,sfLink:S.clients[ci].churnCase.sfLink,note:S.clients[ci].churnCase.note,openedAt:S.clients[ci].churnCase.date,closedAt:new Date().toLocaleDateString('pt-BR'),outcome:'resolved',resolvedBy:S.appUser.name});
S.clients[ci].churnCase.active=false;
S.clients[ci].churnCase.closedAt=new Date().toLocaleDateString('pt-BR');
S.clients[ci].churnCase.closeReason='resolved';
saveClient(S.clients[ci]);addAdminLog('churn_resolved',Object.assign(logClient(S.clients[ci]),{caseNumber:S.clients[ci].churnCase.caseNumber}));closeM();render();}
function closeChurnConfirmed(ci){
if(!confirm('ATENÇÃO: Esta ação irá ARQUIVAR '+S.clients[ci].name+'.\n\nO cliente sairá da carteira e ficará na página de Arquivados. Esta ação não pode ser desfeita facilmente.\n\nTem certeza?'))return;
var _c=S.clients[ci];
// Cliente perdido precisa deixar rastro: sem quando e quanto, o grafico de churn
// por mes nao tem como ser reconstruido depois.
var _cc=_c.churnCase||{};
if(!_c.churnHistory)_c.churnHistory=[];
_c.churnHistory.push({caseNumber:_cc.caseNumber,sfLink:_cc.sfLink,note:_cc.note,openedAt:_cc.date,closedAt:new Date().toLocaleDateString('pt-BR'),outcome:'churned',resolvedBy:S.appUser.name});
var archived={...S.clients[ci],archived:true,
  churnedAt:Date.now(),
  churnedDate:new Date().toISOString().split('T')[0],
  churnedMrr:parseFloat(_c.mrr)||0,
  churnedUnits:parseInt(_c.units,10)||0,
  churnedOwnerId:_c.ownerId||'',
  archivedAt:new Date().toLocaleDateString('pt-BR'),archivedBy:S.appUser.uid,archivedByName:S.appUser.name};
S.clients[ci]=archived;
saveClient(archived);closeM();
goBack();
addAdminLog('archive_client',{clientId:archived.id,clientName:archived.slug||archived.name});
render();}
/* ── ACTIVITY FUNCTIONS ── */
function saveActivity(ci){
var type=document.getElementById('sp-act-type').value;
var date=document.getElementById('sp-act-date').value;
var note=document.getElementById('sp-act-note').value.trim();
if(!date){alert('Informe a data.');return;}
if(!S.clients[ci].activities)S.clients[ci].activities=[];
var _act={id:uid(),type:type,date:date,note:note,createdBy:S.appUser.uid,createdByName:S.appUser.name,createdAt:Date.now()};
S.clients[ci].activities.push(_act);
saveState();addAdminLog('activity_added',Object.assign(logClient(S.clients[ci]),{activityId:_act.id,activityType:type}));S.slideAddOpen=false;render();}
function archiveAct(ci,btn){archiveActivity(ci,btn.dataset.id);}
function archiveRem(ci,btn){archiveReminder(ci,btn.dataset.id);}
function archiveActivity(ci,aid){
if(!confirm('Arquivar esta atividade?'))return;
var act=S.clients[ci].activities.find(function(a){return a.id===aid;});
if(act)act.archived=true;
saveState();addAdminLog('activity_archived',Object.assign(logClient(S.clients[ci]),{activityId:aid}));render();}
/* ── REMINDER FUNCTIONS ── */
function saveReminder(ci){
var type=document.getElementById('sp-rem-type').value;
var title=document.getElementById('sp-rem-title').value.trim();
var dueDate=document.getElementById('sp-rem-date').value;
var note=document.getElementById('sp-rem-note').value.trim();
if(!title){alert('Informe o título do lembrete.');return;}
if(!dueDate){alert('Informe a data do lembrete.');return;}
if(!confirm((type==='retorno'?'Registrar lembrete de RETORNO':'Registrar lembrete PROATIVO')+' para '+S.clients[ci].name+'?'))return;
if(!S.clients[ci].reminders)S.clients[ci].reminders=[];
var _rem={id:uid(),type:type,title:title,dueDate:dueDate,note:note,done:false,doneAt:null,archived:false,createdBy:S.appUser.uid,createdByName:S.appUser.name,createdAt:Date.now()};
S.clients[ci].reminders.push(_rem);
saveState();addAdminLog('reminder_added',Object.assign(logClient(S.clients[ci]),{reminderId:_rem.id,reminderType:type,title:title}));S.slideAddOpen=false;render();}
function deleteReminder(ci,rid){
  var rem=S.clients[ci].reminders.find(function(r){return r.id===rid;});
  if(rem&&rem.type==='retorno'){alert('Lembretes de retorno não podem ser excluídos, apenas arquivados.');return;}
  if(!confirm('Excluir este lembrete proativo permanentemente?'))return;
  S.clients[ci].reminders=S.clients[ci].reminders.filter(function(r){return r.id!==rid;});
  saveState();addAdminLog('reminder_deleted',Object.assign(logClient(S.clients[ci]),{reminderId:rid,title:rem&&rem.title}));render();
}
function completeReminder(ci,rid){
if(!confirm('Marcar lembrete como concluído?'))return;
var rem=S.clients[ci].reminders.find(function(r){return r.id===rid;});
if(rem){rem.done=true;rem.doneAt=new Date().toLocaleDateString('pt-BR');}
saveState();addAdminLog('reminder_completed',Object.assign(logClient(S.clients[ci]),{reminderId:rid,title:rem&&rem.title}));render();}
function archiveReminder(ci,rid){
if(!confirm('Arquivar este lembrete?'))return;
var rem=S.clients[ci].reminders.find(function(r){return r.id===rid;});
if(rem)rem.archived=true;
saveState();addAdminLog('reminder_archived',Object.assign(logClient(S.clients[ci]),{reminderId:rid,title:rem&&rem.title}));render();}
/* ── SLIDE PANEL HTML ── */
function spAct(btn){var ci=+btn.getAttribute('data-ci'),id=btn.getAttribute('data-id'),ac=btn.getAttribute('data-ac');if(ac==='archAct')archiveActivity(ci,id);else if(ac==='archRem')archiveReminder(ci,id);else if(ac==='doneRem')completeReminder(ci,id);else if(ac==='delRem')deleteReminder(ci,id);}
function slidePanelHTML(){
if(S.slidePanel===null)return'';
var ci=S.slidePanel,c=S.clients[ci];if(!c)return'';
var score=calcScore(c),h=hl(score);
var hC=h==='risk'?'#dc2626':(h==='warn'?'#d97706':'#16a34a');
var tabActs=S.slidePanelTab==='activities';
var remCount=getActiveReminders(c).length;
var html='<div class="slide-panel open">'
  +'<div class="sp-header"><div style="display:flex;align-items:center;justify-content:space-between"><div>'
  +(c.slug?'<div style="font-size:10px;color:var(--t3);font-weight:700;letter-spacing:.06em;text-transform:uppercase">'+e(c.slug)+'</div>':'')
  +'<div class="sp-client-name">'+e(c.name)+'</div>'
  +'<div class="sp-client-sub">'+e(getListingCountry(c))+(c.clientCountry?' · '+e(c.clientCountry):'')+'</div>'
  +'</div><div style="display:flex;align-items:center;gap:8px"><span style="font-size:18px;font-weight:700;color:'+hC+'">'+score+'</span>'
  +'<button class="sp-close" onclick="closeSlidePanel()">'+svgIcon('cross',16)+'</button></div></div></div>'
  +'<div class="sp-tabs">'
  +'<button class="sp-tab'+(tabActs?' active':'')+'" onclick="S.slidePanelTab=\'activities\';S.slideAddOpen=false;render()">Atividades</button>'
  +'<button class="sp-tab'+(!tabActs?' active':'')+'" onclick="S.slidePanelTab=\'reminders\';S.slideAddOpen=false;render()">Lembretes'+(remCount>0?' ('+remCount+')':'')+'</button>'
  +'</div>';
if(tabActs){
  var ninetyAgo=new Date(Date.now()-90*24*60*60*1000).toISOString().split('T')[0];
  var thirtyAhead=new Date(Date.now()+30*24*60*60*1000).toISOString().split('T')[0];
  var acts=(c.activities||[]).filter(function(a){return!a.archived&&a.date>=ninetyAgo&&a.date<=thirtyAhead;}).sort(function(a,b){return b.date>a.date?1:-1;});
  html+='<div class="sp-body">';
  if(!acts.length){html+='<div style="text-align:center;padding:2rem 0;color:var(--t3)"><div style="font-size:28px;margin-bottom:8px">'+svgIcon('clipboard',28)+'</div><div style="font-size:13px">Nenhuma atividade nos últimos 90 dias.</div></div>';}
  else{acts.forEach(function(a){var at=ACT_TYPES[a.type]||{label:a.type,icon:'pin'};var daysAgo=Math.floor((Date.now()-new Date(a.date))/(1000*60*60*24));var dLabel=daysAgo===0?'Hoje':(daysAgo<0?'Em '+Math.abs(daysAgo)+'d':daysAgo+'d atrás');html+='<div class="act-item"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px"><span class="act-type-badge">'+at.icon+' '+e(at.label)+'</span><span style="font-size:11px;color:var(--t3)">'+formatDate(a.date)+' · '+dLabel+'</span></div>'+(a.note?'<div style="font-size:12px;color:var(--t2);margin-top:4px">'+e(a.note)+'</div>':'')+'<div style="font-size:10px;color:var(--t3);margin-top:6px">Por '+e(a.createdByName||'—')+'<button class="btn btn-sm" style="margin-left:8px;font-size:10px;padding:1px 6px" data-ci="'+ci+'" data-id="'+a.id+'" data-ac="archAct" onclick="spAct(this)">Arquivar</button></div></div>';});}
  html+='</div>';
}else{
  var today=new Date().toISOString().split('T')[0];
  var rems=getActiveReminders(c).sort(function(a,b){return a.dueDate>b.dueDate?1:-1;});
  var doneRems=(c.reminders||[]).filter(function(r){return r.done&&!r.archived;}).slice(0,5);
  html+='<div class="sp-body">';
  if(!rems.length&&!doneRems.length){html+='<div style="text-align:center;padding:2rem 0;color:var(--t3)"><div style="font-size:28px;margin-bottom:8px">'+svgIcon('notification',28)+'</div><div style="font-size:13px">Nenhum lembrete ativo.</div></div>';}
  else{
    rems.forEach(function(r){var ov=r.dueDate&&r.dueDate<today;html+='<div class="rem-item rem-'+r.type+'" style="'+(ov?'border-color:#dc2626':'')+'"><div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px"><div><div style="font-size:12px;font-weight:600;margin-bottom:2px">'+(r.type==='retorno'?svgIcon('alert',14):svgIcon('lightbulb',14))+' '+e(r.title)+'</div>'+(r.note?'<div style="font-size:11px;color:var(--t2);margin-bottom:4px">'+e(r.note)+'</div>':'')+'<div style="font-size:10px;color:var(--t3)">'+(ov?'<span style="color:#dc2626;font-weight:600">Vencido: </span>':'Vence em ')+formatDate(r.dueDate)+'</div></div><button class="btn btn-sm" style="flex-shrink:0;font-size:10px;padding:2px 8px;background:#e8f5ec;color:#145f27;border-color:#1f943c" data-ci="'+ci+'" data-id="'+r.id+'" data-ac="doneRem" onclick="spAct(this)">'+svgIcon('check',12)+'</button>'+(r.type==='proativo'?'<button class="btn btn-sm" style="flex-shrink:0;font-size:10px;padding:2px 8px;background:#fee2e2;color:#b91c1c;border-color:#f87171;margin-top:4px" data-ci="'+ci+'" data-id="'+r.id+'" data-ac="delRem" onclick="spAct(this)">'+svgIcon('trash',13)+'</button>':'')+'</div></div>';});
    if(doneRems.length){html+='<div style="font-size:10px;font-weight:600;color:var(--t3);text-transform:uppercase;margin:12px 0 6px">Concluídos</div>';doneRems.forEach(function(r){html+='<div class="rem-item rem-'+r.type+' rem-done"><div style="font-size:12px">'+(r.type==='retorno'?svgIcon('alert',14):svgIcon('lightbulb',14))+' '+e(r.title)+'</div><div style="font-size:10px;color:var(--t3)">'+formatDate(r.dueDate)+'<button class="btn btn-sm" style="margin-left:8px;font-size:10px;padding:1px 6px" data-ci="'+ci+'" data-id="'+r.id+'" data-ac="archRem" onclick="spAct(this)">Arquivar</button></div></div>';});}
  }
  html+='</div>';
}
if(S.slideAddOpen&&tabActs){
  html+='<div class="sp-add-form"><div style="font-size:12px;font-weight:600;margin-bottom:10px">Nova atividade</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">'
    +'<select id="sp-act-type" style="font-size:12px">'+Object.entries(ACT_TYPES).map(function(kv){return'<option value="'+kv[0]+'">'+svgIcon(kv[1].icon,14)+' '+kv[1].label+'</option>';}).join('')+'</select>'
    +'<input id="sp-act-date" type="date" value="'+new Date().toISOString().split('T')[0]+'" style="font-size:12px"></div>'
    +'<textarea id="sp-act-note" rows="2" placeholder="Anotação sobre o contato..." style="font-size:12px;width:100%;margin-bottom:8px"></textarea>'
    +'<div style="display:flex;gap:6px;justify-content:flex-end"><button class="btn btn-sm" onclick="S.slideAddOpen=false;render()">Cancelar</button><button class="btn-save btn-sm" onclick="saveActivity('+ci+')">Salvar</button></div></div>';
}else if(S.slideAddOpen&&!tabActs){
  html+='<div class="sp-add-form"><div style="font-size:12px;font-weight:600;margin-bottom:10px">Novo lembrete</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">'
    +'<select id="sp-rem-type" style="font-size:12px"><option value="retorno">'+svgIcon('alert',14)+' Retorno</option><option value="proativo">'+svgIcon('lightbulb',14)+' Proativo</option></select>'
    +'<input id="sp-rem-date" type="date" value="'+new Date().toISOString().split('T')[0]+'" style="font-size:12px"></div>'
    +'<input id="sp-rem-title" type="text" placeholder="Título do lembrete..." style="font-size:12px;width:100%;margin-bottom:8px">'
    +'<textarea id="sp-rem-note" rows="2" placeholder="Anotação (opcional)..." style="font-size:12px;width:100%;margin-bottom:8px"></textarea>'
    +'<div style="display:flex;gap:6px;justify-content:flex-end"><button class="btn btn-sm" onclick="S.slideAddOpen=false;render()">Cancelar</button><button class="btn-save btn-sm" onclick="saveReminder('+ci+')">Salvar</button></div></div>';
}else{
  html+='<div class="sp-add-form"><button class="btn-primary" style="width:100%;justify-content:center" onclick="S.slideAddOpen=true;render()">+ '+(tabActs?'Nova atividade':'Novo lembrete')+'</button></div>';
}
return html+'</div>';}

function addAdminLog(action,data){var d=Object.assign({},data||{});if(!d.by)d.by=S.appUser&&S.appUser.name;if(!d.at)d.at=new Date().toLocaleDateString('pt-BR');var log={id:uid(),action:action,data:d,byUid:(S.appUser&&S.appUser.uid)||null,at:Date.now()};db.collection('admin_log').add(log).catch(function(e){console.error('Log error:',e);});}
function logClient(c){return{clientId:c&&c.id,clientName:c&&(c.slug||c.name)};}

function saveChurnAlert(ci){var num=document.getElementById('cc-num').value.trim();if(!num){alert('Informe o número do caso.');return;}if(!confirm('Marcar '+S.clients[ci].name+' como Alerta de Churn? Isso ficará visível para todos os analistas.'))return;S.clients[ci].churnCase={active:true,caseNumber:num,sfLink:document.getElementById('cc-link').value.trim(),note:document.getElementById('cc-note').value.trim(),date:new Date().toLocaleDateString('pt-BR'),createdBy:S.appUser.uid,createdAt:Date.now()};saveClient(S.clients[ci]);addAdminLog('churn_opened',Object.assign(logClient(S.clients[ci]),{caseNumber:num}));closeM();render();}
function mInadimplencia(ci){var c=S.clients[ci];var months=c.inadimplencia||[];var pendingMonths=months.filter(function(m){return!m.paid;});var paidMonths=months.filter(function(m){return m.paid;});var monthsHtml=pendingMonths.map(function(m,i){var realIdx=months.indexOf(m);return'<div class="inad-month-row"><div style="flex:1"><div style="font-weight:600;font-size:13px">'+e(m.month)+'/'+e(m.year)+'</div>'+(m.amount?'<div style="font-size:11px;color:var(--t3)">Valor: '+e(m.amount)+'</div>':'')+(m.note?'<div style="font-size:11px;color:var(--t3);margin-top:2px">'+e(m.note)+'</div>':'')+'</div><button class="btn btn-sm" style="background:#e8f5ec;color:#145f27;border-color:#1f943c" onclick="markMonthPaid('+ci+','+realIdx+')">'+svgIcon('check',12)+' Marcar como pago</button></div>';}).join('');var paidHtml=paidMonths.length>0?'<div style="margin-top:12px"><div style="font-size:11px;font-weight:600;color:var(--t3);text-transform:uppercase;margin-bottom:6px">Histórico pago</div>'+paidMonths.map(function(m){return'<div class="inad-month-row paid"><span>'+e(m.month)+'/'+e(m.year)+'</span><span style="font-size:11px;color:var(--t3)">Pago em '+e(m.paidAt||'—')+'</span></div>';}).join('')+'</div>':'';return'<div class="modal-box" style="max-width:480px"><div class="modal-hdr"><h2 class="modal-title">Inadimplência — '+e((c.slug||c.name).toUpperCase())+'</h2><button class="modal-close press" onclick="closeMSoft()">Fechar</button></div>'+(monthsHtml||'<p class="muted" style="text-align:center;padding:1rem 0">Nenhuma fatura em aberto.</p>')+paidHtml+'<div style="border-top:1px solid var(--bd);margin-top:14px;padding-top:14px"><div style="font-weight:600;font-size:13px;margin-bottom:10px">Adicionar fatura em aberto</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><div class="form-row"><label class="form-lbl">Mês <span style="color:var(--rd)">*</span></label><select id="ii-month"><option value="">Selecionar...</option>'+'Janeiro,Fevereiro,Março,Abril,Maio,Junho,Julho,Agosto,Setembro,Outubro,Novembro,Dezembro'.split(',').map(function(m,i){return'<option value="'+m+'">'+m+'</option>';}).join('')+'</select></div><div class="form-row"><label class="form-lbl">Ano <span style="color:var(--rd)">*</span></label><select id="ii-year"><option value="">Selecionar...</option>'+(function(){var o='';for(var y=2023;y<=2027;y++)o+='<option value="'+y+'"'+(y===new Date().getFullYear()?' selected':'')+'>'+y+'</option>';return o;})()+'</select></div></div><div class="form-row"><label class="form-lbl">Valor (opcional)</label><input id="ii-amount" type="text" placeholder="Ex: $ 1.500"></div><div class="form-row"><label class="form-lbl">Motivo (opcional)</label><textarea id="ii-note" rows="2" placeholder="Por que o cliente ficou inadimplente?"></textarea></div></div><div class="modal-ftr"><button class="btn" onclick="closeMSoft()">Fechar</button><button class="btn-inadim" onclick="saveInadimplencia('+ci+')">Adicionar fatura</button></div></div>';}
function saveInadimplencia(ci){var month=document.getElementById('ii-month').value;var year=document.getElementById('ii-year').value;if(!month||!year){alert('Selecione mês e ano.');return;}if(!confirm('Registrar fatura de '+month+'/'+year+' como inadimplente para '+S.clients[ci].name+'?'))return;if(!S.clients[ci].inadimplencia)S.clients[ci].inadimplencia=[];S.clients[ci].inadimplencia.push({id:uid(),month:month,year:year,amount:document.getElementById('ii-amount').value.trim(),note:document.getElementById('ii-note').value.trim(),paid:false,paidAt:null,createdAt:Date.now()});saveClient(S.clients[ci]);addAdminLog('inadimplencia_added',Object.assign(logClient(S.clients[ci]),{month:month,year:year}));S.modal='inad-'+ci;render();}
function markMonthPaid(ci,idx){var m=S.clients[ci].inadimplencia[idx];if(!confirm('Confirmar pagamento da fatura de '+m.month+'/'+m.year+'? Isso será salvo no histórico.'))return;S.clients[ci].inadimplencia[idx].paid=true;S.clients[ci].inadimplencia[idx].paidAt=new Date().toLocaleDateString('pt-BR');S.clients[ci].inadimplencia[idx].paidAtTs=Date.now();saveClient(S.clients[ci]);addAdminLog('inadimplencia_paid',Object.assign(logClient(S.clients[ci]),{month:m.month,year:m.year}));S.modal='inad-'+ci;render();}

function modal(){var fns={"add-client":mAddClient,"add-contact":mContact,"add-key-contact":mAddKeyContact,"settings":mSettings,"add-user":mAddUser,"edit-client":mEditClient,"user-created":mUserCreated,"profile":mProfile};var inner="";if(S.modal&&S.modal.startsWith("inad-")){var _ci=parseInt(S.modal.split("-")[1]);inner=mInadimplencia(_ci);}else if(S.modal==="churn-history"){inner=mChurnHistory(S.modalArg!==null&&S.modalArg!==undefined?S.modalArg:S.sel);}else if(S.modal==="churn-alert"){inner=mChurnAlert(S.modalArg!==null&&S.modalArg!==undefined?S.modalArg:S.sel);}else{inner=(fns[S.modal]||function(){return"";})();}return'<div class="modal-ov" onclick="overlayBackdropClick(event,this)" oninput="markModalDirty()" onchange="markModalDirty()">'+inner+'</div>';}
function mAddClient(){var countries=Object.keys(CS).sort();var pOpts=Object.entries(PLAN_L).map(function(e){return'<option value="'+e[0]+'">'+e[1]+'</option>';}).join("");var allCountries=["Estados Unidos","Brasil","Argentina","Colombia","México","Perú","Chile","Uruguay","Paraguay","Venezuela","Ecuador","Bolivia"].concat(countries.filter(function(c){return!["Estados Unidos","Brasil","Argentina","Colombia","México","Perú","Chile","Uruguay","Paraguay","Venezuela","Ecuador","Bolivia"].includes(c);}));return'<div class="modal-box" style="max-width:560px"><div class="modal-title">Novo cliente</div><div class="grid2"><div class="form-row"><label class="form-lbl">Nome <span style="color:#ce1e5a">*</span></label><input id="mn" type="text" placeholder="Ex: CARIBBEAN RENTALS"></div><div class="form-row"><label class="form-lbl">Sigla (ID no SMS) <span style="color:#ce1e5a">*</span></label><input id="mslug" type="text" placeholder="Ex: caribbeanrentals" style="font-family:monospace"></div></div><div class="grid2"><div class="form-row"><label class="form-lbl">Pais dos anuncios <span style="color:#ce1e5a">*</span></label><select id="mc"><option value="">Selecionar...</option>'+countries.map(function(c){return'<option>'+c+'</option>';}).join("")+'</select></div><div class="form-row"><label class="form-lbl">Unidades <span style="color:#ce1e5a">*</span></label><input id="mu" type="number" min="1" placeholder="Ex: 15"></div></div><div class="grid2"><div class="form-row"><label class="form-lbl">Plano</label><select id="mpl"><option value="">Selecionar...</option>'+pOpts+'</select></div><div class="form-row"><label class="form-lbl">MRR (USD)</label><input id="mmrr" type="text" inputmode="decimal" placeholder="Ex: 1.500,00"></div></div><div class="grid2"><div class="form-row"><label class="form-lbl">Pais do cliente (mora em)</label><select id="mcl"><option value="">Selecionar...</option>'+allCountries.map(function(c){return'<option>'+c+'</option>';}).join("")+'</select></div><div class="form-row"><label class="form-lbl">Cidade do cliente</label><input id="mcly" type="text" placeholder="Ex: Miami, FL"></div></div><div class="grid2"><div class="form-row"><label class="form-lbl">Categoria</label><select id="mcat"><option value="">Selecionar...</option><option value="elite">Elite</option><option value="gold">Gold / High Value</option><option value="silver">Silver / Core A-B</option><option value="bronze">Bronze / Pareto</option></select></div><div class="form-row"><label class="form-lbl">Status de Onboarding</label><select id="mst"><option value="">Selecionar...</option><option value="Em andamento">Em andamento</option><option value="Completed">Completed</option></select></div></div>'+newClientOwnerRow()+'<p style="font-size:11px;color:var(--t3);margin-bottom:1rem"><span style="color:#ce1e5a">*</span> Campos obrigatórios</p><div class="flex" style="justify-content:flex-end;gap:8px;margin-top:.5rem"><button class="btn" onclick="closeMSoft()">Cancelar</button><button class="btn-save" onclick="addClient()">Criar cliente</button></div></div>';}
// Lider/gerente/admin escolhem de quem é o cliente; analista só cria pra si.
function canAssignOwner(){return!!(S.appUser&&['admin','gerente','leader','testuser'].indexOf(S.appUser.role)>=0);}
// Carteira de cliente é só de quem tem a função Analista. Gerente, líder e usuário
// teste não aparecem como responsável em lugar nenhum.
function analystUsers(){return usersWithRole('analyst');}
function analystOptionsHTML(selected,placeholder){
  var list=analystUsers();
  var opts='<option value="">'+e(placeholder||'— selecionar analista —')+'</option>';
  return opts+list.map(function(u){return'<option value="'+u.uid+'"'+(selected===u.uid?' selected':'')+'>'+e(u.name)+'</option>';}).join('');
}
function newClientOwnerRow(){
  if(!canAssignOwner())return'';
  var list=analystUsers();
  if(!list.length)return'<div class="alert alert-amber" style="margin-bottom:12px">Nenhum usuário com a função <strong>Analista</strong> cadastrado ainda. Crie o acesso do analista em Gestão antes de cadastrar clientes por aqui.</div>';
  return'<div class="form-row"><label class="form-lbl">Analista responsável <span style="color:#ce1e5a">*</span></label><select id="mown">'+analystOptionsHTML('')+'</select></div>';
}
function openLeaderNewClient(){if(!confirmDiscardIfDirty())return;openM('add-client');}
function mEditClient(){var c=S.clients[S.sel];var countries=Object.keys(CS).sort();var pOpts=Object.entries(PLAN_L).map(function(e){return'<option value="'+e[0]+'"'+(c.plan===e[0]?" selected":"")+'>'+e[1]+'</option>';}).join("");var allCountries=["Estados Unidos","Brasil","Argentina","Colombia","México","Perú","Chile","Uruguay","Paraguay","Venezuela","Ecuador","Bolivia"].concat(countries.filter(function(x){return!["Estados Unidos","Brasil","Argentina","Colombia","México","Perú","Chile","Uruguay","Paraguay","Venezuela","Ecuador","Bolivia"].includes(x);}));return'<div class="modal-box" style="max-width:560px"><div class="modal-title">Editar cliente</div><div class="grid2"><div class="form-row"><label class="form-lbl">Nome <span style="color:#ce1e5a">*</span></label><input id="en" type="text" value="'+e(c.name)+'"></div><div class="form-row"><label class="form-lbl">Sigla (ID no SMS)</label><input id="eslug" type="text" value="'+e(c.slug||"")+'" placeholder="Ex: caribbeanrentals" style="font-family:monospace"></div></div><div class="grid2"><div class="form-row"><label class="form-lbl">Pais dos anuncios <span style="color:#ce1e5a">*</span></label><select id="ec"><option value="">Selecionar...</option>'+countries.map(function(x){return'<option'+(c.country===x?" selected":"")+'>'+x+'</option>';}).join("")+'</select></div><div class="form-row"><label class="form-lbl">Unidades <span style="color:#ce1e5a">*</span></label><input id="eu" type="number" min="1" value="'+e(c.units||"")+'"></div></div><div class="grid2"><div class="form-row"><label class="form-lbl">Plano</label><select id="epl"><option value="">Selecionar...</option>'+pOpts+'</select></div><div class="form-row"><label class="form-lbl">MRR (USD)</label><input id="emrr" type="text" inputmode="decimal" value="'+e(c.mrr!==undefined&&c.mrr!==null&&c.mrr!==""?String(c.mrr).replace(".",","):"")+'"></div><div class="form-row"><label class="form-lbl">Dias sem atividade <span style="color:var(--t3);font-weight:400;font-size:11px">(cliente sem logar)</span></label><input id="edia" type="number" min="0" placeholder="ex: 12" value="'+e(c.daysInactive||"")+'"></div></div><div class="grid2"><div class="form-row"><label class="form-lbl">Pais do cliente (mora em)</label><select id="ecl"><option value="">Selecionar...</option>'+allCountries.map(function(x){return'<option'+(c.clientCountry===x?" selected":"")+'>'+x+'</option>';}).join("")+'</select></div><div class="form-row"><label class="form-lbl">Cidade do cliente</label><input id="ecly" type="text" value="'+e(c.clientCity||"")+'"></div></div><div class="grid2"><div class="form-row"><label class="form-lbl">Categoria</label><select id="ecat"><option value="">Selecionar...</option><option value="elite"'+(c.categoria==='elite'?' selected':'')+'>Elite</option><option value="gold"'+(c.categoria==='gold'?' selected':'')+'>'+(isHispano(c)?'High Value':'Gold')+'</option><option value="silver"'+(c.categoria==='silver'?' selected':'')+'>'+(isHispano(c)?'Core A-B':'Silver')+'</option><option value="bronze"'+(c.categoria==='bronze'?' selected':'')+'>'+(isHispano(c)?'Pareto':'Bronze')+'</option></select></div><div class="form-row"><label class="form-lbl">Status de Onboarding</label><select id="est"><option value="">Selecionar...</option><option value="Em andamento"'+(c.onboardingStatus==='Em andamento'?' selected':'')+'>Em andamento</option><option value="Completed"'+(c.onboardingStatus==='Completed'?' selected':'')+'>Completed</option></select></div></div><div class="flex" style="justify-content:flex-end;gap:8px;margin-top:1rem"><button class="btn" onclick="closeMSoft()">Cancelar</button><button class="btn-save" onclick="saveEditClient()">Salvar</button></div></div>';}
function mContact(){return'<div class="modal-box"><div class="modal-title">Registrar contato externo</div><div class="form-row"><label class="form-lbl">Tipo</label><select id="ct"><option value="meeting">Reuniao</option><option value="whatsapp">WhatsApp</option><option value="email">E-mail</option><option value="churn">Alerta de Churn</option></select></div><div class="form-row"><label class="form-lbl">Data</label><input id="cd" type="date" value="'+new Date().toISOString().split("T")[0]+'"></div><div class="form-row"><label class="form-lbl">Impacto</label><select id="ci"><option value="positive">Positivo</option><option value="neutral">Neutro</option><option value="negative">Negativo</option></select></div><div class="form-row"><label class="form-lbl">Resumo do contato</label><textarea id="cs" style="height:110px;resize:vertical" placeholder="O que foi discutido? Qual o resultado?"></textarea></div><div class="flex" style="justify-content:flex-end;gap:8px;margin-top:1.25rem"><button class="btn" onclick="closeMSoft()">Cancelar</button><button class="btn-primary" onclick="saveContact()">Salvar</button></div></div>';}
function mAddKeyContact(){var c=S.clients[S.sel];if(c.keyContacts&&c.keyContacts.length>=5)return'<div class="modal-box"><div class="modal-title">Limite atingido</div><p style="margin-bottom:1.5rem">Maximo de 5 contatos-chave por cliente.</p><div class="flex" style="justify-content:flex-end"><button class="btn" onclick="closeMSoft()">Fechar</button></div></div>';return'<div class="modal-box"><div class="modal-title">Adicionar contato-chave</div><div class="form-row"><label class="form-lbl">Nome completo</label><input id="kn" type="text" placeholder="Ex: Juan Carlos Rodriguez"></div><div class="form-row"><label class="form-lbl">Funcao / cargo</label><input id="kr" type="text" placeholder="Ex: CEO, Gerente, Dono"></div><div class="grid2"><div class="form-row"><label class="form-lbl">Telefone / WhatsApp</label><input id="kp" type="text" placeholder="+1 555 000 0000"></div><div class="form-row"><label class="form-lbl">E-mail</label><input id="ke" type="text" placeholder="email@cliente.com"></div></div><div class="form-row" style="margin-top:4px"><label style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--t2);cursor:pointer"><input id="kresp" type="checkbox" style="width:16px;height:16px;cursor:pointer"> Responsável pela conta <span style="color:var(--t3);font-size:11px">(usado para personalizar mensagens)</span></label></div><div class="flex" style="justify-content:flex-end;gap:8px;margin-top:1.25rem"><button class="btn" onclick="closeMSoft()">Cancelar</button><button class="btn-primary" onclick="saveKeyContact()">Salvar</button></div></div>';}
function mSettings(){return'<div class="modal-box"><div class="modal-title">Configuracoes</div><div class="form-row"><label class="form-lbl">Chave de API Anthropic (para Gerar com API)</label><input id="sk" type="password" value="'+e(S.apiKey)+'" placeholder="sk-ant-api03-..."></div><div class="form-row"><label class="form-lbl" style="color:var(--t3);font-weight:400;font-size:11px">A chave fica salva apenas neste navegador.</label></div><div class="flex" style="justify-content:flex-end;gap:8px;margin-top:1.25rem"><button class="btn" onclick="closeMSoft()">Fechar</button><button class="btn-primary" onclick="saveSettings()">Salvar</button></div></div>';}
// ============================================================
// HANDLERS
// ============================================================
function openClientFollows(i){S.sel=i;S.view="client";S.clientTab="follows";S.genText="";S.importMsg="";S.citiesOpen=false;render();}
function toggleDropdown(id,ev){ev.stopPropagation();var el=document.getElementById(id);if(!el)return;var isOpen=el.style.display==="block";document.querySelectorAll(".dd-menu").forEach(function(d){d.style.display="none";});if(!isOpen){el.style.display="block";setTimeout(function(){document.addEventListener("click",function h(){el.style.display="none";document.removeEventListener("click",h);},{once:true});},0);}}
function goBack(){if(!confirmDiscardIfDirty())return;S.view="dashboard";S.sel=null;S.selFollow=null;S.genText="";S.importMsg="";render();}
function goBackToClient(){if(S.editFollow&&S.editFollowDirty&&!confirm("Você tem alterações não salvas nesta pergunta. Sair sem salvar?"))return;S.editFollow=null;S.editFollowDirty=false;S.view="client";S.selFollow=null;S.genText="";S.importMsg="";render();}
function goLeaderPanel(){if(!confirmDiscardIfDirty())return;if(!S.allUsers||!S.allUsers.length){loadAllUsers().then(function(){S.view="leaderpanel";render();});}else{S.view="leaderpanel";render();}}
function goAdmin(){if(!confirmDiscardIfDirty())return;S.view="admin";if(S.appUser.role==="admin")loadAllUsers().then(function(){render();});else render();}
function goSettings(){if(!confirmDiscardIfDirty())return;S.view="settings";render();}
function selectSettingsCat(cat){if(!confirmDiscardIfDirty())return;S.settingsCat=cat;S.settingsSub=null;if(cat==='adminlog'){loadAdminLog().then(function(){render();});}else{render();}}
function selectSettingsSub(sub){if(!confirmDiscardIfDirty())return;S.settingsSub=sub;if(sub==='order')initWizOrderDraft();render();}
function initWizOrderDraft(){S.wizOrderDraft={first:getWizOrder('first'),recurring:getWizOrder('recurring')};S.wizOrderDirty=false;S.wizOrderTab='first';}
function openClient(i){S.sel=i;S.view="client";S.clientTab="info";S.genText="";S.importMsg="";S.citiesOpen=false;render();}
function openFollow(fi){S.editFollow=null;S.editFollowDirty=false;S.selFollow=fi;S.view="follow-view";S.genText="";S.importMsg="";render();}
function openM(n,arg){S.modal=n;S.modalArg=(arg!==undefined?arg:null);S.modalDirty=false;render();}
function closeM(){S.modal=null;S.churnEditMode=false;render();}
// Marca que o usuário mexeu em algo dentro do modal. Sem isso, o "fechar sem
// salvar?" apareceria mesmo quando nada foi alterado.
function markModalDirty(){S.modalDirty=true;}
function toggleCitiesPanel(){S.citiesOpen=!S.citiesOpen;render();}

function addClient(){
  var name=document.getElementById("mn").value.trim();
  var slug=document.getElementById("mslug").value.trim().toLowerCase().replace(/\s+/g,"");
  var country=document.getElementById("mc").value;
  var units=document.getElementById("mu").value.trim();
  if(!name){alert("Informe o nome do cliente.");return;}
  if(!slug){alert("Informe a sigla do cliente.");return;}
  if(!country){alert("Selecione o pais dos anuncios.");return;}
  if(!units){alert("Informe o numero de unidades.");return;}
  var plan=document.getElementById("mpl").value,mrr=parseBRNumber(document.getElementById("mmrr").value);
  var clientCountry=document.getElementById("mcl").value,clientCity=document.getElementById("mcly").value.trim();
  var categoria=document.getElementById('mcat').value;var onboardingStatus=document.getElementById('mst').value;
  var ownEl=document.getElementById('mown');
  if(ownEl&&!ownEl.value){alert('Selecione o analista responsável pelo cliente.');return;}
  var ownerId=(ownEl&&ownEl.value)||S.appUser.uid;
  var dupSlug=S.clients.find(function(c){return String(c.slug||'').toLowerCase()===slug;});
  if(dupSlug){alert('Já existe um cliente com a sigla "'+slug.toUpperCase()+'" ('+dupSlug.name+').\n\nA sigla é o identificador único do cliente — use outra.');return;}
  var nc={id:uid(),name:name,slug:slug,country:country,plan:plan,units:units,mrr:mrr,clientCountry:clientCountry,clientCity:clientCity,categoria:categoria,onboardingStatus:onboardingStatus,keyContacts:[],contacts:[],follows:[],ownerId:ownerId};
  S.clients.push(nc);var ci=S.clients.length-1;
  db.collection("clients").doc(nc.id).set(JSON.parse(JSON.stringify(nc))).catch(function(err){console.error("Save new client:",err);});
  addAdminLog('client_created',Object.assign(logClient(nc),{ownerName:((S.allUsers||[]).find(function(u){return u.uid===ownerId;})||{}).name||''}));
  S.modal=null;openClient(ci);
}
function saveEditClient(){
  var c=S.clients[S.sel];
  var name=document.getElementById("en").value.trim();
  var units=document.getElementById("eu").value.trim();
  var country=document.getElementById("ec").value;
  if(!name){alert("Informe o nome.");return;}
  if(!units){alert("Informe as unidades.");return;}
  if(!country){alert("Selecione o pais.");return;}
  c.name=name;
  c.slug=document.getElementById("eslug").value.trim().toLowerCase().replace(/\s+/g,"");
  c.country=country;
  c.units=units;
  c.plan=document.getElementById("epl").value;
  c.mrr=parseBRNumber(document.getElementById("emrr").value);
  var _edia=document.getElementById("edia");if(_edia)c.daysInactive=_edia.value.trim();
  c.clientCountry=document.getElementById("ecl").value;
  c.clientCity=document.getElementById("ecly").value.trim();
  c.categoria=document.getElementById("ecat").value;
  c.onboardingStatus=document.getElementById("est").value;
  saveState();addAdminLog('client_edited',logClient(c));showSaved();S.modal=null;render();
}
function showSaved(){S.savedMsg=true;render();setTimeout(function(){S.savedMsg=false;render();},2500);}
function delClient(i){
  var c=S.clients[i];
  if(!confirm('Excluir "'+c.name+'"?\n\nO cliente vai para Arquivados e pode ser restaurado por '+LIXEIRA_DIAS+' dias. Depois disso é removido definitivamente.'))return;
  c.archived=true;
  c.deletedAt=Date.now();
  c.archivedAt=new Date().toLocaleDateString('pt-BR');
  c.archivedBy=S.appUser.uid;
  c.archivedByName=S.appUser.name;
  saveClient(c);
  addAdminLog('client_deleted',logClient(c));
  goBack();
}
function restoreClient(ci){
  var c=S.clients[ci];
  if(!confirm('Restaurar "'+c.name+'" para a carteira?'))return;
  c.archived=false;
  c.deletedAt=null;
  c.archivedAt=null;
  c.archivedBy=null;
  c.archivedByName=null;
  saveClient(c);
  addAdminLog('client_restored',logClient(c));
  render();
}
function delFollow(ci,fi){
  var c=S.clients[ci],f=c.follows[fi];
  if(!confirm("Tem certeza que deseja excluir este Follow-Up de "+formatDate(f.date)+"?"))return;
  S.undoFollow=JSON.parse(JSON.stringify(f));S.undoFollowIdx=fi;S.undoCI=ci;S.undoMsg="Follow-Up de "+formatDate(f.date)+" excluido.";
  addAdminLog('follow_deleted',Object.assign(logClient(c),{followDate:formatDate(f.date)}));
  c.follows.splice(fi,1);saveState();goBackToClient();S.clientTab="follows";render();
  setTimeout(function(){if(S.undoMsg){S.undoMsg="";S.undoFollow=null;render();}},10000);
}
function undoDelete(){if(!S.undoFollow||S.undoCI===null)return;S.clients[S.undoCI].follows.splice(S.undoFollowIdx,0,S.undoFollow);saveState();S.undoFollow=null;S.undoFollowIdx=null;S.undoCI=null;S.undoMsg="";render();}
function clearUndo(){S.undoMsg="";S.undoFollow=null;S.undoCI=null;render();}
function saveContact(){var sum=document.getElementById("cs").value.trim();if(!sum){alert("Adicione um resumo do contato.");return;}var ct={id:uid(),type:document.getElementById("ct").value,date:document.getElementById("cd").value,impact:document.getElementById("ci").value,summary:sum};var c=S.clients[S.sel];if(!c.contacts)c.contacts=[];c.contacts.push(ct);saveState();addAdminLog('contact_added',Object.assign(logClient(c),{contactType:ct.type,impact:ct.impact}));S.modal=null;S.genText="";render();}
function delContact(ci,i){if(!confirm("Remover este contato?"))return;S.clients[ci].contacts.splice(i,1);saveState();render();}
function saveKeyContact(){var name=document.getElementById("kn").value.trim();if(!name){alert("Informe o nome.");return;}var resp=document.getElementById("kresp")&&document.getElementById("kresp").checked;var kc={id:uid(),name:name,role:document.getElementById("kr").value.trim(),phone:document.getElementById("kp").value.trim(),email:document.getElementById("ke").value.trim(),responsible:!!resp};var c=S.clients[S.sel];if(!c.keyContacts)c.keyContacts=[];if(resp)c.keyContacts.forEach(function(k){k.responsible=false;});c.keyContacts.push(kc);saveState();S.modal=null;render();}
function delKeyContact(ci,i){if(!confirm("Remover este contato-chave?"))return;S.clients[ci].keyContacts.splice(i,1);saveState();render();}
function saveSettings(){S.apiKey=document.getElementById("sk").value.trim();localStorage.setItem("stays_api_key",S.apiKey);closeM();}
async function changeRole(uid,role){
  var target=S.allUsers.find(function(u){return u.uid===uid;});
  // A UI já esconde o seletor, mas a regra tem que valer aqui também.
  if(!canEditUserRole(target)){await loadAllUsers();render();return;}
  if(!iAmAdminLike()){
    if(role==='admin'||(target&&target.role==='admin')){alert('Só o administrador pode definir ou alterar contas de Admin.');await loadAllUsers();render();return;}
  }
  var oldRole=target&&target.role;
  try{await saveUserProfile(uid,{role:role});}
  catch(err){alert('Não foi possível alterar a função: '+err.message);await loadAllUsers();render();return;}
  addAdminLog(oldRole==='pending'?'user_approved':'user_role_changed',{targetName:target&&target.name,targetEmail:target&&target.email,oldRole:oldRole,newRole:role});
  await loadAllUsers();render();
}
async function setResponsibleLeader(analystUid,newLeaderUid){
  var _an=S.allUsers.find(function(u){return u.uid===analystUid;});
  if(!canEditUserRole(_an)){await loadAllUsers();render();return;}
  // Só quem tem a função Líder (ou Admin) pode ser líder responsável.
  if(newLeaderUid&&!leaderUsers().some(function(x){return x.uid===newLeaderUid;})){await loadAllUsers();render();return;}
  var _nl=newLeaderUid?S.allUsers.find(function(u){return u.uid===newLeaderUid;}):null;
  addAdminLog('leader_assigned',{targetName:_an&&_an.name,leaderName:_nl?_nl.name:'(sem líder)'});
  var oldLeader=S.allUsers.find(function(u){return(u.role==="leader"||u.role==="admin")&&(u.managedUsers||[]).indexOf(analystUid)>=0;});
  try{
    if(oldLeader&&oldLeader.uid!==newLeaderUid){
      var pulled=(oldLeader.managedUsers||[]).filter(function(id){return id!==analystUid;});
      await saveUserProfile(oldLeader.uid,{managedUsers:pulled});
    }
    if(newLeaderUid){
      var newLeader=S.allUsers.find(function(u){return u.uid===newLeaderUid;});
      var pushed=(newLeader&&newLeader.managedUsers)||[];
      if(pushed.indexOf(analystUid)<0)pushed=pushed.concat([analystUid]);
      await saveUserProfile(newLeaderUid,{managedUsers:pushed});
    }
  }catch(err){alert('Não foi possível alterar o supervisor responsável: '+err.message);}
  await loadAllUsers();
  render();
}
// Mesma mecanica do supervisor, um nivel acima: o gerente guarda os supervisores dele.
async function setResponsibleGerente(supUid,newGerenteUid){
  var sup=S.allUsers.find(function(u){return u.uid===supUid;});
  if(!canEditUserRole(sup)){await loadAllUsers();render();return;}
  if(newGerenteUid&&!gerenteUsers().some(function(x){return x.uid===newGerenteUid;})){await loadAllUsers();render();return;}
  var novo=newGerenteUid?S.allUsers.find(function(u){return u.uid===newGerenteUid;}):null;
  addAdminLog('gerente_assigned',{targetName:sup&&sup.name,leaderName:novo?novo.name:'(sem gerente)'});
  var antigo=gerenteOfSupervisor(supUid);
  try{
    if(antigo&&antigo.uid!==newGerenteUid){
      await saveUserProfile(antigo.uid,{managedUsers:(antigo.managedUsers||[]).filter(function(id){return id!==supUid;})});
    }
    if(newGerenteUid&&novo){
      var lista=(novo.managedUsers||[]).slice();
      if(lista.indexOf(supUid)<0)lista.push(supUid);
      await saveUserProfile(newGerenteUid,{managedUsers:lista});
    }
  }catch(err){alert('Não foi possível alterar o gerente responsável: '+err.message);}
  await loadAllUsers();
  render();
}
// ============================================================
// PERGUNTAS CUSTOMIZADAS (analista cria/reordena, líder aprova)
// ============================================================
var CUSTOM_Q_CATS=[{key:'',label:'Só informativa (sem score)'},{key:'crescimento',label:'Crescimento'},{key:'digital',label:'Digital'},{key:'distribuicao',label:'Distribuição'},{key:'financeiro',label:'Financeiro'},{key:'risco',label:'Risco'},{key:'engajamento',label:'Engajamento'}];
function customQCatLabel(key){var f=CUSTOM_Q_CATS.find(function(c){return c.key===(key||'');});return f?f.label:'Informativa';}
function getMyApprovedCustomQuestions(uid,type){
  return (S.customQuestions||[]).filter(function(q){
    return q.status==='approved'&&(q.sharedWith||[]).indexOf(uid)>=0&&(q.appliesTo==='both'||q.appliesTo===type);
  });
}
function getWizOrder(type){
  var base=(type==='recurring'?WIZ_STEPS_REC:WIZ_STEPS_FIRST).slice();
  var customs=getMyApprovedCustomQuestions(S.appUser.uid,type);
  var customKeys=customs.map(function(q){return'custom_'+q.id;});
  var all=base.concat(customKeys);
  var savedKey=type==='recurring'?'wizStepOrderRec':'wizStepOrderFirst';
  var saved=S.appUser[savedKey]||[];
  var ordered=saved.filter(function(k){return all.indexOf(k)>=0;});
  all.forEach(function(k){
    if(ordered.indexOf(k)>=0)return;
    if(k.indexOf('custom_')===0){
      var q=customs.find(function(x){return('custom_'+x.id)===k;});
      var pos=q&&q.desiredPosition;
      if(pos!==undefined&&pos!==null&&pos>=1)ordered.splice(Math.min(pos-1,ordered.length),0,k);
      else ordered.push(k);
    }else{
      ordered.push(k);
    }
  });
  return ordered;
}
function saveWizOrderList(type,list){
  var savedKey=type==='recurring'?'wizStepOrderRec':'wizStepOrderFirst';
  S.appUser[savedKey]=list;
  var patch={};patch[savedKey]=list;
  saveUserProfile(S.appUser.uid,patch);
}
function wizOrderLabel(k){
  if(k.indexOf('custom_')===0){var q=(S.customQuestions||[]).find(function(x){return x.id===k.slice(7);});return q?q.text:k;}
  return wizStepLabels()[k]||k;
}
function getStepHumorKey(k){
  if(k.indexOf('custom_')===0){var q=(S.customQuestions||[]).find(function(x){return x.id===k.slice(7);});return(q&&q.category)?k:null;}
  return STEP_HUMOR_KEY[k];
}
function customStepsFromAnswers(a){return Object.keys((a&&a.custom)||{}).map(function(qid){return'custom_'+qid;});}
function wizOrderDragStart(ev,type,idx){S.wizOrderDrag={type:type,idx:idx};if(ev.dataTransfer){ev.dataTransfer.effectAllowed='move';try{ev.dataTransfer.setData('text/plain',String(idx));}catch(e){}}}
function wizOrderDragOver(ev){ev.preventDefault();}
function qBuilderInit(){S.qBuilder={text:'',appliesTo:'both',category:'',position:'',answers:[{label:'',humor:null},{label:'',humor:null}]};}
function qBuilderSetField(field,val){if(!S.qBuilder)qBuilderInit();S.qBuilder[field]=val;if(field!=='text'&&field!=='position')render();}
function qBuilderAddAnswer(){if(!S.qBuilder)qBuilderInit();S.qBuilder.answers.push({label:'',humor:null});render();}
function qBuilderRemoveAnswer(idx){if(!S.qBuilder)return;S.qBuilder.answers.splice(idx,1);render();}
function qBuilderSetAnswer(idx,field,val){if(!S.qBuilder)return;S.qBuilder.answers[idx][field]=val;if(field!=='label')render();}
async function qBuilderSubmit(){
  var qb=S.qBuilder;
  if(!qb||!qb.text.trim()){alert('Escreva o texto da pergunta.');return;}
  var validAnswers=qb.answers.filter(function(a){return a.label.trim();});
  if(validAnswers.length<2){alert('Adicione pelo menos 2 respostas.');return;}
  if(qb.category&&validAnswers.some(function(a){return a.humor===null||a.humor===undefined;})){alert('Defina o humor de cada resposta, ou deixe a categoria em branco pra ficar informativa.');return;}
  var posNum=qb.position?parseInt(qb.position):null;
  var doc={text:qb.text.trim(),category:qb.category||null,appliesTo:qb.appliesTo,desiredPosition:(posNum&&posNum>=1)?posNum:null,answers:validAnswers.map(function(a){return{label:a.label.trim(),humor:qb.category?a.humor:null};}),createdBy:S.appUser.uid,createdByName:S.appUser.name,status:'pending',sharedWith:[S.appUser.uid],createdAt:new Date().toISOString()};
  try{
    await db.collection('custom_questions').add(doc);
    await loadCustomQuestions();
    qBuilderInit();
    render();
  }catch(e){console.error(e);alert('Erro ao enviar pergunta para aprovação: '+(e.code||'')+' '+(e.message||e));}
}
function wizOrderBadge(k){
  if(k.indexOf('custom_')===0){
    var q=(S.customQuestions||[]).find(function(x){return x.id===k.slice(7);});
    if(!q)return'';
    var mandLbl=q.mandatory?'<span class="badge b-risk">Obrigatória</span>':'<span class="badge b-na">Opcional</span>';
    return'<span class="badge b-blue">'+e(customQCatLabel(q.category))+'</span> '+mandLbl;
  }
  return'<span class="badge b-risk">Obrigatória</span>';
}
function toggleQBuilderOpen(){S.qBuilderOpen=!S.qBuilderOpen;if(S.qBuilderOpen&&!S.qBuilder)qBuilderInit();render();}
function settingsFollowQuestionsView(){
  var html='<div class="section-hdr" style="margin-top:0"><span>Nova pergunta customizada</span></div>';
  if(!S.qBuilderOpen){
    html+='<div class="card" style="padding:1.25rem;margin-bottom:1.5rem;display:flex;align-items:center;justify-content:space-between;gap:12px"><span style="font-size:13px;color:var(--t2)">Deseja adicionar uma nova pergunta ao seu fluxo de Follow-up?</span><button class="btn-primary" onclick="toggleQBuilderOpen()">+ Nova pergunta</button></div>';
  }else{
    if(!S.qBuilder)qBuilderInit();
    var qb=S.qBuilder;
    html+='<div class="card" style="padding:1.25rem;margin-bottom:1.5rem">';
    html+='<div class="form-row"><label class="form-lbl">Texto da pergunta</label><input id="qb-text" type="text" value="'+e(qb.text)+'" oninput="qBuilderSetField(\'text\',this.value)" placeholder="Ex: O cliente usa o app mobile?"></div>';
    html+='<div class="grid2"><div class="form-row"><label class="form-lbl">Aplica a</label><select onchange="qBuilderSetField(\'appliesTo\',this.value)"><option value="both"'+(qb.appliesTo==='both'?' selected':'')+'>Primeiro follow e Recorrente</option><option value="first"'+(qb.appliesTo==='first'?' selected':'')+'>Só Primeiro follow</option><option value="recurring"'+(qb.appliesTo==='recurring'?' selected':'')+'>Só Recorrente</option></select></div>';
    html+='<div class="form-row"><label class="form-lbl">Categoria de score</label><select onchange="qBuilderSetField(\'category\',this.value)">'+CUSTOM_Q_CATS.map(function(c){return'<option value="'+c.key+'"'+(qb.category===c.key?' selected':'')+'>'+c.label+'</option>';}).join('')+'</select></div></div>';
    var curFirstLen=getWizOrder('first').length,curRecLen=getWizOrder('recurring').length;
    html+='<div class="form-row"><label class="form-lbl">Posição desejada no fluxo <span style="color:var(--t3);font-weight:400">(opcional)</span></label><input type="number" min="1" style="width:120px" value="'+e(qb.position)+'" oninput="qBuilderSetField(\'position\',this.value)" placeholder="Ex: 10"><div style="font-size:11px;color:var(--t3);margin-top:4px">Hoje: '+curFirstLen+' perguntas no Primeiro follow e '+curRecLen+' no Recorrente. Se você preencher uma posição, quando a pergunta for aprovada ela entra ali e empurra as perguntas seguintes uma casa pra baixo — sem preencher, ela entra no fim do fluxo.</div></div>';
    html+='<div style="margin-top:.75rem"><label class="form-lbl">Respostas'+(qb.category?' (defina o humor de cada uma)':'')+'</label>';
    qb.answers.forEach(function(a,i){
      html+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><input type="text" style="flex:1" value="'+e(a.label)+'" placeholder="Resposta '+(i+1)+'" oninput="qBuilderSetAnswer('+i+',\'label\',this.value)">';
      if(qb.category){
        html+='<div style="display:flex;gap:3px">'+FKEYS.map(function(k,hi){var fc=FCOLORS[k];var isActive=a.humor===hi;return'<button type="button" title="'+FLABELS[hi]+'" style="background:'+fc.bg+';border:'+(isActive?'2px solid '+fc.bd:'1px solid transparent')+';border-radius:6px;padding:2px 4px;cursor:pointer" onclick="qBuilderSetAnswer('+i+',\'humor\','+hi+')">'+face(k,16)+'</button>';}).join('')+'</div>';
      }
      html+='<button class="btn btn-sm" onclick="qBuilderRemoveAnswer('+i+')">×</button></div>';
    });
    html+='<button class="btn btn-sm" onclick="qBuilderAddAnswer()">+ Adicionar resposta</button></div>';
    html+='<div style="margin-top:1rem;display:flex;justify-content:flex-end;gap:8px"><button class="btn btn-sm" onclick="toggleQBuilderOpen()">Cancelar</button><button class="btn-primary" onclick="qBuilderSubmit()">Enviar para aprovação</button></div>';
    html+='</div>';
  }
  var mine=(S.customQuestions||[]).filter(function(q){return q.createdBy===S.appUser.uid&&q.status!=='rejected';});
  html+='<div class="section-hdr"><span>Minhas perguntas ('+mine.length+')</span></div>';
  if(!mine.length){html+='<p class="muted" style="margin-bottom:1.5rem">Nenhuma pergunta customizada aprovada ou pendente ainda.</p>';}
  else{
    html+='<div class="card" style="padding:0;margin-bottom:1.5rem">';
    mine.forEach(function(q){
      var stBadge=q.status==='approved'?'<span class="badge b-ok">Aprovada</span>':'<span class="badge b-warn">Aguardando aprovação</span>';
      html+='<div class="user-row"><div style="flex:1"><div style="font-weight:500">'+e(q.text)+'</div><div class="muted" style="font-size:11px">'+customQCatLabel(q.category)+' · '+(q.appliesTo==='both'?'Primeiro e Recorrente':(q.appliesTo==='first'?'Só Primeiro':'Só Recorrente'))+'</div></div>'+stBadge+'</div>';
    });
    html+='</div>';
  }
  return html;
}
function saveWizOrderChanges(){
  saveWizOrderList('first',S.wizOrderDraft.first);
  saveWizOrderList('recurring',S.wizOrderDraft.recurring);
  S.wizOrderDirty=false;
  render();
}
function wizOrderDraftDrop(ev,type,idx){
  ev.preventDefault();
  if(!S.wizOrderDrag||S.wizOrderDrag.type!==type)return;
  var from=S.wizOrderDrag.idx;
  S.wizOrderDrag=null;
  if(from===idx)return;
  var list=S.wizOrderDraft[type];
  var moved=list.splice(from,1)[0];
  list.splice(idx,0,moved);
  S.wizOrderDirty=true;
  render();
}
function settingsFollowOrderView(){
  if(!S.wizOrderDraft)initWizOrderDraft();
  var type=S.wizOrderTab==='recurring'?'recurring':'first';
  var order=S.wizOrderDraft[type];
  var html='';
  if(S.wizOrderDirty){
    html+='<div class="alert alert-green" style="justify-content:space-between"><span>Você tem alterações não salvas na ordem.</span><button class="btn-save" onclick="saveWizOrderChanges()">Salvar alterações</button></div>';
  }
  html+='<div class="section-hdr" style="margin-top:0"><span>Ordem do follow</span></div>';
  html+='<p class="muted" style="font-size:12px;margin-bottom:.75rem">Escolha o fluxo e arraste pelas barrinhas para reordenar.</p>';
  html+='<div class="view-toggle" style="max-width:320px"><button class="vt-btn'+(type==='first'?' active':'')+'" onclick="S.wizOrderTab=\'first\';render()">Primeiro follow</button><button class="vt-btn'+(type==='recurring'?' active':'')+'" onclick="S.wizOrderTab=\'recurring\';render()">Follow recorrente</button></div>';
  html+='<div class="card" style="padding:.5rem 1.25rem;margin-top:.75rem">';
  order.forEach(function(k,idx){
    html+='<div draggable="true" ondragstart="wizOrderDragStart(event,\''+type+'\','+idx+')" ondragover="wizOrderDragOver(event)" ondrop="wizOrderDraftDrop(event,\''+type+'\','+idx+')" style="display:flex;align-items:center;gap:10px;padding:8px 4px;border-bottom:1px solid var(--bd);cursor:grab"><span style="color:var(--t3);font-size:14px;line-height:1;user-select:none">☰</span><span style="flex:1;font-size:13px">'+(idx+1)+'. '+e(wizOrderLabel(k))+'</span>'+wizOrderBadge(k)+'</div>';
  });
  html+='</div>';
  return html;
}
function settingsView(){
  var cats=[{key:'followup',title:'Follow up',desc:'Ordem das perguntas e criação de perguntas'},{key:'archived',title:'Arquivados',desc:'Clientes arquivados'}];
  cats.push({key:'adminlog',title:'Histórico de atividades',desc:'Quem fez o quê, e quando'});
  var chevron='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="flex-shrink:0"><polyline points="9 18 15 12 9 6"/></svg>';
  var html='<h1 style="font-size:20px;font-family:\'Roboto Slab\',serif;margin-bottom:1rem">Configurações</h1>';
  html+='<div class="settings-wrap">';
  html+='<div class="settings-col1">'+cats.map(function(c){
    return'<div class="settings-cat-row'+(S.settingsCat===c.key?' active':'')+'" onclick="selectSettingsCat(\''+c.key+'\')"><div><div class="settings-cat-title">'+c.title+'</div><div class="settings-cat-desc">'+c.desc+'</div></div>'+chevron+'</div>';
  }).join('')+'</div>';
  if(S.settingsCat==='followup'){
    var subs=[{key:'order',title:'Ordem do follow'},{key:'questions',title:'Perguntas do Follow'}];
    html+='<div class="settings-col2">'+subs.map(function(s){
      return'<div class="settings-sub-row'+(S.settingsSub===s.key?' active':'')+'" onclick="selectSettingsSub(\''+s.key+'\')"><div class="settings-cat-title">'+s.title+'</div>'+chevron+'</div>';
    }).join('')+'</div>';
  }
  html+='<div class="settings-col3">';
  if(S.settingsCat==='archived')html+=archivedView();
  else if(S.settingsCat==='adminlog')html+=adminLogView();
  else if(S.settingsCat==='followup'){
    if(S.settingsSub==='order')html+=settingsFollowOrderView();
    else if(S.settingsSub==='questions')html+=settingsFollowQuestionsView();
    else html+='<p class="muted">Selecione "Ordem do follow" ou "Perguntas do Follow" ao lado.</p>';
  }else{
    html+='<p class="muted">Selecione uma categoria ao lado.</p>';
  }
  html+='</div>';
  html+='</div>';
  return html;
}
function leaderMyQuestions(){
  var all=(S.customQuestions||[]).slice();
  if(iAmAdminLike())return all;
  var managed=S.appUser.managedUsers||[];
  return all.filter(function(q){return managed.indexOf(q.createdBy)>=0;});
}
function leaderRelevantAnalysts(){
  return iAmAdminLike()?S.allUsers.filter(function(u){return u.role==='analyst';}):S.allUsers.filter(function(u){return(S.appUser.managedUsers||[]).indexOf(u.uid)>=0;});
}
function leaderStartEdit(qid){
  if(S.leaderEditDraft&&S.leaderEditDraft.qid===qid){S.leaderEditDraft=null;render();return;}
  var q=(S.customQuestions||[]).find(function(x){return x.id===qid;});
  if(!q)return;
  S.leaderEditDraft={qid:qid,text:q.text,answers:q.answers.map(function(a){return{label:a.label,humor:a.humor};}),shareWith:(q.sharedWith||[]).slice(),mandatory:!!q.mandatory};
  render();
}
function leaderCancelEdit(){S.leaderEditDraft=null;render();}
function leaderSetEditMandatory(val){if(!S.leaderEditDraft)return;S.leaderEditDraft.mandatory=val;render();}
function leaderSetEditText(val){if(!S.leaderEditDraft)return;S.leaderEditDraft.text=val;}
function leaderSetEditAnswerLabel(idx,val){if(!S.leaderEditDraft)return;S.leaderEditDraft.answers[idx].label=val;}
function leaderSetEditAnswerHumor(idx,humor){if(!S.leaderEditDraft)return;S.leaderEditDraft.answers[idx].humor=humor;render();}
function leaderAddEditAnswer(){if(!S.leaderEditDraft)return;S.leaderEditDraft.answers.push({label:'',humor:null});render();}
function leaderRemoveEditAnswer(idx){if(!S.leaderEditDraft)return;S.leaderEditDraft.answers.splice(idx,1);render();}
function leaderToggleShare(uid){
  if(!S.leaderEditDraft)return;
  var i=S.leaderEditDraft.shareWith.indexOf(uid);
  if(i>=0)S.leaderEditDraft.shareWith.splice(i,1);else S.leaderEditDraft.shareWith.push(uid);
  render();
}
function validateLeaderDraft(q,draft){
  if(!draft.text.trim())return'Escreva o texto da pergunta.';
  var validAnswers=draft.answers.filter(function(a){return a.label.trim();});
  if(validAnswers.length<2)return'Mantenha pelo menos 2 respostas.';
  if(q.category&&validAnswers.some(function(a){return a.humor===null||a.humor===undefined;}))return'Defina o humor de todas as respostas.';
  return null;
}
async function leaderSaveEdits(qid){
  var draft=S.leaderEditDraft;if(!draft||draft.qid!==qid)return;
  var q=(S.customQuestions||[]).find(function(x){return x.id===qid;});
  if(!q)return;
  var err=validateLeaderDraft(q,draft);if(err){alert(err);return;}
  var validAnswers=draft.answers.filter(function(a){return a.label.trim();});
  var forcedMandatory=q.category?true:!!draft.mandatory;
  var forcedShareWith=q.category?leaderRelevantAnalysts().map(function(u){return u.uid;}):draft.shareWith.slice();
  try{
    await db.collection('custom_questions').doc(qid).update({text:draft.text.trim(),answers:validAnswers.map(function(a){return{label:a.label.trim(),humor:q.category?a.humor:null};}),sharedWith:forcedShareWith,mandatory:forcedMandatory});
    S.leaderEditDraft=null;
    await loadCustomQuestions();
    render();
  }catch(e){console.error(e);alert('Erro ao salvar alterações: '+(e.code||'')+' '+(e.message||e));}
}
async function leaderApproveQuestion(qid){
  var draft=S.leaderEditDraft;
  if(!draft||draft.qid!==qid){alert('Abra a pergunta pra revisar antes de aprovar.');return;}
  var q=(S.customQuestions||[]).find(function(x){return x.id===qid;});
  if(!q)return;
  var err=validateLeaderDraft(q,draft);if(err){alert(err);return;}
  var validAnswers=draft.answers.filter(function(a){return a.label.trim();});
  var forcedMandatory=q.category?true:!!draft.mandatory;
  var forcedShareWith=q.category?leaderRelevantAnalysts().map(function(u){return u.uid;}):draft.shareWith.slice();
  try{
    await db.collection('custom_questions').doc(qid).update({status:'approved',text:draft.text.trim(),answers:validAnswers.map(function(a){return{label:a.label.trim(),humor:q.category?a.humor:null};}),sharedWith:forcedShareWith,mandatory:forcedMandatory,approvedBy:S.appUser.uid,approvedByName:S.appUser.name,approvedAt:new Date().toISOString()});
    addAdminLog('question_approved',{questionText:draft.text.trim(),questionId:qid,createdByName:q.createdByName,by:S.appUser.name,at:new Date().toLocaleDateString('pt-BR')});
    S.leaderEditDraft=null;
    await loadCustomQuestions();
    render();
  }catch(e){console.error(e);alert('Erro ao aprovar: '+(e.code||'')+' '+(e.message||e));}
}
async function leaderRejectQuestion(qid){
  var q=(S.customQuestions||[]).find(function(x){return x.id===qid;});
  if(!q)return;
  if(!confirm('Rejeitar a pergunta "'+q.text+'"?'))return;
  try{
    await db.collection('custom_questions').doc(qid).update({status:'rejected',approvedBy:S.appUser.uid,approvedByName:S.appUser.name,approvedAt:new Date().toISOString()});
    addAdminLog('question_rejected',{questionText:q.text,questionId:qid,createdByName:q.createdByName,by:S.appUser.name,at:new Date().toLocaleDateString('pt-BR')});
    if(S.leaderEditDraft&&S.leaderEditDraft.qid===qid)S.leaderEditDraft=null;
    await loadCustomQuestions();
    render();
  }catch(e){console.error(e);alert('Erro ao rejeitar: '+(e.code||'')+' '+(e.message||e));}
}
async function leaderDeleteQuestion(qid){
  var q=(S.customQuestions||[]).find(function(x){return x.id===qid;});
  if(!q)return;
  if(!confirm('Excluir definitivamente a pergunta "'+q.text+'"? Isso não pode ser desfeito.'))return;
  try{
    await db.collection('custom_questions').doc(qid).delete();
    if(S.leaderEditDraft&&S.leaderEditDraft.qid===qid)S.leaderEditDraft=null;
    await loadCustomQuestions();
    render();
  }catch(e){console.error(e);alert('Erro ao excluir: '+(e.code||'')+' '+(e.message||e));}
}
// ============================================================
// PAINEL DE LIDER — helpers de filtro e agrupamento
// ============================================================
function jsq(s){return e(String(s||"")).replace(/'/g,"\\'");}
function lpTeamGroups(){
  var isAdminRole=iAmAdminLike();
  var byA={};
  S.clients.forEach(function(c){var o=c.ownerId||"?";if(!byA[o])byA[o]=[];byA[o].push(c);});
  // Gerente enxerga a carteira pelos supervisores dele; supervisor, pelos analistas dele.
  var analystUids=isAdminRole?Object.keys(byA)
    :(S.appUser.role==='gerente'?analystsOfGerente(S.appUser.uid):(S.appUser.managedUsers||[]));
  var out={};analystUids.forEach(function(uid){if(byA[uid])out[uid]=byA[uid];});
  return out;
}
function lpFlatten(byA){var out=[];Object.keys(byA).forEach(function(k){out=out.concat(byA[k]);});return out;}
function lpFilteredClients(clients){
  var f=S.lpFilters;
  var q=(S.lpSearch||'').trim().toLowerCase();
  return clients.filter(function(c){
    if(f.cat.length&&f.cat.indexOf(c.categoria)<0)return false;
    if(f.plan.length&&f.plan.indexOf(c.plan)<0)return false;
    if(f.country.length&&f.country.indexOf(c.clientCountry)<0)return false;
    if(f.city.length&&f.city.indexOf(c.clientCity)<0)return false;
    if(q){var slug=(c.slug||c.name||'').toLowerCase();if(slug.indexOf(q)!==0)return false;}
    return true;
  });
}
function lpSetSearch(v){
  S.lpSearch=v;S.lpPage={};
  var el=document.getElementById('lp-search-input');
  var sel=el?[el.selectionStart,el.selectionEnd]:null;
  render();
  var el2=document.getElementById('lp-search-input');
  if(el2){el2.focus();if(sel)el2.setSelectionRange(sel[0],sel[1]);}
}
function lpSetPageSize(mode,size){S.lpPageSize[mode]=size;S.lpPage={};S.lpOpenPop=null;render();}
function lpGoPage(oid,delta,maxPage){var cur=(S.lpPage[oid]||0)+delta;if(cur<0)cur=0;if(cur>maxPage)cur=maxPage;S.lpPage[oid]=cur;render();}
function lpPageSizeControl(){
  var mode=S.lpViewMode==='cards'?'cards':'list';
  var options=mode==='cards'?[10,25,50]:[20,50,100,150];
  var cur=S.lpPageSize[mode];
  var open=S.lpOpenPop==='pagesize';
  return'<div style="display:flex;justify-content:center;margin-top:14px">'
    +'<div class="lp-info-card" style="max-width:180px;text-align:center" onclick="lpTogglePop(\'pagesize\')">'
    +'<div class="lp-info-val">Limite por tela: '+cur+'</div>'
    +(open?'<div class="lp-pop" style="left:50%;transform:translateX(-50%);min-width:120px">'+options.map(function(n){return'<div style="padding:6px 14px;cursor:pointer;font-size:13px;text-align:center;'+(n===cur?'font-weight:700;color:var(--b600)':'')+'" onclick="lpSetPageSize(\''+mode+'\','+n+')">'+n+'</div>';}).join('')+'</div>':'')
    +'</div></div>';
}
function lpTogglePop(type){
  var willOpen=S.lpOpenPop!==type;
  S.lpOpenPop=willOpen?type:null;
  if(willOpen&&type==='period')S.lpPeriodDraft=null;
  render();
  if(willOpen)lpArmOutsideClose();
}
// Fecha o popover ao clicar em qualquer lugar fora dele. Captura na fase de
// captura pra funcionar mesmo com o stopPropagation que o conteúdo interno usa.
function lpArmOutsideClose(){
  setTimeout(function(){
    function h(ev){
      if(S.lpOpenPop&&ev.target.closest&&ev.target.closest('.lp-pop'))return; // clique dentro: mantém aberto
      document.removeEventListener('click',h,true);
      if(S.lpOpenPop){S.lpOpenPop=null;render();}
    }
    document.addEventListener('click',h,true);
  },0);
}
function lpClosePop(){S.lpOpenPop=null;render();}
function lpToggleFilterVal(type,val){var arr=S.lpFilters[type];var i=arr.indexOf(val);if(i>=0)arr.splice(i,1);else arr.push(val);render();}
function lpClearFilter(type){S.lpFilters[type]=[];if(type==='country')S.lpFilters.city=[];render();}
function lpSetMrrSort(dir){S.lpMrrSort=(S.lpMrrSort===dir)?null:dir;render();}
function lpToggleSection(key){S.lpOpen[key]=!S.lpOpen[key];render();}
function lpFilterPopover(type,options,labelFn){
  if(!options.length)return'<div class="lp-pop" onclick="event.stopPropagation()"><p class="muted" style="font-size:12px;margin:0">Nenhuma opção disponível.</p><div class="lp-pop-ftr"><span></span><button class="btn btn-sm" onclick="lpClosePop()">Fechar</button></div></div>';
  var sel=S.lpFilters[type];
  var html='<div class="lp-pop" onclick="event.stopPropagation()">';
  html+=options.map(function(v){var checked=sel.indexOf(v)>=0;return'<label><input type="checkbox" '+(checked?'checked':'')+' onchange="lpToggleFilterVal(\''+type+'\',\''+jsq(v)+'\')">'+e(labelFn?labelFn(v):v)+'</label>';}).join('');
  html+='<div class="lp-pop-ftr"><button class="btn btn-sm" onclick="lpClearFilter(\''+type+'\')">Limpar</button><button class="btn btn-sm" onclick="lpClosePop()">Fechar</button></div>';
  html+='</div>';
  return html;
}
function lpLocationPopover(teamClients){
  var countries=Array.from(new Set(teamClients.map(function(c){return c.clientCountry;}).filter(Boolean))).sort();
  var selCountries=S.lpFilters.country;
  var cityPool=teamClients.filter(function(c){return selCountries.length&&selCountries.indexOf(c.clientCountry)>=0;});
  var cities=Array.from(new Set(cityPool.map(function(c){return c.clientCity;}).filter(Boolean))).sort();
  var selCities=S.lpFilters.city;
  var html='<div class="lp-pop" onclick="event.stopPropagation()">';
  html+='<div class="lp-pop-sub" style="margin-top:0;border-top:none;padding-top:0">Países</div>';
  html+=countries.length?countries.map(function(v){var checked=selCountries.indexOf(v)>=0;return'<label><input type="checkbox" '+(checked?'checked':'')+' onchange="lpToggleFilterVal(\'country\',\''+jsq(v)+'\')">'+e(v)+'</label>';}).join(''):'<p class="muted" style="font-size:11px;margin:2px 0">Nenhum país cadastrado.</p>';
  html+='<div class="lp-pop-sub">Cidades'+(selCountries.length?'':' <span style="font-weight:400;text-transform:none">(selecione um país)</span>')+'</div>';
  html+=cities.length?cities.map(function(v){var checked=selCities.indexOf(v)>=0;return'<label><input type="checkbox" '+(checked?'checked':'')+' onchange="lpToggleFilterVal(\'city\',\''+jsq(v)+'\')">'+e(v)+'</label>';}).join(''):'<p class="muted" style="font-size:11px;margin:2px 0">Nenhuma cidade disponível.</p>';
  html+='<div class="lp-pop-ftr"><button class="btn btn-sm" onclick="lpClearFilter(\'country\')">Limpar</button><button class="btn btn-sm" onclick="lpClosePop()">Fechar</button></div>';
  html+='</div>';
  return html;
}
function lpMrrPopover(){
  var d=S.lpMrrSort;
  return'<div class="lp-pop" onclick="event.stopPropagation()" style="min-width:180px">'
    +'<label><input type="radio" name="lpmrr" '+(d==='desc'?'checked':'')+' onchange="lpSetMrrSort(\'desc\')"> Maior para menor</label>'
    +'<label><input type="radio" name="lpmrr" '+(d==='asc'?'checked':'')+' onchange="lpSetMrrSort(\'asc\')"> Menor para maior</label>'
    +'<div class="lp-pop-ftr"><button class="btn btn-sm" onclick="S.lpMrrSort=null;render()">Limpar</button><button class="btn btn-sm" onclick="lpClosePop()">Fechar</button></div>'
    +'</div>';
}
function leaderQuestionsBody(mine){
  if(!mine.length)return'<p class="muted" style="margin:0">Nenhuma pergunta customizada dos seus analistas ainda.</p>';
  var relevantAnalysts=leaderRelevantAnalysts();
  var html='';
  mine.forEach(function(q){
    var creator=S.allUsers.find(function(u){return u.uid===q.createdBy;});
    var isOpen=S.leaderEditDraft&&S.leaderEditDraft.qid===q.id;
    var stBadge=q.status==='approved'?'<span class="badge b-ok">Aprovada</span>':(q.status==='rejected'?'<span class="badge b-risk">Rejeitada</span>':'<span class="badge b-warn">Aguardando aprovação</span>');
    html+='<div class="card" style="padding:1.25rem;margin-bottom:1rem">';
    html+='<div style="display:flex;align-items:center;justify-content:space-between;gap:12px"><div><div style="font-weight:600;font-size:14px">'+e(q.text)+' '+stBadge+'</div><div class="muted" style="font-size:11px;margin-top:2px">Proposta por '+e((creator&&creator.name)||q.createdByName||'?')+' · '+customQCatLabel(q.category)+' · '+(q.appliesTo==='both'?'Primeiro e Recorrente':(q.appliesTo==='first'?'Só Primeiro':'Só Recorrente'))+'</div></div><button class="btn btn-sm" onclick="leaderStartEdit(\''+q.id+'\')">'+(isOpen?'Fechar':'Editar')+'</button></div>';
    if(isOpen){
      var draft=S.leaderEditDraft;
      html+='<div style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--bd)">';
      html+='<div class="form-row"><label class="form-lbl">Texto da pergunta</label><input type="text" value="'+e(draft.text)+'" oninput="leaderSetEditText(this.value)"></div>';
      html+='<div style="font-size:12px;font-weight:600;color:var(--t2);margin:.75rem 0 .5rem">Respostas'+(q.category?' — confirme o humor de cada uma':'')+'</div>';
      draft.answers.forEach(function(a,i){
        html+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><input type="text" style="flex:1" value="'+e(a.label)+'" oninput="leaderSetEditAnswerLabel('+i+',this.value)">';
        if(q.category){
          html+='<div style="display:flex;gap:3px">'+FKEYS.map(function(k,hi){var fc=FCOLORS[k];var isActive=a.humor===hi;return'<button type="button" title="'+FLABELS[hi]+'" style="background:'+fc.bg+';border:'+(isActive?'2px solid '+fc.bd:'1px solid transparent')+';border-radius:6px;padding:2px 4px;cursor:pointer" onclick="leaderSetEditAnswerHumor('+i+','+hi+')">'+face(k,16)+'</button>';}).join('')+'</div>';
        }
        html+='<button class="btn btn-sm" onclick="leaderRemoveEditAnswer('+i+')">×</button></div>';
      });
      html+='<button class="btn btn-sm" onclick="leaderAddEditAnswer()">+ Adicionar resposta</button>';
      if(q.category){
        html+='<div class="alert alert-amber" style="margin-top:.75rem">Essa pergunta impacta uma categoria de score, então é sempre <strong>obrigatória</strong> e compartilhada com <strong>todos os seus analistas</strong> — pra manter o score comparável entre todo mundo. Sem opção de restringir isso aqui.</div>';
      }else{
        html+='<div style="margin-top:.75rem"><div style="font-size:12px;font-weight:600;color:var(--t2);margin-bottom:.5rem">Obrigatória para os analistas? <span class="muted" style="font-weight:400">(só o supervisor define isso)</span></div><div class="wiz-opts" style="max-width:320px"><div class="wiz-opt'+(!draft.mandatory?' sel':'')+'" onclick="leaderSetEditMandatory(false)"><span class="wiz-opt-lbl">Opcional</span></div><div class="wiz-opt'+(draft.mandatory?' sel':'')+'" onclick="leaderSetEditMandatory(true)"><span class="wiz-opt-lbl">Obrigatória</span></div></div></div>';
        if(relevantAnalysts.length){
          html+='<div style="margin-top:.75rem"><div style="font-size:12px;font-weight:600;color:var(--t2);margin-bottom:.5rem">Compartilhar com</div>';
          relevantAnalysts.forEach(function(u){
            var checked=draft.shareWith.indexOf(u.uid)>=0;
            html+='<label style="display:flex;align-items:center;gap:6px;font-size:13px;margin-bottom:4px;cursor:pointer"><input type="checkbox" '+(checked?'checked':'')+' onchange="leaderToggleShare(\''+u.uid+'\')">'+e(u.name)+(u.uid===q.createdBy?' <span class="muted" style="font-size:11px">(solicitou)</span>':'')+'</label>';
          });
          html+='</div>';
        }
      }
      html+='<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:1rem;flex-wrap:wrap">';
      html+='<button class="btn btn-sm btn-danger" onclick="leaderDeleteQuestion(\''+q.id+'\')" title="Exclui permanentemente, só pra limpeza">'+svgIcon('trash',13)+' Excluir</button>';
      html+='<button class="btn btn-sm" onclick="leaderCancelEdit()">Cancelar</button>';
      if(q.status!=='rejected')html+='<button class="btn btn-sm btn-danger" onclick="leaderRejectQuestion(\''+q.id+'\')">Rejeitar</button>';
      html+='<button class="btn btn-sm" onclick="leaderSaveEdits(\''+q.id+'\')">Salvar alterações</button>';
      if(q.status!=='approved')html+='<button class="btn-primary" onclick="leaderApproveQuestion(\''+q.id+'\')">Aprovar</button>';
      html+='</div>';
      html+='</div>';
    }
    html+='</div>';
  });
  return html;
}
// ============================================================
// PAINEL DO LIDER — trilho de contexto a esquerda, time a direita
// ============================================================
// Periodo: o score do time e calculado no fim do intervalo escolhido, e a
// tendencia compara com o inicio dele. "Ultimos 7 dias" numa reuniao semanal,
// "ultimo mes" no fechamento, "ultimo ano" na reuniao anual.
// ── Seletor de período reutilizável ──
// Cada card tem o seu (o score é um, a cobertura é outro): mudar o período de um
// não mexe no outro. Todos usam este mesmo mecanismo, então o comportamento e o
// visual são iguais em qualquer calendário do dashboard.
var LP_PERIODS=[
  {key:'mes',label:'Mês atual',mes:true},
  {key:'7d',label:'Últimos 7 dias',days:7},
  {key:'30d',label:'Último mês',days:30},
  {key:'12m',label:'Último ano',days:365}
];
var PERIOD_DEFAULTS={score:'30d',cov:'mes'};
function periodState(id){
  if(!S.periods)S.periods={};
  if(!S.periods[id])S.periods[id]={key:PERIOD_DEFAULTS[id]||'30d'};
  return S.periods[id];
}
function periodDef(id){
  var p=periodState(id);
  return LP_PERIODS.find(function(x){return x.key===p.key;})||LP_PERIODS[2];
}
function isoDate(x){var m=x.getMonth()+1,dd=x.getDate();return x.getFullYear()+'-'+(m<10?'0':'')+m+'-'+(dd<10?'0':'')+dd;}
function periodRange(id){
  var p=periodState(id);
  if(p.key==='custom'&&p.from&&p.to){
    var dias=Math.max(1,Math.round((new Date(p.to)-new Date(p.from))/86400000));
    var curto=function(v){var x=formatDate(v);return x.slice(0,6)+x.slice(8);};
    return{fromISO:p.from,toISO:p.to,days:dias,label:curto(p.from)+' – '+curto(p.to),labelLong:formatDate(p.from)+' a '+formatDate(p.to)};
  }
  var d=periodDef(id);
  var to=new Date();
  if(d.mes){
    var ini=new Date(to.getFullYear(),to.getMonth(),1);
    return{fromISO:isoDate(ini),toISO:isoDate(to),days:Math.round((to-ini)/86400000)+1,label:d.label};
  }
  var from=new Date(to.getTime()-d.days*86400000);
  return{fromISO:isoDate(from),toISO:isoDate(to),days:d.days,label:d.label};
}
function periodMonths(id){
  var r=periodRange(id);
  var fromM=r.fromISO.slice(0,7),toM=r.toISO.slice(0,7);
  return TEAM_MONTHS.filter(function(m){return m>=fromM&&m<=toM;});
}
function setPeriodPreset(id,k){periodState(id);S.periods[id]={key:k};S.lpOpenPop=null;S.periodDraft=null;render();}
// O rascunho já nasce com as datas que aparecem na tela. Sem isso, clicar em
// "Aplicar" sem tocar nos campos falhava dizendo que nada foi escolhido.
function periodDraft(id){
  var r=periodRange(id);
  var d=(S.periodDraft&&S.periodDraft.id===id)?S.periodDraft:null;
  return{from:(d&&d.from)||r.fromISO,to:(d&&d.to)||r.toISO};
}
function setPeriodDraftPart(id,field,val){
  if(!S.periodDraft||S.periodDraft.id!==id){var b=periodDraft(id);S.periodDraft={id:id,from:b.from,to:b.to};}
  S.periodDraft[field]=val;
  // Só redesenha quando a data está completa, senão o campo perde o foco no
  // meio da digitação do ano.
  var ok=function(v){return v&&/^\d{4}-\d{2}-\d{2}$/.test(v)&&+v.slice(0,4)>=1000;};
  if(ok(S.periodDraft.from)&&ok(S.periodDraft.to))render();
}
function applyCustomPeriod(id){
  var d=periodDraft(id);
  if(!d.from||!d.to){alert('Escolha a data inicial e a final.');return;}
  if(d.from>d.to){alert('A data inicial precisa ser anterior à final.');return;}
  periodState(id);
  S.periods[id]={key:'custom',from:d.from,to:d.to};
  S.periodDraft=null;S.lpOpenPop=null;render();
}
// Pílula + popover. A pílula tem largura fixa pra não empurrar nada quando o
// rótulo muda de "Último mês" pra uma data longa.
function periodPickerHTML(id,popKey){
  var r=periodRange(id);
  var open=S.lpOpenPop===popKey;
  var d=periodDraft(id);
  var html='<div class="lp-cal-wrap">';
  html+='<button class="lp-pill lp-cal-pill press'+(periodState(id).key==='custom'?' on':'')+'" onclick="lpTogglePop(\''+popKey+'\')" title="'+e(r.labelLong||r.label)+'">'
    +svgIcon('calendar',13)+'<span class="lp-cal-lbl">'+e(r.label)+'</span><span class="lp-cal-caret">▾</span></button>';
  if(open){
    html+='<div class="lp-pop lp-cal-pop glass" onclick="event.stopPropagation()">';
    LP_PERIODS.forEach(function(p){
      html+='<button class="lp-pop-item'+(periodState(id).key===p.key?' on':'')+'" onclick="setPeriodPreset(\''+id+'\',\''+p.key+'\')">'+e(p.label)+'</button>';
    });
    html+='<div class="lp-pop-sep">Período personalizado</div>';
    html+='<div class="lp-cal-dates">'
      +'<label><span>De</span><input type="date" value="'+e(d.from)+'" oninput="setPeriodDraftPart(\''+id+'\',\'from\',this.value)"></label>'
      +'<label><span>Até</span><input type="date" value="'+e(d.to)+'" oninput="setPeriodDraftPart(\''+id+'\',\'to\',this.value)"></label></div>';
    html+='<button class="lp-pop-apply press" onclick="applyCustomPeriod(\''+id+'\')">Aplicar período</button>';
    html+='</div>';
  }
  html+='</div>';
  return html;
}
// Compatibilidade: o resto do painel continua chamando estes nomes.
function lpPeriod(){return periodState('score');}
function lpPeriodDef(){return periodDef('score');}
function lpPeriodRange(){return periodRange('score');}
function lpPeriodMonths(){return periodMonths('score');}
function lpSetPeriod(k){setPeriodPreset('score',k);}
// Os analistas do time, no formato da planilha (pra somar meta/churn so deles).
function lpTeamGoalRows(){
  var out=[];
  Object.keys(lpTeamGroups()).forEach(function(uid){
    var u=(S.allUsers||[]).find(function(x){return x.uid===uid;});
    var row=u?tdForUser(u):null;
    if(row&&out.indexOf(row)<0)out.push(row);
  });
  return out;
}
function lpSetBand(b){S.lpBand=(S.lpBand===b?'':b);S.lpPage={};render();}
function lpClearBand(){S.lpBand='';render();}
function lpToggleChurnBig(){if(S.lpChurnBig){lpCloseChurnBig();return;}S.lpChurnBig=true;render();}
function lpCloseChurnBig(){dismissOverlay(function(){S.lpChurnBig=false;render();});}
function lpOpenQueue(k){S.lpQueue=(!k||S.lpQueue===k)?null:k;render();}
function lpCloseQueue(){S.lpQueue=null;render();}

// ── Trilho: Score de CS do time ──
function lpScoreCard(teamClients){
  var r=lpPeriodRange();
  var now=teamScoreAt(teamClients,r.toISO);
  var before=teamScoreAt(teamClients,r.fromISO);
  var delta=(now!==null&&before!==null)?now-before:null;
  var band=now===null?'na':hl(now);
  var col=band==='risk'?'var(--rd600)':(band==='warn'?'var(--am600)':'var(--gn600)');
  var risk=0,warn=0,ok=0;
  teamClients.forEach(function(c){var h=hl(calcScore(c));if(h==='risk')risk++;else if(h==='warn')warn++;else ok++;});
  var tot=Math.max(1,risk+warn+ok);
  var pct=function(n){return(n/tot*100).toFixed(1);};
  var html='<div class="lp-card lp-score-panel" style="border-top:3px solid '+col+'">';
  html+='<div class="lp-card-head"><span class="lp-eyebrow">Score de CS do time</span>';
  html+='<div class="lp-head-tools">';
  html+='<button class="lp-icon-btn press" title="Exportar o score e o cálculo para planilha" onclick="lpExportScore()">'+svgIcon('share',14)+'</button>';
  html+=periodPickerHTML('score','period');
  html+='</div></div>';
  html+='<div class="lp-score-row"><span class="lp-score-big score-num-live" data-score="'+(now===null?0:now)+'" style="color:'+col+'">'+(now===null?'—':now)+'</span>';
  if(delta!==null&&delta!==0){
    var up=delta>0;
    html+='<span class="lp-delta" style="color:'+(up?'var(--gn600)':'var(--rd600)')+'">'+(up?'↑':'↓')+' '+Math.abs(delta)+' pts</span>';
  }else if(delta===0){html+='<span class="lp-delta" style="color:var(--t3)">estável</span>';}
  html+='</div>';
  html+='<div class="lp-tri"><div style="width:'+pct(risk)+'%;background:var(--rd600)"></div><div style="width:'+pct(warn)+'%;background:var(--am600)"></div><div style="width:'+pct(ok)+'%;background:var(--gn600)"></div></div>';
  var bands=[['risk','Críticos',risk,'var(--rd600)'],['warn','Atenção',warn,'var(--am600)'],['ok','Estáveis',ok,'var(--gn600)']];
  html+='<div class="lp-bands">';
  bands.forEach(function(b){
    var on=S.lpBand===b[0];
    html+='<button class="lp-band press'+(on?' on':'')+'" onclick="lpSetBand(\''+b[0]+'\')" title="Filtrar os analistas que têm clientes nesta faixa">'
      +'<span class="lp-dot" style="background:'+b[3]+'"></span><span class="lp-band-lbl">'+b[1]+'</span>'
      +'<span class="lp-band-num" style="color:'+b[3]+'">'+b[2]+'</span><span class="lp-chev">›</span></button>';
  });
  html+='</div></div>';
  return html;
}

// ── Trilho: Churn por mes ──
// Barras = clientes perdidos no mes (planilha), so dos analistas deste time.
// O seletor de periodo governa o SCORE (é o que se apresenta em reunião).
// Churn é sempre mensal: 6 meses no card pequeno, tudo o que tem dado no grande.
function lpChurnData(big){
  var rows=lpTeamGoalRows();
  var months=big?tdMonthsUpToNow():tdMonthsUpToNow(6);
  return months.map(function(m){
    return{month:m,clients:tdSum('churnClients',[m],rows)||0,mrr:tdSum('churnMrr',[m],rows)||0,base:tdSum('baseClients',[m],rows)};
  });
}
function lpMonthLabel(m){
  var i=parseInt(m.slice(5),10)-1;
  return(MONTHS[i]||m).toUpperCase();
}
function lpChurnCard(teamClients){
  var data=lpChurnData();
  var rows=lpTeamGoalRows();
  var cur=data[data.length-1]||{clients:0,mrr:0};
  var maxC=Math.max(1,Math.max.apply(null,data.map(function(d){return d.clients;})));
  var mrrRisco=teamClients.filter(isChurnAlert).reduce(function(a,c){return a+(parseFloat(c.mrr)||0);},0);
  var mrrTot=teamClients.reduce(function(a,c){return a+(parseFloat(c.mrr)||0);},0);
  var pctRisco=mrrTot?Math.round(mrrRisco/mrrTot*100):0;
  var html='<div class="lp-card">';
  html+='<div class="lp-card-head"><span class="lp-eyebrow">Churn por mês</span>'
    +'<button class="lp-icon-btn press" onclick="lpToggleChurnBig()" title="Ver em tamanho grande">'+svgIcon('chart',14)+'</button></div>';
  html+='<div class="lp-spark">';
  data.forEach(function(d,i){
    var h=Math.max(4,Math.round(d.clients/maxC*62));
    var last=i===data.length-1;
    html+='<div class="lp-spark-col" title="'+e(lpMonthLabel(d.month))+': '+d.clients+' cliente(s) · '+formatMRR(d.mrr)+'">'
      +'<div class="lp-spark-bar" style="height:'+h+'px;animation-delay:'+(i*45)+'ms"></div>'
      +'<span class="lp-spark-lbl'+(last?' on':'')+'">'+e(lpMonthLabel(d.month).slice(0,3))+'</span></div>';
  });
  html+='</div>';
  var MESES_LONGOS=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  var curNome=cur.month?(MESES_LONGOS[parseInt(cur.month.slice(5),10)-1]||''):'';
  html+='<div class="lp-kv-list">';
  html+='<div class="lp-kv"><span>Perdidos em '+e(curNome)+'</span><strong>'+cur.clients+' cliente'+(cur.clients===1?'':'s')+'</strong></div>';
  html+='<div class="lp-kv"><span>MRR perdido</span><strong>'+formatMRR(cur.mrr)+'</strong></div>';
  html+='<div class="lp-kv"><span>MRR em risco agora</span><strong style="color:var(--rd600)">'+formatMRR(mrrRisco)+'</strong></div>';
  html+='<div class="lp-mini-bar"><div style="width:'+Math.min(100,pctRisco)+'%;background:var(--rd600)"></div></div>';
  html+='<div class="lp-note">'+pctRisco+'% do MRR sob gestão</div>';
  html+='</div></div>';
  return html;
}
// Versao grande: barras de churn + linha do score medio do time, sobrepostas.
function lpChurnBigOverlay(teamClients){
  if(!S.lpChurnBig)return'';
  var data=lpChurnData(true);
  var series=teamScoreSeries(teamClients,data.map(function(d){return d.month;}));
  var W=880,H=300,padL=44,padR=44,padT=24,padB=42;
  var maxC=Math.max(1,Math.max.apply(null,data.map(function(d){return d.clients;})));
  var step=(W-padL-padR)/Math.max(1,data.length);
  var bw=Math.min(52,step*.52);
  var bars='',labels='',line='',dots='',hover='';
  var pts=[];var tips=[];
  // A legenda aparece só quando o cursor está sobre o dado (a barra ou o ponto da
  // linha), não em qualquer lugar do branco da coluna.
  data.forEach(function(d,i){
    var cx=padL+step*i+step/2;
    var h=(d.clients/maxC)*(H-padT-padB);
    bars+='<rect x="'+(cx-bw/2)+'" y="'+(H-padB-h)+'" width="'+bw+'" height="'+h+'" rx="5" fill="var(--rd600)" opacity=".85" class="lp-big-bar lp-hit" style="animation-delay:'+(i*60)+'ms" onmousemove="lpTip(event,'+i+')" onmouseleave="lpTipHide()"/>';
    labels+='<text x="'+cx+'" y="'+(H-padB+18)+'" text-anchor="middle" font-size="10" fill="var(--t3)">'+e(lpMonthLabel(d.month))+'</text>';
    var s=series[i]&&series[i].score;
    if(s!==null&&s!==undefined){var y=padT+(1-s/100)*(H-padT-padB);pts.push([cx,y,s,i]);}
    tips.push('<b>'+e(lpMonthLabel(d.month))+'</b>'+d.clients+' cliente'+(d.clients===1?'':'s')+' perdido'+(d.clients===1?'':'s')+'<br>'+formatMRR(d.mrr)+' de MRR'+(s!==null&&s!==undefined?'<br>Score do time: '+s:''));
  });
  window._lpTipRows=tips;
  if(pts.length>1){
    line='<polyline points="'+pts.map(function(p){return p[0]+','+p[1];}).join(' ')+'" fill="none" stroke="var(--b600)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lp-big-line"/>';
    // Ponto visível de 4.5 + área de captura invisível de 11, senão é difícil acertar.
    pts.forEach(function(p){
      dots+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4.5" fill="var(--surf)" stroke="var(--b600)" stroke-width="2.5"/>'
        +'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="11" fill="transparent" class="lp-hit" onmousemove="lpTip(event,'+p[3]+')" onmouseleave="lpTipHide()"/>';
    });
  }
  var grid='';
  [0,Math.round(maxC/2),maxC].forEach(function(v){
    var y=H-padB-(v/maxC)*(H-padT-padB);
    grid+='<line x1="'+padL+'" y1="'+y+'" x2="'+(W-padR)+'" y2="'+y+'" stroke="var(--bd)" stroke-width="1"/>'
      +'<text x="'+(padL-8)+'" y="'+(y+3)+'" text-anchor="end" font-size="9" fill="var(--t3)">'+v+'</text>';
  });
  var totC=data.reduce(function(a,d){return a+d.clients;},0);
  var totM=data.reduce(function(a,d){return a+d.mrr;},0);
  var first=series.find(function(s){return s.score!==null;});
  var last=series.slice().reverse().find(function(s){return s.score!==null;});
  var trend=(first&&last&&first!==last)?(last.score-first.score):null;
  var html='<div class="modal-ov" onclick="if(event.target===this)lpCloseChurnBig()">';
  html+='<div class="modal-box lp-big-box" style="max-width:960px">';
  html+='<div class="modal-hdr"><div><h2 class="modal-title" style="margin:0">Churn e saúde ao longo do tempo</h2>'
    +'<div class="muted" style="font-size:12px;margin-top:2px">Clientes perdidos por mês e score médio do time · todo o histórico disponível</div></div>'
    +'<button class="modal-close press" onclick="lpCloseChurnBig()">Fechar</button></div>';
  // Três leituras da mesma coisa: quantos saíram, quanto isso custou e quem perdeu.
  var modo=S.lpChurnMode||'mes';
  html+='<div class="lp-chart-bar"><div class="lp-seg">'
    +'<button class="'+(modo==='mes'?'on':'')+'" onclick="lpSetChurnMode(\'mes\')">Clientes</button>'
    +'<button class="'+(modo==='mrr'?'on':'')+'" onclick="lpSetChurnMode(\'mrr\')">MRR perdido</button>'
    +'<button class="'+(modo==='analista'?'on':'')+'" onclick="lpSetChurnMode(\'analista\')">Por analista</button></div>'
    +'<button class="btn btn-sm press" onclick="lpExportChurn()">'+svgIcon('share',13)+' Exportar</button></div>';
  // Container animado: a cada troca de tipo o gráfico entra deslizando.
  html+='<div class="lp-chart-swap" data-mode="'+modo+'"><div class="lp-chart-host">';
  if(modo==='mes'){
    html+='<div class="lp-legend"><span><i style="background:var(--rd600)"></i>Clientes perdidos</span><span><i class="ln" style="background:var(--b600)"></i>Score médio</span></div>';
    html+='<div style="overflow-x:auto;position:relative"><svg viewBox="0 0 '+W+' '+H+'" style="width:100%;min-width:640px;height:'+H+'px">'+grid+bars+line+dots+labels+'</svg></div>';
  }else if(modo==='mrr'){
    html+=lpChartMrr(data,W,H,padL,padR,padT,padB);
  }else{
    html+=lpChartPorAnalista(data);
  }
  html+='<div id="lp-tip" class="lp-tip"></div></div></div>';
  html+='<div class="lp-big-foot">';
  html+='<div class="lp-kv"><span>Total perdido no histórico</span><strong>'+totC+' cliente'+(totC===1?'':'s')+' · '+formatMRR(totM)+'</strong></div>';
  if(trend!==null)html+='<div class="lp-kv"><span>Score do time no histórico</span><strong style="color:'+(trend>=0?'var(--gn600)':'var(--rd600)')+'">'+(trend>=0?'+':'')+trend+' pts</strong></div>';
  html+='</div></div></div>';
  return html;
}

// ── Trilho: Precisa de voce (fila com expansao no lugar) ──
function lpAnalystOf(c){var u=(S.allUsers||[]).find(function(x){return x.uid===c.ownerId;});return u?u.name:'—';}
function lpDaysAgo(dateStr){
  if(!dateStr)return null;
  var t=dateStr.indexOf('/')>0?(function(){var p=dateStr.split('/');return new Date(p[2]+'-'+p[1]+'-'+p[0]+'T00:00:00');})():new Date(dateStr+'T00:00:00');
  if(isNaN(t))return null;
  return Math.floor((Date.now()-t.getTime())/86400000);
}
function lpAgoLabel(d){
  if(d===null)return'';
  if(d<=0)return'hoje';
  return'há '+d+' dia'+(d===1?'':'s');
}
// Ordem: dinheiro-primeiro. Churn e MRR saindo agora; inadimplencia e MRR que
// nao entrou; loop e insatisfacao que vira churn; pergunta e processo interno.
function lpQueueItems(teamClients){
  var out=[];
  teamClients.filter(isChurnAlert).forEach(function(c){
    var d=lpDaysAgo(c.churnCase&&c.churnCase.date);
    out.push({kind:'churn',key:'churn:'+c.id,client:c,days:d,sort:[0,-(d||0)]});
  });
  var inad=teamClients.filter(isInadimplente);
  if(inad.length){
    var total=inad.reduce(function(a,c){return a+(c.inadimplencia||[]).filter(function(m){return!m.paid;}).reduce(function(s,m){return s+(parseBRNumber(String(m.amount||'').replace(/[^\d.,]/g,''))||0);},0);},0);
    var oldest=null;
    inad.forEach(function(c){(c.inadimplencia||[]).forEach(function(m){if(!m.paid&&m.createdAt){var d=Math.floor((Date.now()-m.createdAt)/86400000);if(oldest===null||d>oldest)oldest=d;}});});
    out.push({kind:'inad',key:'inad',clients:inad,total:total,days:oldest,sort:[1,-(oldest||0)]});
  }
  teamClients.filter(isLoopOpen).forEach(function(c){
    var info=loopInfo(c);
    out.push({kind:'loop',key:'loop:'+c.id,client:c,info:info,days:info&&info.days,sort:[2,-((info&&info.days)||0)]});
  });
  var mine=leaderMyQuestions().filter(function(q){return q.status==='pending';});
  if(mine.length)out.push({kind:'quest',key:'quest',questions:mine,days:null,sort:[3,0]});
  out.sort(function(a,b){return a.sort[0]-b.sort[0]||a.sort[1]-b.sort[1];});
  return out;
}
function lpQueueRow(it){
  var ic,bg,fg,title,sub;
  if(it.kind==='churn'){
    ic='alert';bg='var(--rd50)';fg='var(--rd600)';
    title='Alerta de churn · '+(it.client.slug||it.client.name).toUpperCase();
    sub=formatMRR(it.client.mrr)+' · '+e(lpAnalystOf(it.client))+' · '+lpAgoLabel(it.days);
  }else if(it.kind==='inad'){
    ic='invoice';bg='var(--am50)';fg='var(--am700)';
    title=it.clients.length+' cliente'+(it.clients.length===1?'':'s')+' inadimplente'+(it.clients.length===1?'':'s');
    sub=(it.total?formatMRR(it.total)+' em aberto · ':'')+[...new Set(it.clients.map(lpAnalystOf))].slice(0,2).join(', ')+(it.days!==null?' · mais antigo '+lpAgoLabel(it.days):'');
  }else if(it.kind==='loop'){
    ic='refresh';bg='var(--am50)';fg='var(--am700)';
    title='Fechamento de loop · '+(it.client.slug||it.client.name).toUpperCase();
    sub='NPS '+(it.info?it.info.score:'?')+'/10 · '+e(lpAnalystOf(it.client))+' · '+lpAgoLabel(it.days)+(it.info&&it.info.attempts?' · '+it.info.attempts+' tentativa'+(it.info.attempts===1?'':'s'):'');
  }else{
    ic='lightbulb';bg='var(--b50)';fg='var(--b600)';
    title=it.questions.length+' pergunta'+(it.questions.length===1?'':'s')+' para aprovar';
    sub=[...new Set(it.questions.map(function(q){var u=(S.allUsers||[]).find(function(x){return x.uid===q.createdBy;});return u?u.name:'—';}))].slice(0,2).join(', ');
  }
  return'<button class="lp-q-row press" onclick="lpOpenQueue(\''+jsq(it.key)+'\')">'
    +'<span class="lp-q-ico" style="background:'+bg+';color:'+fg+'">'+svgIcon(ic,15)+'</span>'
    +'<span class="lp-q-txt"><span class="lp-q-title">'+title+'</span><span class="lp-q-sub">'+sub+'</span></span>'
    +'<span class="lp-chev">›</span></button>';
}
function lpQueueDetail(it,grupo){
  var volta=grupo?('cat:'+grupo.cat.kind):'';
  var html='<div class="lp-q-detail">';
  html+='<button class="lp-back press" onclick="lpOpenQueue(\''+jsq(volta)+'\')">← Voltar'+(grupo?' a '+e(grupo.cat.label.toLowerCase()):' à fila')+'</button>';
  if(it.kind==='churn'){
    var c=it.client,ci=S.clients.indexOf(c),cc=c.churnCase||{};
    html+='<div class="lp-d-head"><span class="lp-q-ico" style="background:var(--rd50);color:var(--rd600)">'+svgIcon('alert',17)+'</span>'
      +'<div style="flex:1;min-width:0"><div class="lp-d-title">'+e((c.slug||c.name).toUpperCase())+'</div>'
      +'<div class="lp-d-sub">'+e(c.name)+' · aberto '+lpAgoLabel(it.days)+'</div></div>'
      +'<span class="lp-tag lp-tag-red">Alto risco</span></div>';
    html+='<div class="lp-d-stats">'
      +'<div><b>'+formatMRR(c.mrr)+'</b><span>MRR em risco</span></div>'
      +'<div><b style="color:var(--rd600)">'+calcScore(c)+'</b><span>Score de saúde</span></div>'
      +'<div><b>'+(getDaysWithoutContact(c)===null?'—':getDaysWithoutContact(c)+' dias')+'</b><span>Sem contato</span></div></div>';
    // Linha do tempo montada dos dados que ja existem, sem campo novo.
    var tl=[];
    if(cc.date)tl.push({d:cc.date,txt:'caso de churn aberto'+(cc.caseNumber?' (#'+cc.caseNumber+')':''),c:'var(--rd600)'});
    var fu=fuSt(c);
    if(fu.days!==null&&fu.days<0)tl.push({d:null,txt:'follow-up vencido há '+(-fu.days)+' dias',c:'var(--am600)'});
    var la=getLastActivity(c);
    if(la&&la.date)tl.push({d:formatDate(la.date),txt:'último contato registrado'+(la.createdByName?' por '+la.createdByName:''),c:'var(--bd)'});
    if(tl.length){
      html+='<div class="lp-eyebrow" style="margin:14px 0 8px">Linha do tempo</div><div class="lp-timeline">';
      tl.forEach(function(t){html+='<div class="lp-tl-item"><span class="lp-tl-dot" style="background:'+t.c+'"></span><span>'+(t.d?'<strong>'+e(t.d)+'</strong> — ':'')+e(t.txt)+'</span></div>';});
      html+='</div>';
    }
    html+='<div class="lp-field"><label class="form-lbl">Caso no Salesforce</label>'
      +(cc.sfLink?'<a class="lp-link" href="'+e(cc.sfLink)+'" target="_blank" rel="noopener">'+e(cc.sfLink)+'</a>'
        :'<span class="lp-empty">link do Salesforce — a preencher</span>')+'</div>';
    if(cc.note)html+='<div class="lp-field"><label class="form-lbl">Motivo registrado</label><div class="lp-quote">'+e(cc.note)+'</div></div>';
    html+='<div class="lp-d-actions"><button class="btn-primary btn-sm" onclick="openM(\'churn-alert\','+ci+')">Ver o caso</button>'
      +'<button class="btn btn-sm" onclick="openClient('+ci+')">Abrir cliente</button></div>';
  }else if(it.kind==='inad'){
    html+='<div class="lp-d-head"><span class="lp-q-ico" style="background:var(--am50);color:var(--am700)">'+svgIcon('invoice',17)+'</span>'
      +'<div style="flex:1"><div class="lp-d-title">'+it.clients.length+' cliente'+(it.clients.length===1?'':'s')+' inadimplente'+(it.clients.length===1?'':'s')+'</div>'
      +'<div class="lp-d-sub">'+(it.total?formatMRR(it.total)+' em aberto':'valores não informados')+'</div></div></div>';
    html+='<div class="lp-d-list">';
    it.clients.forEach(function(c){
      var ci=S.clients.indexOf(c);
      var abertos=(c.inadimplencia||[]).filter(function(m){return!m.paid;});
      var meses=abertos.map(function(m){return m.month+'/'+m.year;}).join(', ');
      html+='<div class="lp-d-item"><div style="flex:1;min-width:0"><div class="lp-d-item-t">'+e((c.slug||c.name).toUpperCase())+'</div>'
        +'<div class="lp-d-item-s">'+abertos.length+' mês(es) em aberto'+(meses?' · '+e(meses):'')+' · '+e(lpAnalystOf(c))+'</div></div>'
        +'<button class="btn btn-sm" onclick="S.modal=\'inad-\'+'+ci+';render()">Ver faturas</button></div>';
    });
    html+='</div>';
  }else if(it.kind==='loop'){
    var lc=it.client,lci=S.clients.indexOf(lc),info=it.info||{};
    html+='<div class="lp-d-head"><span class="lp-q-ico" style="background:var(--am50);color:var(--am700)">'+svgIcon('refresh',17)+'</span>'
      +'<div style="flex:1;min-width:0"><div class="lp-d-title">'+e((lc.slug||lc.name).toUpperCase())+'</div>'
      +'<div class="lp-d-sub">Loop de feedback aberto '+lpAgoLabel(it.days)+'</div></div>'
      +'<span class="lp-tag lp-tag-amber">NPS '+(info.score!==undefined?info.score:'?')+'/10</span></div>';
    html+='<div class="lp-field"><label class="form-lbl">Feedback do cliente</label>'
      +(info.feedback?'<div class="lp-quote">'+e(info.feedback)+'</div>':'<span class="lp-empty">feedback do cliente — virá do Salesforce</span>')
      +'<textarea id="loop-feedback" rows="3" placeholder="Cole aqui o que o cliente escreveu na avaliação..." style="margin-top:8px">'+e(info.feedback||'')+'</textarea></div>';
    html+='<div class="lp-d-stats">'
      +'<div><b>'+formatMRR(lc.mrr)+'</b><span>MRR</span></div>'
      +'<div><b style="color:'+(calcScore(lc)<50?'var(--rd600)':'var(--t)')+'">'+calcScore(lc)+'</b><span>Score de saúde</span></div>'
      +'<div><b>'+(info.attempts||0)+'</b><span>Tentativas</span></div></div>';
    html+='<div class="lp-note" style="margin-top:6px">Tentativas = contatos registrados na conta do cliente depois que o loop abriu.</div>';
    html+='<div class="lp-field"><label class="form-lbl">Caso no Salesforce</label>'
      +'<input id="loop-sflink" type="text" placeholder="link do Salesforce — a preencher" value="'+e(info.sfLink||'')+'"></div>';
    html+='<div class="lp-field"><label class="form-lbl">Categoria do feedback</label><select id="loop-cat">'
      +['','Financeiro','Produto','Suporte','Onboarding','Comercial','Outro'].map(function(o){return'<option value="'+e(o)+'"'+(info.category===o?' selected':'')+'>'+(o||'— selecionar —')+'</option>';}).join('')
      +'</select></div>';
    html+='<div class="lp-d-actions"><button class="btn-primary btn-sm" onclick="closeLoop('+lci+')">Fechar o loop</button>'
      +'<button class="btn btn-sm" onclick="saveLoopDetails('+lci+')">Salvar</button>'
      +'<button class="btn btn-sm" onclick="openClient('+lci+')">Abrir cliente</button></div>';
  }else{
    html+='<div class="lp-d-head"><span class="lp-q-ico" style="background:var(--b50);color:var(--b600)">'+svgIcon('lightbulb',17)+'</span>'
      +'<div style="flex:1"><div class="lp-d-title">'+it.questions.length+' pergunta'+(it.questions.length===1?'':'s')+' para aprovar</div>'
      +'<div class="lp-d-sub">Perguntas customizadas aguardando sua análise</div></div></div>';
    html+='<div class="lp-q-body">'+leaderQuestionsBody(it.questions)+'</div>';
  }
  html+='</div>';
  return html;
}
// A fila mostra CATEGORIAS, não cada caso solto: com 16 pendências a lista
// virava uma parede. Clica na categoria, vê os casos dela; clica no caso, vê o
// detalhe. Nunca mais de 3 categorias na tela de uma vez.
var LP_QUEUE_CATS=[
  {kind:'churn',label:'Alertas de churn',icon:'alert',bg:'var(--rd50)',fg:'var(--rd600)'},
  {kind:'inad',label:'Inadimplência',icon:'invoice',bg:'var(--am50)',fg:'var(--am700)'},
  {kind:'loop',label:'Fechamento de loop',icon:'refresh',bg:'var(--am50)',fg:'var(--am700)'},
  {kind:'quest',label:'Perguntas para aprovar',icon:'lightbulb',bg:'var(--b50)',fg:'var(--b600)'}
];
var LP_QUEUE_MAX=3;
function lpQueueGroups(teamClients){
  var items=lpQueueItems(teamClients);
  return LP_QUEUE_CATS.map(function(cat){
    var list=items.filter(function(i){return i.kind===cat.kind;});
    var count=cat.kind==='inad'?(list[0]?list[0].clients.length:0)
      :(cat.kind==='quest'?(list[0]?list[0].questions.length:0):list.length);
    var oldest=list.reduce(function(a,i){return(i.days!==null&&i.days!==undefined&&i.days>a)?i.days:a;},0);
    return{cat:cat,items:list,count:count,oldest:oldest};
  }).filter(function(g){return g.count>0;});
}
function lpQueueCard(teamClients){
  var groups=lpQueueGroups(teamClients);
  var total=groups.reduce(function(a,g){return a+g.count;},0);
  var sel=String(S.lpQueue||'');
  var openItem=null,openGroup=null;
  if(sel.indexOf('cat:')===0){
    openGroup=groups.find(function(g){return g.cat.kind===sel.slice(4);});
  }else if(sel){
    groups.forEach(function(g){var f=g.items.find(function(i){return i.key===sel;});if(f){openItem=f;openGroup=g;}});
  }
  var html='<div class="lp-card lp-card-flush">';
  html+='<div class="lp-card-head lp-card-head-pad"><span class="lp-h">Precisa de você</span>'
    +(total?'<span class="lp-badge">'+total+'</span>':'')+'</div>';
  if(openItem){
    html+=lpQueueDetail(openItem,openGroup);
  }else if(openGroup){
    // Nível 2: os casos daquela categoria
    html+='<div class="lp-q-detail">';
    html+='<button class="lp-back press" onclick="lpCloseQueue()">← Voltar às categorias</button>';
    html+='<div class="lp-d-head"><span class="lp-q-ico" style="background:'+openGroup.cat.bg+';color:'+openGroup.cat.fg+'">'+svgIcon(openGroup.cat.icon,17)+'</span>'
      +'<div style="flex:1"><div class="lp-d-title">'+e(openGroup.cat.label)+'</div>'
      +'<div class="lp-d-sub">'+openGroup.count+' caso'+(openGroup.count===1?'':'s')+' aguardando</div></div></div>';
    html+='<div class="lp-q-sublist">'+openGroup.items.map(lpQueueRow).join('')+'</div>';
    html+='</div>';
  }else if(!groups.length){
    html+='<div class="lp-ok-row">'+svgIcon('check',15)+'<span>Nada pendente no time agora.</span></div>';
  }else{
    var shown=groups.slice(0,LP_QUEUE_MAX),rest=groups.slice(LP_QUEUE_MAX);
    shown.forEach(function(g){
      var soleta=g.items.length===1&&(g.cat.kind==='inad'||g.cat.kind==='quest');
      html+='<button class="lp-q-row press" onclick="lpOpenQueue(\''+(soleta?jsq(g.items[0].key):'cat:'+g.cat.kind)+'\')">'
        +'<span class="lp-q-ico" style="background:'+g.cat.bg+';color:'+g.cat.fg+'">'+svgIcon(g.cat.icon,15)+'</span>'
        +'<span class="lp-q-txt"><span class="lp-q-title">'+e(g.cat.label)+'</span>'
        +'<span class="lp-q-sub">'+g.count+' caso'+(g.count===1?'':'s')+(g.oldest?' · mais antigo '+lpAgoLabel(g.oldest):'')+'</span></span>'
        +'<span class="lp-q-count" style="background:'+g.cat.bg+';color:'+g.cat.fg+'">'+g.count+'</span>'
        +'<span class="lp-chev">›</span></button>';
    });
    if(rest.length){
      html+='<div class="lp-q-more">+ '+rest.map(function(g){return g.count+' '+g.cat.label.toLowerCase();}).join(' · ')+'</div>';
    }
    if(!teamClients.some(isInadimplente))html+='<div class="lp-ok-row">'+svgIcon('check',15)+'<span>Nenhum inadimplente</span></div>';
  }
  html+='</div>';
  return html;
}

// ── Trilho: Cobertura do time ──
// Duas leituras diferentes no mesmo card, de propósito: a meta é o compromisso
// negociado (planilha), o vencido é a realidade da carteira (dashboard).
// A cobertura tem o SEU período (padrão: mês atual). Mudar o período do score
// não mexe aqui — são leituras diferentes: uma é a saúde da carteira, a outra é
// o trabalho feito no mês.
function lpCoverageCard(teamClients){
  var rows=lpTeamGoalRows();
  var months=periodMonths('cov');
  var r=periodRange('cov');
  var fu=months.length?tdAttainment('followReal','followMeta',months,rows):null;
  var vencidos=teamClients.filter(function(c){var s=fuSt(c);return s.days!==null&&s.days<0;}).length;
  var semContato=teamClients.filter(function(c){var d=getDaysWithoutContact(c);return d!==null&&d>=30;}).length;
  var html='<div class="lp-card">';
  html+='<div class="lp-card-head"><span class="lp-eyebrow">Cobertura do time</span>'
    +'<div class="lp-head-tools">'+periodPickerHTML('cov','covperiod')
    +(hasBeta()?'<button class="lp-icon-btn press" onclick="lpToggleCovBig()" title="Ver os follow-ups: data, analista e cliente">'+svgIcon('chart',14)+'</button>':'')
    +'</div></div>';
  html+='<div class="lp-cov">';
  if(fu){
    var col=fu.pct>=100?'var(--gn600)':(fu.pct>=80?'var(--am600)':'var(--rd600)');
    html+='<div class="lp-cov-item"><div class="lp-kv"><span>Meta de follow-ups</span>'
      +'<strong><span class="lp-cov-frac">'+fu.real+'/'+fu.meta+'</span> <span style="color:'+col+'">'+fu.pct+'%</span></strong></div>'
      +'<div class="lp-mini-bar"><div style="width:'+Math.min(100,fu.pct)+'%;background:'+col+'"></div></div>'
      +'<div class="lp-note">'+e(r.labelLong||r.label)+' · meta é 100%</div></div>';
  }else{
    // Mês corrente costuma não estar fechado na planilha ainda. Em vez de um
    // traço, mostra o mês mais recente que tem número — e diz qual é.
    var ult=null;
    for(var _i=TEAM_MONTHS.length-1;_i>=0;_i--){
      var _t=tdAttainment('followReal','followMeta',[TEAM_MONTHS[_i]],rows);
      if(_t&&_t.meta){ult={mes:TEAM_MONTHS[_i],fu:_t};break;}
    }
    if(ult){
      var col2=ult.fu.pct>=100?'var(--gn600)':(ult.fu.pct>=80?'var(--am600)':'var(--rd600)');
      var nome=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'][parseInt(ult.mes.slice(5),10)-1]||ult.mes;
      html+='<div class="lp-cov-item"><div class="lp-kv"><span>Meta de follow-ups</span>'
        +'<strong><span class="lp-cov-frac">'+ult.fu.real+'/'+ult.fu.meta+'</span> <span style="color:'+col2+'">'+ult.fu.pct+'%</span></strong></div>'
        +'<div class="lp-mini-bar"><div style="width:'+Math.min(100,ult.fu.pct)+'%;background:'+col2+'"></div></div>'
        +'<div class="lp-note">'+e(nome)+' — último mês fechado na planilha</div></div>';
    }else{
      html+='<div class="lp-cov-item"><div class="lp-kv"><span>Meta de follow-ups</span><strong class="muted">—</strong></div>'
        +'<div class="lp-note">sem dado da planilha para '+e(String(r.label).toLowerCase())+'</div></div>';
    }
  }
  var vc=vencidos?'var(--rd600)':'var(--gn600)';
  html+='<div class="lp-cov-item"><div class="lp-kv"><span>Clientes com follow vencido</span><strong style="color:'+vc+'">'+vencidos+'</strong></div>'
    +'<div class="lp-note">cadência da categoria estourada</div></div>';
  var sc=semContato?'var(--rd600)':'var(--gn600)';
  html+='<div class="lp-cov-item"><div class="lp-kv"><span>Sem contato há 30+ dias</span><strong style="color:'+sc+'">'+semContato+'</strong></div></div>';
  html+='</div></div>';
  return html;
}

// ── Cobertura do time, expandida: o log dos follow-ups ──
// O card mostra o placar (meta, vencidos, sem contato). Aqui embaixo fica a prova:
// cada follow feito, com data, analista e cliente — a mesma leitura do relatorio
// do Salesforce, mas ja filtrada pelo periodo do card e com os graficos do time.
function lpToggleCovBig(){if(S.lpCovBig){lpCloseCovBig();return;}S.lpCovBig=true;render();}
function lpCloseCovBig(){dismissOverlay(function(){S.lpCovBig=false;render();});}
function lpSetCovMode(m){S.lpCovMode=m;render();}
function lpCovAnalysts(){return S.lpCovAnalysts||[];}
// Lista vazia significa "todos" — mais honesto que marcar todo mundo, porque
// analista novo entra na conta sozinho em vez de ficar de fora silenciosamente.
function lpCovAllAnalysts(){S.lpCovAnalysts=[];S.lpCovPage=0;render();}
function lpToggleCovAnalyst(uid){
  var sel=lpCovAnalysts().slice();
  var i=sel.indexOf(uid);
  if(i>=0)sel.splice(i,1);else sel.push(uid);
  S.lpCovAnalysts=sel;S.lpCovPage=0;render();
}
function lpUserName(uid){var u=(S.allUsers||[]).find(function(x){return x.uid===uid;});return u?u.name:'—';}
// Quem fez o follow. Vale o que ficou gravado no proprio follow; follow antigo nao
// tem esse campo, entao sobra o dono atual do cliente — o que pode estar errado se
// o cliente foi transferido depois. Esse caso vem marcado como herdado, pra tabela
// poder avisar em vez de afirmar algo que nao da pra provar.
function lpFollowAuthor(c,f){
  if(f.byUid)return{uid:f.byUid,name:f.byName||lpUserName(f.byUid),herdado:false};
  return{uid:c.ownerId||'?',name:lpAnalystOf(c),herdado:true};
}
function lpFollowLog(teamClients){
  var r=periodRange('cov');
  var sel=lpCovAnalysts();
  var out=[];
  (teamClients||[]).forEach(function(c){
    (c.follows||[]).forEach(function(f){
      if(!f.date||f.date<r.fromISO||f.date>r.toISO)return;
      var a=lpFollowAuthor(c,f);
      if(sel.length&&sel.indexOf(a.uid)<0)return;
      out.push({date:f.date,uid:a.uid,name:a.name,herdado:a.herdado,
        slug:String(c.slug||c.name||'').toUpperCase(),clientName:c.name||'',
        ci:S.clients.indexOf(c),tipo:f.type==='recurring'?'Recorrente':'Primeiro'});
    });
  });
  out.sort(function(x,y){
    if(x.date!==y.date)return x.date<y.date?1:-1; // mais recente primeiro
    return String(x.name).localeCompare(String(y.name));
  });
  return out;
}
// Opcoes do filtro: quem tem follow no periodo. Nao depende da selecao atual, senao
// um analista desmarcado desapareceria da lista e nao daria pra marcar de novo.
function lpCovAnalystOptions(teamClients){
  var r=periodRange('cov');
  var seen={};
  (teamClients||[]).forEach(function(c){
    (c.follows||[]).forEach(function(f){
      if(!f.date||f.date<r.fromISO||f.date>r.toISO)return;
      var a=lpFollowAuthor(c,f);
      if(!seen[a.uid])seen[a.uid]={uid:a.uid,name:a.name,n:0};
      seen[a.uid].n++;
    });
  });
  return Object.keys(seen).map(function(k){return seen[k];})
    .sort(function(x,y){return String(x.name).localeCompare(String(y.name));});
}
function lpCovGoPage(d,max){S.lpCovPage=Math.max(0,Math.min((S.lpCovPage||0)+d,max));render();}
function lpCovLista(log){
  if(!log.length)return'<div class="lp-empty-box">Nenhum follow-up registrado no período escolhido.</div>';
  var pageSize=25;
  var totalPages=Math.max(1,Math.ceil(log.length/pageSize));
  var page=Math.min(S.lpCovPage||0,totalPages-1);
  var slice=log.slice(page*pageSize,page*pageSize+pageSize);
  var html='<div class="lp-cov-log"><div class="lp-cov-log-hd">'
    +'<span>Data</span><span>Analista</span><span>Sigla</span><span>Empresa / conta</span><span>Follow</span></div>';
  slice.forEach(function(x){
    html+='<div class="lp-cov-log-r">'
      +'<span class="lp-cov-log-d">'+formatDate(x.date)+'</span>'
      +'<span class="lp-cov-log-a">'+e(x.name)
        +(x.herdado?'<span class="lp-cov-inf" title="Este follow foi salvo antes de o sistema gravar quem respondeu — aqui aparece o analista responsável pelo cliente hoje">?</span>':'')+'</span>'
      +'<span class="lp-cov-log-s">'+(x.ci>=0?'<a href="#" onclick="openClient('+x.ci+');return false">'+e(x.slug)+'</a>':e(x.slug))+'</span>'
      +'<span class="lp-cov-log-n">'+e(x.clientName)+'</span>'
      +'<span><span class="lp-chip">'+x.tipo+'</span></span></div>';
  });
  html+='</div>';
  if(totalPages>1){
    html+='<div class="lp-cli-pg">'
      +'<button class="btn btn-sm" '+(page===0?'disabled':'')+' onclick="lpCovGoPage(-1,'+(totalPages-1)+')">&lsaquo;</button>'
      +'<span class="lp-note">Página '+(page+1)+' de '+totalPages+' · '+log.length+' follow-up'+(log.length===1?'':'s')+'</span>'
      +'<button class="btn btn-sm" '+(page===totalPages-1?'disabled':'')+' onclick="lpCovGoPage(1,'+(totalPages-1)+')">&rsaquo;</button></div>';
  }
  return html;
}
// Barras no tempo. Um ano viraria uma parede de 365 barras, entao acima de ~2 meses
// o grafico agrupa por mes — e o rotulo da aba diz qual leitura esta valendo.
function lpCovChartTempo(log){
  var r=periodRange('cov');
  var porMes=r.days>62;
  var buckets={};
  log.forEach(function(x){var k=porMes?x.date.slice(0,7):x.date;buckets[k]=(buckets[k]||0)+1;});
  var keys=Object.keys(buckets).sort();
  if(!keys.length)return'<div class="lp-empty-box">Nenhum follow-up registrado no período escolhido.</div>';
  var W=880,H=280,padL=40,padR=20,padT=20,padB=54;
  var max=Math.max.apply(null,keys.map(function(k){return buckets[k];}));
  var step=(W-padL-padR)/keys.length;
  var bw=Math.min(46,step*.6);
  var bars='',labels='',grid='',tips=[];
  var pulo=Math.ceil(keys.length/14);
  keys.forEach(function(k,i){
    var cx=padL+step*i+step/2;
    var h=(buckets[k]/max)*(H-padT-padB);
    bars+='<rect x="'+(cx-bw/2)+'" y="'+(H-padB-h)+'" width="'+bw+'" height="'+h+'" rx="5" fill="var(--b600)" opacity=".85" class="lp-big-bar lp-hit" style="animation-delay:'+(i*38)+'ms" onmousemove="lpTip(event,'+i+')" onmouseleave="lpTipHide()"/>';
    if(i%pulo===0){
      var lbl=porMes?lpMonthLabel(k):(k.slice(8)+'/'+k.slice(5,7));
      labels+='<text x="'+cx+'" y="'+(H-padB+16)+'" text-anchor="end" font-size="9" fill="var(--t3)" transform="rotate(-40 '+cx+' '+(H-padB+16)+')">'+e(lbl)+'</text>';
    }
    tips.push('<b>'+e(porMes?lpMonthLabel(k):formatDate(k))+'</b>'+buckets[k]+' follow-up'+(buckets[k]===1?'':'s'));
  });
  [0,Math.round(max/2),max].forEach(function(v){
    var y=H-padB-(v/max)*(H-padT-padB);
    grid+='<line x1="'+padL+'" y1="'+y+'" x2="'+(W-padR)+'" y2="'+y+'" stroke="var(--bd)" stroke-width="1"/>'
      +'<text x="'+(padL-8)+'" y="'+(y+3)+'" text-anchor="end" font-size="9" fill="var(--t3)">'+v+'</text>';
  });
  window._lpTipRows=tips;
  var html='<div class="lp-legend"><span><i style="background:var(--b600)"></i>Follow-ups '+(porMes?'por mês':'por dia')+'</span></div>';
  html+='<div style="overflow-x:auto;position:relative"><svg viewBox="0 0 '+W+' '+H+'" style="width:100%;min-width:640px;height:'+H+'px">'+grid+bars+labels+'</svg></div>';
  return html;
}
function lpCovChartAnalista(log){
  var by={};
  log.forEach(function(x){
    if(!by[x.uid])by[x.uid]={name:x.name,n:0,clientes:{}};
    by[x.uid].n++;by[x.uid].clientes[x.slug]=true;
  });
  var rows=Object.keys(by).map(function(k){var b=by[k];return{name:b.name,n:b.n,cli:Object.keys(b.clientes).length};})
    .sort(function(x,y){return y.n-x.n;});
  if(!rows.length)return'<div class="lp-empty-box">Nenhum follow-up registrado no período escolhido.</div>';
  var max=rows[0].n||1;
  var tot=rows.reduce(function(a,r){return a+r.n;},0)||1;
  var tips=[];
  var html='<div class="lp-legend"><span><i style="background:var(--b600)"></i>Follow-ups no período</span></div><div class="lp-hbars">';
  rows.forEach(function(r,i){
    tips.push('<b>'+e(r.name)+'</b>'+r.n+' follow-up'+(r.n===1?'':'s')+'<br>'+r.cli+' cliente'+(r.cli===1?'':'s')+' diferente'+(r.cli===1?'':'s')+'<br>'+Math.round(r.n/tot*100)+'% dos follows do time');
    html+='<div class="lp-hbar-row">'
      +'<span class="lp-hbar-name">'+e(r.name)+'</span>'
      +'<span class="lp-hbar-track"><i class="lp-hbar-fill lp-cov-fill lp-hit" style="width:'+(r.n/max*100)+'%;animation-delay:'+(i*55)+'ms" onmousemove="lpTip(event,'+i+')" onmouseleave="lpTipHide()"></i></span>'
      +'<span class="lp-hbar-val">'+r.n+'</span>'
      +'<span class="lp-hbar-mrr">'+r.cli+' cliente'+(r.cli===1?'':'s')+'</span></div>';
  });
  window._lpTipRows=tips;
  html+='</div>';
  return html;
}
function lpCovBigOverlay(teamClients){
  if(!S.lpCovBig)return'';
  var r=periodRange('cov');
  var log=lpFollowLog(teamClients);
  var opts=lpCovAnalystOptions(teamClients);
  var sel=lpCovAnalysts();
  var modo=S.lpCovMode||'lista';
  var clientes={};log.forEach(function(x){clientes[x.slug]=true;});
  var nCli=Object.keys(clientes).length;
  var html='<div class="modal-ov" onclick="if(event.target===this)lpCloseCovBig()">';
  html+='<div class="modal-box lp-big-box" style="max-width:1000px">';
  html+='<div class="modal-hdr"><div><h2 class="modal-title" style="margin:0">Follow-ups do time</h2>'
    +'<div class="muted" style="font-size:12px;margin-top:2px">'+e(r.labelLong||r.label)+' · '
    +log.length+' follow-up'+(log.length===1?'':'s')+' · '+nCli+' cliente'+(nCli===1?'':'s')+'</div></div>'
    +'<button class="modal-close press" onclick="lpCloseCovBig()">Fechar</button></div>';
  html+='<div class="lp-cov-filter"><span class="lp-cov-filter-lbl">Analistas</span><div class="lp-chips-row">';
  html+='<button class="wiz-chip'+(!sel.length?' on':'')+'" onclick="lpCovAllAnalysts()">Todos</button>';
  opts.forEach(function(o){
    var on=sel.indexOf(o.uid)>=0;
    html+='<button class="wiz-chip'+(on?' on':'')+'" onclick="lpToggleCovAnalyst(\''+jsq(o.uid)+'\')">'
      +(on?svgIcon('check',11)+' ':'')+e(o.name)+' <span class="lp-cov-chip-n">'+o.n+'</span></button>';
  });
  if(!opts.length)html+='<span class="lp-note">Nenhum analista com follow-up no período.</span>';
  html+='</div></div>';
  html+='<div class="lp-chart-bar"><div class="lp-seg">'
    +'<button class="'+(modo==='lista'?'on':'')+'" onclick="lpSetCovMode(\'lista\')">Lista</button>'
    +'<button class="'+(modo==='tempo'?'on':'')+'" onclick="lpSetCovMode(\'tempo\')">'+(r.days>62?'Por mês':'Por dia')+'</button>'
    +'<button class="'+(modo==='analista'?'on':'')+'" onclick="lpSetCovMode(\'analista\')">Por analista</button></div>'
    +'<button class="btn btn-sm press" onclick="lpExportCov()">'+svgIcon('share',13)+' Exportar</button></div>';
  html+='<div class="lp-chart-swap" data-mode="'+modo+'"><div class="lp-chart-host">';
  if(modo==='tempo')html+=lpCovChartTempo(log);
  else if(modo==='analista')html+=lpCovChartAnalista(log);
  else html+=lpCovLista(log);
  html+='<div id="lp-tip" class="lp-tip"></div></div></div>';
  html+='<div class="lp-big-foot">';
  html+='<div class="lp-kv"><span>Média por dia no período</span><strong>'
    +(log.length/Math.max(1,r.days)).toFixed(1).replace('.',',')+' follow-ups</strong></div>';
  html+='<div class="lp-kv"><span>Analistas com follow no período</span><strong>'+opts.length+'</strong></div>';
  html+='</div></div></div>';
  return html;
}
function lpExportCov(){
  var teamClients=lpFlatten(lpTeamGroups());
  var log=lpFollowLog(teamClients);
  var r=periodRange('cov');
  var sel=lpCovAnalysts();
  var out=[];
  out.push(['Follow-ups do time']);
  out.push(['Período',r.labelLong||r.label]);
  out.push(['Gerado em',new Date().toLocaleString('pt-BR')]);
  out.push(['Filtro de analistas',sel.length
    ?lpCovAnalystOptions(teamClients).filter(function(o){return sel.indexOf(o.uid)>=0;}).map(function(o){return o.name;}).join(', ')
    :'todos']);
  out.push([]);
  out.push(['Data','Analista','Sigla do cliente','Empresa/Conta','Tipo de follow','Analista veio do cadastro?']);
  log.forEach(function(x){out.push([formatDate(x.date),x.name,x.slug,x.clientName,x.tipo,x.herdado?'sim':'não']);});
  out.push([]);
  out.push(['POR ANALISTA']);
  out.push(['Analista','Follow-ups','Clientes distintos']);
  var by={};
  log.forEach(function(x){if(!by[x.uid])by[x.uid]={name:x.name,n:0,cli:{}};by[x.uid].n++;by[x.uid].cli[x.slug]=true;});
  Object.keys(by).map(function(k){return by[k];}).sort(function(a,b){return b.n-a.n;})
    .forEach(function(b){out.push([b.name,b.n,Object.keys(b.cli).length]);});
  baixarCSV('followups-time-'+hojeArquivo()+'.csv',out);
}
// ── Area principal: o time ──
function lpSetViewMode(m){S.lpViewMode=m;S.lpPage={};render();}
// A carteira de cada analista, ja com os filtros da tela aplicados.
function lpAnalystRows(){
  var groups=lpTeamGroups();
  var out=[];
  var q=(S.lpSearch||'').trim().toLowerCase();
  Object.keys(groups).forEach(function(uid){
    if(S.lpFilters.analyst.length&&S.lpFilters.analyst.indexOf(uid)<0)return;
    var user=(S.allUsers||[]).find(function(x){return x.uid===uid;});
    // A busca vale pros dois lados: bateu no nome do analista, a carteira dele
    // inteira aparece; senão, filtra cliente a cliente pela sigla.
    var byAnalyst=!!(q&&user&&normTxt(user.name).indexOf(normTxt(q))>=0);
    var cs=byAnalyst?groups[uid].slice():lpFilteredClients(groups[uid]);
    if(byAnalyst)cs=cs.filter(function(c){
      var f=S.lpFilters;
      if(f.cat.length&&f.cat.indexOf(c.categoria)<0)return false;
      if(f.plan.length&&f.plan.indexOf(c.plan)<0)return false;
      return!c.archived;
    });
    if(!cs.length)return;
    var risk=0,warn=0,ok=0;
    cs.forEach(function(c){var h=hl(calcScore(c));if(h==='risk')risk++;else if(h==='warn')warn++;else ok++;});
    // A faixa clicada no trilho filtra ANALISTAS: fica quem tem cliente nela.
    if(S.lpBand==='risk'&&!risk)return;
    if(S.lpBand==='warn'&&!warn)return;
    if(S.lpBand==='ok'&&!ok)return;
    if(S.lpMrrSort==='desc')cs=cs.slice().sort(function(a,b){return(parseFloat(b.mrr)||0)-(parseFloat(a.mrr)||0);});
    else if(S.lpMrrSort==='asc')cs=cs.slice().sort(function(a,b){return(parseFloat(a.mrr)||0)-(parseFloat(b.mrr)||0);});
    var u=(S.allUsers||[]).find(function(x){return x.uid===uid;})||{name:'ID:'+uid.slice(0,6)};
    var score=Math.round(cs.reduce(function(a,c){return a+calcScore(c);},0)/cs.length);
    var r=lpPeriodRange();
    var before=teamScoreAt(cs,r.fromISO),nowS=teamScoreAt(cs,r.toISO);
    var goals=tdForUser(u);
    var months=lpPeriodMonths();
    var fu=goals&&months.length?tdAttainment('followReal','followMeta',months,[goals]):null;
    out.push({
      oid:uid,cs:cs,analyst:u,
      mrr:cs.reduce(function(a,c){return a+(parseFloat(c.mrr)||0);},0),
      score:score,band:hl(score),
      delta:(nowS!==null&&before!==null)?nowS-before:null,
      risk:risk,warn:warn,ok:ok,
      churn:cs.filter(isChurnAlert).length,
      inad:cs.filter(isInadimplente).length,
      loop:cs.filter(isLoopOpen).length,
      atrasados:cs.filter(function(c){var s=fuSt(c);return s.days!==null&&s.days<0;}).length,
      semContato:cs.filter(function(c){var d=getDaysWithoutContact(c);return d!==null&&d>=30;}).length,
      fu:fu,
      isOpen:!!(S.expandedAnalysts&&S.expandedAnalysts[uid])
    });
  });
  out.sort(function(a,b){return String(a.analyst.name||'').localeCompare(String(b.analyst.name||''));});
  return out;
}
function lpBandColor(b){return b==='risk'?'var(--rd600)':(b==='warn'?'var(--am600)':'var(--gn600)');}
function lpDeltaHTML(d){
  if(d===null||d===undefined)return'<span class="muted" style="font-size:11px">—</span>';
  if(d===0)return'<span style="font-size:11px;color:var(--t3)">0</span>';
  var up=d>0;
  return'<span style="font-size:11px;font-weight:600;color:'+(up?'var(--gn600)':'var(--rd600)')+'">'+(up?'+':'')+d+'</span>';
}
function lpAlertChips(r){
  var s='';
  if(r.churn)s+='<span class="lp-chip lp-chip-red">'+r.churn+' churn</span>';
  if(r.loop)s+='<span class="lp-chip lp-chip-amber">'+r.loop+' loop</span>';
  if(r.inad)s+='<span class="lp-chip lp-chip-amber">'+r.inad+' inadimp.</span>';
  if(r.atrasados)s+='<span class="lp-chip lp-chip-red">'+r.atrasados+' atrasado'+(r.atrasados===1?'':'s')+'</span>';
  return s;
}
// Card do analista: anel de score, distribuicao, dois numeros e a carteira.
function lpAnalystCardHTML(r){
  var col=lpBandColor(r.band);
  var tot=Math.max(1,r.cs.length);
  var p=function(n){return(n/tot*100).toFixed(1);};
  var html='<div class="lp-a-card'+(r.isOpen?' open':'')+'">';
  html+='<button class="lp-a-head press" onclick="toggleAnalyst(\''+jsq(r.oid)+'\')">'
    +'<span class="lp-a-av">'+avatarHTML(r.analyst,32)+'</span>'
    +'<span class="lp-a-id"><span class="lp-a-name">'+e(r.analyst.name)+'</span>'
    +'<span class="lp-a-meta">'+(r.analyst.title?e(String(r.analyst.title).replace(/^Analista de Sucesso do Cliente\s*/i,''))+' · ':'')+r.cs.length+' cliente'+(r.cs.length===1?'':'s')+' · '+formatMRR(r.mrr)+'</span></span>'
    +'<span class="lp-a-caret">'+(r.isOpen?'▴':'▾')+'</span></button>';
  html+='<div class="lp-a-body">';
  html+='<div class="lp-ring" style="background:conic-gradient('+col+' 0 '+r.score+'%,var(--surf3) '+r.score+'% 100%)">'
    +'<span class="lp-ring-in"><b class="score-num-live" data-score="'+r.score+'" style="color:'+col+'">'+r.score+'</b><i>score</i></span></div>';
  html+='<div class="lp-a-right">'+lpDeltaHTML(r.delta)+'<span class="lp-a-period"> no período</span>';
  html+='<div class="lp-tri" style="margin-top:9px">'
    +(r.risk?'<div style="width:'+p(r.risk)+'%;background:var(--rd600)"></div>':'')
    +(r.warn?'<div style="width:'+p(r.warn)+'%;background:var(--am600)"></div>':'')
    +(r.ok?'<div style="width:'+p(r.ok)+'%;background:var(--gn600)"></div>':'')+'</div>';
  html+='<div class="lp-note" style="margin-top:5px">'+r.risk+' críticos · '+r.warn+' atenção · '+r.ok+' estáveis</div>';
  html+='</div></div>';
  html+='<div class="lp-a-stats">'
    +'<div><b style="color:'+(r.fu&&r.fu.pct<80?'var(--rd600)':(r.fu?'var(--gn600)':'var(--t3)'))+'">'
      +(r.fu?'<span class="lp-fu-frac">'+r.fu.real+'/'+r.fu.meta+'</span> '+r.fu.pct+'%':'—')+'</b><span>Meta de follow</span></div>'
    +'<div><b style="color:'+(r.semContato?'var(--rd600)':'var(--t)')+'">'+r.semContato+'</b><span>Sem contato 30d+</span></div></div>';
  var chips=lpAlertChips(r);
  if(chips)html+='<div class="lp-a-alerts">'+chips+'</div>';
  html+='<div class="analyst-clients'+(r.isOpen?' open':'')+'"><div><div class="lp-cli-wrap">'+lpClientTable(r.cs,r.oid,'cards')+'</div></div></div>';
  html+='</div>';
  return html;
}
// Linha da lista: mesma informacao, densa. Nao vira card ao clicar — a lista
// abre a carteira na propria lista, do jeito que ja funcionava.
function lpAnalystListHTML(r){
  var col=lpBandColor(r.band);
  var html='<div class="lp-l-row'+(r.isOpen?' open':'')+'">';
  html+='<button class="lp-l-head press" onclick="toggleAnalyst(\''+jsq(r.oid)+'\')">'
    +'<span class="lp-l-c lp-l-who">'+avatarHTML(r.analyst,32)
    +'<span class="lp-a-id"><span class="lp-a-name">'+e(r.analyst.name)+'</span>'
    +'<span class="lp-a-meta">'+(r.analyst.title?e(String(r.analyst.title).replace(/^Analista de Sucesso do Cliente\s*/i,''))+' · ':'')+formatMRR(r.mrr)+'</span></span></span>'
    +'<span class="lp-l-c"><b style="font-size:17px;color:'+col+'" class="score-num-live" data-score="'+r.score+'">'+r.score+'</b></span>'
    +'<span class="lp-l-c">'+lpDeltaHTML(r.delta)+'</span>'
    +'<span class="lp-l-c"><b style="font-size:12px;color:'+(r.fu&&r.fu.pct<80?'var(--rd600)':(r.fu?'var(--gn600)':'var(--t3)'))+'">'+(r.fu?r.fu.pct+'%':'—')+'</b></span>'
    +'<span class="lp-l-c"><b style="font-size:12px;color:'+(r.semContato?'var(--rd600)':'var(--t3)')+'">'+r.semContato+'</b></span>'
    +'<span class="lp-l-c lp-l-alerts">'+(lpAlertChips(r)||'<span class="muted" style="font-size:11px">—</span>')+'</span>'
    +'</button>';
  // O padding vai num nível a mais: dentro de grid-template-rows:0fr o padding
  // do filho direto não colapsa e deixaria uma faixa visível com a linha fechada.
  html+='<div class="analyst-clients'+(r.isOpen?' open':'')+'"><div><div class="lp-cli-wrap">'+lpClientTable(r.cs,r.oid,'list')+'</div></div></div>';
  html+='</div>';
  return html;
}
function leaderVisaoGeral(){
  var groups=lpTeamGroups();
  var teamClients=lpFlatten(groups);
  // Três colunas pra caber tudo numa tela só: contexto do time à esquerda,
  // o time no meio, o que precisa de ação à direita. Sem rolar pra descobrir
  // que existe um alerta.
  var html='<div class="lp-grid">';
  html+='<aside class="lp-rail">';
  html+=lpScoreCard(teamClients);
  html+=lpChurnCard(teamClients);
  html+='</aside>';
  html+='<section class="lp-main">';
  var rows=lpAnalystRows();
  var totalA=Object.keys(groups).length;
  var viewMode=S.lpViewMode==='cards'?'cards':'list';
  var catLabels={elite:'Elite',gold:'Gold / High Value',silver:'Silver / Core A-B',bronze:'Bronze / Pareto'};
  // Todo o bloco "Time" dentro de um card branco, igual aos outros tópicos.
  html+='<div class="lp-team-card">';
  // Tudo alinhado à esquerda, na mesma coluna da lista — nada escapa pro lado.
  html+='<div class="lp-main-head"><span class="lp-h2">Time</span>'
    +'<span class="lp-sub">'+rows.length+' de '+totalA+' analista'+(totalA===1?'':'s')+'</span></div>';
  html+='<div class="lp-toolbar2">';
  html+='<input type="text" id="lp-search-input" class="lp-search" placeholder="Buscar analista ou cliente" value="'+e(S.lpSearch)+'" oninput="lpSetSearch(this.value)">';
  html+='<div style="position:relative"><button class="lp-pill press'+(S.lpFilters.cat.length?' on':'')+'" onclick="lpTogglePop(\'cat\')">'
    +(S.lpFilters.cat.length?S.lpFilters.cat.map(function(k){return catLabels[k];}).join(', '):'Todas as categorias')+' <span style="font-size:9px">▾</span></button>'
    +(S.lpOpenPop==='cat'?lpFilterPopover('cat',['elite','gold','silver','bronze'],function(v){return catLabels[v];}):'')+'</div>';
  html+='<div class="lp-seg"><button class="'+(viewMode==='list'?'on':'')+'" onclick="lpSetViewMode(\'list\')">Lista</button>'
    +'<button class="'+(viewMode==='cards'?'on':'')+'" onclick="lpSetViewMode(\'cards\')">Cards</button></div>';
  html+='<span class="lp-tb-gap"></span>';
  html+='<button class="btn btn-sm press" onclick="openLeaderNewClient()">+ Novo cliente</button>';
  html+='<button class="btn-primary btn-sm press" onclick="openClientImport()">Importar clientes</button>';
  html+='</div>';
  // Filtros ativos numa linha própria, embaixo, pra não empurrar a barra.
  var chips='';
  if(S.lpBand){
    var bl={risk:'Com clientes críticos',warn:'Com clientes em atenção',ok:'Com clientes estáveis'}[S.lpBand];
    chips+='<button class="lp-filter-chip press" onclick="lpClearBand()">'+e(bl)+' <span>×</span></button>';
  }
  if(S.lpSearch)chips+='<button class="lp-filter-chip press" onclick="lpSetSearch(\'\')">Busca: '+e(S.lpSearch)+' <span>×</span></button>';
  if(chips)html+='<div class="lp-chips-row">'+chips+'</div>';
  if(!Object.keys(groups).length){
    html+='<div class="lp-empty-box">Nenhum analista sob sua gestão ainda.</div>';
  }else if(!rows.length){
    html+='<div class="lp-empty-box">Nenhum analista encontrado com os filtros atuais.</div>';
  }else if(viewMode==='cards'){
    html+='<div class="lp-a-grid fade-rise">'+rows.map(lpAnalystCardHTML).join('')+'</div>'+lpPageSizeControl();
  }else{
    html+='<div class="lp-l-table fade-rise"><div class="lp-l-hdr">'
      +'<span>Analista</span><span>Score</span><span>No período</span><span>Meta follow</span><span>Sem contato</span><span>Alertas</span></div>'
      +rows.map(lpAnalystListHTML).join('')+'</div>'+lpPageSizeControl();
  }
  html+='</div>';
  html+='</section>';
  html+='<aside class="lp-side2">'+lpQueueCard(teamClients)+lpCoverageCard(teamClients)+'</aside>';
  html+='</div>';
  html+=lpChurnBigOverlay(teamClients);
  html+=lpCovBigOverlay(teamClients);
  return html;
}
function leaderPanelView(){
  var t=lpFlatten(lpTeamGroups());
  var mrr=t.reduce(function(a,c){return a+(parseFloat(c.mrr)||0);},0);
  return'<div class="lp-title-row"><div><h1 class="lp-title">Painel do líder</h1>'
    +'<div class="lp-sub">'+Object.keys(lpTeamGroups()).length+' analistas · '+t.length+' clientes · '+formatMRR(mrr)+' de MRR sob gestão</div></div></div>'
    +leaderVisaoGeral();
}

// ============================================================
// CRIACAO DE USUARIO E PERFIL
// ============================================================
var USER_TITLES=['Analista de Sucesso do Cliente Júnior','Analista de Sucesso do Cliente Pleno','Analista de Sucesso do Cliente Sênior','Líder de Customer Success','Gerente de Customer Success'];
// Senha gerada pelo sistema: mostrada uma unica vez na tela de confirmacao e nunca
// guardada em texto puro. Se o analista perder, o admin gera outra.
function genPassword(){
  var up='ABCDEFGHJKLMNPQRSTUVWXYZ',lo='abcdefghijkmnopqrstuvwxyz',nu='23456789',sy='!@#$%&*';
  var all=up+lo+nu+sy,out=[];
  function pick(set){return set[Math.floor(Math.random()*set.length)];}
  out.push(pick(up),pick(lo),pick(nu),pick(sy));
  while(out.length<14)out.push(pick(all));
  for(var i=out.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=out[i];out[i]=out[j];out[j]=t;}
  return out.join('');
}
// Redimensiona a imagem no navegador antes de subir (foto de perfil nao precisa
// de mais de 256px, e assim o upload é instantâneo).
function resizeImageFile(file,max){
  return new Promise(function(res,rej){
    if(!file){res('');return;}
    if(!/^image\//.test(file.type)){rej(new Error('O arquivo selecionado não é uma imagem.'));return;}
    var r=new FileReader();
    r.onerror=function(){rej(new Error('Não foi possível ler o arquivo.'));};
    r.onload=function(){
      var img=new Image();
      img.onerror=function(){rej(new Error('Imagem inválida ou corrompida.'));};
      img.onload=function(){
        var sc=Math.min(1,(max||256)/Math.max(img.width,img.height));
        var cw=Math.max(1,Math.round(img.width*sc)),chh=Math.max(1,Math.round(img.height*sc));
        var cv=document.createElement('canvas');cv.width=cw;cv.height=chh;
        var ctx=cv.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,cw,chh);
        ctx.drawImage(img,0,0,cw,chh);
        res(cv.toDataURL('image/jpeg',.85));
      };
      img.src=r.result;
    };
    r.readAsDataURL(file);
  });
}
// Nenhuma etapa de rede pode pendurar a tela pra sempre: se estourar o tempo,
// o erro aparece e o botao volta a funcionar.
function withTimeout(p,ms,label){
  return Promise.race([
    Promise.resolve(p),
    new Promise(function(_,rej){setTimeout(function(){rej(new Error('Tempo esgotado ao '+label+'. Verifique a conexão e tente de novo.'));},ms);})
  ]);
}
// A foto vai EMBUTIDA no perfil (uns 20KB depois de reduzida) e só depois, em
// segundo plano, o sistema tenta movê-la pro Storage. Se o bucket não estiver
// liberado, o SDK do Storage fica retentando calado por minutos — por isso ele
// nunca entra no caminho crítico de criar usuário ou salvar perfil.
async function upgradeAvatarToStorage(uidVal,dataUrl){
  if(!storage||!dataUrl||dataUrl.indexOf('data:')!==0)return;
  try{
    var ref=storage.ref('avatars/'+uidVal+'.jpg');
    await withTimeout(ref.putString(dataUrl,'data_url',{contentType:'image/jpeg'}),15000,'subir a foto');
    var url=await withTimeout(ref.getDownloadURL(),15000,'obter o link da foto');
    await withTimeout(db.collection('users').doc(uidVal).update({photo:url}),15000,'salvar o link da foto');
    var u=(S.allUsers||[]).find(function(x){return x.uid===uidVal;});
    if(u)u.photo=url;
    if(S.appUser&&S.appUser.uid===uidVal)S.appUser.photo=url;
  }catch(err){
    console.warn('Foto ficou embutida no perfil (Storage indisponível):',err);
  }
}
function udInit(){S.userDraft={name:'',email:'',role:'analyst',title:'',photo:''};}
function udSet(field,val){if(!S.userDraft)udInit();S.userDraft[field]=val;}
async function udPickPhoto(input){
  var file=input&&input.files&&input.files[0];if(!file)return;
  try{S.userDraft.photo=await resizeImageFile(file,256);render();}
  catch(err){alert(err.message);}
}
function mAddUser(){
  if(!S.userDraft)udInit();
  var d=S.userDraft;
  var av=d.photo?'<img src="'+d.photo+'" style="width:56px;height:56px;border-radius:50%;object-fit:cover">':'<div class="pf-ph">'+e((d.name||'?')[0].toUpperCase())+'</div>';
  return'<div class="modal-box" style="max-width:480px"><div class="modal-title">Criar acesso de usuário</div>'
    +'<div class="import-tip">O sistema cria a conta e gera uma senha aleatória. A senha aparece uma única vez na tela seguinte — copie e envie pro analista. Ele entra direto com e-mail e senha, sem precisar de conta Google.</div>'
    +'<div style="display:flex;align-items:center;gap:14px;margin-bottom:14px">'+av
    +'<div><label class="btn btn-sm" style="cursor:pointer;display:inline-block">Escolher foto<input type="file" accept="image/*" style="display:none" onchange="udPickPhoto(this)"></label>'
    +(d.photo?'<button class="btn btn-sm" style="margin-left:6px" onclick="udSet(\'photo\',\'\');render()">Remover</button>':'')
    +'<div class="muted" style="font-size:11px;margin-top:4px">Opcional. A imagem é reduzida automaticamente.</div></div></div>'
    +'<div class="form-row"><label class="form-lbl">Nome completo <span style="color:var(--rd)">*</span></label><input type="text" value="'+e(d.name)+'" placeholder="Ex: Maria Beatriz" oninput="udSet(\'name\',this.value)"></div>'
    +'<div class="form-row"><label class="form-lbl">E-mail de acesso <span style="color:var(--rd)">*</span></label><input type="text" value="'+e(d.email)+'" placeholder="maria@stays.net" oninput="udSet(\'email\',this.value)"></div>'
    +'<div class="form-row"><label class="form-lbl">Título</label><input type="text" list="user-titles" value="'+e(d.title)+'" placeholder="Ex: Analista de Sucesso do Cliente Pleno" oninput="udSet(\'title\',this.value)"><datalist id="user-titles">'+USER_TITLES.map(function(t){return'<option>'+e(t)+'</option>';}).join('')+'</datalist></div>'
    +'<div class="form-row"><label class="form-lbl">Função</label><select onchange="udSet(\'role\',this.value)"><option value="analyst"'+(d.role==='analyst'?' selected':'')+'>Analista</option><option value="leader"'+(d.role==='leader'?' selected':'')+'>Supervisor</option><option value="gerente"'+(d.role==='gerente'?' selected':'')+'>Gerente</option><option value="testuser"'+(d.role==='testuser'?' selected':'')+'>Usuário teste</option></select></div>'
    +'<div class="flex" style="justify-content:flex-end;gap:8px;margin-top:1.25rem"><button class="btn" onclick="closeMSoft()">Cancelar</button><button class="btn-primary" onclick="createUserAccount(this)">Criar acesso</button></div></div>';
}
async function createUserAccount(btn){
  var d=S.userDraft||{};
  var name=(d.name||'').trim(),email=(d.email||'').trim().toLowerCase();
  if(!name){alert('Informe o nome completo.');return;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){alert('Informe um e-mail válido.');return;}
  if(!emailPermitido(email)){alert('Este e-mail não tem permissão de acesso ao dashboard.\n\nSó e-mails @stays.net podem entrar. Corrija o e-mail antes de criar o acesso.');return;}
  if(S.allUsers.some(function(u){return(u.email||'').toLowerCase()===email;})){alert('Já existe um usuário com esse e-mail.');return;}
  if(btn){btn.disabled=true;btn.textContent='Criando...';}
  var pw=genPassword();
  var secondary=null;
  try{
    // App secundário: cria a conta sem derrubar a sessão do admin logado.
    secondary=firebase.apps.find(function(a){return a.name==='userCreator';})||firebase.initializeApp(firebaseConfig,'userCreator');
    var cred=await withTimeout(secondary.auth().createUserWithEmailAndPassword(email,pw),20000,'criar a conta de login');
    var newUid=cred.user.uid;
    // Foto entra embutida; a subida pro Storage acontece depois, sem segurar a tela.
    var profile={name:name,email:email,photo:d.photo||'',title:(d.title||'').trim(),role:d.role||'analyst',managedUsers:[],createdAt:new Date().toISOString(),createdBy:S.appUser.uid,createdByName:S.appUser.name};
    await withTimeout(db.collection('users').doc(newUid).set(profile),20000,'salvar o perfil no banco');
    try{await withTimeout(secondary.auth().signOut(),8000,'encerrar a sessão temporária');}catch(errOut){console.warn(errOut);}
    addAdminLog('user_created',{targetName:name,targetEmail:email,newRole:profile.role});
    try{await withTimeout(loadAllUsers(),15000,'atualizar a lista de usuários');}catch(errList){console.warn(errList);}
    upgradeAvatarToStorage(newUid,d.photo);
    S.userDraft=null;
    S.newUserCreds={name:name,email:email,password:pw,role:profile.role};
    S.modal='user-created';render();
  }catch(err){
    console.error('createUserAccount:',err);
    if(err.code==='auth/email-already-in-use'){
      // Acontece quando uma tentativa anterior criou o login mas não chegou a
      // salvar o perfil. A senha daquela tentativa se perdeu, então o caminho é
      // o próprio usuário definir a dele pelo e-mail de redefinição.
      if(confirm('Já existe uma conta de login com '+email+', mas sem perfil no dashboard — provavelmente de uma tentativa anterior que falhou no meio.\n\nQuer enviar um e-mail de definição de senha para '+email+'?\n\nA pessoa escolhe a própria senha, entra no dashboard e aparece aqui como Pendente para você aprovar.')){
        try{
          await withTimeout(auth.sendPasswordResetEmail(email),15000,'enviar o e-mail');
          addAdminLog('user_password_reset',{targetName:name,targetEmail:email});
          alert('E-mail enviado para '+email+'.\n\nAssim que a pessoa definir a senha e entrar, ela aparece na lista como Pendente.');
          S.userDraft=null;closeM();return;
        }catch(errMail){alert('Não foi possível enviar o e-mail: '+errMail.message);}
      }
    }else{
      alert(err.code==='auth/weak-password'?'A senha gerada foi rejeitada. Tente novamente.':'Não foi possível criar o acesso: '+err.message);
    }
    if(btn){btn.disabled=false;btn.textContent='Criar acesso';}
  }
}
function mUserCreated(){
  var c=S.newUserCreds||{};
  return'<div class="modal-box" style="max-width:460px"><div class="modal-title">Acesso criado</div>'
    +'<p class="muted" style="margin-bottom:12px"><strong>'+e(c.name)+'</strong> já pode entrar no dashboard. Copie os dados abaixo e envie pra ela/ele.</p>'
    +'<div class="cred-box"><div class="cred-row"><span class="cred-lbl">E-mail</span><code>'+e(c.email)+'</code></div>'
    +'<div class="cred-row"><span class="cred-lbl">Senha</span><code>'+e(c.password)+'</code></div></div>'
    +'<div class="alert alert-amber" style="margin-top:12px">Esta senha <strong>não será exibida novamente</strong> — o sistema não guarda o texto dela. Se for perdida, gere uma nova na tela de Gestão.</div>'
    +'<div class="flex" style="justify-content:flex-end;gap:8px;margin-top:1.25rem"><button class="btn" onclick="copyCreds(this)">Copiar e-mail e senha</button><button class="btn-primary" onclick="closeUserCreated()">Fechar</button></div></div>';
}
function copyCreds(btn){var c=S.newUserCreds||{};copyFeedback(btn,'Acesso ao Dashboard de CS\n'+window.location.origin+'\nE-mail: '+c.email+'\nSenha: '+c.password);}
function closeUserCreated(){S.newUserCreds=null;closeM();}
async function resetUserPassword(uid){
  var u=S.allUsers.find(function(x){return x.uid===uid;});if(!u)return;
  if(!canEditUserRole(u))return;
  if(!confirm('Enviar e-mail de redefinição de senha para '+u.email+'?\n\nO próprio usuário escolhe a nova senha pelo link recebido.'))return;
  try{
    await auth.sendPasswordResetEmail(u.email);
    addAdminLog('user_password_reset',{targetName:u.name,targetEmail:u.email});
    alert('E-mail de redefinição enviado para '+u.email+'.');
  }catch(err){alert('Não foi possível enviar: '+err.message);}
}
// ── Menu de perfil (canto superior direito) ──
function toggleProfileMenu(ev){if(ev)ev.stopPropagation();S.profileMenuOpen=!S.profileMenuOpen;render();}
function closeProfileMenu(){S.profileMenuOpen=false;render();}
function avatarHTML(u,size){
  var s=size||30;
  if(u&&u.photo)return'<img src="'+e(u.photo)+'" style="width:'+s+'px;height:'+s+'px;border-radius:50%;object-fit:cover;display:block" referrerpolicy="no-referrer">';
  return'<span class="pf-initial" style="width:'+s+'px;height:'+s+'px;font-size:'+Math.round(s*.42)+'px">'+e(((u&&u.name)||'?')[0].toUpperCase())+'</span>';
}
function openProfile(){S.profileMenuOpen=false;openUserProfileEditor(S.appUser.uid);}
// Mesmo editor serve pro proprio perfil e pro perfil de outro usuario (admin/gerente).
function openUserProfileEditor(uidVal){
  var u=uidVal===S.appUser.uid?S.appUser:(S.allUsers||[]).find(function(x){return x.uid===uidVal;});
  if(!u||!canEditUserProfile(u))return;
  S.profileMenuOpen=false;
  S.profileDraft={uid:u.uid,email:u.email||'',isSelf:u.uid===S.appUser.uid,name:u.name||'',title:u.title||'',photo:u.photo||''};
  openM('profile');
}
function pdSet(field,val){if(S.profileDraft)S.profileDraft[field]=val;}
async function pdPickPhoto(input){
  var file=input&&input.files&&input.files[0];if(!file)return;
  try{S.profileDraft.photo=await resizeImageFile(file,256);render();}
  catch(err){alert(err.message);}
}
function mProfile(){
  var d=S.profileDraft||{name:'',title:'',photo:'',isSelf:true,email:''};
  var av=d.photo?'<img src="'+d.photo+'" style="width:64px;height:64px;border-radius:50%;object-fit:cover">':'<div class="pf-ph" style="width:64px;height:64px;font-size:24px">'+e((d.name||'?')[0].toUpperCase())+'</div>';
  return'<div class="modal-box" style="max-width:440px"><div class="modal-title">'+(d.isSelf?'Meu perfil':'Editar perfil')+'</div>'
    +(d.isSelf?'':'<div class="import-tip">Você está editando o perfil de outro usuário. Só nome, título e foto — a função e o líder responsável continuam na lista de Gestão.</div>')
    +'<div style="display:flex;align-items:center;gap:14px;margin-bottom:16px">'+av
    +'<div><label class="btn btn-sm" style="cursor:pointer;display:inline-block">Trocar foto<input type="file" accept="image/*" style="display:none" onchange="pdPickPhoto(this)"></label>'
    +(d.photo?'<button class="btn btn-sm" style="margin-left:6px" onclick="pdSet(\'photo\',\'\');render()">Remover</button>':'')
    +'</div></div>'
    +'<div class="form-row"><label class="form-lbl">Nome <span style="color:var(--rd)">*</span></label><input type="text" value="'+e(d.name)+'" oninput="pdSet(\'name\',this.value)"></div>'
    +'<div class="form-row"><label class="form-lbl">Título</label><input type="text" list="user-titles" value="'+e(d.title)+'" placeholder="Ex: Analista de Sucesso do Cliente Pleno" oninput="pdSet(\'title\',this.value)"><datalist id="user-titles">'+USER_TITLES.map(function(t){return'<option>'+e(t)+'</option>';}).join('')+'</datalist></div>'
    +'<div class="form-row"><label class="form-lbl">E-mail</label><input type="text" value="'+e(d.email||'')+'" disabled></div>'
    +'<div class="flex" style="justify-content:flex-end;gap:8px;margin-top:1.25rem"><button class="btn" onclick="closeMSoft()">Cancelar</button><button class="btn-save" onclick="saveProfile(this)">Salvar</button></div></div>';
}
async function saveProfile(btn){
  var d=S.profileDraft;if(!d)return;
  var targetUid=d.uid||S.appUser.uid;
  var target=targetUid===S.appUser.uid?S.appUser:(S.allUsers||[]).find(function(x){return x.uid===targetUid;});
  if(!canEditUserProfile(target)){alert('Você não pode editar o perfil deste usuário.');return;}
  var name=(d.name||'').trim(),title=(d.title||'').trim();
  if(!name){alert('Informe o nome.');return;}
  if(btn){btn.disabled=true;btn.textContent='Salvando...';}
  try{
    var photo=d.photo||'';
    // Salva já com a foto embutida; o Storage é tentado depois, em segundo plano.
    await withTimeout(saveUserProfile(targetUid,{name:name,title:title,photo:photo}),20000,'salvar o perfil');
    if(targetUid===S.appUser.uid){S.appUser.name=name;S.appUser.title=title;S.appUser.photo=photo;}
    var row=(S.allUsers||[]).find(function(u){return u.uid===targetUid;});
    if(row){row.name=name;row.title=title;row.photo=photo;}
    addAdminLog('profile_updated',{targetName:name,self:targetUid===S.appUser.uid});
    // Fecha animado (igual às outras janelas) e só então mostra o "Salvo".
    S.modalDirty=false;S.profileDraft=null;S.savedMsg=true;
    dismissOverlay(function(){S.modal=null;render();setTimeout(function(){S.savedMsg=false;render();},2500);});
    upgradeAvatarToStorage(targetUid,photo);
  }catch(err){alert('Não foi possível salvar o perfil: '+err.message);if(btn){btn.disabled=false;btn.textContent='Salvar';}}
}
// ============================================================
// IMPORTACAO DE CLIENTES POR PLANILHA
// ============================================================
function normTxt(s){return String(s===undefined||s===null?'':s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim();}
var IMPORT_PLAN_ALIAS={'agencia':'agency','administrador':'administrator','profissional':'pro','profissional - old':'pro','pro':'pro','super anfitriao':'superhost','super host':'superhost','agency':'agency','administrator':'administrator'};
var IMPORT_COUNTRY_ALIAS={'colombia':'Colombia','rep. dominicana':'República Dominicana','republica dominicana':'República Dominicana','espanha':'España','peru':'Perú','mexico':'México','bolivia':'Bolivia','panama':'Panama','eua':'Estados Unidos','usa':'Estados Unidos','estados unidos':'Estados Unidos','brasil':'Brasil'};
// Linhas de resumo da planilha (Subtotal / Total) nao sao clientes.
function isSummaryRow(analystRaw){var n=normTxt(analystRaw);return!n||n==='subtotal'||n.indexOf('total')===0;}
function resolveImportPlan(raw){var n=normTxt(raw);return IMPORT_PLAN_ALIAS[n]||'';}
function resolveImportCountry(raw){
  var r=String(raw||'').trim();if(!r)return'';
  if(CS[r])return r;
  var n=normTxt(r);
  if(IMPORT_COUNTRY_ALIAS[n])return IMPORT_COUNTRY_ALIAS[n];
  var hit=Object.keys(CS).find(function(k){return normTxt(k)===n;});
  return hit||r;
}
function resolveImportStatus(raw){var n=normTxt(raw);if(!n)return'';if(n==='completed')return'Completed';if(n==='onboarding'||n.indexOf('andamento')>=0)return'Em andamento';return'';}
// "Caroline Curcio (173)" -> usuario cadastrado. Sem match, o lider atribui na mao.
function matchAnalystByName(raw){
  var n=normTxt(String(raw||'').replace(/\(\s*\d+\s*\)\s*$/,''));
  if(!n)return null;
  var users=S.allUsers||[];
  var exact=users.find(function(u){return normTxt(u.name)===n;});
  if(exact)return exact;
  var parts=n.split(' ');var first=parts[0],last=parts[parts.length-1];
  var fl=users.filter(function(u){var p=normTxt(u.name).split(' ');return p[0]===first&&p[p.length-1]===last;});
  if(fl.length===1)return fl[0];
  var byFirst=users.filter(function(u){return normTxt(u.name).split(' ')[0]===first;});
  if(byFirst.length===1)return byFirst[0];
  return null;
}
function parseDelimited(text){
  var t=String(text||'').replace(/^\uFEFF/,'');
  var firstLine=t.split(/\r?\n/)[0]||'';
  var delim=(firstLine.split('\t').length>firstLine.split(',').length)?'\t':',';
  var rows=[],row=[],cur='',inQ=false;
  for(var i=0;i<t.length;i++){
    var ch=t[i];
    if(inQ){if(ch==='"'){if(t[i+1]==='"'){cur+='"';i++;}else inQ=false;}else cur+=ch;}
    else if(ch==='"')inQ=true;
    else if(ch===delim){row.push(cur);cur='';}
    else if(ch==='\n'){row.push(cur);rows.push(row);row=[];cur='';}
    else if(ch==='\r'){}
    else cur+=ch;
  }
  if(cur!==''||row.length){row.push(cur);rows.push(row);}
  return rows.filter(function(r){return r.some(function(c){return String(c).trim()!=='';});});
}
var CI_COLS=[
  {key:'slug',pats:[/^sigla$/,/sigla/]},
  {key:'name',pats:[/nome da conta/,/^nome$/,/^conta$/,/^cliente$/]},
  {key:'plan',pats:[/^plano$/,/plano/]},
  {key:'country',pats:[/^pais$/,/pais dos anuncios/,/pais/]},
  {key:'units',pats:[/unidades/,/^unid/]},
  {key:'mrr',pats:[/^mrr$/,/mrr/]},
  {key:'status',pats:[/^etapa$/,/onboarding/]},
  {key:'analyst',pats:[/analista de cs/,/^analista$/,/responsavel/]}
];
function ciMapHeader(header){
  var norm=header.map(normTxt);
  var map={};
  CI_COLS.forEach(function(col){
    for(var p=0;p<col.pats.length;p++){
      for(var i=0;i<norm.length;i++){
        var taken=Object.keys(map).some(function(k){return map[k]===i;});
        if(taken)continue;
        if(col.pats[p].test(norm[i])){map[col.key]=i;return;}
      }
    }
  });
  return map;
}
function ciInit(){S.impClients={raw:'',fileName:'',rows:[],parsed:false,error:'',page:0,onlyIssues:false};}
function ciSetRaw(v){if(!S.impClients)ciInit();S.impClients.raw=v;}
function ciPickFile(input){
  var f=input&&input.files&&input.files[0];if(!f)return;
  var r=new FileReader();
  r.onload=function(){S.impClients.raw=String(r.result||'');S.impClients.fileName=f.name;S.impClients.parsed=false;S.impClients.error='';render();};
  r.onerror=function(){alert('Não foi possível ler o arquivo.');};
  r.readAsText(f,'utf-8');
}
function ciParse(){
  var st=S.impClients;
  var raw=(st.raw||'').trim();
  if(!raw){st.error='Cole os dados da planilha ou escolha um arquivo CSV.';render();return;}
  var grid=parseDelimited(raw);
  if(grid.length<2){st.error='Não encontrei linhas de dados suficientes. Inclua a linha de cabeçalho e ao menos um cliente.';render();return;}
  var hIdx=-1;
  for(var i=0;i<Math.min(grid.length,10);i++){if(grid[i].some(function(c){return /sigla/i.test(String(c));})){hIdx=i;break;}}
  if(hIdx<0){st.error='Não encontrei a coluna "Sigla" no cabeçalho. A sigla é obrigatória — ela é o identificador único do cliente.';render();return;}
  var map=ciMapHeader(grid[hIdx]);
  if(map.slug===undefined){st.error='Não consegui identificar a coluna da sigla.';render();return;}
  var seen={},rows=[];
  for(var r=hIdx+1;r<grid.length;r++){
    var line=grid[r];
    var get=function(k){return map[k]!==undefined?String(line[map[k]]||'').trim():'';};
    var slug=get('slug').toUpperCase().replace(/\s+/g,'');
    var analystRaw=get('analyst');
    if(!slug)continue;
    if(isSummaryRow(analystRaw)&&!get('name'))continue;
    var name=get('name')||slug;
    var an=matchAnalystByName(analystRaw);
    var existing=S.clients.find(function(c){return String(c.slug||'').toUpperCase()===slug;});
    var dupFile=!!seen[slug];
    seen[slug]=true;
    var sameName=!existing?S.clients.find(function(c){return normTxt(c.name)===normTxt(name);}):null;
    rows.push({
      slug:slug,name:name,
      plan:resolveImportPlan(get('plan')),planRaw:get('plan'),
      country:resolveImportCountry(get('country')),countryRaw:get('country'),
      units:parseBRNumber(get('units')),mrr:parseBRNumber(get('mrr')),
      status:resolveImportStatus(get('status')),
      analystRaw:analystRaw,ownerId:an?an.uid:'',
      existingId:existing?existing.id:'',
      dup:dupFile?'file':(existing?'db':''),
      sameNameSlug:sameName?(sameName.slug||sameName.name):'',
      action:(dupFile||existing)?'skip':'new'
    });
  }
  if(!rows.length){st.error='Nenhuma linha de cliente válida encontrada (linhas de Subtotal/Total são ignoradas).';render();return;}
  st.rows=rows;st.parsed=true;st.error='';st.page=0;render();
}
function ciSetRow(i,field,val){var row=S.impClients.rows[i];if(!row)return;row[field]=val;render();}
function ciBulkOwner(uidVal){if(!uidVal)return;S.impClients.rows.forEach(function(r){if(!r.ownerId)r.ownerId=uidVal;});render();}
// "Substituir" só existe pra sigla que já está no dashboard. Sigla repetida dentro da
// própria planilha não tem o que substituir — ou pula, ou entra como cliente novo.
function ciBulkDupAction(act){
  if(!act)return;
  S.impClients.rows.forEach(function(r){
    if(!r.dup)return;
    r.action=(act==='replace'&&r.dup!=='db')?'skip':act;
  });
  render();
}
function ciToggleIssues(){S.impClients.onlyIssues=!S.impClients.onlyIssues;S.impClients.page=0;render();}
function ciGoPage(d,max){var p=(S.impClients.page||0)+d;S.impClients.page=Math.max(0,Math.min(max,p));render();}
function ciStats(){
  var rows=(S.impClients&&S.impClients.rows)||[];
  var active=rows.filter(function(r){return r.action!=='skip';});
  return{
    total:rows.length,
    novos:rows.filter(function(r){return r.action==='new';}).length,
    substituir:rows.filter(function(r){return r.action==='replace';}).length,
    pular:rows.filter(function(r){return r.action==='skip';}).length,
    dupDb:rows.filter(function(r){return r.dup==='db';}).length,
    dupFile:rows.filter(function(r){return r.dup==='file';}).length,
    semAnalista:active.filter(function(r){return!r.ownerId;}).length
  };
}
function ciRowIssue(r){
  if(r.action!=='skip'&&!r.ownerId)return'sem-analista';
  if(r.dup==='file')return'dup-file';
  if(r.dup==='db')return'dup-db';
  return'';
}
async function ciConfirm(btn){
  var st=S.impClients,rows=st.rows||[];
  // Rede de segurança: "substituir" sem cliente existente viraria duplicata silenciosa.
  rows.forEach(function(r){if(r.action==='replace'&&!r.existingId)r.action='skip';});
  var todo=rows.filter(function(r){return r.action!=='skip';});
  if(!todo.length){alert('Nenhuma linha marcada para importar.');return;}
  var missing=todo.filter(function(r){return!r.ownerId;});
  if(missing.length){alert(missing.length+' cliente(s) estão sem analista responsável. Atribua um analista para cada um antes de importar.');return;}
  var nRepl=todo.filter(function(r){return r.action==='replace';}).length;
  if(!confirm('Importar '+todo.length+' cliente(s)?\n\n'+nRepl+' vão substituir dados de clientes já existentes (o histórico de follow-ups é preservado).'))return;
  if(btn){btn.disabled=true;btn.textContent='Importando...';}
  var created=0,replaced=0;
  try{
    for(var i=0;i<todo.length;i+=350){
      var chunk=todo.slice(i,i+350);
      var batch=db.batch();
      chunk.forEach(function(r){
        var base;
        if(r.action==='replace'&&r.existingId){
          var ex=S.clients.find(function(c){return c.id===r.existingId;})||{};
          base=Object.assign({},ex);
          replaced++;
        }else{
          base={id:uid(),keyContacts:[],contacts:[],follows:[],activities:[],reminders:[],inadimplencia:[],churnHistory:[]};
          created++;
        }
        base.name=r.name;base.slug=r.slug;
        if(r.country)base.country=r.country;
        if(r.plan)base.plan=r.plan;
        if(r.units!=='')base.units=r.units;
        if(r.mrr!=='')base.mrr=r.mrr;
        if(r.status)base.onboardingStatus=r.status;
        base.ownerId=r.ownerId;
        base.importedAt=Date.now();
        base.importedBy=S.appUser.uid;
        batch.set(db.collection('clients').doc(base.id),JSON.parse(JSON.stringify(base)));
      });
      await batch.commit();
    }
    addAdminLog('clients_imported',{count:todo.length,created:created,replaced:replaced});
    await loadClients();
    S.impClients=null;
    S.view='leaderpanel';
    alert('Importação concluída.\n\n'+created+' cliente(s) criados\n'+replaced+' cliente(s) atualizados');
    render();
  }catch(err){
    console.error('ciConfirm:',err);
    alert('Erro ao importar: '+err.message);
    if(btn){btn.disabled=false;btn.textContent='Importar clientes';}
  }
}
function openClientImport(){if(!confirmDiscardIfDirty())return;ciInit();S.view='import-clients';render();}
function closeClientImport(){S.impClients=null;S.view='leaderpanel';render();}
function ciAnalystOptions(selected){return analystOptionsHTML(selected,'— escolher analista —');}
function clientImportView(){
  if(!S.impClients)ciInit();
  var st=S.impClients;
  var html='<h1 style="font-size:20px;font-family:\'Roboto Slab\',serif;margin-bottom:.35rem">Importar clientes por planilha</h1>';
  html+='<p class="muted" style="margin-bottom:1.25rem;font-size:12.5px">Cole o conteúdo da planilha (Google Sheets ou Excel) ou escolha um arquivo CSV. Nada é salvo até você revisar e confirmar.</p>';
  if(!st.parsed){
    html+='<div class="card">';
    html+='<div class="form-row"><label class="form-lbl">Colar dados da planilha</label>'
      +'<textarea id="ci-raw" rows="10" style="font-family:monospace;font-size:11.5px" placeholder="Analista de CS | Sigla | Nome da conta | Plano | País | Número de unidades | MRR | Etapa" oninput="ciSetRaw(this.value)">'+e(st.raw)+'</textarea></div>';
    html+='<div class="flex" style="gap:10px;align-items:center;flex-wrap:wrap">'
      +'<label class="btn btn-sm" style="cursor:pointer">Escolher arquivo CSV<input type="file" accept=".csv,.tsv,.txt,text/csv" style="display:none" onchange="ciPickFile(this)"></label>'
      +(st.fileName?'<span class="muted" style="font-size:11.5px">'+e(st.fileName)+'</span>':'')
      +'</div>';
    html+='<div class="import-tip" style="margin-top:14px">Colunas usadas: <strong>Sigla</strong> (obrigatória, é o ID único do cliente), Nome da conta, Plano, País, Número de unidades, MRR, Etapa e Analista de CS. Qualquer outra coluna é ignorada. Linhas de Subtotal/Total também são ignoradas.</div>';
    if(st.error)html+='<div class="alert alert-red" style="margin-top:12px">'+e(st.error)+'</div>';
    html+='<div class="flex" style="justify-content:flex-end;gap:8px;margin-top:1rem"><button class="btn" onclick="closeClientImport()">Cancelar</button><button class="btn-primary" onclick="ciParse()">Analisar planilha</button></div>';
    html+='</div>';
    return html;
  }
  var s=ciStats();
  html+='<div class="ci-summary">'
    +'<div class="ci-stat"><span class="ci-stat-val">'+s.total+'</span><span class="ci-stat-lbl">linhas lidas</span></div>'
    +'<div class="ci-stat"><span class="ci-stat-val" style="color:var(--gn600)">'+s.novos+'</span><span class="ci-stat-lbl">novos</span></div>'
    +'<div class="ci-stat"><span class="ci-stat-val" style="color:var(--b600)">'+s.substituir+'</span><span class="ci-stat-lbl">substituir</span></div>'
    +'<div class="ci-stat"><span class="ci-stat-val" style="color:var(--t3)">'+s.pular+'</span><span class="ci-stat-lbl">pular</span></div>'
    +'<div class="ci-stat"><span class="ci-stat-val" style="color:'+(s.semAnalista?'var(--rd600)':'var(--t3)')+'">'+s.semAnalista+'</span><span class="ci-stat-lbl">sem analista</span></div>'
    +'</div>';
  if(s.dupDb||s.dupFile){
    html+='<div class="alert alert-amber" style="margin-bottom:12px">'
      +(s.dupDb?'<strong>'+s.dupDb+'</strong> sigla(s) já existem no dashboard. ':'')
      +(s.dupFile?'<strong>'+s.dupFile+'</strong> sigla(s) aparecem repetidas dentro da própria planilha. ':'')
      +'Escolha em cada linha se quer <em>substituir</em> os dados do cliente atual ou <em>pular</em>. Substituir troca só os dados cadastrais — follow-ups, contatos e histórico continuam intactos.</div>';
  }
  if(s.semAnalista){
    html+='<div class="alert alert-red" style="margin-bottom:12px"><strong>'+s.semAnalista+'</strong> cliente(s) sem analista responsável. Isso acontece quando o nome na planilha não corresponde a nenhum usuário cadastrado — crie o acesso do analista em Gestão ou atribua manualmente abaixo.</div>';
  }
  html+='<div class="ci-bulk">'
    +'<label class="ci-bulk-lbl">Atribuir todos sem analista a:</label><select onchange="ciBulkOwner(this.value)">'+ciAnalystOptions('')+'</select>'
    +'<label class="ci-bulk-lbl">Duplicados:</label><select onchange="ciBulkDupAction(this.value)"><option value="">— aplicar a todos —</option><option value="replace">Substituir</option><option value="skip">Pular</option><option value="new">Criar como novo</option></select>'
    +'<label class="ci-chk"><input type="checkbox"'+(st.onlyIssues?' checked':'')+' onchange="ciToggleIssues()"> Só linhas com pendência</label>'
    +'</div>';
  var rows=st.rows.map(function(r,i){return{r:r,i:i};});
  if(st.onlyIssues)rows=rows.filter(function(x){return!!ciRowIssue(x.r);});
  var pageSize=40;
  var totalPages=Math.max(1,Math.ceil(rows.length/pageSize));
  var page=Math.min(st.page||0,totalPages-1);
  var slice=rows.slice(page*pageSize,page*pageSize+pageSize);
  var cols='minmax(0,.75fr) minmax(0,1.6fr) minmax(0,.8fr) minmax(0,.5fr) minmax(0,.7fr) minmax(0,1.2fr) minmax(0,1.5fr)';
  html+='<div class="ci-grid"><div class="ci-hdr" style="grid-template-columns:'+cols+'">'
    +['Sigla','Nome','Plano','Unid.','MRR','Analista','Situação'].map(function(h){return'<div>'+h+'</div>';}).join('')+'</div>';
  if(!slice.length)html+='<div style="padding:14px" class="muted">Nenhuma linha com pendência.</div>';
  slice.forEach(function(x){
    var r=x.r,i=x.i,issue=ciRowIssue(r);
    var sit='';
    if(r.dup==='file')sit='<span class="ci-tag ci-tag-amber">Repetida na planilha</span>';
    else if(r.dup==='db')sit='<span class="ci-tag ci-tag-amber">Já existe no dash</span>';
    else sit='<span class="ci-tag ci-tag-ok">Novo</span>';
    if(r.dup){
      sit+='<select class="ci-mini" onchange="ciSetRow('+i+',\'action\',this.value)">'
        +'<option value="skip"'+(r.action==='skip'?' selected':'')+'>Pular</option>'
        +(r.dup==='db'?'<option value="replace"'+(r.action==='replace'?' selected':'')+'>Substituir</option>':'')
        +'<option value="new"'+(r.action==='new'?' selected':'')+'>Criar como novo</option></select>';
    }
    if(!r.dup&&r.sameNameSlug)sit+='<div class="ci-note">Nome parecido com '+e(String(r.sameNameSlug).toUpperCase())+', mas sigla diferente — clientes distintos.</div>';
    if(!r.plan&&r.planRaw)sit+='<div class="ci-note">Plano "'+e(r.planRaw)+'" não reconhecido — vai ficar vazio.</div>';
    var ownerName=(((S.allUsers||[]).find(function(u){return u.uid===r.ownerId;})||{}).name)||'?';
    var ownerCell=r.ownerId
      ?'<div class="ci-owner-ok">'+e(ownerName)+'<button class="ci-x" title="Trocar analista" onclick="ciSetRow('+i+',\'ownerId\',\'\')">×</button></div>'
      :'<select class="ci-mini ci-mini-warn" onchange="ciSetRow('+i+',\'ownerId\',this.value)">'+ciAnalystOptions('')+'</select>'
        +'<div class="ci-note ci-note-red">Planilha: "'+e(r.analystRaw||'(vazio)')+'"</div>';
    html+='<div class="ci-row'+(issue?' ci-row-issue':'')+(r.action==='skip'?' ci-row-skip':'')+'" style="grid-template-columns:'+cols+'">'
      +'<div style="font-family:monospace;font-weight:700">'+e(r.slug)+'</div>'
      +'<div>'+e(r.name)+'</div>'
      +'<div>'+(r.plan?e(PLAN_L[r.plan]):'<span class="muted">—</span>')+'</div>'
      +'<div>'+(r.units!==''?e(r.units):'<span class="muted">—</span>')+'</div>'
      +'<div>'+(r.mrr!==''?formatMRR(r.mrr):'<span class="muted">—</span>')+'</div>'
      +'<div>'+ownerCell+'</div>'
      +'<div>'+sit+'</div>'
      +'</div>';
  });
  html+='</div>';
  if(totalPages>1){
    html+='<div style="display:flex;align-items:center;justify-content:center;gap:10px;padding:10px 0">'
      +'<button class="btn btn-sm" '+(page===0?'disabled':'')+' onclick="ciGoPage(-1,'+(totalPages-1)+')">&lsaquo;</button>'
      +'<span class="muted" style="font-size:11px">Página '+(page+1)+' de '+totalPages+' · '+rows.length+' linha(s)</span>'
      +'<button class="btn btn-sm" '+(page===totalPages-1?'disabled':'')+' onclick="ciGoPage(1,'+(totalPages-1)+')">&rsaquo;</button></div>';
  }
  html+='<div class="flex" style="justify-content:flex-end;gap:8px;margin-top:1rem">'
    +'<button class="btn" onclick="closeClientImport()">Cancelar</button>'
    +'<button class="btn" onclick="ciBackToText()">&larr; Voltar ao texto</button>'
    +'<button class="btn-save" onclick="ciConfirm(this)">Importar clientes</button></div>';
  return html;
}
function ciBackToText(){S.impClients.parsed=false;render();}
// ============================================================
// TRANSFERIR / EXCLUIR CLIENTE (PAINEL DO LIDER)
// ============================================================
// Só líder, gerente e admin gerenciam a carteira de outro analista.
function canManageClientOwner(){return!!(S.appUser&&['admin','gerente','leader','testuser'].indexOf(S.appUser.role)>=0);}
function lpOpenClientActions(cid){
  if(!canManageClientOwner())return;
  S.lpClientMenu=cid;render();
}
function lpCloseClientActions(){dismissOverlay(function(){S.lpClientMenu=null;render();});}
function mLpClientActions(){
  var c=S.clients.find(function(x){return x.id===S.lpClientMenu;});
  if(!c)return'<div class="modal-box"><div class="modal-title">Cliente não encontrado</div><div class="flex" style="justify-content:flex-end"><button class="btn" onclick="lpCloseClientActions()">Fechar</button></div></div>';
  var owner=(S.allUsers||[]).find(function(u){return u.uid===c.ownerId;});
  var opts=analystUsers().filter(function(u){return u.uid!==c.ownerId;})
    .map(function(u){return'<option value="'+u.uid+'">'+e(u.name)+'</option>';}).join('');
  return'<div class="modal-box" style="max-width:430px"><div class="modal-hdr"><h2 class="modal-title" style="margin:0">'+e((c.slug||c.name).toUpperCase())+'</h2><button class="modal-close press" onclick="lpCloseClientActions()">Fechar</button></div>'
    +'<p class="muted" style="font-size:12.5px;margin-bottom:14px">'+e(c.name)+'<br>Analista responsável: <strong>'+e(owner?owner.name:'sem analista')+'</strong></p>'
    +'<div class="lp-act-block"><div class="lp-act-title">Transferir para outro analista</div>'
    +(opts?'<div class="flex" style="gap:8px;align-items:center"><select id="lp-transfer-to" style="flex:1">'+opts+'</select><button class="btn-primary btn-sm" onclick="lpTransferClient()">Transferir</button></div>'
      :'<p class="muted" style="font-size:12px">Nenhum outro usuário cadastrado para receber este cliente.</p>')
    +'</div>'
    +'<div class="lp-act-block lp-act-danger"><div class="lp-act-title">Excluir cliente</div>'
    +'<p class="muted" style="font-size:11.5px;margin-bottom:8px">Vai para Arquivados e pode ser restaurado por '+LIXEIRA_DIAS+' dias. Depois é removido definitivamente.</p>'
    +'<button class="btn btn-sm btn-danger" onclick="lpDeleteClient()">Excluir cliente</button></div>'
    +'</div>';
}
function lpTransferClient(){
  var c=S.clients.find(function(x){return x.id===S.lpClientMenu;});
  if(!c)return;
  var sel=document.getElementById('lp-transfer-to');
  var newUid=sel&&sel.value;
  if(!newUid)return;
  var to=(S.allUsers||[]).find(function(u){return u.uid===newUid;});
  var from=(S.allUsers||[]).find(function(u){return u.uid===c.ownerId;});
  if(!confirm('Transferir '+(c.slug||c.name).toUpperCase()+' para '+(to?to.name:'este analista')+'?'))return;
  c.ownerId=newUid;
  saveClient(c);
  addAdminLog('client_transferred',Object.assign(logClient(c),{fromName:from?from.name:'—',targetName:to?to.name:'—'}));
  S.lpClientMenu=null;
  lpToast((c.slug||c.name).toUpperCase()+' agora está sob os cuidados de '+(to?to.name:'—')+'.');
}
function lpDeleteClient(){
  var c=S.clients.find(function(x){return x.id===S.lpClientMenu;});
  if(!c)return;
  if(!confirm('Excluir "'+c.name+'"?\n\nO cliente vai para Arquivados e pode ser restaurado por '+LIXEIRA_DIAS+' dias. Depois disso é removido definitivamente.'))return;
  c.archived=true;
  c.deletedAt=Date.now();
  c.archivedAt=new Date().toLocaleDateString('pt-BR');
  c.archivedBy=S.appUser.uid;
  c.archivedByName=S.appUser.name;
  saveClient(c);
  addAdminLog('client_deleted',logClient(c));
  S.lpClientMenu=null;
  lpToast((c.slug||c.name).toUpperCase()+' foi movido para Arquivados.');
}
// Aviso curto no canto — o analista que recebeu o cliente só vai ser notificado
// quando o badge de notificações existir (pendente).
function lpToast(msg){
  S.lpToast=msg;render();
  if(S._toastTimer)clearTimeout(S._toastTimer);
  S._toastTimer=setTimeout(function(){S.lpToast='';render();},4200);
}
function lpToastHTML(){return S.lpToast?'<div class="lp-toast">'+e(S.lpToast)+'</div>':'';}
// ============================================================
// IMPORTACAO DE FOLLOW-UP (texto colado -> wizard, com pendencias)
// ============================================================
// O importador nao adivinha: ele tenta o obvio e, quando fica em duvida, devolve a
// decisao pro analista mostrando SEMPRE a resposta original do follow.
var FI_MONTHS=['janeiro','fevereiro','marco','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
function fiYesNo(txt){
  var n=normTxt(txt);
  if(!n)return'';
  if(/^(nao|nunca|negativo|n)\b/.test(n))return'nao';
  if(/^(sim|ja|possui|tem|usa|utiliza|positivo|s)\b/.test(n))return'sim';
  if(/\bnao\b/.test(n))return'nao';
  if(/\bsim\b/.test(n))return'sim';
  return'';
}
function fiPercents(txt){
  var out=[],re=/(\d{1,3})\s*%/g,m;
  while((m=re.exec(String(txt||''))))out.push(parseInt(m[1],10));
  return out;
}
function fiOccBand(pct,season){
  if(season==='low')return pct>=50?0:(pct>=35?1:(pct>=25?2:(pct>=15?3:4)));
  return pct>=75?0:(pct>=50?1:(pct>=35?2:(pct>=25?3:4)));
}
// ── Interpretadores por pergunta ──
// Cada um recebe o texto da resposta e devolve {status, set, missing}
// status: 'ok' | 'incompleta' | 'ambigua'
function fiOk(set){return{status:'ok',set:set||{}};}
function fiAmb(){return{status:'ambigua',set:{}};}
function fiInc(set,missing){return{status:'incompleta',set:set||{},missing:missing};}
// Módulo Financeiro / Operacional compartilham as mesmas 4 opções.
// A negação só vale no começo da frase: "Sim, ... mas não sei" é uso, não recusa.
function fiModuleUse(t){
  var n=normTxt(t);
  if(/sem acesso|nao tem acesso/.test(n))return 3;
  if(/nao utiliza|nao usa|^nao\b/.test(n))return 2;
  if(/ativamente|bastante|automatic|todos os repasses|no dia a dia|toda semana/.test(n))return 0;
  if(/pouco|as vezes|parcial|basico|raramente/.test(n))return 1;
  return null;
}
function fiPickByWords(txt,table){
  var n=normTxt(txt);
  for(var i=0;i<table.length;i++){if(table[i][0].test(n))return table[i][1];}
  return null;
}
var FI_MAP=[
  {step:'payment',pats:[/canal de pagamento/,/canais de pagamento/,/forma de pagamento/,/meio de pagamento/,/gateway/,/adquirente/],interp:function(t){
    var provs=WIZ_PAY_PROVIDERS.filter(function(p){return normTxt(t).indexOf(normTxt(p).split(' ')[0])>=0;});
    var yn=fiYesNo(t);
    if(provs.length)return fiOk({payment:'sim',payment_providers:provs});
    if(yn==='nao')return fiOk({payment:'nao'});
    if(yn==='sim')return fiOk({payment:'sim'});
    return fiAmb();
  }},
  {step:'cases',pats:[/abertura de casos/,/\bcasos?\b/,/\bn2\b/,/ticket/,/suporte/],interp:function(t){
    var opt=fiPickByWords(t,[[/sem casos|nenhum caso|nunca abriu|não abre caso|nao abre caso/,0],[/poucos casos|quase nao entra|nao entra muito|entra pouco/,1],[/muitos casos|varios casos|diversos casos/,2],[/casos? critico|grave|escalado/,3]]);
    var n2=/\bn2\b|website em aberto/.test(normTxt(t))?(/\bnao\b|sem n2|nenhum/.test(normTxt(t))?'nao':'sim'):'';
    if(opt===null)return fiAmb();
    var set={cases_option:opt};
    if(n2)set.cases_n2=n2;else return fiInc(set,'se existem casos de N2 ou de Website em aberto');
    return fiOk(set);
  }},
  {step:'openapi',pats:[/open ?api/,/api aberta/,/integracao via api/],interp:function(t){
    var yn=fiYesNo(t);
    if(yn==='nao')return fiOk({openapi:'nao'});
    if(yn==='sim')return fiOk({openapi:'sim',openapi_detail:String(t||'').trim()});
    return fiAmb();
  }},
  {step:'appcenter',pats:[/app ?center/,/integrac/,/aplicativos?/,/marketplace/],interp:function(t){
    var opt=fiPickByWords(t,[[/nenhuma|nao tem|sem integrac|nao usa/,2],[/2\+|duas ou mais|varias|multiplas|tres|3 /,0],[/uma integracao|1 integracao|apenas uma|so uma/,1]]);
    if(opt===null)return fiAmb();
    return fiOk({appcenter_option:opt,appcenter_detail:String(t||'').trim()});
  }},
  {step:'pricing',pats:[/precificacao/,/modelo de preco/,/tarifario/,/ferramenta de preco/,/pricing/],interp:function(t){
    var m=fiPickByWords(t,[[/flexivel|dinamic|variavel/,'flexivel'],[/fixo|estatic/,'fixo']]);
    if(!m)return fiAmb();
    return fiOk({pricing_model:m});
  }},
  {step:'price',pats:[/preco competitivo/,/competitiv/,/preco (esta|em relacao|comparado)/,/media da regiao/],interp:function(t){
    var opt=fiPickByWords(t,[[/na media|media da regiao|dentro da media/,1],[/muito fora|bem fora|totalmente fora/,3],[/um pouco fora|levemente fora|pouco acima|pouco abaixo/,2],[/competitiv|bom preco|abaixo do mercado/,0],[/sem dados|nao sei|nao verificado/,4]]);
    if(opt===null)return fiAmb();
    return fiOk({price_option:opt});
  }},
  {step:'occupation',pats:[/ocupacao/,/occupancy/,/taxa de ocupa/],interp:function(t,ctx){
    var pcts=fiPercents(t);
    if(!pcts.length)return fiAmb();
    var season=wizFollowSeason(ctx.answers)==='low'?'low':'high';
    var set={occ_current:{option:fiOccBand(pcts[0],season)}};
    if(ctx.answers.units_count)set.occ_current.listings=ctx.answers.units_count;
    return fiInc(set,'o período da ocupação (data de início e fim) — o texto original traz '+pcts.map(function(p){return p+'%';}).join(' e ')+', mas não os meses exatos em formato de data');
  }},
  {step:'lastminute',pats:[/last ?minute/,/ultima hora/,/antecedencia minima/],interp:function(t){
    var yn=fiYesNo(t);
    var hm=String(t||'').match(/(\d{1,2})\s*[:h]\s*(\d{2})?/);
    if(hm)return fiOk({lastminute:'sim',lastminute_time:(hm[1].length<2?'0'+hm[1]:hm[1])+':'+(hm[2]||'00')});
    if(yn==='nao')return fiOk({lastminute:'nao'});
    if(yn==='sim')return fiInc({lastminute:'sim'},'o horário limite do last minute');
    return fiAmb();
  }},
  {step:'financial',pats:[/modulo financeiro/,/financeiro/],interp:function(t){
    var opt=fiModuleUse(t);
    if(opt===null)return fiAmb();
    return fiOk({financial_option:opt});
  }},
  {step:'operational',pats:[/modulo operacional/,/operacional/,/governanca|limpeza|faxina/],interp:function(t){
    var opt=fiModuleUse(t);
    if(opt===null)return fiAmb();
    return fiOk({operational_option:opt});
  }},
  {step:'inadimplencia',pats:[/inadimpl/,/atraso de pagamento/,/fatura em aberto/,/debito/],interp:function(t){
    var yn=fiYesNo(t);
    if(!yn)return fiAmb();
    return fiOk({inadimplencia_opt:yn,inadimplencia_note:String(t||'').trim()});
  }},
  {step:'nps_churn',pats:[/\bnps\b/,/churn/,/cancelamento/,/reclame aqui/,/satisfacao/],interp:function(t){
    var n=normTxt(t),set={};
    var score=String(t||'').match(/nps[^\d]{0,12}(\d{1,2})/i);
    if(/sem retorno|nao avaliou|sem resposta|nunca respondeu|sem nps|nao respondeu/.test(n))set.nps_avaliou='nao';
    else if(score)  {set.nps_avaliou='sim';set.nps_score=Math.min(10,parseInt(score[1],10));}
    if(/reclame aqui/.test(n))set.reclame_aqui=/sem reclamacao|nenhuma reclamacao|nao tem|sem caso/.test(n)?'nao':'sim';
    if(/nunca teve.*churn|sem caso de churn|nunca pediu cancelamento|nunca solicitou/.test(n))set.churn_note='Sem histórico de churn (importado)';
    if(set.nps_avaliou===undefined)return fiAmb();
    if(set.reclame_aqui===undefined)return fiInc(set,'se o cliente tem reclamação no Reclame Aqui');
    return fiOk(set);
  }},
  {step:'upgrade',pats:[/upgrade/,/upsell/,/mudanca de plano/,/plano superior/,/oportunidade de plano/],interp:function(t){
    var opt=fiPickByWords(t,[[/plano maximo|ja e agency|ja esta no agency/,4],[/nao conhece/,3],[/oportunidade|potencial|cabe upgrade/,2],[/limitac.*sem interesse|nao quer|sem interesse/,1],[/bem no plano|plano adequado|esta bem/,0]]);
    if(opt===null)return fiAmb();
    return fiOk({upgrade_option:opt,upgrade_note:String(t||'').trim()});
  }},
  {step:'site',pats:[/personalizacao de site/,/\bsite\b/,/pagina propria/],interp:function(t){
    var opt=fiPickByWords(t,[[/nao tem site|sem site/,3],[/bem personaliz|muito personaliz|totalmente personaliz/,0],[/basica|simples|padrao/,1],[/sem personaliz|nao personaliz/,2]]);
    if(opt===null)return fiAmb();
    return fiOk({site_option:opt});
  }},
  {step:'domain',pats:[/dominio/,/migracao de dominio/],interp:function(t){
    var yn=fiYesNo(t);
    if(!yn)return fiAmb();
    return fiOk({domain_migration:yn});
  }},
  {step:'tz_check',pats:[/fuso/,/timezone/,/horario correto/],interp:function(t){
    var yn=fiYesNo(t);
    if(!yn)return fiAmb();
    return fiOk({tz_confirmed:yn});
  }},
  {step:'photos',pats:[/\bfotos?\b/,/descricao/,/imagens/],interp:function(t){
    var ph=fiPickByWords(t,[[/sem fotos|nao tem foto/,3],[/excelente|otima|otimas|profissional/,0],[/boas|boa|sim/,1],[/fracas|fraca|ruim|ruins/,2]]);
    var de=fiPickByWords(t,[[/sem descricao/,3],[/descricao completa|completa/,0],[/descricao basica|basica/,1],[/descricao fraca|fraca/,2]]);
    if(ph===null)return fiAmb();
    if(de===null)return fiInc({photos_option:ph},'a avaliação da descrição dos anúncios (completa, básica, fraca ou sem descrição)');
    return fiOk({photos_option:ph,description_option:de});
  }},
  {step:'channels',pats:[/listings? e canais/,/canais conectados/,/quais canais/,/canais/,/distribuicao/],interp:function(t){
    return fiInc({channels_note:String(t||'').trim()},'quais canais estão conectados e quantos anúncios em cada um');
  }},
  {step:'cities',pats:[/localizacao/,/\bcidades?\b/,/onde ficam/,/\bregiao\b/,/bairros?/],interp:function(t){
    var names=String(t||'').split(/,|\se\s/).map(function(s){return s.replace(/\([^)]*\)/g,'').trim();}).filter(function(s){return s.length>1;});
    if(!names.length)return fiAmb();
    var cities=names.map(function(nm,i){return{name:nm,units:'',principal:i===0,seasons:{alta:[],baixa:[]}};});
    return fiInc({cities:cities},'a temporada (alta e baixa) de cada cidade — o sistema usa isso pra calcular a faixa de ocupação certa');
  }},
  {step:'units',pats:[/unidades/,/\bunidade\b/,/quantos? (imoveis|anuncios)/],interp:function(t){
    var n=normTxt(t);
    var num=String(t||'').match(/(\d[\d.]*)/);
    var changed=/aumentou|ganhou|subiu|cresceu/.test(n)?'ganhou':(/diminuiu|perdeu|caiu|reduziu/.test(n)?'perdeu':(fiYesNo(t)==='nao'?'nao':''));
    if(!changed)return fiAmb();
    if(!num)return fiInc({units_changed:changed},'o número total de unidades do cliente');
    var set={units_changed:changed,units_count:parseBRNumber(num[1])};
    if(changed!=='nao')set.units_delta=set.units_count;
    return changed==='nao'?fiOk(set):fiInc(set,'quantas unidades entraram ou saíram (e o total atual)');
  }},
  {step:'notifs',pats:[/notificac/,/alertas? do painel/,/pendencias? no painel/],interp:function(t){
    var opt=fiPickByWords(t,[[/limpo|sem pendencia|nenhuma/,0],[/poucas|nada critico/,1],[/muitas|varias pendencias/,2],[/critico|overbooking|sem preco/,3]]);
    if(opt===null)return fiAmb();
    return fiOk({notifs_option:opt});
  }},
  {step:'ch_perf',pats:[/performance dos canais/,/desempenho dos canais/,/performance de canal/],interp:function(){return fiAmb();}},
  {step:'ch_usab',pats:[/usabilidade/],interp:function(){return fiAmb();}},
  {step:'prod_sug',pats:[/sugestao de (produto|melhoria)/,/feature request/,/pedido de produto/],interp:function(t){
    var yn=fiYesNo(t);
    if(yn==='nao')return fiOk({prodsug_has:false});
    if(yn==='sim')return fiOk({prodsug_has:true,prodsug_note:String(t||'').trim()});
    return fiAmb();
  }},
  {step:'nego',pats:[/negociac/,/desconto/,/renegoci/],interp:function(t){
    var yn=fiYesNo(t);
    if(yn==='nao')return fiOk({nego_has:false});
    if(yn==='sim')return fiOk({nego_has:true,nego_note:String(t||'').trim()});
    return fiAmb();
  }},
  {step:'acct_plan',pats:[/plano de contas?/,/account plan/],interp:function(t){
    var yn=fiYesNo(t);
    if(yn==='nao')return fiOk({acct_has:false});
    if(yn==='sim')return fiOk({acct_has:true});
    return fiAmb();
  }}
];
function fiMatchStep(question,allowed){
  var n=normTxt(question);
  if(!n)return null;
  for(var i=0;i<FI_MAP.length;i++){
    var entry=FI_MAP[i];
    if(allowed.indexOf(entry.step)<0)continue;
    for(var p=0;p<entry.pats.length;p++){if(entry.pats[p].test(n))return entry;}
  }
  return null;
}
function parseFollowPairs(text){
  var t=String(text||'').replace(/\r/g,'');
  var chunks=t.split(/;+|\n+/).map(function(s){return s.trim();}).filter(Boolean);
  return chunks.map(function(ch){
    var m=ch.match(/^(.*?)\s+[-–—:]\s+(.*)$/);
    if(m&&m[1].trim())return{question:m[1].trim(),answer:m[2].trim(),hasQ:true};
    var q=ch.match(/^(.*\?)\s*(.+)$/);
    if(q&&q[2].trim())return{question:q[1].trim(),answer:q[2].trim(),hasQ:true};
    return{question:'',answer:ch,hasQ:false};
  });
}
// Completude por pergunta — mais rigoroso que wizStepAnswered, usado só no fluxo
// de importação e na exibição de pendência.
function fiStepComplete(stepKey,a){
  a=a||{};
  switch(stepKey){
    case'units':return!!(a.units_changed&&a.units_count!==undefined&&a.units_count!=='');
    case'cities':return!!(a.cities&&a.cities.length&&a.cities.every(function(c){var s=c.seasons||{};return(s.alta&&s.alta.length)||(s.baixa&&s.baixa.length);}));
    case'channels':return!!(a.channels&&a.channels.some(function(c){return c.active;}));
    case'occupation':return!!(a.occ_current&&a.occ_current.option!==undefined&&a.occ_current.option!==null&&a.occ_current.period_start&&a.occ_current.period_end);
    case'photos':return a.photos_option!==undefined&&a.photos_option!==null&&a.description_option!==undefined&&a.description_option!==null;
    case'nps_churn':return!!(a.nps_avaliou&&a.reclame_aqui&&(a.nps_avaliou!=='sim'||(a.nps_score!==undefined&&a.nps_score!=='')));
    case'lastminute':return!!(a.lastminute&&(a.lastminute!=='sim'||a.lastminute_time));
    case'openapi':return!!(a.openapi&&(a.openapi!=='sim'||a.openapi_detail));
    case'cases':return a.cases_option!==undefined&&a.cases_option!==null&&!!a.cases_n2;
    default:
      var save=S.wiz;var ok;
      S.wiz={step:0,type:(S.impFollow&&S.impFollow.type)||'first',answers:a,humors:{},autoHumors:{},prevAnswers:null};
      try{ok=wizStepAnswered(stepKey);}catch(err){ok=false;}
      S.wiz=save;
      return ok;
  }
}
// Roda os renderers do wizard só pra colher os humores automáticos — assim o score
// do follow importado usa exatamente a mesma regra do follow feito na mão.
function fiComputeHumors(type,answers,pendingSteps){
  var save=S.wiz;
  S.wiz={step:0,type:type,answers:answers,humors:{},autoHumors:{},prevAnswers:null};
  var order=(type==='recurring'?WIZ_STEPS_REC:WIZ_STEPS_FIRST);
  order.forEach(function(k){try{if(WIZ_RENDERERS[k])WIZ_RENDERERS[k]();}catch(err){}});
  var h=wizEffectiveHumors();
  S.wiz=save;
  // Pergunta pendente não pontua (score fica parcial, com selo).
  (pendingSteps||[]).forEach(function(k){var hk=STEP_HUMOR_KEY[k];if(hk)delete h[hk];});
  return h;
}
function fiInit(type){
  var today=new Date();
  S.impFollow={
    stage:'form',type:type||'first',raw:'',
    day:String(today.getDate()),month:String(today.getMonth()+1),year:String(today.getFullYear()),
    diag:{},unrecognized:[],error:''
  };
}
function fiSet(field,val){if(!S.impFollow)fiInit();S.impFollow[field]=val;}
function fiSetDate(field,val){if(!S.impFollow)return;S.impFollow[field]=val;render();}
function fiDateISO(){
  var st=S.impFollow;
  var y=parseInt(st.year,10),m=parseInt(st.month,10),d=parseInt(st.day,10);
  if(!y||!m||!d)return'';
  var pad=function(n){return n<10?'0'+n:String(n);};
  return y+'-'+pad(m)+'-'+pad(d);
}
function openFollowImport(type){
  if(!confirmDiscardIfDirty())return;
  fiInit(type);
  S.view='import-follow';render();
}
function closeFollowImport(){
  S.impFollow=null;S.wiz={step:0,type:'first',answers:{},humors:{},autoHumors:{},prevAnswers:null};
  S.view='client';S.clientTab='follows';render();
}
function fiAnalyze(){
  var st=S.impFollow;
  if(!(st.raw||'').trim()){st.error='Cole o texto do follow-up original.';render();return;}
  var iso=fiDateISO();
  if(!iso){st.error='Informe a data do follow-up (dia, mês e ano).';render();return;}
  var order=(st.type==='recurring'?WIZ_STEPS_REC:WIZ_STEPS_FIRST);
  var pairs=parseFollowPairs(st.raw);
  var answers={},diag={},unrecognized=[],used={};
  // contexto de trabalho: cidades primeiro, pra ocupação saber a temporada
  var ordered=pairs.slice().sort(function(x,y){
    var mx=fiMatchStep(x.question,order),my=fiMatchStep(y.question,order);
    var rank=function(m){return m?order.indexOf(m.step):99;};
    return rank(mx)-rank(my);
  });
  ordered.forEach(function(pr){
    var entry=pr.hasQ?fiMatchStep(pr.question,order):null;
    if(!entry||used[entry.step]){unrecognized.push({question:pr.question,answer:pr.answer,dupOf:entry?entry.step:''});return;}
    used[entry.step]=true;
    var res;
    try{res=entry.interp(pr.answer,{answers:answers});}catch(err){res=fiAmb();}
    Object.keys(res.set||{}).forEach(function(k){answers[k]=res.set[k];});
    diag[entry.step]={status:res.status,question:pr.question,answer:pr.answer,missing:res.missing||''};
  });
  order.forEach(function(k){
    if(diag[k])return;
    diag[k]={status:'ausente',question:'',answer:'',missing:''};
  });
  st.diag=diag;st.unrecognized=unrecognized;st.date=iso;st.error='';st.stage='review';
  // A revisão trabalha em cima do wizard de verdade: os renderers e o wizA() já sabem
  // como preencher cada resposta.
  S.wiz={step:0,type:st.type,answers:answers,humors:{},autoHumors:{},prevAnswers:null,fiEdit:null};
  render();
}
function fiPendingSteps(){
  var st=S.impFollow;if(!st)return[];
  var order=(st.type==='recurring'?WIZ_STEPS_REC:WIZ_STEPS_FIRST);
  return order.filter(function(k){return!fiStepComplete(k,S.wiz.answers);});
}
function fiPendingMessage(step,d){
  var ans=d&&d.answer?'"'+d.answer+'"':'';
  if(!d||d.status==='ausente')return'Essa pergunta não veio no texto importado. Preencha de acordo com o follow original.';
  if(d.status==='incompleta')return'Quase lá! Essa resposta está incompleta. Atualmente, também é necessário preencher '+(d.missing||'os dados que faltaram')+'. Por favor, preencha o dado de acordo com a resposta do follow original '+ans+'.';
  return'O dado da importação é '+ans+', mas não consegui identificar qual seria a resposta correta. Por favor, assinale a resposta que mais faz sentido com a do follow original.';
}
function fiOpenStep(step){
  if(!S.wiz)return;
  S.wiz.fiEdit=(S.wiz.fiEdit===step?null:step);render();
}
function fiDiscardUnrecognized(idx){
  S.impFollow.unrecognized.splice(idx,1);render();
}
function fiLinkUnrecognized(idx,step){
  if(!step)return;
  var st=S.impFollow,item=st.unrecognized[idx];
  if(!item)return;
  var entry=FI_MAP.find(function(x){return x.step===step;});
  var res=entry?(function(){try{return entry.interp(item.answer,{answers:S.wiz.answers});}catch(err){return fiAmb();}})():fiAmb();
  Object.keys(res.set||{}).forEach(function(k){S.wiz.answers[k]=res.set[k];});
  st.diag[step]={status:res.status,question:item.question||('(vinculada) '+wizOrderLabel(step)),answer:item.answer,missing:res.missing||''};
  st.unrecognized.splice(idx,1);
  S.wiz.fiEdit=step;
  render();
}
function fiStepOptions(){
  var st=S.impFollow;
  var order=(st.type==='recurring'?WIZ_STEPS_REC:WIZ_STEPS_FIRST);
  return'<option value="">— vincular a uma pergunta —</option>'+order.map(function(k){return'<option value="'+k+'">'+e(wizOrderLabel(k))+'</option>';}).join('');
}
function fiSave(btn){
  var st=S.impFollow;
  var c=S.clients[S.sel];
  if(!c){closeFollowImport();return;}
  var pending=fiPendingSteps();
  var pendingData=pending.map(function(k){
    var d=st.diag[k]||{status:'ausente'};
    return{step:k,status:d.status||'ausente',question:d.question||'',answer:d.answer||'',missing:d.missing||''};
  });
  if(pendingData.length){
    if(!confirm('Salvar o follow-up com '+pendingData.length+' pergunta(s) pendente(s)?\n\nElas ficam marcadas em vermelho no follow e o cliente aparece com alerta de pendência até serem resolvidas.'))return;
  }
  if(btn){btn.disabled=true;btn.textContent='Salvando...';}
  var newFollow={
    id:uid(),date:st.date,type:st.type,wizard:true,
    answers:Object.assign({},S.wiz.answers),
    humors:fiComputeHumors(st.type,S.wiz.answers,pending),
    indicators:{},
    imported:true,importedAt:Date.now(),importedBy:S.appUser.uid,
    importRaw:st.raw,
    pending:pendingData
  };
  if(!c.follows)c.follows=[];
  c.follows.push(newFollow);
  // Follows sempre ordenados por data: mais novo em cima, mais antigo embaixo.
  c.follows.sort(function(a,b){return new Date(b.date)-new Date(a.date);});
  if(S.wiz.answers.units_count!==undefined&&S.wiz.answers.units_count!=='')c.units=+S.wiz.answers.units_count;
  if(S.wiz.answers.domain_website)c.website=S.wiz.answers.domain_website;
  saveClient(c);
  addAdminLog('follow_imported',Object.assign(logClient(c),{followType:st.type,pending:pendingData.length}));
  S.impFollow=null;
  S.wiz={step:0,type:'first',answers:{},humors:{},autoHumors:{},prevAnswers:null};
  var fi=c.follows.findIndex(function(f){return f.id===newFollow.id;});
  S.selFollow=fi;S.view='follow-view';S.editFollow=null;S.editFollowDirty=false;
  render();
}
function followImportView(){
  var c=S.clients[S.sel];
  if(!c)return'<p>Selecione um cliente.</p>';
  if(!S.impFollow)fiInit();
  var st=S.impFollow;
  var html='<div style="display:flex;align-items:center;gap:10px;margin-bottom:.35rem"><h1 style="font-size:20px;font-family:\'Roboto Slab\',serif;margin:0">Importar follow-up</h1><span style="font-family:monospace;font-weight:700;color:var(--b600)">'+e((c.slug||c.name).toUpperCase())+'</span></div>';
  if(st.stage==='form'){
    html+='<p class="muted" style="margin-bottom:1.25rem;font-size:12.5px">Cole as perguntas e respostas do follow-up antigo. O sistema tenta encaixar cada resposta na pergunta certa e avisa o que ficou pendente — nada é salvo até você revisar.</p>';
    html+='<div class="card">';
    html+='<div class="fi-form-row">';
    html+='<div class="form-row" style="margin:0"><label class="form-lbl">Tipo de follow-up</label><select onchange="fiSet(\'type\',this.value)"><option value="first"'+(st.type==='first'?' selected':'')+'>Primeira análise</option><option value="recurring"'+(st.type==='recurring'?' selected':'')+'>Follow-up recorrente</option></select></div>';
    html+='<div class="form-row" style="margin:0"><label class="form-lbl">Data do follow-up original</label><div class="fi-date">'
      +'<select onchange="fiSetDate(\'day\',this.value)">'+(function(){var o='';for(var d=1;d<=31;d++)o+='<option value="'+d+'"'+(String(st.day)===String(d)?' selected':'')+'>'+d+'</option>';return o;})()+'</select>'
      +'<select onchange="fiSetDate(\'month\',this.value)">'+['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'].map(function(mn,i){return'<option value="'+(i+1)+'"'+(String(st.month)===String(i+1)?' selected':'')+'>'+mn+'</option>';}).join('')+'</select>'
      +'<select onchange="fiSetDate(\'year\',this.value)">'+(function(){var o='',cy=new Date().getFullYear();for(var y=cy;y>=cy-6;y--)o+='<option value="'+y+'"'+(String(st.year)===String(y)?' selected':'')+'>'+y+'</option>';return o;})()+'</select>'
      +'</div></div>';
    html+='</div>';
    html+='<div class="form-row"><label class="form-lbl">Texto do follow-up original</label>'
      +'<textarea rows="12" style="font-size:12.5px;line-height:1.6" placeholder="Diminuiu/aumentou unidades? - Não;&#10;Migração de domínio - Sim;&#10;Personalização de site - Sim, bem personalizado;&#10;Canal de pagamento - Stripe e duas contas bancárias;&#10;Localização das unidades - Querétaro, Juriquilla e San Miguel de Allende;&#10;Boa ocupação? - Ocupação de 40% nos últimos três meses" oninput="fiSet(\'raw\',this.value)">'+e(st.raw)+'</textarea></div>';
    html+='<div class="import-tip">Formato esperado: uma pergunta por linha (ou separadas por ponto e vírgula), no padrão <strong>Pergunta - Resposta</strong>. Se o texto tiver só as respostas, sem as perguntas, elas vão cair como "não reconhecidas" e você vincula cada uma à pergunta certa na tela de revisão.</div>';
    if(st.error)html+='<div class="alert alert-red" style="margin-top:12px">'+e(st.error)+'</div>';
    html+='<div class="flex" style="justify-content:flex-end;gap:8px;margin-top:1rem"><button class="btn" onclick="closeFollowImport()">Cancelar</button><button class="btn-primary" onclick="fiAnalyze()">Analisar texto</button></div>';
    html+='</div>';
    return html;
  }
  var order=(st.type==='recurring'?WIZ_STEPS_REC:WIZ_STEPS_FIRST);
  var pending=fiPendingSteps();
  var okCount=order.length-pending.length;
  html+='<p class="muted" style="margin-bottom:1rem;font-size:12.5px">Follow-up de <strong>'+formatDate(st.date)+'</strong> · '+(st.type==='recurring'?'Recorrente':'Primeira análise')+'</p>';
  html+='<div class="ci-summary">'
    +'<div class="ci-stat"><span class="ci-stat-val" style="color:var(--gn600)">'+okCount+'</span><span class="ci-stat-lbl">prontas</span></div>'
    +'<div class="ci-stat"><span class="ci-stat-val" style="color:'+(pending.length?'var(--rd600)':'var(--t3)')+'">'+pending.length+'</span><span class="ci-stat-lbl">pendentes</span></div>'
    +'<div class="ci-stat"><span class="ci-stat-val" style="color:'+(st.unrecognized.length?'var(--am700)':'var(--t3)')+'">'+st.unrecognized.length+'</span><span class="ci-stat-lbl">não reconhecidas</span></div>'
    +'</div>';
  if(pending.length){
    html+='<div class="alert alert-amber" style="margin-bottom:14px"><strong>'+pending.length+' pergunta(s) precisam da sua confirmação.</strong> Você pode resolver agora ou salvar assim mesmo — o que ficar pendente aparece em vermelho no follow e marca o cliente com alerta até ser resolvido.</div>';
  }else{
    html+='<div class="alert alert-green" style="margin-bottom:14px">Todas as perguntas do follow foram preenchidas. Pode salvar.</div>';
  }
  if(st.unrecognized.length){
    html+='<div class="section-hdr"><span>Respostas não reconhecidas</span></div>';
    html+='<div class="card" style="padding:0;margin-bottom:14px">';
    st.unrecognized.forEach(function(item,idx){
      html+='<div class="fi-unrec">'
        +'<div style="flex:1;min-width:0">'
        +(item.question?'<div class="fi-unrec-q">'+e(item.question)+'</div>':'<div class="fi-unrec-q fi-unrec-noq">Sem pergunta no texto</div>')
        +'<div class="fi-unrec-a">'+e(item.answer)+'</div>'
        +(item.dupOf?'<div class="ci-note">Já havia uma resposta para "'+e(wizOrderLabel(item.dupOf))+'" — esta é uma segunda menção.</div>':'')
        +'</div>'
        +'<div class="fi-unrec-acts"><select class="ci-mini" onchange="fiLinkUnrecognized('+idx+',this.value)">'+fiStepOptions()+'</select>'
        +'<button class="btn btn-sm" onclick="fiDiscardUnrecognized('+idx+')">Descartar</button></div>'
        +'</div>';
    });
    html+='</div>';
  }
  html+='<div class="section-hdr"><span>Perguntas do follow-up</span></div>';
  html+='<div class="card" style="padding:0">';
  order.forEach(function(k,idx){
    var d=st.diag[k]||{status:'ausente'};
    var done=fiStepComplete(k,S.wiz.answers);
    var open=S.wiz.fiEdit===k;
    var cls='fi-q'+(done?' fi-q-ok':' fi-q-pend');
    html+='<div class="'+cls+'">';
    html+='<div class="fi-q-hdr" onclick="fiOpenStep(\''+k+'\')">'
      +'<span class="fi-q-num">'+(idx+1)+'</span>'
      +'<span class="fi-q-lbl">'+e(wizOrderLabel(k))+'</span>'
      +(done?'<span class="ci-tag ci-tag-ok">Pronta</span>':'<span class="ci-tag ci-tag-red">'+(d.status==='ausente'?'Faltou no texto':(d.status==='incompleta'?'Incompleta':'Dúvida'))+'</span>')
      +'<span class="fi-q-caret">'+(open?'▴':'▾')+'</span>'
      +'</div>';
    if(d.answer)html+='<div class="fi-q-orig"><span class="fi-q-orig-lbl">Follow original</span>'+(d.question?'<span class="fi-q-orig-q">'+e(d.question)+'</span>':'')+'<span class="fi-q-orig-a">'+e(d.answer)+'</span></div>';
    if(!done)html+='<div class="fi-q-msg">'+e(fiPendingMessage(k,d))+'</div>';
    if(open){
      html+='<div class="fi-q-editor">';
      try{html+=(k.indexOf('custom_')===0?wizRenderCustomQuestion(k.slice(7)):WIZ_RENDERERS[k]());}
      catch(err){html+='<p class="muted">Não foi possível abrir o editor desta pergunta.</p>';}
      html+='<div class="flex" style="justify-content:flex-end;margin-top:10px"><button class="btn btn-sm" onclick="fiOpenStep(\''+k+'\')">Fechar</button></div>';
      html+='</div>';
    }
    html+='</div>';
  });
  html+='</div>';
  html+='<div class="flex" style="justify-content:flex-end;gap:8px;margin-top:1rem">'
    +'<button class="btn" onclick="closeFollowImport()">Cancelar</button>'
    +'<button class="btn" onclick="fiBackToForm()">← Voltar ao texto</button>'
    +'<button class="btn-save" onclick="fiSave(this)">Salvar follow-up'+(pending.length?' com '+pending.length+' pendência(s)':'')+'</button></div>';
  return html;
}
function fiBackToForm(){S.impFollow.stage='form';render();}
// ── Pendências em follows já salvos ──
function followPendingList(f){return(f&&f.pending)||[];}
function clientPendingCount(c){
  return(c&&c.follows||[]).reduce(function(acc,f){return acc+followPendingList(f).length;},0);
}
function clientHasPending(c){return clientPendingCount(c)>0;}
function pendingBadge(c){
  var n=clientPendingCount(c);
  if(!n)return'';
  return'<span class="pend-badge" title="'+n+' pergunta(s) pendente(s) em follow-ups importados">'+svgIcon('alert',11)+' '+n+'</span>';
}
// Abre o follow mais antigo com pendência e já posiciona na primeira pergunta pendente.
function resolvePendencies(ci){
  var c=S.clients[ci];if(!c)return;
  var idx=-1;
  (c.follows||[]).forEach(function(f,i){if(idx<0&&followPendingList(f).length)idx=i;});
  if(idx<0)return;
  S.sel=ci;S.selFollow=idx;S.view='follow-view';
  var first=followPendingList(c.follows[idx])[0];
  S.editFollow=null;S.editFollowDirty=false;
  render();
  if(first)startEditFollowQ(first.step);
}
// Depois de editar, a pendência sai da lista se a resposta ficou completa.
function refreshFollowPending(f){
  if(!f||!f.pending||!f.pending.length)return;
  f.pending=f.pending.filter(function(p){return!fiStepComplete(p.step,f.answers||{});});
}
function followScorePartial(f){return!!(f&&f.pending&&f.pending.length);}
function pendingBannerHTML(c,ci){
  var n=clientPendingCount(c);
  if(!n)return'';
  return'<div class="alert alert-red" style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">'
    +'<span>'+svgIcon('alert',13)+' <strong>'+n+' pergunta(s) pendente(s)</strong> em follow-ups importados deste cliente. Enquanto não forem resolvidas, o score fica parcial.</span>'
    +'<button class="btn btn-sm" onclick="resolvePendencies('+ci+')">Resolver pendências</button></div>';
}
// ============================================================
// FECHAMENTO DE LOOP (NPS abaixo de 7)
// ============================================================
// Quando o cliente avalia a Stays abaixo de 7, abre um caso no Salesforce e o
// analista responsavel precisa tratar. O caso e detectado do proprio NPS do
// follow — nao precisa ser aberto na mao. O que fica guardado em c.loopCase e
// so o que o analista/integracao preenche depois (feedback, link, fechamento).
var LOOP_NPS_LIMITE=7;
// Janela de validade da avaliacao ruim, na mesma ideia da cadencia de follow-up.
var LOOP_JANELA_MESES=6;
function getLoopFollow(c){
  if(!c||!c.follows)return null;
  return getFollowsSorted(c).filter(function(f){
    return f.answers&&f.answers.nps_avaliou==='sim'&&f.answers.nps_score!==undefined&&f.answers.nps_score!==null&&f.answers.nps_score!=='';
  })[0]||null;
}
function isLoopOpen(c){
  var f=getLoopFollow(c);
  if(!f)return false;
  if(+f.answers.nps_score>=LOOP_NPS_LIMITE)return false;
  // Avaliacao velha nao vira pendencia: quem foi detrator um ano atras pode nao
  // se sentir mais assim hoje. Fora da janela, o caso simplesmente nao aparece.
  var abriu=loopOpenedAt(c);
  if(abriu){
    var meses=(Date.now()-new Date(abriu+'T00:00:00').getTime())/(1000*60*60*24*30.44);
    if(meses>LOOP_JANELA_MESES)return false;
  }
  var lc=c.loopCase;
  // Ja foi fechado para esta mesma avaliacao? Entao nao esta mais aberto.
  return!(lc&&lc.closedAt&&lc.followId===f.id);
}
function loopOpenedAt(c){
  var f=getLoopFollow(c);
  if(!f)return null;
  return(f.answers.nps_date||f.date)||null;
}
function loopDaysOpen(c){
  var d=loopOpenedAt(c);
  if(!d)return null;
  return Math.floor((Date.now()-new Date(d+'T00:00:00'))/86400000);
}
// Tentativas de contato = atividades registradas no cliente depois que o loop abriu.
function loopAttempts(c){
  var d=loopOpenedAt(c);
  if(!d)return 0;
  var t=new Date(d+'T00:00:00').getTime();
  return(c.activities||[]).filter(function(a){
    if(a.archived)return false;
    return a.date&&new Date(a.date+'T00:00:00').getTime()>=t;
  }).length;
}
function loopInfo(c){
  if(!isLoopOpen(c))return null;
  var f=getLoopFollow(c);
  var lc=c.loopCase||{};
  return{
    followId:f.id,
    score:+f.answers.nps_score,
    openedAt:loopOpenedAt(c),
    days:loopDaysOpen(c),
    attempts:loopAttempts(c),
    feedback:lc.feedback||'',
    sfLink:lc.sfLink||'',
    category:lc.category||''
  };
}
function calcLoopsAbertos(clients){return(clients||[]).filter(isLoopOpen).length;}
function saveLoopDetails(ci){
  var c=S.clients[ci];if(!c)return;
  var f=getLoopFollow(c);if(!f)return;
  if(!c.loopCase)c.loopCase={};
  c.loopCase.followId=f.id;
  var fb=document.getElementById('loop-feedback'),sf=document.getElementById('loop-sflink'),cat=document.getElementById('loop-cat');
  if(fb)c.loopCase.feedback=fb.value.trim();
  if(sf)c.loopCase.sfLink=sf.value.trim();
  if(cat)c.loopCase.category=cat.value;
  saveClient(c);
  addAdminLog('loop_updated',logClient(c));
  showSaved();
}
function closeLoop(ci){
  var c=S.clients[ci];if(!c)return;
  var f=getLoopFollow(c);if(!f)return;
  if(!confirm('Fechar o loop de '+(c.slug||c.name).toUpperCase()+'?\n\nConfirme que o retorno foi dado ao cliente e o caso tratado.'))return;
  if(!c.loopCase)c.loopCase={};
  c.loopCase.followId=f.id;
  c.loopCase.closedAt=new Date().toISOString().split('T')[0];
  c.loopCase.closedBy=S.appUser.name;
  saveClient(c);
  addAdminLog('loop_closed',logClient(c));
  render();
}
// ============================================================
// SCORE HISTORICO (reconstruido, sem snapshot)
// ============================================================
// O score de um cliente ja e derivado de dados datados: o follow mais recente,
// as atividades, a inadimplencia e o caso de churn. Entao da pra perguntar
// "qual era o score deste cliente em tal data?" sem guardar foto nenhuma —
// basta esconder tudo o que aconteceu depois daquela data e recalcular.
function clientAsOf(c,dateISO){
  if(!dateISO)return c;
  var t=new Date(dateISO+'T23:59:59').getTime();
  var snap=Object.assign({},c);
  snap.follows=(c.follows||[]).filter(function(f){return f.date&&new Date(f.date+'T00:00:00').getTime()<=t;});
  snap.activities=(c.activities||[]).filter(function(a){return a.date&&new Date(a.date+'T00:00:00').getTime()<=t;});
  snap.contacts=(c.contacts||[]).filter(function(x){return!x.date||new Date(x.date+'T00:00:00').getTime()<=t;});
  snap.inadimplencia=(c.inadimplencia||[]).filter(function(m){
    if(m.createdAt&&m.createdAt>t)return false;
    // fatura paga depois da data de corte ainda estava em aberto naquele dia
    if(m.paid&&m.paidAtTs&&m.paidAtTs<=t)return false;
    return true;
  });
  if(c.churnCase&&c.churnCase.createdAt&&c.churnCase.createdAt>t)snap.churnCase=null;
  return snap;
}
function calcScoreAt(c,dateISO){
  var snap=clientAsOf(c,dateISO);
  if(!snap.follows||!snap.follows.length)return null;
  return calcScore(snap);
}
// Ultimo dia de cada mes (ou hoje, se o mes for o corrente).
function monthEndISO(monthKey){
  var p=monthKey.split('-'),y=+p[0],m=+p[1];
  var last=new Date(y,m,0);
  var now=new Date();
  if(last>now)last=now;
  var mm=last.getMonth()+1,dd=last.getDate();
  return last.getFullYear()+'-'+(mm<10?'0':'')+mm+'-'+(dd<10?'0':'')+dd;
}
// Score medio do time numa data — mesma conta de hoje (media de todos os
// clientes), so que congelada naquele dia. Cliente sem follow ate la nao entra.
function teamScoreAt(clients,dateISO){
  var vals=[];
  (clients||[]).forEach(function(c){
    var s=calcScoreAt(c,dateISO);
    if(s!==null)vals.push(s);
  });
  if(!vals.length)return null;
  return Math.round(vals.reduce(function(a,b){return a+b;},0)/vals.length);
}
// Serie do score do time por mes, pro grafico e pra tendencia "+4 pts no mes".
function teamScoreSeries(clients,monthKeys){
  return(monthKeys||[]).map(function(m){
    return{month:m,score:teamScoreAt(clients,monthEndISO(m))};
  });
}
// Carteira do analista, aberta dentro do card ou da linha. Mesma tabela nos dois
// modos — o card vira largura total quando abre, então cabe igual.
function lpClientTable(cs,oid,mode){
  mode=mode==='cards'?'cards':'list';
  var pageSize=S.lpPageSize[mode]||(mode==='cards'?10:20);
  var totalPages=Math.max(1,Math.ceil(cs.length/pageSize));
  var curPage=Math.min(S.lpPage[oid]||0,totalPages-1);
  var slice=cs.slice(curPage*pageSize,curPage*pageSize+pageSize);
  var html='<div class="lp-cli"><div class="lp-cli-hd">'
    +'<span>Cliente</span><span>Categoria</span><span>Saúde</span><span>MRR</span><span>Sem contato</span><span>Follow-up</span><span style="text-align:right">Ações</span></div>';
  slice.forEach(function(c){
    var ci=S.clients.indexOf(c),score=calcScore(c),band=hl(score),col=lpBandColor(band),fu=fuSt(c);
    var d=getDaysWithoutContact(c);
    var pend=clientPendingCount(c);
    // Linha inteira clicavel (so pra supervisor/gerente/admin): abre transferir e
    // excluir, como era antes da reforma do layout. Quem nao gerencia carteira de
    // outro analista ve a linha normal, sem clique.
    var gerencia=canManageClientOwner();
    html+='<div class="lp-cli-r'+(gerencia?' lp-cli-clickable':'')+'"'
      +(gerencia?' title="Clique para transferir ou excluir" onclick="lpOpenClientActions(\''+jsq(c.id)+'\')"':'')+'>';
    // Sem circulo de iniciais: a sigla ja e a identificacao do cliente, e duas
    // letras cortadas dentro de uma bolinha so imitavam uma foto que nao existe.
    html+='<div class="lp-cli-who"><span style="min-width:0">'
      +'<span class="lp-cli-name">'+e((c.slug||c.name).toUpperCase())+'</span>'
      +'<span class="lp-cli-sub">'+e(c.name)+'</span></span></div>';
    html+='<div>'+(catBdg(c)||'<span class="muted">—</span>')+'</div>';
    html+='<div class="lp-cli-h"><b style="color:'+col+'">'+score+'</b><span class="lp-cli-hbar"><i style="width:'+score+'%;background:'+col+'"></i></span></div>';
    html+='<div style="font-weight:600;font-size:12.5px">'+formatMRR(c.mrr)+'</div>';
    html+='<div style="font-size:12.5px;font-weight:600;color:'+(d!==null&&d>=30?'var(--rd600)':'var(--t2)')+'">'+(d===null?'—':d+' dias')+'</div>';
    html+='<div><span class="fu-badge '+fu.cls+'">'+fu.label+'</span></div>';
    // "Abrir" precisa parar o clique aqui, senao abriria a janela de transferir
    // junto com o cliente.
    html+='<div style="display:flex;justify-content:flex-end;gap:5px;align-items:center">'
      +(pend?'<span class="pend-badge" title="'+pend+' pergunta(s) pendente(s)">'+pend+'</span>':'')
      +(isLoopOpen(c)?'<span class="lp-chip lp-chip-amber">loop</span>':'')
      +'<button class="btn btn-sm press" onclick="event.stopPropagation();openClient('+ci+')">Abrir</button></div>';
    html+='</div>';
  });
  if(!slice.length)html+='<div style="padding:16px" class="muted">Nenhum cliente com os filtros atuais.</div>';
  if(totalPages>1){
    html+='<div class="lp-cli-pg">'
      +'<button class="btn btn-sm" '+(curPage===0?'disabled':'')+' onclick="lpGoPage(\''+jsq(oid)+'\',-1,'+(totalPages-1)+')">&lsaquo;</button>'
      +'<span class="lp-note">Página '+(curPage+1)+' de '+totalPages+' · '+cs.length+' cliente'+(cs.length===1?'':'s')+'</span>'
      +'<button class="btn btn-sm" '+(curPage===totalPages-1?'disabled':'')+' onclick="lpGoPage(\''+jsq(oid)+'\',1,'+(totalPages-1)+')">&rsaquo;</button></div>';
  }
  html+='</div>';
  return html;
}
// ============================================================
// OVERLAYS — fechar com animação, clique fora e botão "Fechar"
// ============================================================
// Fechar era seco porque o elemento saía do DOM na hora. Agora a saída é o
// inverso da entrada: o painel desce e some enquanto o vidro desfoca de volta,
// e só depois o estado muda.
var OVERLAY_CLOSE_MS=240;
function dismissOverlay(fn){
  var ov=document.querySelector('.modal-ov:not(.closing)');
  if(!ov){if(fn)fn();return;}
  ov.classList.add('closing');
  setTimeout(function(){if(fn)fn();},OVERLAY_CLOSE_MS);
}
// Modais com formulário não fecham por clique fora sem o usuário confirmar —
// seria fácil perder o que acabou de digitar num clique errado.
var MODAIS_COM_FORM=['add-client','edit-client','add-user','profile','add-contact','add-key-contact','settings','churn-alert'];
function modalPedeConfirmacao(){
  if(!S.modalDirty)return false; // nada mexido, nada a perder
  var m=S.modal||'';
  if(MODAIS_COM_FORM.indexOf(m)>=0)return true;
  if(m.indexOf('inad-')===0)return true;
  return false;
}
function closeMSoft(){
  if(modalPedeConfirmacao()&&!confirm('Fechar sem salvar? As alterações desta janela serão descartadas.'))return;
  dismissOverlay(closeM);
}
// Usado no onclick do fundo: só fecha se o clique foi no fundo mesmo.
function overlayBackdropClick(ev,el){
  if(ev.target!==el)return;
  closeMSoft();
}
function closeBtnHTML(fn){
  return'<button class="modal-close press" onclick="'+fn+'">Fechar</button>';
}
// ============================================================
// EXPORTAR — CSV que o Excel abre com acento certo
// ============================================================
// Sem biblioteca: CSV com BOM UTF-8 e ponto e vírgula, que é o que o Excel em
// português espera. Número vai com vírgula decimal pra não virar texto.
function csvCell(v){
  if(v===null||v===undefined)return'';
  var s=String(v);
  if(typeof v==='number')s=String(v).replace('.',',');
  return /[;"\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;
}
function baixarCSV(nome,linhas){
  var texto=linhas.map(function(l){return l.map(csvCell).join(';');}).join('\r\n');
  var blob=new Blob(['﻿'+texto],{type:'text/csv;charset=utf-8;'});
  var url=URL.createObjectURL(blob);
  var a=document.createElement('a');
  a.href=url;a.download=nome;document.body.appendChild(a);a.click();
  document.body.removeChild(a);
  setTimeout(function(){URL.revokeObjectURL(url);},1500);
}
function hojeArquivo(){var d=new Date(),m=d.getMonth()+1,dd=d.getDate();return d.getFullYear()+(m<10?'0':'')+m+(dd<10?'0':'')+dd;}
// Exporta o score: o número do time, o de cada analista e — importante — como a
// conta é feita, pra quem receber a planilha conseguir auditar.
function lpExportScore(){
  var teamClients=lpFlatten(lpTeamGroups());
  var r=lpPeriodRange();
  var rows=lpAnalystRows();
  var out=[];
  out.push(['Score de CS — '+r.label]);
  out.push(['Período',formatDate(r.fromISO)+' a '+formatDate(r.toISO)]);
  out.push(['Gerado em',new Date().toLocaleString('pt-BR')]);
  out.push([]);
  out.push(['RESUMO DO TIME']);
  out.push(['Score no fim do período',teamScoreAt(teamClients,r.toISO)]);
  out.push(['Score no início do período',teamScoreAt(teamClients,r.fromISO)]);
  var now=teamScoreAt(teamClients,r.toISO),before=teamScoreAt(teamClients,r.fromISO);
  out.push(['Variação',(now!==null&&before!==null)?(now-before):'']);
  out.push(['Clientes considerados',teamClients.length]);
  out.push([]);
  out.push(['POR ANALISTA']);
  out.push(['Analista','Clientes','MRR','Score','Variação no período','Críticos','Atenção','Estáveis','Meta de follow (%)','Follows feitos','Follows previstos','Sem contato 30d+','Churn','Loop','Inadimplentes']);
  rows.forEach(function(a){
    out.push([a.analyst.name,a.cs.length,a.mrr,a.score,a.delta===null?'':a.delta,a.risk,a.warn,a.ok,
      a.fu?a.fu.pct:'',a.fu?a.fu.real:'',a.fu?a.fu.meta:'',a.semContato,a.churn,a.loop,a.inad]);
  });
  out.push([]);
  out.push(['POR CLIENTE']);
  out.push(['Analista','Sigla','Cliente','Categoria','Score','MRR','Sem contato (dias)','Follow-up','Churn aberto','Loop aberto']);
  rows.forEach(function(a){
    a.cs.forEach(function(c){
      var d=getDaysWithoutContact(c);
      out.push([a.analyst.name,(c.slug||'').toUpperCase(),c.name,categoriaLabel(c)||'',calcScore(c),parseFloat(c.mrr)||0,
        d===null?'':d,fuSt(c).label,isChurnAlert(c)?'Sim':'Não',isLoopOpen(c)?'Sim':'Não']);
    });
  });
  out.push([]);
  out.push(['COMO O SCORE É CALCULADO']);
  out.push(['Score do time','Média simples do score de todos os clientes da carteira (não é média por analista: analista com mais clientes pesa mais, porque a carteira dele é maior).']);
  out.push(['Score do cliente','Sai do último follow-up de cada cliente até a data de corte, combinando o humor de cada categoria com contato recente, atividade, inadimplência e alerta de churn.']);
  out.push(['Score em data passada','Reconstruído: o sistema esconde tudo que aconteceu depois da data e recalcula com o que existia até ali.']);
  out.push(['Faixas','Crítico abaixo de 50 · Atenção de 50 a 74 · Estável 75 ou mais']);
  out.push(['Meta de follow','Vem da planilha [CS] Team Goals. Atingimento = soma dos follows feitos ÷ soma das metas, igual à planilha.']);
  baixarCSV('score-cs-'+hojeArquivo()+'.csv',out);
}
function lpExportChurn(){
  var rows=lpTeamGoalRows();
  var data=lpChurnData(true);
  var teamClients=lpFlatten(lpTeamGroups());
  var series=teamScoreSeries(teamClients,data.map(function(d){return d.month;}));
  var out=[];
  out.push(['Churn e saúde ao longo do tempo']);
  out.push(['Gerado em',new Date().toLocaleString('pt-BR')]);
  out.push([]);
  out.push(['Mês','Clientes perdidos','MRR perdido','Base de clientes','Taxa de churn (%)','Score médio do time']);
  data.forEach(function(d,i){
    var taxa=(d.base&&d.base>0)?Math.round(d.clients/d.base*10000)/100:'';
    out.push([d.month,d.clients,d.mrr,d.base===null?'':d.base,taxa,series[i]&&series[i].score!==null?series[i].score:'']);
  });
  out.push([]);
  out.push(['POR ANALISTA — clientes perdidos por mês']);
  var meses=data.map(function(d){return d.month;});
  out.push(['Analista'].concat(meses));
  rows.forEach(function(a){out.push([a.name].concat(meses.map(function(m){return a.churnClients[m]!==undefined?a.churnClients[m]:'';})));});
  out.push([]);
  out.push(['POR ANALISTA — MRR perdido por mês']);
  out.push(['Analista'].concat(meses));
  rows.forEach(function(a){out.push([a.name].concat(meses.map(function(m){return a.churnMrr[m]!==undefined?a.churnMrr[m]:'';})));});
  out.push([]);
  out.push(['ORIGEM DOS DADOS']);
  out.push(['Churn',TEAM_DATA_SOURCE+' — aba Base View (Churn)']);
  out.push(['Score médio','Reconstruído pelo dashboard a partir dos follow-ups e das interações registradas até o fim de cada mês.']);
  out.push(['Meta de churn','Clientes '+TEAM_CHURN_TARGET.clients+'% · Listings '+TEAM_CHURN_TARGET.listings+'% · MRR '+TEAM_CHURN_TARGET.mrr+'%']);
  baixarCSV('churn-saude-'+hojeArquivo()+'.csv',out);
}
// ── Período personalizado ──
function lpSetChurnMode(m){S.lpChurnMode=m;render();}
// Área do MRR perdido mês a mês: a mesma perda, mas em dinheiro em vez de contagem.
// Um mês com poucos clientes grandes dói mais que um com muitos pequenos.
function lpChartMrr(data,W,H,padL,padR,padT,padB){
  var maxM=Math.max(1,Math.max.apply(null,data.map(function(d){return d.mrr;})));
  var step=(W-padL-padR)/Math.max(1,data.length-1||1);
  var pts=data.map(function(d,i){
    var x=padL+(data.length>1?step*i:(W-padL-padR)/2);
    var y=padT+(1-d.mrr/maxM)*(H-padT-padB);
    return[x,y,d];
  });
  var grid='',labels='';
  [0,maxM/2,maxM].forEach(function(v){
    var y=H-padB-(v/maxM)*(H-padT-padB);
    grid+='<line x1="'+padL+'" y1="'+y+'" x2="'+(W-padR)+'" y2="'+y+'" stroke="var(--bd)" stroke-width="1"/>'
      +'<text x="'+(padL-8)+'" y="'+(y+3)+'" text-anchor="end" font-size="9" fill="var(--t3)">'+formatMRR(Math.round(v))+'</text>';
  });
  pts.forEach(function(p){labels+='<text x="'+p[0]+'" y="'+(H-padB+18)+'" text-anchor="middle" font-size="10" fill="var(--t3)">'+e(lpMonthLabel(p[2].month))+'</text>';});
  var linha=pts.map(function(p){return p[0]+','+p[1];}).join(' ');
  var area='<polygon points="'+padL+','+(H-padB)+' '+linha+' '+pts[pts.length-1][0]+','+(H-padB)+'" fill="var(--rd600)" opacity=".13"/>';
  var poly='<polyline points="'+linha+'" fill="none" stroke="var(--rd600)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lp-big-line"/>';
  var pior=data.slice().sort(function(a,b){return b.mrr-a.mrr;})[0];
  // Legenda só sobre o ponto do mês (com área de captura maior que o ponto visível).
  var hover='',tips=[];
  var dots=pts.map(function(p,i){
    tips.push('<b>'+e(lpMonthLabel(p[2].month))+'</b>'+formatMRR(p[2].mrr)+' de MRR perdido<br>'+p[2].clients+' cliente'+(p[2].clients===1?'':'s'));
    hover+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="12" fill="transparent" class="lp-hit" onmousemove="lpTip(event,'+i+')" onmouseleave="lpTipHide()"/>';
    return'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4.5" fill="var(--surf)" stroke="var(--rd600)" stroke-width="2.5"/>';
  }).join('');
  window._lpTipRows=tips;
  return'<div class="lp-legend"><span><i style="background:var(--rd600)"></i>MRR perdido por mês</span></div>'
    +'<div style="overflow-x:auto;position:relative"><svg viewBox="0 0 '+W+' '+H+'" style="width:100%;min-width:640px;height:'+H+'px">'+grid+area+poly+dots+labels+hover+'</svg></div>'
    +(pior?'<div class="lp-note" style="margin-top:6px">Pior mês: '+e(lpMonthLabel(pior.month))+' com '+formatMRR(pior.mrr)+' perdidos em '+pior.clients+' cliente'+(pior.clients===1?'':'s')+'.</div>':'');
}
// Ranking por analista: quem concentra a perda. Ordena pelo total do histórico.
function lpChartPorAnalista(data){
  var meses=data.map(function(d){return d.month;});
  var rows=lpTeamGoalRows().map(function(a){
    var cli=meses.reduce(function(s,m){return s+(a.churnClients[m]||0);},0);
    var mrr=meses.reduce(function(s,m){return s+(a.churnMrr[m]||0);},0);
    return{name:a.name,cli:cli,mrr:mrr};
  }).filter(function(r){return r.cli>0||r.mrr>0;}).sort(function(x,y){return y.cli-x.cli;});
  if(!rows.length)return'<div class="lp-empty-box">Sem churn registrado para os analistas deste time no histórico.</div>';
  var maxC=Math.max.apply(null,rows.map(function(r){return r.cli;}))||1;
  var totC0=rows.reduce(function(a,r){return a+r.cli;},0)||1;
  var tips=[];
  var html='<div class="lp-legend"><span><i style="background:var(--rd600)"></i>Clientes perdidos no histórico</span></div>';
  html+='<div class="lp-hbars">';
  rows.forEach(function(r,i){
    tips.push('<b>'+e(r.name)+'</b>'+r.cli+' cliente'+(r.cli===1?'':'s')+' perdido'+(r.cli===1?'':'s')+'<br>'+formatMRR(r.mrr)+' de MRR<br>'+Math.round(r.cli/totC0*100)+'% do churn do time');
    // Só a barra preenchida ativa a legenda — o trilho vazio não.
    html+='<div class="lp-hbar-row">'
      +'<span class="lp-hbar-name">'+e(r.name)+'</span>'
      +'<span class="lp-hbar-track"><i class="lp-hbar-fill lp-hit" style="width:'+(r.cli/maxC*100)+'%;animation-delay:'+(i*55)+'ms" onmousemove="lpTip(event,'+i+')" onmouseleave="lpTipHide()"></i></span>'
      +'<span class="lp-hbar-val">'+r.cli+'</span>'
      +'<span class="lp-hbar-mrr">'+formatMRR(r.mrr)+'</span></div>';
  });
  window._lpTipRows=tips;
  html+='</div>';
  var top=rows[0];
  var totC=rows.reduce(function(a,r){return a+r.cli;},0);
  html+='<div class="lp-note" style="margin-top:8px">'+e(top.name)+' concentra '+Math.round(top.cli/totC*100)+'% dos clientes perdidos no período.</div>';
  return html;
}
// ── Tooltip do gráfico expandido ──
// Guarda o texto de cada coluna/ponto no render e mostra ao passar o mouse.
// Segue o cursor dentro do próprio gráfico, sem depender do tooltip nativo (lento e feio).
function lpTip(ev,idx){
  var t=document.getElementById('lp-tip');if(!t)return;
  var rows=(window._lpTipRows||[]);var d=rows[idx];if(!d)return;
  t.innerHTML=d;t.style.display='block';
  var host=t.parentElement.getBoundingClientRect();
  var x=ev.clientX-host.left,y=ev.clientY-host.top;
  var w=t.offsetWidth||160;
  t.style.left=Math.max(4,Math.min(x-w/2,host.width-w-4))+'px';
  t.style.top=Math.max(4,y-t.offsetHeight-12)+'px';
}
function lpTipHide(){var t=document.getElementById('lp-tip');if(t)t.style.display='none';}
// ============================================================
// TEXTO DO SALESFORCE
// ============================================================
// Gerado a partir da lista real de perguntas daquele follow — primeira análise
// tem as suas, recorrente tem as suas, e perguntas customizadas aprovadas entram
// automaticamente. A ORDEM é sempre a padrão do sistema: se o analista reordenou
// as perguntas nas Configurações, o texto do Salesforce continua saindo na mesma
// sequência pra todo mundo, senão dois analistas mandariam o caso em ordens
// diferentes e ninguém conseguiria comparar.
var SF_OPT={
  site:['Site bem personalizado','Personalização básica','Tem site sem personalização','Não tem site','Outro'],
  occHigh:['Ótimo (75%+)','Bom (50-74%)','Neutro (35-49%)','Ruim (25-34%)','Péssimo (<25%)','Sem dados'],
  occLow:['Ótimo (50%+)','Bom (35-49%)','Neutro (25-34%)','Ruim (15-24%)','Péssimo (<15%)','Sem dados'],
  price:['Competitivo e bem posicionado','Na média do mercado','Um pouco fora do ideal','Muito fora do mercado','Sem dados'],
  modulo:['Utiliza ativamente','Utiliza pouco','Não utiliza','Não tem acesso'],
  app:['2+ integrações ativas','1 integração ativa','Nenhuma'],
  cases:['Sem casos abertos','Poucos casos, nada crítico','Muitos casos abertos','Casos críticos'],
  photos:['Excelentes','Boas, podem melhorar','Fracas','Sem fotos'],
  desc:['Completa e atrativa','Básica','Fraca/incompleta','Sem descrição'],
  notifs:['Painel limpo, sem pendências','Poucas notificações, nada crítico','Muitas pendências sem acompanhamento','Alertas críticos (overbooking, sem preço)'],
  chperf:['Boa performance em múltiplos canais','Razoável, concentrada em poucos canais','Fraca ou dependência de um único canal','Queda significativa vs. período anterior','Sem dados suficientes'],
  upgrade:['Bem no plano atual','Tem limitações, sem interesse','Oportunidade clara de upgrade','Não conhece planos superiores','Já está no plano máximo (Agency)']
};
function sfOpt(list,idx,fallback){
  return(idx!==undefined&&idx!==null&&list[idx])?list[idx]:(fallback||'Não informado');
}
// Canais com a quantidade de anúncios em cada um — é o dado que o time usa pra
// saber se o cliente está distribuindo de verdade ou só num canal.
function sfChannels(a){
  var nomes={};WIZ_CHANNELS.forEach(function(ch){nomes[ch.key]=ch.name;});
  var ativos=(a.channels||[]).filter(function(x){return x.active;});
  if(!ativos.length)return'Não informado';
  var total=+a.units_count||0;
  return ativos.map(function(x){
    var nome=nomes[x.key]||x.key;
    var qtd=(x.qty!==undefined&&x.qty!==null&&x.qty!=='')?+x.qty:null;
    if(x.all)return nome+': todos os '+(qtd||total||'?')+' anúncios';
    if(qtd!==null)return nome+': '+qtd+(total?' de '+total:'')+' anúncio'+(qtd===1?'':'s');
    return nome+': quantidade não informada';
  }).join(' | ');
}
// Periodos de temporada de uma cidade. Dois detalhes que faziam o texto sair
// como "?–?, ?–?": o wizard salva os campos como start/end (nao from/to), e o
// valor ja e o mes escrito ("Jan"), nao um numero pra converter. Periodo sem os
// dois meses preenchidos e ignorado, em vez de virar interrogacao no texto.
function sfSeasonPeriods(list){
  var ok=(list||[]).filter(function(p){return p&&p.start&&p.end;});
  if(!ok.length)return'periodo não informado';
  return ok.map(function(p){return p.start+'–'+p.end;}).join(', ');
}
function sfCities(a){
  var list=a.cities||[];
  if(!list.length)return'Não informado';
  return list.map(function(ct){
    var partes=[ct.name];
    if(ct.units)partes.push(ct.units+' unidade'+(+ct.units===1?'':'s'));
    var s=ct.seasons||{};
    var temp=[];
    if(s.alta&&s.alta.length)temp.push('alta: '+sfSeasonPeriods(s.alta));
    if(s.baixa&&s.baixa.length)temp.push('baixa: '+sfSeasonPeriods(s.baixa));
    if(temp.length)partes.push(temp.join(' / '));
    if(ct.principal)partes.push('principal');
    return partes.join(' — ');
  }).join(' | ');
}
function sfOccPeriod(o){
  if(!o||(!o.period_start&&!o.period_end))return'';
  if(o.period_start&&o.period_end)return' ['+formatDate(o.period_start)+' a '+formatDate(o.period_end)+']';
  return' ['+formatDate(o.period_start||o.period_end)+']';
}
// Resposta de uma pergunta em texto puro, com o detalhe que o analista escreveu.
function sfStepText(k,a,c){
  var occArr=wizFollowSeason(a)==='low'?SF_OPT.occLow:SF_OPT.occHigh;
  switch(k){
    case'units':
      if(a.units_changed==='nao')return'Manteve igual. Total: '+(a.units_count||'?');
      if(a.units_changed==='ganhou')return'Aumentou '+(a.units_delta||'?')+' unidade(s). Total atual: '+(a.units_count||'?');
      if(a.units_changed==='perdeu')return'Perdeu '+(a.units_delta||'?')+' unidade(s). Total atual: '+(a.units_count||'?');
      return a.units_count?'Total: '+a.units_count:'Não informado';
    case'cities':return sfCities(a);
    case'pricing':
      var pm=a.pricing_model==='fixo'?'Fixo (per listing)':(a.pricing_model==='flexivel'?'Flexível':'Não informado');
      if(a.pricing_tool==='sim')pm+=' | Usa ferramenta de precificação'+(a.pricing_tool_name?': '+a.pricing_tool_name:'');
      else if(a.pricing_tool==='nao')pm+=' | Sem ferramenta de precificação';
      return pm;
    case'channels':return sfChannels(a)+(a.channels_note?' | Obs. dos canais: '+a.channels_note:'');
    case'notifs':return sfOpt(SF_OPT.notifs,a.notifs_option)+(a.notifs_note?' — '+a.notifs_note:'');
    case'ch_perf':return sfOpt(SF_OPT.chperf,a.chperf_option)+(a.chperf_note?' — '+a.chperf_note:'');
    case'ch_usab':
      if(usabIsV2(a))return usabTextV2(a)+(a.usab_note?' — '+a.usab_note:'');
      var itens=WIZ_USAB_ITEMS.filter(function(it){return a['usab_'+it.key]!==undefined&&a['usab_'+it.key]!==null;});
      if(!itens.length)return'Não avaliado';
      return itens.map(function(it){return it.label+': '+(it.opts[a['usab_'+it.key]]||'?');}).join(' | ')+(a.usab_note?' — '+a.usab_note:'');
    case'domain':return(a.domain_migration==='sim'?'Sim':(a.domain_migration==='nao'?'Não':'Não informado'))+(a.domain_website?' | Site: '+a.domain_website:'');
    case'tz_check':return a.tz_confirmed==='sim'?'Confirmado':(a.tz_confirmed==='nao'?'Incorreto / não confirmado':'Não avaliado');
    case'site':return sfOpt(SF_OPT.site,a.site_option)+(a.site_other?' — '+a.site_other:'');
    case'photos':return'Fotos: '+sfOpt(SF_OPT.photos,a.photos_option,'Não avaliado')+' | Descrição: '+sfOpt(SF_OPT.desc,a.description_option,'Não avaliado');
    case'occupation':
      var oc=a.occ_current,op=a.occ_lastyear;
      if(!oc||oc.option===undefined||oc.option===null)return'Não informado';
      var t=occArr[oc.option]+sfOccPeriod(oc);
      if(oc.listings)t+=' ('+oc.listings+' anúncios)';
      if(op&&op.option!==undefined&&op.option!==null)t+=' | Ano anterior: '+occArr[op.option]+sfOccPeriod(op);
      return t;
    case'price':return sfOpt(SF_OPT.price,a.price_option);
    case'lastminute':
      if(a.lastminute==='sim')return'Sim — até '+(a.lastminute_time||'horário não informado')+(a.lastminute_days?' ('+a.lastminute_days+' dia(s) de antecedência)':'');
      return a.lastminute==='nao'?'Não':'Não informado';
    case'financial':return sfOpt(SF_OPT.modulo,a.financial_option);
    case'operational':return sfOpt(SF_OPT.modulo,a.operational_option);
    case'appcenter':return sfOpt(SF_OPT.app,a.appcenter_option)+(a.appcenter_detail?' — '+a.appcenter_detail:'');
    case'openapi':return a.openapi==='sim'?'Sim — '+(a.openapi_detail||'detalhe não informado'):(a.openapi==='nao'?'Não':'Não informado');
    case'prod_sug':return a.prodsug_has===true?'Sim — '+(a.prodsug_note||'sem detalhe'):(a.prodsug_has===false?'Não':'Não informado');
    case'payment':
      var pay=a.payment==='sim'?'Tem canal configurado':(a.payment==='nao'?'Não tem canal':'Não informado');
      if(a.payment==='sim'&&(a.payment_providers||[]).length)pay+=' ('+a.payment_providers.join(', ')+')';
      return pay;
    case'inadimplencia':
      var inad=(c&&isInadimplente(c))?'Sim, tem faturas em aberto':'Sem faturas em aberto';
      if(a.inadimplencia_opt==='sim')inad='Sim, costuma ficar inadimplente';
      else if(a.inadimplencia_opt==='nao')inad='Não, pagamentos em dia';
      var abertos=((c&&c.inadimplencia)||[]).filter(function(m){return!m.paid;});
      if(abertos.length)inad+=' — em aberto: '+abertos.map(function(m){return m.month+'/'+m.year+(m.amount?' ('+m.amount+')':'');}).join(', ');
      if(a.inadimplencia_note)inad+=' — '+a.inadimplencia_note;
      return inad;
    case'nego':return a.nego_has===true?'Sim'+(a.nego_note?' — '+a.nego_note:''):(a.nego_has===false?'Não':'Não informado');
    case'nps_churn':
      var partes=[];
      partes.push('Churn: '+((c&&isChurnAlert(c))?'alerta ativo':'sem alerta')+(a.churn_note?' — '+a.churn_note:''));
      partes.push('NPS: '+(a.nps_avaliou==='sim'?(a.nps_score+'/10'+(a.nps_date?' em '+formatDate(a.nps_date):'')):'não avaliou'));
      partes.push('Reclame Aqui: '+(a.reclame_aqui==='sim'?'sim':(a.reclame_aqui==='nao'?'não':'não informado')));
      return partes.join(' | ');
    case'cases':
      var cs=sfOpt(SF_OPT.cases,a.cases_option);
      if(a.cases_n2==='sim')cs+=' — tem N2/Website em aberto'+(a.cases_n2_detail?' ('+a.cases_n2_detail+')':'');
      else if(a.cases_n2==='nao')cs+=' — sem N2/Website em aberto';
      return cs;
    case'upgrade':return sfOpt(SF_OPT.upgrade,a.upgrade_option,'Não avaliado')+(a.upgrade_note?' — '+a.upgrade_note:'');
    case'acct_plan':
      var ac=a.acct_has===true?'Plano de contas preenchido':(a.acct_has===false?'Plano de contas não preenchido':'Não informado');
      if(a.acct_positives)ac+=' | Destaques positivos: '+a.acct_positives;
      if(a.acct_attention)ac+=' | Pontos de cuidado: '+a.acct_attention;
      if(a.acct_next)ac+=' | Próximos passos: '+a.acct_next;
      return ac;
    default:
      if(k.indexOf('custom_')===0){
        var qid=k.slice(7);
        var q=(S.customQuestions||[]).find(function(x){return x.id===qid;});
        if(!q)return'Não informado';
        var sel=a.custom&&a.custom[qid];
        return(sel!==undefined&&sel!==null&&q.answers&&q.answers[sel])?q.answers[sel].label:'Não respondido';
      }
      return'Não informado';
  }
}
// Ordem PADRÃO do sistema, ignorando a reordenação pessoal do analista, com as
// perguntas customizadas aprovadas dele no fim.
function sfStepOrder(type,a){
  var base=(type==='recurring'?WIZ_STEPS_REC:WIZ_STEPS_FIRST).slice();
  var custom=[];
  try{
    (getMyApprovedCustomQuestions(S.appUser&&S.appUser.uid,type)||[]).forEach(function(q){custom.push('custom_'+q.id);});
  }catch(err){}
  // Customizada respondida neste follow que já não está mais compartilhada
  // continua entrando, senão o texto perderia uma resposta que existe.
  Object.keys((a&&a.custom)||{}).forEach(function(qid){
    var k='custom_'+qid;
    if(custom.indexOf(k)<0)custom.push(k);
  });
  return base.concat(custom);
}
function buildSFText(type,a,c){
  var order=sfStepOrder(type,a);
  var labels=wizStepLabels();
  var lines=[];
  lines.push('Follow up '+(type==='recurring'?'recorrente':'— primeira análise')+':');
  lines.push('');
  order.forEach(function(k,i){
    var label=(k.indexOf('custom_')===0)?wizOrderLabel(k):(labels[k]||k);
    lines.push((i+1)+'. '+label+' - '+sfStepText(k,a,c));
    // A observação do analista vira uma linha própria embaixo da resposta.
    var nota=a['note_'+k];
    if(nota&&String(nota).trim())lines.push('   Obs.: '+String(nota).trim());
  });
  if(a.positive_points||a.attention_points||a.next_steps){
    lines.push('');
    if(a.positive_points)lines.push('Pontos positivos: '+a.positive_points);
    if(a.attention_points)lines.push('Pontos de atenção: '+a.attention_points);
    if(a.next_steps)lines.push('Próximos passos: '+a.next_steps);
  }
  return lines.join('\n');
}
// Todo texto do Salesforce ja gerado e reconstruido quando o dashboard carrega.
// Assim, qualquer melhoria no gerador — pergunta que faltava, observacao que nao
// entrava — aparece sem o analista precisar clicar em "Texto Salesforce" de novo.
// A reconstrucao fica em memoria: o banco e atualizado no proximo clique ou em
// qualquer outro salvamento daquele cliente, o que evita reescrever a base toda
// a cada login.
function refreshAllSFTexts(){
  var mudados=0;
  (S.clients||[]).forEach(function(c){
    (c.follows||[]).forEach(function(f){
      if(!f||!f.answers||!f.answers.sf_text)return;
      try{
        var novo=buildSFText(f.type||'first',f.answers,c);
        if(novo!==f.answers.sf_text){f.answers.sf_text=novo;mudados++;}
      }catch(err){console.warn('Nao foi possivel refazer o texto do Salesforce:',err);}
    });
  });
  return mudados;
}
