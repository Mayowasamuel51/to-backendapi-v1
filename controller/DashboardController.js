const { validationResult } = require('express-validator')
const User = require('../model/user.js');
const jwt = require('jsonwebtoken')

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
module.exports = {
    myLearning
}