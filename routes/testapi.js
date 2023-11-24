const express = require('express');
const middleware = require('../middleware/auth');
const router = express.Router();


router.get('/feed', middleware.decodeToken, (req, res, next) => {
    res.json({ post: ['dso', 'sfff']})
})

module.exports = router;