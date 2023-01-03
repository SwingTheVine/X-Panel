const ptero = require('./pterofetch')
var fs = require('fs');

exports.getall = async function(){
  var srs = await ptero.listServers()
  console.log(srs)
  var urs = await ptero.listUsers()
  console.log(urs)
  var nds = await ptero.listNodes()
  console.log(nds)
}

exports.meowsusers = async function(){
  var urs = await ptero.listUsers()
  console.log(urs)
  var num = urs.meta.pagination.total + 1;
  var ti = 1;
  for (var i = 1; i < num;){
    var ur = await ptero.listUser(ti)
    if(ur.errors == undefined){
      console.log(ur.attributes.username)
        fs.appendFile('users.txt', "ID:" + ti + "||"+ ur.attributes.username + "\n", function (err) {
        if (err) throw err;
    });
    i++
    ti++
  }else{
    console.log('\x1b[31m' + ti + " | NULL USER \x1b[0m")
    ti++
    }
  }
}

exports.meowservers = async function(){
  var sers = await ptero.listServers()
  console.log(sers)
  var num = sers.meta.pagination.total + 1;
  var ti = 1;
  for (var i = 1; i < num;){
    var serv = await ptero.listServer(ti)
    if(serv.errors == undefined){
      console.log(serv.user)
      var usr = await ptero.listUser(serv.user);
      console.log(usr)
      console.log(serv.attributes.name + "||" + usr.attributes.username)
      fs.appendFile('servers.txt', "ID:" + ti + "||"+ serv.attributes.name + "||" + usr.attributes.username + "\n", function (err) {
        if (err) throw err;
      });
    i++
    ti++
    }else{
      console.log('\x1b[31m' + ti + " | NULL SERVER \x1b[0m")
      ti++
    }
  }
}
exports.purgeservers = async function(){
  var sers = await ptero.listServers()
  console.log(sers)
  var num = sers.meta.pagination.total + 1;
  var ti = 1;
  for (var i = 1; i < num;){
    var serv = await ptero.listServer(ti)
    if(serv.errors == undefined){
      console.log(serv.user)
      var usr = await ptero.listUser(serv.user);
      console.log(usr)
      if(serv.attributes.name.contains("SAFE")){}else{
      await ptero.deleteServer(serv.attributes.id)
      console.log('\x1b[31m' + serv.attributes.name + "|| DELETED \x1b[0m")
      }
    i++
    ti++
    }else{
      console.log('\x1b[31m' + ti + " | NULL SERVER \x1b[0m")
      ti++
    }
  }
}
// exports.purgesusers = async function(){
//   var urs = await ptero.listUsers()
//   console.log(urs)
//   var num = urs.meta.pagination.total + 1;
//   var ti = 1;
//   for (var i = 1; i < num;){
//     var ur = await ptero.listUser(ti)
//     if(ur.errors == undefined){
//       ptero.listUser(ur.attributes.id)
//       if (ur.attributes.id == 1){
//         console.log("SAFE!")
//     }else{
//       await ptero.deleteUser(ur.attributes.id)
//       console.log('\x1b[31m USER:' + ur.attributes.id + " || DELETED \x1b[0m")
//     }
//     i++
//     ti++
//   }else{
//     console.log('\x1b[31m' + ti + " | NULL USER \x1b[0m")
//     ti++
//     }
//   }
// }
exports.meownodes = async function(){
  var sers = await ptero.listServers()
  console.log(sers)
  var num = sers.meta.pagination.total + 1;
  var ti = 1;
  for (var i = 1; i < num;){
    var serv = await ptero.listServer(ti)
    if(serv.errors == undefined){
      console.log(serv.attributes.name)
      fs.appendFile('servers.txt', "ID:" + ti + "||"+ serv.attributes.name + "\n", function (err) {
      if (err) throw err;
    });
    i++
    ti++
    }else{
      console.log('\x1b[31m' + ti + " | NULL SERVER \x1b[0m")
      ti++
    }
  }
}