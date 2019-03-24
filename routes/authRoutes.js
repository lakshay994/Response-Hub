const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys')
        }
    );

    app.get('/api/current_user', (req, res) => {
        // req.user - user object is binded automatically by the passport library
        res.send(req.user);
    });

    app.get('/api/logout', (req, res) => {

        //req.logout - logout is also added by passport.js automatically
        req.logout();
        res.redirect('/');
    })
}
