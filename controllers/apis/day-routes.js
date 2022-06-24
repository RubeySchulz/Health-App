const router = require('express').Router();
const {User, Nutrients, Day} = require('../../models');

// GET /api/days
router.get('/', (req, res) => {
    // Access our User model and run .findAll()
    Day.findAll({
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['email']
            }
        ]
    })
        .then(dbDayData => res.json(dbDayData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/days/:id
router.get('/:id', (req, res) => {

});

//POST /api/days
router.post('/', (req, res) => {
    // expects {date: 'DDMMYYYY', calories_consumed: 100, calories_burned: 50, user_id: 1}
    Day.create({
        calories_consumed: req.body.calories_consumed,
        calories_burned: req.body.calories_burned,
        user_id: req.body.user_id
    })
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//PUT /api/days/:id
router.put('/:id', (req, res) => {

});

//DELETE /api/days/:id
router.delete('/:id', (req, res) => {

});

module.exports = router;