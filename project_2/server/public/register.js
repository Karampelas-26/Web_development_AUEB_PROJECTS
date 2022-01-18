const SERVER = "http://localhost:3000";
let firstNameInput = document.querySelector("#first-name");
let lastNameInput = document.querySelector("#last-name");
let addressInput = document.querySelector("#address");
let phoneInput = document.querySelector("#phone");
let educationInput = document.querySelector("#education-level");
let emailInput = document.querySelector("#email");
let passwordInput=document.getElementById("password");
let passwordCheckInput=document.getElementById("password-check");
let btn_submit=document.getElementById("submit-btn");


// let tempEmail;

btn_submit.onclick = function(event) {

    tempEmail = "none"

    event.preventDefault(); //prevent default action from submit to post in server
    let passValidity = confirmSignUp();
    console.log("checkpass ==== " + passValidity);
    if (passValidity) {
        let resposne = sendData();
        console.log("response from server " + resposne);
    }
    else {
        console.log("User exists with this email!")
    }
    
}


async function confirmEmails(email) {
    let respEmail = await searchEmailUser(email);
    console.log(respEmail+"==="+emailInput.value)
    if (email === respEmail){
        return true;
    }
}

// var rform=document.getElementById("registerForm");

var fd=new FormData();

function confirmSignUp(){

    //check if password is valid
    let available = true;
    if(!passwordInput.checkValidity()){
        alert('Password input is incorrect!')
        available = false;
    }

    //check if passwords match
    if(passwordInput.value!=passwordCheckInput.value){
        alert('Passwords dont match!')
        passwordInput.style.border= "3px solid red"
        passwordCheckInput.style.border= "3px solid red"
        available = false;
    }

    if (confirmEmails(emailInput.value)){
        available = false;
    }

    return available;
    // location.href="index.html"
}

async function searchEmailUser(email) {

    try {

        //epeidi i js einai asychronous kanoume await na perimenoume to promise
        //na oloklirwthei kai meta ksana kanoume await gia to respone.text() 
        //giati einai promise kai einai pending an den kanoume await

        let response = await fetch(SERVER + '/user-email-validity/' + email);
        let data = await response.text();
        tempEmail = data;
        return data;
    }
    catch (err) {
        console.log("Error ====> ");
        console.log(err);
    }
}

function valuesToJSONObject() {
    return { "fname": firstNameInput.value,
    "lname": lastNameInput.value,
    "address": addressInput.value,
    "phone": phoneInput.value,
    "education": educationInput.value,
    "email": emailInput.value,
    "password": passwordInput.value,
    "passwordCheck": passwordCheckInput.value
}
}

async function sendData() {

    try {

        let data = valuesToJSONObject();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        }

        let resp = await fetch(SERVER + '/signup', options)
        console.log(resp.status)
        console.log("waitresponseBeloow")
        console.log(resp.text())
        return resp
    } catch (err) {
        console.log("Error ====> ")
        console.log(err)
    }

}
