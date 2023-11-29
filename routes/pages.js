const express = require('express');
const router = express.Router();
const {body} = require('express-validator')
const pagesController = require('../controller/pagesController')


/// 
router.post('/contact', [
    body('name').notEmpty(),
    body('email').notEmpty(),
    body('message').notEmpty(),
    body('number').notEmpty()
] , pagesController.contact)




module.exports = router;