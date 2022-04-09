const mongoose = require('mongoose');

const ToDo = require('../models/toDoModel');

function toDoRepository(){
    async function getAllByUser(userId){
        try{
            return {
                status: true,
                result: await ToDo.find({userId})
            }
        }
        catch(err){
            return {
                status: false,
                result: err
            }
        }
    }

    async function insertToDo(userId, name, color){
        try{
            const toDo = new ToDo({
                _id: new mongoose.Types.ObjectId(),
                name,
                userId,
                color
            })

            return {
                status: true,
                result: await toDo.save()
            }
        }
        catch(err){
            return {
                status: false,
                result: err
            }
        }
    }

    async function getOne(id){
        try{
            return {
                status: true,
                result: await ToDo.findById(id)
            }
        }
        catch(err){
            return {
                status: false,
                result: err
            }
        }
    }

    return {
        getAllByUser,
        insertToDo,
        getOne
    }
}

module.exports = toDoRepository;