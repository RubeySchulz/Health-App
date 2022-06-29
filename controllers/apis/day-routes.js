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
    Day.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbDayData => {
        if(!dbDayData) {
            res.status(404).json({message: 'No Day table found with that id'});
            return;
        }
        res.json(dbDayData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//POST /api/days
router.post('/', (req, res) => {
    // expects {calories_consumed: 100, calories_burned: 50, user_id: 1}
    Day.create({
        calories_consumed: req.body.calories_consumed,
        calories_burned: req.body.calories_burned,
        user_id: req.body.user_id
    })
        .then(dbDayData => {
            res.json(dbDayData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//PUT /api/days/:id
router.put('/:id', (req, res) => {
    // expects {calories_consumed: 100, calories_burned: 50, user_id: 1}

    Day.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbDayData => {
        if(!dbDayData) {
            res.status(404).json({message: 'No Day table found with that id'});
            return;
        }
        res.json(dbDayData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//DELETE /api/days/:id
router.delete('/:id', (req, res) => {
    Day.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbDayData => {
        if(!dbDayData) {
            res.status(404).json({message: 'No Nutrient table found with this id'});
            return;
        }
        res.json(dbDayData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;