const catodb = require('catodb')
const tools = require('./tools.js')
const pterofetch = require('./pterofetch.js')
const db = new catodb('ws://localhost:4020','CatoDB')

exports.login = async function(user,pass){
    var info = {user: user,pass: pass}
    return new Promise(async function(resolve, reject){
    try{
    data = await db.fetch({table: "auth",filters: {column:"user", value: info.user}})
    meow = JSON.parse(data[0])
    console.log(meow)
    token = tools.genid(1000)    
    if(meow.data.pass == info.pass){
        console.log(await db.update({table: "auth",row:meow.row,data:{token:token},mode:"adjust"}))
        resolve({"status":200,"token":token})
    }else{
        resolve("fail")
    }
    }catch(err){
        resolve(err)
    }
});
}
exports.register = async function(user){
    var info = user
    return new Promise(async function(resolve, reject){
    let data = ""
    console.log(info)
    try{
        try{
        data = await db.fetch({table: "auth",filters: {column:"user", value: info.user}})
        }catch(err){
            data = err    
        }
        console.log(data)
        if(data == 'ERROR: NO ROWS FOUND'){ 
            console.log('username check passed')
            try{
            data = await db.fetch({table: "auth",filters: {column:"email", value: info.email}})
        }catch(err){
            data = err    
        }
        console.log(data)
        if(data == 'ERROR: NO ROWS FOUND'){
            console.log('email check passed')
            try{
                // find the biggest UID from DB
                data = await db.fetch({table: "auth",filters: {column: "UID", value: "*"}})
                console.log(data)
                let tkn = tools.genid(1000)
                await db.insert({table: "auth",data:{user: info.user,pass: info.pass,status: "user",UID: data.length+1,PetroID: "none",token: tkn,email: info.email}})
                await pterofetch.createUser({username:info.user,UID:info.UID,email:info.email})
                await pterofetch.updateUser({username:info.user,UID:info.UID,email:info.email,password:info.pass})
        resolve({status: 200})
    }catch(err){
        data = err    
    }
        console.log(data)
        }else{
            reject("email already exsits")
        }
        }else{
            reject("username already exsits")
        }
        
    }catch(err){
        reject(err)
    }
});
}