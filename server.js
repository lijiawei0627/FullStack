const express = require('express')
const users = require('./routes/users')
const bodyParser = require('body-parser')

let app = express();
let port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/users', users)

app.listen(port, () => {
  console.log('start success')
})