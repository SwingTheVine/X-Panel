const ptero = require('./modules/ptero.js');
const pterofetch = require('./modules/pterofetch.js');

const ws = require('ws');
const catodb = require('catodb');

const db = new catodb('localhost:4020', 'catodb');
const wss = new ws.Server({ port: 6969 });

wss.on('connection', function connection(ws) {
});
wss.on('message', function connection(ws) {

});