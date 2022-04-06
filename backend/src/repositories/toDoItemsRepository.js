const mongoose = require('mongoose');

const ToDoItems = require('../models/toDoItemsModel');

function toDoItemsRepository(){
    async function insertItem(title, description, toDoId, order, done, fatherId){
        try{
            const newToDoItem = ToDoItems({
                _id: new mongoose.Types.ObjectId(),
                title,
                description,
                toDoId,
                order,
                done,
                fatherId
            })
    
            return {
                status: true,
                result: await newToDoItem.save()
            }
        }
        catch(err){
            return {
                status: false,
                result: err
            }
        }
    }

    async function getAll(toDoId){
        try{
            return {
                status: true,
                result: await ToDoItems.find({toDoId})
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
        insertItem,
        getAll
    }
}

module.exports = toDoItemsRepository;