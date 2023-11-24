const express = require('express');
const app = express()
const mongoose = require('mongoose');
const testapi = require('./api/testapi')
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // application/json
const cors = require('cors')
const dotenv = require('dotenv')
const dotenvb = require('dotenv').config();
// const Middleware = require('./middleware/auth')
mongoose.connect(process.env.DATABASE_URL).then((res)=>console.log('database connected!!!')).catch((err)=>console.log(err.message))

app.use(cors())
// // connecting the server and frontend
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Content-Allow-Orgin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH,DELTE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.get('/', (req, res) => {
    res.send('okay!!!!!!!!!!!!!!!!!!')
})


app.use('/api',testapi)


/// genral error express
app.use((error, req, res, next) => {
    console.log(error.message)
    const status = error.statusCode || 500
    const message = error.message;
    res.status(status).json({messsage:message})
})


const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log('SERVER IS RUNNING')
})