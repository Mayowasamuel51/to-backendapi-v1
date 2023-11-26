const express = require('express');
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // application/json
const cors = require('cors')
const dotenv = require('dotenv')
const feed = require('../routes/testapi')
const dashboardroutes = require('../routes/dashboard.js')
const authroutes = require('../routes/auth.js')
const course = require('../routes/course')
const dotenvb = require('dotenv').config();
const Middleware = require('../middleware/auth')
mongoose.connect("mongodb+srv://fpasamuelmayowa51:5iX35jgh9yB9P6Im@cluster0.unk3ntp.mongodb.net/datausers")
    .then((res) => console.log('database connected!!!'))
    .catch((err) => console.log(err.message))

app.use(cors())
// app.options("*", cors({ origin: 'http://localhost:8000', optionsSuccessStatus: 200 }));
// app.use(cors({ origin: "http://localhost:8000", optionsSuccessStatus: 200 }))

// // connecting the server and frontend
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Content-Allow-Orgin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH,DELTE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/api', dashboardroutes)
app.use('/api', authroutes)
// app.use('/api', course)
// app.use('/api',feed)

app.get('/okay', (req, res) => {
    res.json({ok:"sdsfs"})
})
/// genral error express
app.use((error, req, res, next) => {
    console.log(error.message)
    const status = error.statusCode || 500
    const message = error.message;
    res.status(status).json({message:message, error:"server error"})
})
const port = 8000 || process.env.PORT;
app.listen(port, () => {
    console.log('SERVER IS RUNNING   ' +port )
})

module.exports = app;