const { validationResult } = require('express-validator')
const User = require('../model/user.js');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const signup = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const error = new Error("vaildation failed data  user paeg")
        error.statusCode = 422;
        throw error
    }
    const { email, name, password } = req.body;
    const token = jwt.sign({ email: email }, 'sfcdhbvdhs vsdvjsvsvvd', {
        expiresIn:'1h'
    })
    bcrypt.hash(password, 12).then(hased => {
        const user = new User({
            name: name,
            email: email,
            password:hased
        })
        user.save().then((result) => {
            res.status(201).json({
                massage: 'user enter',
                data: result,
                token
            })
            console.log(result)
        })
    }).catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        console.log(err.message)
    })

}


const login = (req, res, next) => {
    // check vaildation
    // check if user exist 
    // check for token
    const { email, password } = req.body;
    let loadedUser
    User.findOne({ email: email }).then((user) => {
        if (!user) {
            const error = new Error("user or email not found");
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password)
    }).then(isEqaul => {
        if (!isEqaul) {
            const error = new Error("wonrng password");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ email: loadedUser.email, userId: loadedUser._id.toString() },
            'sfcdhbvdhs vsdvjsvsvvd', {
            expiresIn:'1h'
        })
        res.status(200).json({
            message: 'welcome',
            token: token,
            user:loadedUser
        })
        
    }). catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        console.log(err.message)
    })
}


module.exports = {
    signup,
    login
}