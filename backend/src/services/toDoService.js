const toDoRepository = require('../repositories/toDoRepository')();

function toDoService(){
    async function getAll(userId){
        return await toDoRepository.getAllByUser(userId);
    }

    async function insertToDo(userId, name){
        if(!name){
            return {
                status: false,
                result: 'Por favor, informe o nome do To Do!'
            }
        }else{
            return await toDoRepository.insertToDo(userId, name);
        }
    }

    return {
        getAll,
        insertToDo
    }
}

module.exports = toDoService;