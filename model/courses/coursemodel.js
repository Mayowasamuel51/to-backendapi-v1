const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const Course = new Schema({
    courseHeader: {
        type:String,
    },
    detailFirst: {
        type:String,
    },
    detailSecond: {
      type:String  
    },
    courseName: {
        type:String
    },
    price: {
        type:Number
    },
    what_to_learn: {
        type:String
    }
})


module.exports = mongoose.model('Course', Course);