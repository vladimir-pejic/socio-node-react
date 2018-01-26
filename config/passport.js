const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const config = require('../config/database');
const bcrypt = require('bcryptjs');


module.exports = (passport) => {

    // Local strategy
    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password',}, (username, password, done) => {
        // Match username
        User.findOne({ email: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, {"message": "User not found."}); }

            // Match Password
            bcrypt.compare(password, user.password, function(err, isMatch){
                if(err)
                    console.log(err);
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Wrong password'});
                }
            });

            // if (!user.verifyPassword(password)) { return done(null, false, {"message": "Wrong password."}); }
            // return done(null, user); // we get null error and a user object if all "ifs" above didn't execute
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

};