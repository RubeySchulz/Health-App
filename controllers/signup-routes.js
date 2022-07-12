const router = require('express').Router();
const sequelize = require('../config/connection');
const {Day, Nutrients, User} = require('../models');

router.get('/', (req, res) => {
    res.render('signup-form');
});

module.exports = router;