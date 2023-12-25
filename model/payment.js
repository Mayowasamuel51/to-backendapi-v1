const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Payment = new Schema({
    courseName: {
        type:String
    },
    price:{
        type:Number,
    },
    studentName: {
        type:String
    },
    payment_mode: {
        type:String
    },
    amountPaid:{
        type:String
    },
    payment_id: {
        type:String
    },
    date: {
        type: Date,
        default:Date.now()
    }
})
module.exports = mongoose.model('Payment_paypal',Payment)