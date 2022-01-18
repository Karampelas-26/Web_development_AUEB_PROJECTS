const SERVER = "http://localhost:3000";
let emailUsr=document.getElementById("email");
let passwordUsr=document.getElementById("password");
let login_btn=document.getElementById("login-btn");

login_btn.onclick=function(event){
    event.preventDefault();
    login();
};

async function login(){
    let response=await sendCredentials();
    if(response=="false"){
        alert("Password invalid, please re-enter password!");
    }
    else{
        let profileInfo = await getProfileInfo(emailUsr.value);
        console.log(emailUsr.value)
        console.log(profileInfo);
        let template = document.getElementById("profile-template").innerHTML
        let compiled_template = Handlebars.compile(template)
        let rendered = compiled_template(profileInfo)
        document.getElementById("profile-info-wrapper").innerHTML = rendered;
        hideLogin();
    }
}

async function getProfileInfo(email){
    let response= await fetch(SERVER+"/user-info/"+ email);
    let profileData = await response.json();
    return profileData[0];
}

function hideLogin(){
    let loginForm=document.getElementById("login-id");
    loginForm.classList="wrapper-off";
}

async function sendCredentials(){
    try {
        let credentials= {
            email: emailUsr.value,
            password: passwordUsr.value
        }
        console.log(credentials);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(credentials)
        }
        let resp = await fetch(SERVER + '/login', options)
        let finalResp= await resp.text();
        return finalResp;
    } catch (err) {
        console.log(err)
    }
}