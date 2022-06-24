const router = require('express').Router();

//put requires for all files here
const userRoutes = require('./user-routes');
const dayRoutes = require('./day-routes');
const nutrientRoutes = require('./nutrient-routes');

//put router.use for all files with paths
router.use('/users', userRoutes);
router.use('/days', dayRoutes);
router.use('/nutrients', nutrientRoutes);

module.exports = router;