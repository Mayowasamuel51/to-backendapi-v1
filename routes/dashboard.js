// this is the protected routes  for auth users 
const express = require('express');
const router = express.Router();
const authController = require('../controller/authController')
const User = require('../model/user')
const dashboard = require('../controller/DashboardController.js')
const auth = require('../middleware/is-auth.js')
const Middleware = require('../middleware/auth')


// sending live google meet to paid users  Splunk and Educational   courses  
router.post('/live',dashboard.sendliveCourses)



/// middlware for both socal auth and normal auth 

router.get('/mylearning',
    // Middleware.decodeToken
    // &&
    auth.Authmiddleware,
    dashboard.myLearning)
    
router.post('/order',dashboard.createOrder)





module.exports = router;