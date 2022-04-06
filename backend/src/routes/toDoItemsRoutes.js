const express = require('express');
const toDoItemsController = require('../controllers/toDoItemsController.js')();
const authMiddleware = require('../middlewares/authMiddleware');

function toDoItemsRoutes(){
    this.router = express.Router();

    this.router.post('/', authMiddleware, toDoItemsController.insertItem)
    this.router.get('/getAll/:toDoId', authMiddleware, toDoItemsController.getAll)

    return this.router;
}

module.exports = toDoItemsRoutes;