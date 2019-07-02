const express = require('express')
const route = express.Router();
const users = require('../models/User')
const md5 = require('md5')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken') // 引入jwt
const passport = require('passport')

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

route.post('/login', (req, res) => {
  // console.log(req.body)
  const body = req.body;
  users.findOne({email: body.email}, (err, data) => {
    if (err) throw err;
    if (data) {
      const password = md5(body.password);
      if (data.password == password) {
        const rule = {id: data.id, name: data.name, avatar: data.avatar, identity: data.identity};
        jwt.sign(rule, 'secret', {expiresIn: 3600}, (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: `Bearer ${token}`
          })
        })
      }
    }
  })
})

module.exports = route
