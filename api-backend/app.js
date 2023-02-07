const express = require('express');
const bodyParser = require('body-parser');

// Import Routes
const home = require('./routes/home');
const admin = require('./routes/admin');
const profile = require('./routes/profile');
const mySurveys = require('./routes/mysurveys');
const ownedSurveys = require('./routes/ownedsurveys');
const session = require('./routes/session');

// Express app
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-OBSERVATORY-AUTH');
    next();
})

// Routes
app.use('/intelliq_api', home);
app.use('/intelliq_api/admin', admin);
app.use('/intelliq_api/profile', profile);
app.use('/intelliq_api/mysurveys', mySurveys);
app.use('/intelliq_api/ownedsurveys', ownedSurveys);
app.use('/intelliq_api/session', session);

// Error 404
app.use((req, res, next) => {
    res.status(404).json({
        message: 'not found'
    })
})

//Export app
module.exports = app;