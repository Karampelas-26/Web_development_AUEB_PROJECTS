let firstNameInput
let lastNameInput
let addressInput
let phoneInput
let educationInput
let emailInput
let passwordInput
let passwordCheckInput

var responseData = []

function getDocs() {
    firstNameInput = document.querySelector("#first-name").value
    lastNameInput = document.querySelector("#last-name").value
    addressInput = document.querySelector("#address").value
    phoneInput = document.querySelector("#phone").value
    educationInput = document.querySelector("#education-level").value
    emailInput = document.querySelector("#email").value
    passwordInput = document.querySelector("#password").value
    passwordCheckInput = document.querySelector("#password-check").value
}

let btn = document.getElementById("submit-btn")
btn.onclick = function (event) {

    event.preventDefault()
    getDocs()
    sendData()
}
loadtheresponse()

function logThem() {
    console.log("print values")
    console.log(firstNameInput)
    console.log(lastNameInput)
    console.log(addressInput)
    console.log(phoneInput)
    console.log(educationInput)
    console.log(emailInput)
    console.log(passwordInput)
    console.log(passwordCheckInput)
    return { fname: firstNameInput,
        "lname": lastNameInput,
        "address": addressInput,
        "phone": phoneInput,
        "education": educationInput,
        "email": emailInput,
        "password": passwordInput,
        "passwordCheck": passwordCheckInput
    }
}

async function sendData() {

    try {

        let data = logThem()
        console.log(data)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
            // body: JSON.stringify(data)
        }

        let resp = await fetch('http://localhost:3000/signup', options)
        console.log(resp.status)
        console.log("waitresponseBeloow")
        console.log(resp.text())
        return resp
    } catch (e) {
        console.log("Error ====> ")
        console.log(e)
    }

}

async function loadtheresponse() {

    // responseData = sendData()
    // console.log(responseData)
    try {
        let r = await fetch('http://localhost:3000/connect')
        let d = await r.text()
        console.log(d)
    } catch (e) {
        console.log("Error below")
        console.log(e)

    }

}