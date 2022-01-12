const express = require('express')
const cors = require('cors') 
const { MongoClient } = require('mongodb');
const app = express()

const uri = "mongodb+srv://george:gk45227237@e-learning.dh2tn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
console.log("db connect")
app.use(cors())

app.use(express.json())
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))
app.use(express.urlencoded({extended : false}))

app.post('/signup', cors(), (request, response) => {
    console.log("=======================")
    console.log(request.body)
    response.send("hello")
})


app.get('/connect', cors(), (request, response) => {
    response.send("Hello from dear server")
})


app.listen(3000, () => console.log('listening in port 3000'))



