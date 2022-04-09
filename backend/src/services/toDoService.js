const toDoRepository = require('../repositories/toDoRepository')();

function toDoService(){
    async function getAll(userId){
        return await toDoRepository.getAllByUser(userId);
    }

    async function insertToDo(userId, name, color){
        if(!name || !color){
            return {
                status: false,
                result: 'Um ou mais campos não foram preenchidos.'
            }
        }else{
            return await toDoRepository.insertToDo(userId, name, color);
        }
    }

    async function getOne(id){
        if(!id){
            return {
                status: false,
                result: 'Um ou mais campos não foram preenchidos.'
            }
        }else{
            return await toDoRepository.getOne(id);
        }
    }

    return {
        getAll,
        insertToDo,
        getOne
    }
}

module.exports = toDoService;