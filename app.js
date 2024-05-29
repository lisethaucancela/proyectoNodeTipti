'use strict'

const express = require('express');

const app = express();

var routes = require('./routes/api');
var bodyParse = require('body-parser');

app.use(bodyParse.json({
    parameterLimit: 100000,
    limit: '50mb',
    extended: false
}));

// Errores de json
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 ) {
        return res.status(400).send({
            status: 400, messages: err.message
        });
    }
    next();
});


app.use('', routes);
module.exports = app;