const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')

//router added
const spaceRouter = require('./routes/space_router')

const app = express()
require('dotenv').config()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(cookieParser())

//our views are in folder views
app.set('views', 'views')
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 7777
app.listen(PORT, () => {
    console.log(`Listening Tonight He Grins Again - By Savatage on port ${PORT}`)
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

//add use to route
app.use('/launches', spaceRouter)

app.use('*', (req, res) => {
    res.status(404).send('Nein Nein not hereee')
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    })
})