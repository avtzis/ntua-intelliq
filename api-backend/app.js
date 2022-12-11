const express = require('express');
const bodyParser = require('body-parser');

const index = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', index);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = app;