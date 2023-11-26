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
        // required: true
    },
    status: {
        type: String,
        default:'i am new '
    },
    // posts: [
    //     { type: Schema.Types.ObjectID, ref: 'Post' },
    // ]
})
module.exports = mongoose.model('User', User)