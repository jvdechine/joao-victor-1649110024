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

    async function getItemHigherOrder(toDoId){
        try{
            return {
                status: true,
                result: await ToDoItems.findOne({toDoId}).sort({order: -1})
            }
        }
        catch(err){
            return {
                status: false,
                result: err
            }
        }
    }

    async function deleteAll(toDoId){
        try{
            return {
                status: true,
                result: await ToDoItems.deleteMany({toDoId})
            }
        }
        catch(err){
            return {
                status: false,
                result: err
            }
        }
    }

    async function insertAll(json){
        try{
            for(var item of json){
                await processItem(item);
            }
            return {
                status: true,
                result: await this.getAll(json[0].toDoId)
            }
        }
        catch(err){
            console.log(err);
            return {
                status: false,
                result: err
            }
        }
    }

    async function processItem(item, fatherId = undefined){
        var saved = await ToDoItems({
            _id: new mongoose.Types.ObjectId(),
            title: item.title,
            description: item.description,
            toDoId: item.toDoId,
            order: item.order,
            done: item.done,
            fatherId
        }).save()

        if(item.children){
            for(var child of item.children){
                processItem(child, saved._id);
            }
        }

        return;
    }

    return {
        insertItem,
        getAll,
        getItemHigherOrder,
        deleteAll,
        insertAll
    }
}

module.exports = toDoItemsRepository;