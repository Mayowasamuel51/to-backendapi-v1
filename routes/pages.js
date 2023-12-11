const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const pagesController = require('../controller/pagesController')


/// showing all student with jwt and firebase 
router.get('/show', pagesController.showStudent)

// get all contractors
router.get('/contractors', pagesController.getContractors)
/// contractors post 
router.post('/contractors',
    // body('name').notEmpty(),
    // body('email').notEmpty(),
    // body('pdfurl').notEmpty(),
    // body('number').notEmpty(),
    // body('role_postion').notEmpty(),
    // body('link_portfolio').notEmpty(),
    pagesController.postContractors);
/// 
router.post('/contact', [
    body('name').notEmpty(),
    body('email').notEmpty(),
    body('message').notEmpty(),
    body('number').notEmpty()
], pagesController.contact)
// get all contact from the frontend 
router.get('/contact', pagesController.getcontact)

// geting the lastest messages 
router.get('/messages', pagesController.getMessage)
/// creating a public by the admin
router.post('/messages', pagesController.sendMessage)




module.exports = router;