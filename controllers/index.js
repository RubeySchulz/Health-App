const router = require('express').Router();

//put requires for all files here
const apiRoutes = require('./apis');
const homeRoutes = require('./homepage-routes');

//put router.use for all files with paths
router.use('/', homeRoutes);
router.use('/api', apiRoutes);


router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;