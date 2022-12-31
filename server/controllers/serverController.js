// const User = require("../models/userModel");
// const Queue = require("../models/serverQueue");
// const Server = require("../models/servers");
const dbc = require("./catodb");
const catodb = require('catodb')
const { pteroKey, jwtToken } = require('../config.json');
const { addedToQueue, createdServer, deletedServer } = require("../bot");
const Node = require("../models/nodes");
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken')

const db = new catodb('localhost:4020', 'CatoDB_Master')

module.exports.createServer = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    const jwtVerify = jwt.verify(bearerHeader,jwtToken)
    const userUid = jwtVerify._id;
    const { name, location, software, memory, disk, cpu } = req.body;
    const usere = await dbc.fetch({table:"users",filters:{column:"_id",value:userUid}});
    const user = usere.data;
    if(location == ""){
      return res.json({ added: false, msg: "You need to select a node first."});
    }else{
    if(software == ""){
      return res.json({added: false, msg: "Please select a server software."});
    }
    // const getNodeStats = await Node.findOne({ pteroId: location }).select([
    //   "nodeSlots"
    // ]);
    var getNodeStats = await dbc.fetch({table:"nodes",filters:{column:"pteroId",value:location}});
    getNodeStats = JSON.parse(getNodeStats.data[0]);
    if(getNodeStats.nodeSlots <= 0){
      return res.json({ added: false, msg: "This node currently does not have any slots available."});
    }else{
        const newTotalMem = user.availMem - memory;
        const newTotalDisk = user.availDisk - disk;
        const newTotalCPU = user.availCPU - cpu;
        const newTotalSlots = user.availSlots - 1;

        // const servers = await Server.find({ serverOwner: jwtVerify._id }).count();
        var servers = await dbc.fetch({table:"servers",filters:{column:"serverOwner",value:jwtVerify._id}});
        servers = servers.data.length;
        if(servers >= 5){
          return res.json({added:false,msg:"You can only have 5 servers to an account."});
        }
        else if(memory < 500){
          return res.json({ added: false, msg: "You need to have more than 499mb of memory on a server."});
        }else if(disk < 1000){
          return res.json({ added: false, msg: "You need to have more than 1000mb of disk space on a server."});
        }else if(cpu < 25){
          return res.json({ added: false, msg: "You need to have more than 24% of CPU on a server."});
        }else{
        if(newTotalMem < 0){
          return res.json({ added: false, msg: "You can't use more memory than your account has."})
        }else if(newTotalDisk < 0){
          return res.json({ added: false, msg: "You can't use more disk space than your account has."})
        }else if(newTotalCPU < 0){
          return res.json({ added: false, msg: "You can't use more CPU than your account has."})
        }else if(newTotalSlots < 0){
          return res.json({ added: false, msg: "You can't use more slots than your account has."})
        }else{

        const eggFind = await fetch('https://control.forcehost.net/api/application/nests/5/eggs/'+software, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${pteroKey}`
          }
        })
        const eggData = await eggFind.json();
        if(!eggData){
          return res.json({added: false, msg: "Fetching that software type had an issue."})
      }
        const userPtero = user.pteroId;
        const pteroCreate = await fetch('https://control.forcehost.net/api/application/servers', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer `+pteroKey
      },
      body: JSON.stringify({
        name: name,
        user: userPtero,
        egg: software,
        docker_image: eggData.attributes.docker_image,
        startup: eggData.attributes.startup,
        environment: {
          BUNGEE_VERSION: "latest",
          SERVER_JARFILE: 'server.jar',
          BUILD_NUMBER: 'latest',
          MC_VERSION: 'latest',
          BUILD_TYPE: 'recommended',
          SPONGE_VERSION: '1.12.2-7.3.0',
          VANILLA_VERSION: 'latest',
          MINECRAFT_VERSION: 'latest',
          BEDROCK_VERSION: 'latest',
          LD_LIBRARY_PATH: '.',
          GAMEMODE: 'survival',
          CHEATS: 'false',
          DIFFICULTY: 'normal',
          SERVERNAME: 'Bedrock By Force Host',
          NUKKIT_VERSION: 'latest',
          PMMP_VERSION: 'latest',
          USER_UPLOAD: 0,
          AUTO_UPDATE: 0,
          TS_VERSION: 'latest',
          FILE_TRANSFER: '30033',
          MAX_USERS: '25',
          MUMBLE_VERSION: 'latest',
          BOT_JS_FILE: 'index.js',
          BOT_PY_FILE: 'index.py',
          REQUIREMENTS_FILE: 'requirements.txt',
        },
        limits: {
          memory: memory,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 3,
          backups: 1,
        },
        allocation: {
          default: 0,
        },
        deploy: {
          locations: [location],
          dedicated_ip: false,
          port_range: [],
        }
      })
    })
    const pteroData = await pteroCreate.json();
    if(pteroData.attributes.id){
      // await User.findByIdAndUpdate(user._id, {'availMem': newTotalMem, 'availDisk': newTotalDisk, 'availCPU': newTotalCPU, 'availSlots': newTotalSlots});
      await db.update({table:"users",row:user.row,data:{'availMem': newTotalMem},mode:"adjust"})
      await db.update({table:"users",row:user.row,data:{'availDisk': newTotalDisk},mode:"adjust"})
      await db.update({table:"users",row:user.row,data:{'availCPU': newTotalCPU},mode:"adjust"})
      await db.update({table:"users",row:user.row,data:{'availSlots': newTotalSlots},mode:"adjust"})
      // const server = await Server.create({
      //   serverName: name,
      //   serverId: pteroData.attributes.id,
      //   serverNode: location,
      //   serverMemory: memory,
      //   serverCPU: cpu,
      //   serverDisk: disk,
      //   serverSuspended: false,
      //   serverOwner: userUid
      // });
      await db.insert({table:"servers",data:{serverName: name,serverId: pteroData.attributes.id,serverNode: location,serverMemory: memory,serverCPU: cpu,serverDisk: disk,serverSuspended: false,serverOwner: userUid}})
      const server = await dbc.fetch({table:"servers",filters:{column:"serverId",value:pteroData.attributes.id}})
      delete user.password
      const updatedSlots = getNodeStats.nodeSlots -1;
      // await Node.findOneAndUpdate({'pteroId':location},{'nodeSlots': updatedSlots});
      let node = await dbc.fetch({table:"nodes",filters:{pteroId:location}})
      db.update({table:"nodes",row:node.row,data:{nodeSlots:updatedSlots},mode:"adjust"})
      createdServer(user.username, name, memory, cpu, disk, location, pteroData.attributes.id)
      return res.json({ status: 200, added: true, server})
    }else{
      return res.json({status: 500, added: false, msg: "Pterodactyl server creation error."})
    }
      }
    }
  }
}
  } catch(ex) {
    next(ex)
  }
}

module.exports.addToQueue = async (req, res, next) => {
    try {
        const { userUid, name, location, software, memory, disk, cpu } = req.body;
        const usere = await dbc.fetch({table:"users",filters:{column:"_id",value:userUid}});
        const user = usere.data;
        const newTotalMem = user.availMem - memory;
        const newTotalDisk = user.availDisk - disk;
        const newTotalCPU = user.availCPU - cpu;
        const newTotalSlots = user.availSlots - 1;
        if(newTotalMem < 0){
          return res.json({ added: false, msg: "You can't use more memory than your account has."})
        }else if(newTotalDisk < 0){
          return res.json({ added: false, msg: "You can't use more disk space than your account has."})
        }else if(newTotalCPU < 0){
          return res.json({ added: false, msg: "You can't use more CPU than your account has."})
        }else if(newTotalSlots < 0){
          return res.json({ added: false, msg: "You can't use more slots than your account has."})
        }else{
        // await User.findByIdAndUpdate(user._id, {'availMem': newTotalMem, 'availDisk': newTotalDisk, 'availCPU': newTotalCPU, 'availSlots': newTotalSlots});
        await db.update({table:"users",row:user.row,data:{'availMem': newTotalMem},mode:"adjust"})
        await db.update({table:"users",row:user.row,data:{'availDisk': newTotalDisk},mode:"adjust"})
        await db.update({table:"users",row:user.row,data:{'availCPU': newTotalCPU},mode:"adjust"})
        await db.update({table:"users",row:user.row,data:{'availSlots': newTotalSlots},mode:"adjust"})

        // const server = await Queue.create({
        //     serverName: name,
        //     serverSoftware: software,
        //     serverNode: location,
        //     serverMemory: memory,
        //     serverCPU: cpu,
        //     serverDisk: disk,
        //     serverOwner: userUid
        //   });
        await db.insert({table:"queue",data:{serverName: name,serverSoftware: software,serverNode: location,serverMemory: memory,serverCPU: cpu,serverDisk: disk,serverOwner: userUid}})
        const server = await dbc.fetch({table:"queue",filters:{column:"serverName",value:name}})
          delete user.password
          addedToQueue(user.username, name, memory, cpu, disk)
        return res.json({ added: true, server });
      }
      } catch (ex) {
        next(ex);
      }
  };

  module.exports.getServers = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        const jwtVerify = jwt.verify(bearerHeader,jwtToken)
        // const servers = await Server.find({ serverOwner: jwtVerify._id })
        const servers = await db.fetch({table:"servers",filters:{column:"serverOwner",value:jwtVerify._id}})
        return res.json({ servers });
      } catch (ex) {
        next(ex);
      }
  };

  module.exports.deleteServer = async (req, res, next) => {
    try{
      const bearerHeader = req.headers['authorization'];
      const jwtVerify = jwt.verify(bearerHeader,jwtToken)
      const userId = jwtVerify._id;
      const {server} = req.body;
      // const serverData = await Server.findById(server);
      const serverData = await dbc.fetch({table:"servers",filters:{column:"_id",value:server}})
      if(serverData.serverOwner === userId){
        await fetch('https://control.forcehost.net/api/application/servers/'+serverData.serverId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer `+pteroKey
      },
    })

        // const userData = await User.findById(userId).select([
        //   "availMem",
        //   "availDisk",
        //   "availCPU",
        //   "availSlots",
        //   "username"
        // ])
        const userData = await dbc.fetch({table:"users",filters:{column:"_id",value:userId}})
        const newTotalMem = userData.availMem + serverData.serverMemory;
        const newTotalDisk = userData.availDisk + serverData.serverDisk;
        const newTotalCPU = userData.availCPU + serverData.serverCPU;
        const newTotalSlots = userData.availSlots + 1;
        deletedServer(userData.username, serverData.serverMemory, serverData.serverCPU, serverData.serverDisk, serverData.serverNode)
        // await Server.deleteOne({ _id: server});
        let temp = await dbc.fetch({table:"servers",filters:{column:"_id",value:server}})
        await db.delete({table:"servers",row:temp.row})
        // await User.findByIdAndUpdate(userId, {'availMem': newTotalMem, 'availDisk': newTotalDisk, 'availCPU': newTotalCPU, 'availSlots': newTotalSlots});
        await db.update({table:"users",row:userData.row,data:{'availMem': newTotalMem},mode:"adjust"})
        await db.update({table:"users",row:userData.row,data:{'availDisk': newTotalDisk},mode:"adjust"})
        await db.update({table:"users",row:userData.row,data:{'availCPU': newTotalCPU},mode:"adjust"})
        await db.update({table:"users",row:userData.row,data:{'availSlots': newTotalSlots},mode:"adjust"})
        
        return res.json({status: 200})
      }else{
        return res.json({status: 401, msg: 'You do not have the permission to delete this server.'})
      }
    }catch(ex){
      next(ex)
    }
  }