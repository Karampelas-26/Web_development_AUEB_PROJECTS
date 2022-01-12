let btn_submit=document.getElementById("submit-btn");
let password=document.getElementById("password");
let passwordCheck=document.getElementById("password-check");

btn_submit.addEventListener("click",Onclick);

var rform=document.getElementById("registerForm");
rform.addEventListener("submit",function(event){
    //request setup
    var hd=new Headers();

    hd.set('Accept', 'application/json');

    var fd=new FormData();

    for(var i=0;i<rform,length; ++i){
        fd.append(rform[i].name, rform[i].value);
    }

    fd.append('json',JSON.stringify({example:'return value'}));

    //make request
    var url='/echo/json/';
    var fetchOptions={
        method: 'POST',
        hd,
        body:fd
    };

    var respPromise= fetch(url,fetchOptions);

    //use the response
    then(function(response){
        return response.json();
    });

    then(function(data){
        console.log(data);
        //stelnei se server kai elegxei mail
    });

});

function Onclick(){
    //check if password is valid
    const password=document.getElementById("password");
    if(!fname.checkValidity()){
        alert('Password input is incorrect!')
    }

    //check if passwords match
    if(password.value!=passwordCheck.value){
        alert('Passwords dont match!')
        password.style.border= "3px solid red"
        passwordCheck.style.border= "3px solid red"
    }

    // location.href="index.html"
}
