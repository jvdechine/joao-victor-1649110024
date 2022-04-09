const express = require('express');
const toDoController = require('../controllers/toDoController.js')();
const authMiddleware = require('../middlewares/authMiddleware');

function toDoRoutes(){
    this.router = express.Router();

    this.router.get('/getAll', authMiddleware, toDoController.getAll);
    this.router.get('/', authMiddleware, toDoController.getOne);
    this.router.post('/', authMiddleware, toDoController.insertToDo);

    return this.router;
}

module.exports = toDoRoutes;