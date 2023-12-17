const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Comment = new Schema({
   

    message: {
        type: String,
       
    },
    date: {
        type: Date,
        default:Date.now()
    }

})
module.exports = mongoose.model('Comment',Comment)