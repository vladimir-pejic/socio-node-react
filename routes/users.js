const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in User Model
const User = require('../models/User');



// Register Form
router.get('/register', (req, res) => {
    res.render('./users/register');
});


// Store New User
router.post('/register', (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;

    req.checkBody('first_name', 'First name is required.').notEmpty();
    req.checkBody('last_name', 'Last name is required.').notEmpty();
    req.checkBody('email', 'Email is required.').isEmail();
    req.checkBody('password', 'Password is required.').notEmpty();
    req.checkBody('confirm_password', 'Passwords do not match.').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors) {
        res.render('./users/register', {
            errors: errors
        })
    } else {
        let user = new User({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err)
                    cosole.log(err);

                user.password = hash;
                user.save((err) => {
                    if(err) {
                        console.log(err)
                        return;
                    } else {
                        req.flash('success', 'You are registered!');
                        res.redirect('/users/login');
                    }
                });
            });
        });
    }
});


// User Login route
router.get('/login', (req, res) => {
    res.render('./users/login');
});

// Authenticate user
router.post('/login',
    passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true,
    })
);

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You are logged out!');
    res.redirect('/');
});


module.exports = router;
