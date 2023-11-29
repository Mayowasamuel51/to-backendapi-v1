const mongoose = require('mongoose')
const Schema = mongoose.Schema
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