const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Contact = new Schema({
    email: {
        type: String,
        unqiue:true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unqiue:true,
        required: true
    },
    message: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Contact',Contact)