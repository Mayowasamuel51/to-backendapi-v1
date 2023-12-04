const mongoose = require('mongoose')
const Schema = mongoose.Schema
//// the contractors this is when the student has finished there course then they can apply for the contractors  package
const contractors = new Schema({
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
    role_postion: {
        type: String,
        required: true
    },
    link_portfolio: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('contractors',contractors)