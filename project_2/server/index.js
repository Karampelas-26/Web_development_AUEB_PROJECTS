const { request } = require('express')
const express = require('express')
const app = express()
app.listen(3000, () => console.log('listening in port 3000'))
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))

app.post('/signup', (request, response) => {
    console.log("=======================")
    console.log(request.body)
    response.send({name:"hello"})
})


app.get('/', (request, response) => {
    response.send("Hello from dear server")
})