const _0x3cca37=_0x340a;(function(_0x458b47,_0x354e15){const _0x487a57=_0x340a,_0x276ed6=_0x458b47();while(!![]){try{const _0xaea3cc=parseInt(_0x487a57(0x1e6))/0x1*(parseInt(_0x487a57(0x202))/0x2)+-parseInt(_0x487a57(0x1f8))/0x3+parseInt(_0x487a57(0x1f5))/0x4*(-parseInt(_0x487a57(0x1e2))/0x5)+-parseInt(_0x487a57(0x204))/0x6+parseInt(_0x487a57(0x1f3))/0x7+-parseInt(_0x487a57(0x201))/0x8*(parseInt(_0x487a57(0x206))/0x9)+-parseInt(_0x487a57(0x1d9))/0xa*(-parseInt(_0x487a57(0x208))/0xb);if(_0xaea3cc===_0x354e15)break;else _0x276ed6['push'](_0x276ed6['shift']());}catch(_0x691c98){_0x276ed6['push'](_0x276ed6['shift']());}}}(_0x45cd,0xee159));const express=require(_0x3cca37(0x1d8)),cors=require(_0x3cca37(0x1d4)),mongoose=require(_0x3cca37(0x1fd)),authRoutes=require(_0x3cca37(0x1e4)),serverRoutes=require(_0x3cca37(0x1e3)),ticketRoutes=require(_0x3cca37(0x1e9)),paymentRoutes=require(_0x3cca37(0x1ef)),webhostingRoutes=require(_0x3cca37(0x1dd)),productRoutes=require(_0x3cca37(0x1cc)),licenseRoutes=require(_0x3cca37(0x207)),devRoutes=require(_0x3cca37(0x1d0)),app=express(),{sessionSecrets,corsOrigin,licenseKey}=require('./config.json'),session=require('express-session'),socket=require(_0x3cca37(0x1e1));require(_0x3cca37(0x200))[_0x3cca37(0x1d2)]();function _0x45cd(){const _0x1a75b9=['./routes/dev','MONGOURL','config','You\x27ve\x20been\x20banned.','cors','/api/auth','MemoryStore','get','express','3695530iplEJb','production','add-user','use','./routes/webhosting','msg-recieve','then','MONGO_PWD','socket.io','10jOeaHC','./routes/servers','./routes/auth','env','4546XOjPDP','License\x20Key\x20Valid','connect','./routes/tickets','chatSocket','openTickets','catch','message','node-fetch','./routes/payments','DB\x20Connetion\x20Successfull','listen','./functions','8933344kvRQWn','connection','90296aeJjCR','/api/server','fromUser','1803012sPhHrh','emit','json','ENVIRONMENT','cookie-parser','mongoose','banUser','License\x20key\x20failed\x20to\x20authenticate.\x20','dotenv','2660384reMRIY','810ACbgDF','It\x20seems\x20this\x20application\x20is\x20not\x20licensed.\x20Please\x20contact\x20support.','11415210CLDhfZ','/api/ticket','9AmYAUM','./routes/licensing','22TjPKil','System','status','send-ticket-msg','Server\x20started\x20on\x20','bannedUser','onlineUsers','./routes/products','log','join','MONGO_USER'];_0x45cd=function(){return _0x1a75b9;};return _0x45cd();}var cookieParser=require(_0x3cca37(0x1fc));const fetch=require(_0x3cca37(0x1ee)),{getLicense}=require(_0x3cca37(0x1f2));function _0x340a(_0x4c5e6a,_0x36b419){const _0x45cdde=_0x45cd();return _0x340a=function(_0x340a62,_0x313ff3){_0x340a62=_0x340a62-0x1c7;let _0x73fd9e=_0x45cdde[_0x340a62];return _0x73fd9e;},_0x340a(_0x4c5e6a,_0x36b419);}var MemoryStore=session[_0x3cca37(0x1d6)];app[_0x3cca37(0x1dc)](cookieParser()),app[_0x3cca37(0x1dc)](cors()),app[_0x3cca37(0x1dc)](express[_0x3cca37(0x1fa)]()),app['use'](session({'secret':sessionSecrets,'resave':!![],'saveUninitialized':![],'name':'X-Panel_INFO','store':new MemoryStore(),'cookie':{'expires':0xf4240}}));process[_0x3cca37(0x1e5)][_0x3cca37(0x1fb)]===_0x3cca37(0x1da)?mongoose[_0x3cca37(0x1e8)](process['env']['MONGOURL'],{'useNewUrlParser':!![],'useUnifiedTopology':!![],'auth':{'username':process[_0x3cca37(0x1e5)][_0x3cca37(0x1cf)],'password':process['env'][_0x3cca37(0x1e0)],'atuhdb':process['env']['MONGO_DB']}})['then'](()=>{const _0x140c65=_0x3cca37;console[_0x140c65(0x1cd)](_0x140c65(0x1f0));})[_0x3cca37(0x1ec)](_0x1b356b=>{const _0x1dba29=_0x3cca37;console[_0x1dba29(0x1cd)](_0x1b356b[_0x1dba29(0x1ed)]);}):mongoose[_0x3cca37(0x1e8)](process[_0x3cca37(0x1e5)][_0x3cca37(0x1d1)],{'useNewUrlParser':!![],'useUnifiedTopology':!![]})[_0x3cca37(0x1df)](()=>{const _0x4da55d=_0x3cca37;console['log'](_0x4da55d(0x1f0));})[_0x3cca37(0x1ec)](_0x5eed8d=>{const _0x15d732=_0x3cca37;console[_0x15d732(0x1cd)](_0x5eed8d[_0x15d732(0x1ed)]);});app[_0x3cca37(0x1dc)]('/api/licensing',licenseRoutes),((async()=>{const _0x456d20=_0x3cca37,_0x1985fa=await getLicense(licenseKey);_0x1985fa===!![]?(console[_0x456d20(0x1cd)](_0x456d20(0x1e7)),app[_0x456d20(0x1dc)](_0x456d20(0x1d5),authRoutes),app['use'](_0x456d20(0x1f6),serverRoutes),app[_0x456d20(0x1dc)](_0x456d20(0x205),ticketRoutes),app[_0x456d20(0x1dc)]('/api/payments',paymentRoutes),app[_0x456d20(0x1dc)]('/api/webhosting',webhostingRoutes),app[_0x456d20(0x1dc)]('/api/dev',devRoutes)):(console[_0x456d20(0x1cd)](_0x456d20(0x1ff)),app[_0x456d20(0x1dc)]((_0x4a0d91,_0x5d1fb4,_0xd6ba0d)=>{const _0x5c528b=_0x456d20;_0x5d1fb4[_0x5c528b(0x1c7)](0x194)['send'](_0x5c528b(0x203));}));})());const server=app[_0x3cca37(0x1f1)](process[_0x3cca37(0x1e5)]['PORT'],()=>console[_0x3cca37(0x1cd)](_0x3cca37(0x1c9)+process[_0x3cca37(0x1e5)]['PORT'])),io=socket(server,{'cors':{'origin':corsOrigin,'credentials':!![]}});global[_0x3cca37(0x1cb)]=new Map(),global[_0x3cca37(0x1eb)]=new Map(),io['on'](_0x3cca37(0x1f4),_0x49fcae=>{const _0x1bbad0=_0x3cca37;global[_0x1bbad0(0x1ea)]=_0x49fcae,_0x49fcae['on'](_0x1bbad0(0x1db),(_0x3a94e9,_0x42caca)=>{const _0x1d9aee=_0x1bbad0;onlineUsers['set'](_0x3a94e9,_0x42caca),_0x49fcae[_0x1d9aee(0x1ce)](_0x42caca);}),_0x49fcae['on'](_0x1bbad0(0x1fe),_0x15968e=>{const _0x578f28=_0x1bbad0,_0x46eba7=onlineUsers[_0x578f28(0x1d7)](_0x15968e['to']);_0x46eba7&&_0x49fcae['to'](_0x46eba7)[_0x578f28(0x1f9)](_0x578f28(0x1ca),{'msg':_0x578f28(0x1d3),'from':_0x578f28(0x209)});}),_0x49fcae['on'](_0x1bbad0(0x1c8),_0x3269ae=>{const _0x49c837=_0x1bbad0;console[_0x49c837(0x1cd)](_0x3269ae),_0x49fcae['to'](_0x3269ae['ticket'])[_0x49c837(0x1f9)](_0x49c837(0x1de),{'msg':_0x3269ae['msg'],'user':_0x3269ae[_0x49c837(0x1f7)]});});});