const express = require('express')
const route = express.Router();
const users = require('../models/User')
const md5 = require('md5')
const gravatar = require('gravatar')

route.post('/register', (req, res) => {
  const body = req.body;
  users.findOne({email: body.email}, (err, data) => {
    if (err) throw err;
    if (data) {
      res.json('邮箱已存在')
    } else {
      const password = md5(body.password);
      const avatar = gravatar.url(body.email, {s: '200', r: 'pg', d: 'mm'});
      const NewUser = {
        name: body.name,
        email: body.email,
        password,
        avatar,
        identity: body.identity
      }
      users.create(NewUser).then((data) => {
        return res.json(data)
      }).catch((err) => {
        console.log(err)
      })
    }
  })
})

module.exports = route
