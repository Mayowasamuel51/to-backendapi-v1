const express = require('express');
const router = express.Router();
const CourseController = require('../controller/CourseController')

router.post('/course', CourseController.postContent);

router.get('/course', CourseController.getCourse);
module.exports = router;