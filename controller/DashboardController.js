const { validationResult } = require('express-validator')
const User = require('../model/user.js');
const jwt = require('jsonwebtoken')
const Payment = require('../model/payment.js')
const myLearning = (req, res,next) => {
    res.status(200).json("i can see me now")
}

const info = async (req, res, next) => {
    // getting the user name and other info by token or name
    const { email } = req.body;
    try {
        const userinfo = await User.findOne({ email: email })
        
        
    } catch (err) {
        
    }
}


const createOrder = async (req, res,next) => {
    const { studentName, courseName, payment_mode, payment_id } = req.body;
    try {
        const paymentuser =await Payment.create({
            studentName: studentName,
            courseName: courseName,
            payment_id: payment_id,
            payment_mode:payment_mode
        })
        res.status(201).json({
            data: paymentuser,
            message:"is done well!!!!!!"
        })
        console.log(paymentuser)
        
    } catch (err) {
        
    }
}

module.exports = {
    createOrder,
    myLearning
}