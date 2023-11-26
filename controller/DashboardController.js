const { validationResult } = require('express-validator')
const User = require('../model/user.js');
const jwt = require('jsonwebtoken')




const myLearning = (req, res,next) => {
    res.status(200).json("i can see me now")
}
module.exports = {
    myLearning
}