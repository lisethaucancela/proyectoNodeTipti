'use strict'

const mongoose = require('mongoose')

var app = require('./app');
var port = 3000;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://liseth:G7yuEZlJZZyf4kwR@cluster0.nnd9qzs.mongodb.net/Curso2024')
    .then(() => {
        console.log("Conexion BD");
        var server = app.listen(port, () => {
            console.log('Escuchando port 3000');
        });
        server.timeout = 120000;
    })
    .catch(err => console.log(err));