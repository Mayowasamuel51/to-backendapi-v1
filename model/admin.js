const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Admin = new Schema({
    email: {
        type: String,
        unqiue:true,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    date: {
        type: Date,
        default:Date.now()
    }
})
module.exports = mongoose.model('Admin',Admin)