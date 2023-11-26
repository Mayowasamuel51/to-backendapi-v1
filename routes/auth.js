const express = require('express');
const router = express.Router();
const authController = require('../controller/authController')
const {body} = require('express-validator')
const User = require('../model/user')

router.post('/sighup', [
    body('email').isEmail().withMessage('please enter a vilad email').custom((value, { req }) => {
        return User.findOne({ email: req.email}).then(userDoc => {
            if (userDoc) {
                return Promise.reject('Email already taken')
            }
        })
    }).normalizeEmail(),
    
    // body('password').trim(),
    body('name').notEmpty().withMessage('please enter a vilad email').custom((value, { req }) => {
        return User.findOne({ name: value }).then(userDoc => {
            if (userDoc) {
                return Promise.reject('name already taken')
            }
        })
    })
], authController.signup);


router.post('/login',authController.login)

module.exports = router;