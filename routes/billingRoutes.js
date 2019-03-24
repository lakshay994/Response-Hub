const keys = require('../config/key');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    app.post('/api/stripe', requireLogin, async (req, res) => {

        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '5 CREDITS FOR $5',
            source: req.body.id
        });

        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);

    });
};