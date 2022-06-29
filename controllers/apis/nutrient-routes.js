const router = require('express').Router();
const {User, Nutrients, Day} = require('../../models');

// GET /api/nutrients
router.get('/', (req, res) => {
    // Access our User model and run .findAll()
    Nutrients.findAll({
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Day,
                attributes: ['calories_consumed', 'calories_burned', 'id', 'created_at']
            }
        ]
    })
        .then(dbNutrientData => res.json(dbNutrientData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/nutrients/:id
router.get('/:id', (req, res) => {
    Nutrients.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbNutrientData => {
        if(!dbNutrientData) {
            res.status(404).json({message: 'No Nutrient table found with that id'});
            return;
        }
        res.json(dbNutrientData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//POST /api/nutrients
router.post('/', (req, res) => {
    // expects {carbs: 20, proteins: 20, fats: 30, sodium: 400, cholesterol: 600, date_id: 1}
    Nutrients.create({
        carbs: req.body.carbs,
        proteins: req.body.proteins,
        fats: req.body.fats,
        sodium: req.body.fats,
        cholesterol: req.body.cholesterol,
        date_id: req.body.date_id
    })
        .then(dbNutrientData => {
            res.json(dbNutrientData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//PUT /api/nutrients/:id
router.put('/:id', (req, res) => {
    // expects {carbs: 20, proteins: 20, fats: 30, sodium: 400, cholesterol: 600, date_id: 1}

    Nutrients.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbNutrientData => {
        if(!dbNutrientData) {
            res.status(404).json({message: 'No Nutrient table found with that id'});
            return;
        }
        res.json(dbNutrientData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//DELETE /api/nutrients/:id
router.delete('/:id', (req, res) => {
    Nutrients.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbNutrientData => {
        if(!dbNutrientData) {
            res.status(404).json({message: 'No Nutrient table found with this id'});
            return;
        }
        res.json(dbNutrientData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;