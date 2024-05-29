'use strict'

const mongoose = require('mongoose');
var schema = mongoose.Schema;

var accessTokenSchema = schema({
    user: { type: String, require: true, unique: true },
    key: String,
    creationDate: Date,
    expirationDate: String,
    active: Boolean
});

module.exports = mongoose.model('accesstokens', accessTokenSchema)