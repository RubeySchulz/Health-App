const router = require('express').Router();
const {User, Nutrients, Day} = require('../../models');

//Get api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll()
    User.findAll({
        attributes: {exclude: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get api/users/:id
router.get('/:id', (req, res) => {

});

//POST /api/users
router.post('/', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.email = dbUserData.email;
                req.session.loggedIn = true;

                res.json(dbUserData);
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users/login
router.post('/login', (req, res) => {
    // expects {email: 'test@test.com, password: test}

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({message: 'No user with that email address'});
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);

        if(!validPassword){
            res.status(400).json({message: 'Incorrect Password'});
            return;
        }

        req.session.save(() => {
            //declare session variables
            req.session.user_id = dbUserData.id;
            req.session.email = dbUserData.email;
            req.session.loggedIn = true;

            res.json({user: dbUserData, message: 'You are now logged in'});    
        })
        
        
    })
});

//POST /api/users/logout
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

// PUT /api/users/:id  (update single user)
router.put('/:id', (req, res) => {

})

// DELETE /api/users/:id  (delete singer user)
router.delete('/:id', (req, res) => {

})

module.exports = router;