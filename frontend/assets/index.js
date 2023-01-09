// get local storage
var username = localStorage.getItem("username");
var token = localStorage.getItem("token");

if(username == null || token == null){
    // if there is no local storage redirect to the login page
    window.location.href = "logout";
}
var ws = new WebSocket("ws://localhost:2000");
ws.onerror = function (err){
console.log("ERROR:" + err)
window.location.href = "logout";
}
ws.onopen = function (con) {
console.log("connected")
// ws.send(JSON.stringify({act: "master_connect",key: masterkey}))
}

ws.onmessage = function (msg){
var data = JSON.parse(msg.data);
if(data.channel == "auth"){
if(data.status == 200){

}else{
console.log("INVALID CREDENTIALS")
window.location.href = "logout";
}
}
}
ws.onclose = function (msg){
console.log("CONNECTION CLOSED")
window.location.href = "logout";
}
ws.onerror = function (err){
console.log("ERROR:" + err)
window.location.href = "logout";
}