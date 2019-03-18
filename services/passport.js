const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/key');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.use(
    new googleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id})
                .then(existingUser => {
                    if(existingUser){
                        done(null, existingUser);
                    }
                    else{
                        new User({ googleId: profile.id}).save()
                            .then(user => done(null, user));
                    }
            });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
})