const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LiveCourse = new Schema({
    courses: {
        type:String,
    },
    date: {
        type: Date,
        default:Date.now()
    }

})

module.exports = mongoose.model('LiveCourse', LiveCourse)