const mongoose = require('mongoose');
const {Path} = require('path-parser');
const _ = require('lodash');
const { URL } = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('survey');

module.exports = (app) => {

    app.get('/api/surveys/thanks', (req,res) => {
        res.send('Thanks for voting');
    });

    app.post('/api/surveys/webhooks', (req, res) => {

        const p = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body)
            .map(event => {
                const match = p.test(new URL(event.url).pathname);
                if(match){
                    return {email: event.email, surveyId: match.surveyId, choice: match.choice};
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({surveyId, email, choice}) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {$elemMatch: {email: email, responded: false}}
                }, {
                    $inc: { [choice] : 1},
                    $set: { 'recipients.$.responded': true},
                    lastResponded: new Date()
                }).exec();
            })
            .value();
        
        res.send({});
    })

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now(),
            lastResponded: Date.now()
        });

        try{
            const mailer = new Mailer(survey, surveyTemplate(survey));
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        }
        catch (err){
            res.status(422).send(err);
        }
        
    });
};