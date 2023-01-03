const fetch = require('node-fetch');
const fs = require('fs');

async function getSettings(){
  return new Promise(function(resolve, reject) {
    fs.readFile("././settings.json", function(err, data) {
      if (err) reject(err);
      var settings = JSON.parse(data);
      resolve(settings);
    });
  });
}
// servers
exports.listServers = async function(){
 var settings = await getSettings();
   return fetch("https://"+settings.ptero.url+"/api/application/servers", {
  "method": "GET",
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer " + settings.ptero.token
    }
})
  .then(response => response.json().then())
  .catch(err => console.error(err));
}
exports.listServer = async function(num){
  var settings = await getSettings();
  return fetch("https://"+settings.ptero.url+"/api/application/servers/"+num, {
 "method": "GET",
 "headers": {
   "Accept": "application/json",
   "Content-Type": "application/json",
   "Authorization": "Bearer "+settings.ptero.token
 }
})
 .then(response => response.json().then())
 .catch(err => console.error(err));
}
exports.deleteServer = async function(num){
  var settings = await getSettings();
  return fetch("https://"+settings.ptero.url+"/api/application/servers/"+num, {
 "method": "DELETE",
 "headers": {
   "Accept": "application/json",
   "Content-Type": "application/json",
   "Authorization": "Bearer "+settings.ptero.token
 }
})
 .then(response => response.json().then())
 .catch(err => console.error(err));
}
// users
exports.listUsers = async function(){
  var settings = await getSettings();
  return fetch("https://"+settings.ptero.url+"/api/application/users", {
 "method": "GET",
 "headers": {
   "Accept": "application/json",
   "Content-Type": "application/json",
   "Authorization": "Bearer "+settings.ptero.token
 }
})
 .then(response => response.json().then())
 .catch(err => console.error(err));
}
exports.listUser = async function(num){
  var settings = await getSettings();
  return fetch("https://"+settings.ptero.url+"/api/application/users/"+num, {
 "method": "GET",
 "headers": {
   "Accept": "application/json",
   "Content-Type": "application/json",
   "Authorization": "Bearer "+settings.ptero.token
 }
})
 .then(response => response.json().then())
 .catch(err => console.error(err));
}
exports.GetUserServers = async function(num){
  var settings = await getSettings();
  return fetch("https://"+settings.ptero.url+"/api/client", {
 "method": "GET",
 "headers": {
   "Accept": "application/json",
   "Content-Type": "application/json",
   "Authorization": "Bearer "+settings.ptero.ctoken
 }
})
 .then(response => response.json().then())
 .catch(err => console.error(err));
}
exports.deleteUser = async function(num){
  var settings = await getSettings();
  return fetch("https://"+settings.ptero.url+"/api/application/users/"+num, {
 "method": "DELETE",
 "headers": {
   "Accept": "application/json",
   "Content-Type": "application/json",
   "Authorization": "Bearer "+settings.ptero.token
 }
})
 .then(response => response.json().then())
 .catch(err => console.error(err));
}
// nodes
exports.listNodes = async function(){
  var settings = await getSettings();
  return fetch("https://"+settings.ptero.url+"/api/application/nodes", {
 "method": "GET",
 "headers": {
   "Accept": "application/json",
   "Content-Type": "application/json",
   "Authorization": "Bearer "+settings.ptero.token
 }
})
 .then(response => response.json().then())
 .catch(err => console.error(err));
}
exports.listNode = async function(num){
  var settings = await getSettings();
  return fetch("https://"+settings.ptero.url+"/api/application/nodes/"+num, {
 "method": "GET",
 "headers": {
   "Accept": "application/json",
   "Content-Type": "application/json",
   "Authorization": "Bearer "+settings.ptero.token
 }
})
 .then(response => response.json().then())
 .catch(err => console.error(err));
}
exports.updateServer_info = async function(num,data){
  var settings = await getSettings();
  return fetch("https://"+settings.ptero.url+"/api/application/servers/"+num+"/details", {
 "method": "PATCH",
 "headers": {
   "Accept": "application/json",
   "Content-Type": "application/json",
   "Authorization": "Bearer "+settings.ptero.token
 },
    body: JSON.stringify(data)
})
 .then(response => response.json().then())
 .catch(err => console.error(err));
}
exports.updateServer_build = async function(num,data){
  var settings = await getSettings();
  return fetch("https://"+settings.ptero.url+"/api/application/servers/"+num+"/build", {
 "method": "PATCH",
 "headers": {
   "Accept": "application/json",
   "Content-Type": "application/json",
   "Authorization": "Bearer "+settings.ptero.token
  },
    body: JSON.stringify(data)
})
 .then(response => response.json().then())
 .catch(err => console.error(err));
}
exports.suspendServer = async function(num,data){
  var settings = await getSettings();
  return fetch("https://"+settings.ptero.url+"/api/application/servers/"+num+"/suspend", {
 "method": "POST",
 "headers": {
   "Accept": "application/json",
   "Content-Type": "application/json",
   "Authorization": "Bearer "+settings.ptero.token
 }
})
 .then(response => response.json().then())
 .catch(err => console.error(err));
}
exports.unsuspendServer = async function(num,data){
  var settings = await getSettings();
  return fetch("https://"+settings.ptero.url+"/api/application/servers/"+num+"/unsuspend", {
 "method": "POST",
 "headers": {
   "Accept": "application/json",
   "Content-Type": "application/json",
   "Authorization": "Bearer "+settings.ptero.token
 }
})
 .then(response => response.json().then())
 .catch(err => console.error(err));
}
exports.createServer = async function(data){
  var settings = await getSettings();
  return fetch("https://"+settings.ptero.url+"/api/application/servers", {
 "method": "POST",
 "headers": {
   "Accept": "application/json",
   "Content-Type": "application/json",
   "Authorization": "Bearer "+settings.ptero.token
 },
    body: JSON.stringify(data)
})
 .then(response => response.json().then())
 .catch(err => console.error(err));
}
exports.getEgg = async function(nest,egg){
  var settings = await getSettings();
  return fetch("https://"+settings.ptero.url+"/api/application/nests/"+nest+"/eggs/"+egg+"?include=variables", {
 "method": "GET",
 "headers": {
   "Accept": "application/json",
   "Content-Type": "application/json",
   "Authorization": "Bearer "+settings.ptero.token
 }
})
 .then(response => response.json().then())
}