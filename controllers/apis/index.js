const router = require('express').Router();

//put requires for all files here
const userRoutes = require('./user-routes');

//put router.use for all files with paths
router.use('/users', userRoutes);

module.exports = router;