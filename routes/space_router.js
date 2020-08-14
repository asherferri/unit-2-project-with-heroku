const express = require('express')
const spaceController = require('../controllers/space_controller')
const spaceRouter = express.Router()

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
spaceRouter.post('/', spaceController.create)
//creates launch in view new
spaceRouter.get('/new', (req, res) => {
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
spaceRouter.get('/:id([0-9]+)/edit', spaceController.show, (req, res) => {
    res.render('space/edit', {
        launch: res.locals.launch
    })
})
spaceRouter.put('/:id([0-9]+)', spaceController.update)
//delete
spaceRouter.delete('/:id([0-9]+)', spaceController.delete)


module.exports = spaceRouter