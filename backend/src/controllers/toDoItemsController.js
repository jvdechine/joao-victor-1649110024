const toDoItemsService = require('../services/toDoItemsService')();

function toDoItemsController(){
    async function insertItem(req, res, next){
        var result = await toDoItemsService.insertItem(req.body.title, req.body.description, req.body.toDoId, req.body.order, req.body.done, req.body.fatherId);
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

    async function getAll(req, res, next){
        var result = await toDoItemsService.getAll(req.params.toDoId);
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
        insertItem,
        getAll
    }
}

module.exports = toDoItemsController;