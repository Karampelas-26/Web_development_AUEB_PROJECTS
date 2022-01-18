const express = require('express')
const cors = require('cors')
const {
  MongoClient
} = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express()
//oldpass gk45227237
const uri = "mongodb+srv://george:1234@e-learning.dh2tn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {

//   client.close();
// });
// console.log("db connect")

mongoose.Promise = global.Promise;
mongoose.connect(uri);

var userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  address: String,
  phone: String,
  education: String,
  email: String,
  password: String,
  passwordCheck: String
});

var User = mongoose.model("User", userSchema);

app.use(cors())

app.use(express.json())
app.use(express.static('public'))
app.use(express.json({
  limit: '1mb'
}))
app.use(express.urlencoded({
  extended: false
})) //attention plsss
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.post('/signup', cors(), (req, res) => {
  var myData = new User(req.body);

  myData.save()
    .then(item => {
      res.send("Item saved to Database!");
    })
    .catch(err => {
      res.status(400).send("Unable to save to Database!")
    });
    
});


app.get('/user-email-validity/:emailUser', cors(), (req, res) => {
  let param = req.params.emailUser;

  User.find({'emailUsr': param}, 'email', function (err, user) {
    if (err) return handleError(err);
    res.send(user[0].email)
  })
  .where('email').equals(param)
  .exec(function (error, usr) {
      // console.log("exec"+usr)
  }); 

});

app.listen(3000, () => console.log('listening in port 3000'))