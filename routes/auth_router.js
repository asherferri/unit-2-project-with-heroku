const express = require('express')
const authHelpers = require('../services/auth/auth-helpers')
const passport = require('../services/auth/local')
const authRouter = express.Router()

authRouter.get('/login', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/login')
})
authRouter.post('/login',passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })
)

authRouter.get('/logout', (req, res) => {
  req.logout()
  res.redirect('back')
})

module.exports = authRouter