const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const pagesController = require('../controller/pagesController')
const dashboard = require('../controller/DashboardController.js')
const NewController = require('../controller/newController.js')
const mainassignment = require('../controller/Assignmentcontroller.js')

///routes for the new page  api 
router.get('/news', NewController.newApi)

/// comment post 
router.get('/comment',dashboard.commentGet)

// getting total students from the database 
router.get('/total', pagesController.totalStudent)

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


//sending assignment 

// geting the lastest messages 
router.get('/assignment',mainassignment.getassignment)
router.get('/all/assignment',mainassignment.allAssignments)
/// creating a public by the admin
router.post('/assignment', mainassignment.Sendassignment)

module.exports = router;