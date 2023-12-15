// this is the protected routes  for auth users 
const express = require('express');
const router = express.Router();
const dashboard = require('../controller/DashboardController.js')
const auth = require('../middleware/is-auth.js')
const Middleware = require('../middleware/auth')


// sending live google meet to paid users  Splunk and Educational   courses  
router.post('/livesplunk',dashboard.sendliveCoursesSplunk)

// sending live google meet to paid users   of  Educational   courses  
router.post('/liveseducation', dashboard.sendliveCoursesEducation)

/// middlware for both 
router.get('/mylearning', auth.Authmiddleware,  dashboard.myLearning)
    
router.post('/order',dashboard.createOrder)





module.exports = router;