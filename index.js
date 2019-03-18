const express = require('express');
const keys = require('./config/key');
const mongoose = require('mongoose');
require('./models/users');
require('./services/passport');

mongoose.connect(keys.mongoURI, {useNewUrlParser: true});

const app = express();
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
