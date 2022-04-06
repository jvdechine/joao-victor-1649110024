const express = require('express');
const userController = require('../controllers/userController.js')();

function userRoutes(){
    this.router = express.Router();

    this.router.post('/register', userController.signUp);
    this.router.post('/login', userController.login);

    return this.router;
}

module.exports = userRoutes;