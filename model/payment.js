const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Payment = new Schema({
    courseName: {
        type:String
    },
    studentName: {
        type:String
    },
    amountPaid:{
        type:String
    },
    date: {
        type: Date,
        default:Date.now()
    }
})
module.exports = mongoose.model('Payment',Payment)