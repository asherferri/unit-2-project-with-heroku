const express = require('express')
const spaceController = require('../controllers/space_controller')
const spaceRouter = express.Router()


const authHelpers = require('../services/auth/auth_helpers')
// spaceRouter.get('/', (req, res) => {
//     res.send('list of launches go here')
// })

//gets all
spaceRouter.get('/', spaceController.index)
//gets about
spaceRouter.get('/about', (req, res) => {
    //we declare the folder route
    res.render('space/about')
})
//create launches
spaceRouter.post('/', /**added auth functionality */authHelpers.loginRequired, spaceController.create)
//creates launch in view new
spaceRouter.get('/new', /**added auth functionality */authHelpers.loginRequired, (req, res) => {
    //we declare the folder route
    res.render('space/new')
})
//show 1 launch route
spaceRouter.get('/:id([0-9]+)', spaceController.show, (req, res) => {
    res.render('space/show', {
        launch: res.locals.launch
    })
})
//update/modify/edit however you wanna call it route
spaceRouter.get('/:id([0-9]+)/edit', /**added auth functionality */spaceController.show, (req, res) => {
    res.render('space/edit', {
        launch: res.locals.launch
    })
})
spaceRouter.put('/:id([0-9]+)', /**added auth functionality */authHelpers.loginRequired, spaceController.update)
//delete
spaceRouter.delete('/:id([0-9]+)',/**added auth functionality */authHelpers.loginRequired, spaceController.delete)


module.exports = spaceRouter