const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Link_educational = new Schema({
    link: {
        type: String,
    },
    email:[String],
    date: {
        type: Date,
        default:Date.now()
    }
})
module.exports = mongoose.model('Link_educational',Link_educational)