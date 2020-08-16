const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')


//authRouter added
const authRouter = require('./routes/auth_router');

//spaceRouter added
const spaceRouter = require('./routes/space_router')

//userRouter added
const userRouter = require('./routes/user_router');


const app = express()
require('dotenv').config()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(cookieParser())
//added when updating server.js for auth addon
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
    })
)
//added when updating server.js for auth addon
//added passport and session use for app
app.use(passport.initialize())
app.use(passport.session())

//our views are in folder views
app.set('views', 'views')
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 7777
app.listen(PORT, () => {
    console.log(`Listening Ships With Holes Will Sink - By We Were Promised Jetpacks on port ${PORT}`)
})

app.get('/', (req, res) => {
//   //sends life signs as a pckge json
//     res.json({
//         spaceApp: `this is a spaceApp 🤘🏻`
//     })
//sends life signs as html element
   //res.send('<h1>This is a spaceApp</h1>')
//sends render of index view
    res.render('index') 
})
//add use to authRoute
app.use('/auth', authRouter)
//add use to route
app.use('/launches', spaceRouter)
//add use to userRoute
app.use('/user', userRouter)

app.use('*', (req, res) => {
    res.status(404).send('Nein Nein not hereee')
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    })
})