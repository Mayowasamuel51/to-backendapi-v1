const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = new Schema({
    email: {
        type: String,
        unqiue:true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    status: {
        type: String,
        default:'i am new '
    },
    date: {
        type: Date,
        default:Date.now()
    },
    posts: [
        { type: Schema.Types.ObjectID, ref: 'Payment' },
    ]
})
module.exports = mongoose.model('User', User)