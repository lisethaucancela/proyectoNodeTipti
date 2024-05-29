'use strict'

const express = require('express');
const { body } = require('express-validator');
const expressRedisCache = require('express-redis-cache');
var api = express.Router();

var middleware = require("../middleware/middleware");
var UsersController = require('../controllers/users');
var AuthController = require('../controllers/auth');

var CacheController = require('../controllers/cache');
var TestJobController = require('../controllers/testjob');


const cache = expressRedisCache({
    auth_pass: 'nQ6H4FpoCX42qj6Nnpxq22lDR3SXLdrF',
    host: 'redis-13363.c93.us-east-1-3.ec2.redns.redis-cloud.com',
    port: 13363,
    expire: 1200
});

//LOGIN
api.post('/login', [
    body("email").not().isEmpty(),
    body("password").not().isEmpty()],
    AuthController.login_user);

api.post('/logout', middleware.userprotecUrl, AuthController.logout);

//Usuarios
api.get('/user', middleware.userprotecUrl, UsersController.userList);
api.get('/user/:iduser',middleware.userprotecUrl, UsersController.userSingular);
api.post('/user', [
    body("nombre").not().isEmpty(),
    body("apellido").not().isEmpty(),
    body("edad").not().isEmpty(),
    body("iduser").not().isEmpty(),
    body("email").not().isEmpty(),
    body("password").not().isEmpty()]
    , UsersController.createUser);
api.put('/user/:iduser', [
    body("nombre").not().isEmpty(),
    body("apellido").not().isEmpty(),
    body("edad").not().isEmpty(),
    body("iduser").not().isEmpty(),
    body("email").not().isEmpty(),
    body("password").not().isEmpty()]
    , UsersController.updateUser);
api.delete('/user/:iduser', UsersController.deleteUser);
//Test Cache
api.get('/testcache', cache.route(), CacheController.testcache);

api.get('/fibo', cache.route(), CacheController.fibo);

api.get('/myJob', cache.route(), TestJobController.myJob);

module.exports = api;