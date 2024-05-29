'use strict'
const { validationResult } = require('express-validator');

const usersModel = require('../models/usersModel');
const Sessions = require('../models/accesstoken');

var jwt = require('jsonwebtoken');
require('dotenv').config();

const bcrypt = require('bcrypt');

var controller = {
    login_user: function (req, res) {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).send({
                status: 400, errors: error.errors,
            });
        }

        var data = req.body;
        usersModel.findOne({ email: data.email })
            .then(Usuarios => {

                bcrypt.compare(data.password, Usuarios.password, function (err, result) {
                    if (result) {
                        const payload = {
                            user: Usuarios
                        }
                        let access_token = jwt.sign(payload, process.env.KEY, {
                            expiresIn: '1d'
                        });

                        let today = new Date().toISOString();

                        let update_session = {
                            user: Usuarios.email,
                            key: access_token,
                            creationDate: today,
                            expirationDate: '1d',
                            active: true
                        }
                        Sessions.findOneAndUpdate({ user: Usuarios.email }, update_session, { upsert: true, new: true })
                            .then(session => {
                                if (!session) {
                                    return res.status(401).send({
                                        status: 401,
                                        message: "Datos invalidos",
                                    });
                                }
                                return res.status(200).send({
                                    status: 200, message: "Login correcto",
                                    token: access_token
                                });
                            })
                            .catch(error => {
                                console.error(error);
                                return res.status(500).send({
                                    status: 500,
                                    message: "Error",
                                });
                            });
                    } else {
                        return res.status(401).send({
                            status: 401, message: "Credenciales incorrectas",
                        });
                    }
                });


            })
            .catch(error => {
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "Credenciales incorrectas",
                });
            });
    },
    logout: function (req, res) {
        const token = req.headers['x-curso-access-token'];
        console.log(req.decoded);
        Sessions.findOneAndDelete({ user: req.decoded.user.email, key: token })
            .then((result) => {
                if (!result) {
                    return res.status(200).send({
                        status: 200,
                        message: "Token válido",
                    });
                }
                return res.status(200).send({
                    status: 200,
                    message: "Sessión finalizada"
                });

            })
            .catch(error => {
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "Token inválido",
                });
            });
    }
}

module.exports = controller;