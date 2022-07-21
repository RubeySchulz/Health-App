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

    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.session.user_id
        },
        include: [
            {
                model: Day,
                attributes: ['created_at', 'updated_at', 'calories_consumed', 'calories_burned', 'id'],
                order: [['created_at', 'DESC']],
                include: [
                    {
                        model: Nutrients,
                        attributes: ['id', 'carbs', 'proteins', 'fats']
                    }
                ]
            }
        ]
    })
    .then(dbUserData => {
        const info = dbUserData.get({ plain: true });
        const user = info
        const currentDay = user.days[user.days.length - 1]
        let pastThreeDays = {}
        if(user.days.length > 2){
            const secondDay = user.days[user.days.length - 2]
            const thirdDay = user.days[user.days.length - 3]
            const caloriesConsumed = currentDay.calories_consumed + secondDay.calories_consumed + thirdDay.calories_consumed;
            const caloriesBurned = currentDay.calories_burned + secondDay.calories_burned + thirdDay.calories_burned;
            const carbs = currentDay.nutrient.carbs + secondDay.nutrient.carbs + thirdDay.nutrient.carbs;
            const proteins = currentDay.nutrient.proteins + secondDay.nutrient.proteins + thirdDay.nutrient.proteins;
            const fats = currentDay.nutrient.fats + secondDay.nutrient.fats + thirdDay.nutrient.fats;
            pastThreeDays.calories_consumed = caloriesConsumed;
            pastThreeDays.calories_burned = caloriesBurned;
            pastThreeDays.carbs = carbs;
            pastThreeDays.proteins = proteins;
            pastThreeDays.fats = fats;
        }else{
            pastThreeDays.calories_consumed = "not enough days";
            pastThreeDays.calories_burned = "not enough days";
            pastThreeDays.carbs = "not enough days";
            pastThreeDays.proteins = "not enough days";
            pastThreeDays.fats = "not enough days";
        }
        
        res.render('dashboard', {
            user,
            currentDay,
            pastThreeDays,
            loggedIn: req.session.loggedIn,
            oldNavbar: false,
            dashboard: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
    
});

module.exports = router;