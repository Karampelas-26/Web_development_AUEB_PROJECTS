 //elegxos password
//  var btn= document.getElementById("Submit");
//  btn.addEventListener("click", Onclick);
//  function Onclick(){
//      let password=document.getElementById("txt_password").value; //.value gia na paroume tis times twn input
//      let confirm_pas=document.getElementById("txt_confPas").value;
    
//      if(password!=confirm_pas){
//          console.log('Passwords dont match!')
//      }
//      else{
//          console.log('Password match!')
//      }
//  }
let password=document.getElementById("txt_password"); //.value gia na paroume tis times twn input
let confirm_pas=document.getElementById("txt_confPas");

password.onchange( function checkPass() {
    if(password.value!=confirm_pas.value){
        confirm_pas.setCustomValidity('Passwords dont match!')
        confirm_pas.reportValidity()
    }
    else{
        confirm_pas.setCustomValidity('Password match!')
    }
}
)

 //elegxos tilefwnou
 let phoneNumb=document.getElementById("txt_telephone");
 phoneNumb.onchange=function(){
     if(!phoneNumb.checkValidity()){
         phoneNumb.setCustomValidity("Phone number is not valid!")
     }
     else{
         phoneNumb.setCustomValidity('')
     }
 }

 //credit card
 let cardNumb=document.getElementById("txt_card-numb");
 cardNumb.onchange=function(){
     if(cardNumb.value.length!=16){
         cardNumb.setCustomValidity("Card number is not valid!")
     }
     else{
         let joy=cardNumb.value.match(/.{1,4}/g);    //gia na balei keno 
         cardNumb.value=joy.join(' ');               //kathe 4 stoixeia
     }
 }

 // expiration date kartas
 let cardexpdate=document.getElementById("txt_card-exp");
 cardexpdate.addEventListener("keyup",function(){
     let month
     var year
     if(cardexpdate.value.length==2){
         if(cardexpdate.value>12 || cardexpdate<1){
             cardexpdate.setCustomValidity("Not valid month!")
         }
     }
     else if(cardexpdate.value.length==4){
          year=cardexpdate.value.substring(2)
          month=cardexpdate.value.substring(0,2)
          cardexpdate.value=month+'/'+year
     }
     else{
         cardexpdate.value=cardexpdate.value.substring(0,5) //gia na krataei 5 xaraktires(mina/xrono)
     }
 });

 //check birthday
 let date=document.getElementById("txt_birthday");
 date.onchange=function(){
     var currentdate= new Date();
     var inputdate= new Date(date.value)
     if(currentdate.getFullYear()-inputdate.getFullYear()<=18){
         if(currentdate.getMonth()<inputdate.getMonth()){
             date.setCustomValidity("You must be over 18 years old!")
         }
         else if(currentdate.getMonth()==inputdate.getMonth() && currentdate.getDate()<inputdate.getDate()){
             date.setCustomValidity("You must be over 18 years old!")
         }
     }
 }
