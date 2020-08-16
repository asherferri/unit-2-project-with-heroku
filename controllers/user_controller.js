const bcrypt = require('bcryptjs')
const User = require('../models/User')

const usersController = {
  index(req, res, next) {
    //redirect spits pckgjson for testing
    // res.json({
    //   message: 'Loginn wooorrkkkssss !!!!',
    //   user: req.user,
    // })
    //now redirects us to launches main screen
    res.redirect('/launches')

  },
  create(req, res, next) {
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(req.body.password, salt)
    new User({
      username: req.body.username,
      email: req.body.email,
      password_digest: hash,
    })
      .save()
      .then((user) => {
        req.login(user, (err) => {
          if (err) return next(err)
          //we declare wich view we land after signing up
          //we dont want it to land on an objext view.
          //redirect to spit user created for testing
          //res.redirect('/user')
          res.redirect('/launches')
        })
      })
      .catch(next)
  },
}

module.exports = usersController