const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Profile = new Schema({
    firstName: {
        type:String,
    },
    date: {
        type: Date,
        default:Date.now()
    }

})

module.exports = mongoose.model('Messages', Message)