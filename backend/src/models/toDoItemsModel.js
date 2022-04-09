const mongoose = require('mongoose');

const toDoItemsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String , required: true},
    description: { type: String , required: false},
    toDoId: {type:  mongoose.Schema.Types.ObjectId, required: true, ref:'ToDo'},
    order: { type: Number, required: true },
    done: { type: Boolean, required: true },
    fatherId: {type:  mongoose.Schema.Types.ObjectId, required: false, ref:'ToDoItems'}
});

module.exports = mongoose.model('ToDoItems', toDoItemsSchema);