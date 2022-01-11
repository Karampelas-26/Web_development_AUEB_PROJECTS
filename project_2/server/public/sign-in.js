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

    event.preventDefault
    getDocs()

    loadtheresponse()
}

function logThem() {
    console.log(firstNameInput)
    console.log(lastNameInput)
    console.log(addressInput)
    console.log(phoneInput)
    console.log(educationInput)
    console.log(emailInput)
    console.log(passwordInput)
    console.log(passwordCheckInput)
    return {
        firstNameInput,
        lastNameInput,
        addressInput,
        phoneInput,
        educationInput,
        emailInput,
        phoneInput,
        passwordCheckInput
    }
}

async function sendData() {

    try {

        let data = logThem()
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        let resp = await fetch('http://localhost:3000/signup', options)
        console.log("waitresponseBeloow")
        return await resp.json()
    } catch (e) {
        console.log("Error ====> " + e)
    }

}

async function loadtheresponse() {

    // responseData = sendData()
    // console.log(responseData)
    try {
        let r = await fetch('/')
        let d = await r.json()
        console.log(d)
    } catch (e) {
        console.log("Error ====> " + e)

    }

}