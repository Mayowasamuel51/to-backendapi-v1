const { validationResult } = require('express-validator')
const User = require('../model/user.js');
const jwt = require('jsonwebtoken')
const Payment = require('../model/payment.js')
const LiveCourse = require('../model/livecourses.js')


const myLearning = (req, res, next) => {
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

const createOrder = async (req, res, next) => {
    const { studentName, courseName, payment_mode, payment_id } = req.body;
    try {
        const paymentuser = await Payment.create({
            studentName: studentName,
            courseName: courseName,
            payment_id: payment_id,
            payment_mode: payment_mode
        })
        res.status(201).json({
            data: paymentuser,
            message: "is done well!!!!!!"
        })
        console.log(paymentuser)

    } catch (err) {

    }
}


/* A  function  called sendliveCoursesSplunk for sending live google meet to student for meet up ,live courses are Splunk , Educational
this function will only work for auth users and paid course users (Splunk, and Educational )
*/
const sendliveCoursesSplunk = async (req, res, next) => {
    try {
        const { course } = req.body;
        const response = await LiveCourse.create({
            courses:course
        })
        res.status(201).json({
            response:response
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        console.log(err.message)
    }
}

const sendliveCoursesEducation = async (req, res, next) => {
    try {
        const { course } = req.body;
        const response = await LiveCourse.create({
            courses:course
        })
        res.status(201).json({
            response:response
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        console.log(err.message)
    }
}

// A functiom called getLink perform a task of sending link to live courses paid user will be working with the payment database to check if they have paid
const getLink = async (req, res, next) => {
    
}


module.exports = {
    sendliveCoursesSplunk,
    sendliveCoursesEducation,
    createOrder,
    myLearning
}