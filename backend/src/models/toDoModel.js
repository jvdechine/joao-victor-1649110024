const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String , required: true},
    userId: {type:  mongoose.Schema.Types.ObjectId, required: true, ref:'User'},
    color: { type: String , required: true}
});

module.exports = mongoose.model('ToDo', toDoSchema);