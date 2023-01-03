function auth(){
    // get the form vaules
    let user = document.forms["form"]["username"].value;
    let pass = document.forms["form"]["password"].value;
    // check if the form values are empty
    if(con == "" || key == ""){
        document.getElementById("data").innerHTML = "EMPTY FIELDS!";
        return false
    }else{
        // check that con and key are valid
        let ws = new WebSocket('ws://localhost:6969');
        // when connected send key
        ws.onopen = function(){
            ws.send(JSON.stringify({channel: "auth",action:"login",user:user, pass:pass}))
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
    }
    }
}