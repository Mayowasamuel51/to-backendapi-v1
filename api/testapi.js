const express = require('express');
const { model } = require('mongoose');
const Middleware = require('../middleware/auth')
const router = express.Router();



router.get('/api', Middleware.decodeToken, (req, res, next) => {
    console.log(req.headers)
   return  res.json({
        post: [{
            id:1,
            name:"okay"
        }]
    })
})

module.exports = router;