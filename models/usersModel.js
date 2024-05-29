'use strict'

const mongoose = require('mongoose');
var schema = mongoose.Schema;

var UserSchema = schema({
    iduser: Number,
    nombre: String,
    edad: Number,
    email: String,
    apellido: String,
    grupos: Array,
    materias: Array,
    password: String
});

module.exports = mongoose.model('usuarios', UserSchema)