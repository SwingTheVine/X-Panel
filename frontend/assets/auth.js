var connected = false;
const ws = new WebSocket('ws://localhost:2000');

function login(event){
    event.preventDefault();
    if(connected){
    // get the form vaules
    let user = document.forms["form"]["username"].value;
    let pass = document.forms["form"]["password"].value;
    // check if the form values are empty
    if(user == "" || pass == ""){
        document.getElementById("data").innerHTML = "EMPTY FIELDS!";
        return false
    } else {
        // send the data to the server
        ws.send(JSON.stringify({channel:"auth",action:"login",user:user,pass:pass}));
    }
}
}
function register(event){
    event.preventDefault();
    if(connected){
    // get the form vaules
    let user = document.forms["form"]["username"].value;
    let email = document.forms["form"]["email"].value;
    let pass = document.forms["form"]["password"].value;
    // check if the form values are empty
    if(user == "" || pass == "" || email == ""){
        alert("EMPTY FIELDS!")
        return false
    }else{
        // send the data to the server
        let data = JSON.stringify({channel:"register",action:"register",user:{user:user,pass:pass,email:email}})
        console.log(data)
        ws.send(data);
    }
}
}
ws.onopen = function(){
    connected = true;
}
// when recived data

ws.onmessage = function(msg){
    // parse the data
    let data = JSON.parse(msg.data);
    // if there is no error
    if(data.channel == "auth"){
        if(data.status = 200){
        // set the local storage
        localStorage.setItem("username",data.user);
        localStorage.setItem("token",data.token);
        // redirect to the dashboard
        window.location.href = "/dash";
        }else{
            // if there is an error
            document.getElementById("data").innerHTML = "INVALID CREDENTIALS!";;
        }
}
}