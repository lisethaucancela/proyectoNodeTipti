'use strict'
require('dotenv').config();
var jwt = require('jsonwebtoken');

const Sessions = require('../models/accesstoken');

var middleware = {
    userprotecUrl: function (req, res, next) {
        const token = req.headers['x-curso-access-token'];
        if (token) {
            jwt.verify(token, process.env.KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).send({
                        status: 401, message: "Verificación: Token no valido",
                    });
                }
                else {
                    req.decoded = decoded;

                    Sessions.findOne({ user: req.decoded.user.email, key: token, active: true })
                        .then(session => {
                            if (!session) {
                                return res.status(401).send({
                                    status: 401,
                                    message: "Session no encontrada",
                                });
                            }

                            next();

                        })
                        .catch(error => {
                            console.error(error);
                            return res.status(500).send({
                                status: 500,
                                message: "Error",
                            });
                        });
                }
            });
        } else {
            return res.status(403).send({
                status: 403, message: "Credenciales incorrectas",
            });
        }
        console.log("middle");
    }
};

module.exports = middleware;