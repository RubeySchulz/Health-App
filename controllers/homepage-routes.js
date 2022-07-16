const router = require('express').Router();
const sequelize = require('../config/connection');
const {Day, Nutrients, User} = require('../models');

router.get('/', (req, res) => {
    res.render('homepage', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/signup', (req, res) => {
    res.render('signup-form', {
        loggedIn: req.session.loggedIn
    });
})

module.exports = router;