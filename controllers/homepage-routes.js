const router = require('express').Router();
const sequelize = require('../config/connection');
const {Day, Nutrients, User} = require('../models');

router.get('/', (req, res) => {
    res.render('homepage', {
        loggedIn: req.session.loggedIn,
        oldNavbar: true,
        dashboard: false
    });
});

router.get('/signup', (req, res) => {
    res.render('signup-form', {
        loggedIn: req.session.loggedIn,
        oldNavbar: true,
        dashboard: false
    });
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        loggedIn: req.session.loggedIn,
        oldNavbar: false,
        dashboard: true
    });
});

module.exports = router;