const Space = require('../models/Space')

const spaceController = {
    index(req, res, next) {
        Space.getAll()
        .then(launches => {
            /*json object*/ //res.json({
                //launches
            res.render('space/index', {
                launches,
            })
        }).catch(next)
    },
    
    create(req, res, next) {
        new Space({
            name: req.body.name,
            launch_date: req.body.launch_date,
            launch_time: req.body.launch_time,
            lsp: req.body.lsp,
            pad: req.body.pad,
            location: req.body.location,
            cc: req.body.cc,
            mission: req.body.mission,
        })
        .save()
        .then((launch) => {
            /*json object*/ //res.json({ launch })
            res.redirect('/launches')
        }).catch(next)
    },

    show(req, res, next) {
        Space.getById(req.params.id)
        .then((launch) => {
            //use folder route
        /** update to line 38*/    // res.render('space/show', { launch })
            res.locals.launch = launch
            next()
        })
        .catch(next)
    },

    update(req, res, next) {
        Space.getById(req.params.id)
          .then((scoutLaunch) => {
            return scoutLaunch.update({
              name: req.body.name,
              launch_date: req.body.launch_date,
              launch_time: req.body.launch_time,
              lsp: req.body.lsp,
              pad: req.body.pad,
              location: req.body.location,
              cc: req.body.cc,
              mission: req.body.mission,
            })
          })
          .then((modifiedLaunch) => {
            res.redirect(`/launches/${modifiedLaunch.id}`);
          })
          .catch(next)
      },

    // //test to see if update is passin on terminal
    // update(req, res, next) {
    //     console.log(req.body)
    //     res.send('update here')
    // }

    delete(req, res, next) {
        Space.getById(req.params.id)
        .then((launch) => {
            return launch.delete()
        })
        .then(() => {
            res.redirect('/launches')
        })
        .catch(next)
    }

}

module.exports = spaceController