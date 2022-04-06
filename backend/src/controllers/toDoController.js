const toDoService = require('../services/toDoService')();

function toDoController(){
    async function getAll(req, res, next){
        var result = await toDoService.getAll(req.token.userId);
        if (result.status) {
            req._operation = "SELECT";
            req._result = result.result;
        } else {
            req._result = undefined;
            req._operation = "ERROR";
            req._statusCode = 400;
            req._message = "Erro ao recuperar as informações";
        }
        next();
    }

    async function insertToDo(req, res, next){
        var result = await toDoService.insertToDo(req.token.userId, req.body.name);
        if (result.status) {
            req._operation = "SELECT";
            req._result = result.result;
        } else {
            req._result = undefined;
            req._operation = "ERROR";
            req._statusCode = 400;
            req._message = "Erro ao recuperar as informações";
        }
        next();
    }

    return {
        getAll,
        insertToDo
    }
}

module.exports = toDoController;