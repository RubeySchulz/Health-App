const router = require('express').Router();

//put requires for all files here

//put router.use for all files with paths

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;