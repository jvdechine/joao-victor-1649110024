const express = require('express');
const authController = require('../controllers/authController.js')();
const authMiddleware = require('../middlewares/authMiddleware');

function authRoutes(){
    this.router = express.Router();

    this.router.post('/', authController.authenticate)
    this.router.post('/refresh', authMiddleware, authController.refreshToken)
    this.router.get('/isAuthenticated', authMiddleware, authController.isAuthenticated)

    return this.router;
}

module.exports = authRoutes;