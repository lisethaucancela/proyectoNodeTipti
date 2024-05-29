'use strict'

const usersModel = require('../models/usersModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

var controller = {
    userList: function (req, res) {
        usersModel.find({})
            .then(usuarios => {
                console.log("usr " + usuarios);
                return res.status(200).send({
                    status: 200,
                    message: "OK, usuarios",
                    data: usuarios
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "Error",
                });
            });
        console.log(req.body);

    },

    userSingular: function (req, res) {
        var params = req.params;
        console.log(params);
        var iduser = params.iduser;

        usersModel.findOne({ idUser: parseInt(iduser) })
            .then(Usuarios => {
                console.log("usr " + Usuarios);
                return res.status(200).send({
                    status: 200,
                    message: "OK",
                    data: Usuarios
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "Error",
                });
            });
    },

    createUser: function (req, res) {

        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).send({
                status: 400,
                errors: error.errors,
            });
        }
        var data = req.body

        usersModel.findOne({ iduser: data.iduser })
            .then(Usuarios => {
                //Usuario exitente?
                if (Usuarios) {
                    return res.status(400).send({
                        status: 400,
                        message: "Id usuario ya existente",
                    });
                }

                //Cryp pass
                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(data.password, salt, function (err, hash) {
                        var create_user = new usersModel();
                        create_user.iduser = data.iduser;
                        create_user.nombre = data.nombre;
                        create_user.edad = data.edad;
                        create_user.apellido = data.apellido;
                        create_user.grupos = data.grupos;
                        create_user.materias = data.materias;
                        create_user.email = data.email;
                        create_user.password = hash;

                        create_user.save()
                            .then((result) => {
                                return res.status(200).send({
                                    status: 200,
                                    message: "OK, Usuario Almacenado",
                                    data: result
                                });
                            })
                            .catch(error => {
                                console.error(error);
                                return res.status(500).send({
                                    status: 500,
                                    message: "Error",
                                });
                            });
                    })
                });


            })
            .catch(error => {
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "Error",
                });
            });

    },

    updateUser: function (req, res) {
        const error = validationResult(req);
        console.log(error);
        if (!error.isEmpty()) {
            return res.status(400).send({
                status: 400,
                errors: error.errors,
            });
        }
        var params = req.params;
        var iduser = params.iduser;

        var data = req.body;
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(data.password, salt, function (err, hash) { 
                var updateUser = {
                    nombre: data.nombre,
                    edad: data.edad,
                    apellido: data.apellido,
                    grupos: data.grupos,
                    materias: data.materias,
                    email: data.email,
                    password: hash
                }

                usersModel.findOneAndUpdate({ iduser: parseInt(iduser) }, updateUser)
                    .then((result) => {
                        if (!result) {
                            return res.status(200).send({
                                status: 200,
                                message: "Usuario no encontrado",
                            });
                        }
                        return res.status(200).send({
                            status: 200,
                            message: "OK, Usuario Actualizado"
                        });

                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).send({
                            status: 500,
                            message: "Error",
                        });
                        return res.send("Mi Nombre:" + data.nombre + " y tengo " + data.edad);
                    });
            })
        });
    },
    deleteUser: function (req, res) {
        var params = req.params;
        var iduser = params.iduser;

        usersModel.findOneAndDelete({ idUser: parseInt(iduser) })
            .then((result) => {
                if (!result) {
                    return res.status(200).send({
                        status: 200,
                        message: "Usuario no encontrado",
                    });
                }
                return res.status(200).send({
                    status: 200,
                    message: "OK, Usuario Eliminado"
                });
            })
            .catch(error => {
                satisfies
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "Error",
                });
            });
    }
}

module.exports = controller;