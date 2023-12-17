const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const { body } = require('express-validator')


//note a middleware to be created later in the future for the admin 

// this route is the register for the admin and login for the admin
router.post('/admin/login', adminController.login)

module.exports = router;
