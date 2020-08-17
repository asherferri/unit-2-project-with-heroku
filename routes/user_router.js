const express = require('express')
const userRouter = express.Router()

const authHelpers = require('../services/auth/auth_helpers')
const usersController = require('../controllers/user_controller')

userRouter.get('/', authHelpers.loginRequired, usersController.index)
// userRouter.get('/user', authHelpers.loginRequired, usersController.index2)
userRouter.get('/new', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/register')
})

userRouter.post('/', usersController.create)

module.exports = userRouter