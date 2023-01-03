// get local storage
var conadrr = localStorage.getItem("conadrr");
var masterkey = localStorage.getItem("masterkey");

if(conadrr == null || masterkey == null){
    // if there is no local storage redirect to the login page
    window.location.href = "logout";
}
var ws = new WebSocket("ws://"+conadrr);
ws.onerror = function (err){
console.log("ERROR:" + err)
document.getElementById("status").style = 'color: red';
document.getElementById("status").innerHTML = "Offline/connection refused!";
}
ws.onopen = function (con) {
console.log("READY!")
document.getElementById("status").style = 'color: limegreen';
document.getElementById("status").innerHTML = "Online!";
ws.send(JSON.stringify({act: "master_connect",key: masterkey}))
}
function que(){
let quey = document.forms["fetch"]["quey"].value;
try{
quey = JSON.parse(quey)
}catch(e){
    document.getElementById("data").innerHTML = "BAD JSON!";
    return false
}
try{
    ws.send(JSON.stringify({act: "fetch",key: masterkey,query: quey}));
}
catch{
document.getElementById("data").style = 'color: red';
document.getElementById("data").innerHTML = "FAILED TO CONNECT";
document.getElementById("status").style = 'color: red';
document.getElementById("status").innerHTML = "Offline/connection refused!";
return false
}
ws.onmessage = function (msg){
    var data = JSON.parse(msg.data);
    console.log(data)
    document.getElementById("data").innerHTML = JSON.stringify(data);
}
}
ws.onmessage = function (msg){
var data = JSON.parse(msg.data);
if(data.error == undefined){
console.log(data);
}else{
console.log("CATODB ERROR: "+data.error)
document.getElementById("data").style = 'color: red';
document.getElementById("data").innerHTML = "CATODB ERROR: "+data.error;
}
}
ws.onclose = function (msg){
console.log("CONNECTION CLOSED")
document.getElementById("status").style = 'color: red';
document.getElementById("status").innerHTML = "Offline/connection refused!";
}
ws.onerror = function (err){
console.log("ERROR:" + err)
document.getElementById("status").style = 'color: red';
document.getElementById("status").innerHTML = "Offline/Error";
}