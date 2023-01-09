const ptero = require('./modules/ptero.js');
const pterofetch = require('./modules/pterofetch.js');
const auth = require('./modules/auth.js');
const tools = require('./modules/tools.js');

const ws = require('ws');
const catodb = require('catodb');

const db = new catodb('localhost:4020', 'catodb');
const wss = new ws.WebSocketServer({port: 2000});

wss.on('connection', async function connection(ws) {
    console.log("connected")
    ws.on('message', async function incoming(message) {
    console.log(message)
    let data = JSON.parse(message.data);
    if(data.channel == "auth"){
        if(data.action == "login"){
            await auth.login(data.user,data.pass,db).then(function(res){
                ws.send(JSON.stringify(res))
            })
        }
        if(data.action == "register"){
            await auth.register(data.user,db).then(function(res){
                ws.send(JSON.stringify(res))
            })
        }
    }
});
});

wss.on ('error', function (err){
    console.log(err)
})