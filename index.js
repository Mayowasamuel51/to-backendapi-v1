const express = require('express')
const app = express()

const dotenv = require('dotenv')
const dotenvb = require('dotenv').config();


app.get('/api/', (req, res, next) => {
    res.status(200).json({name:"mayowa"})
})


const port = 3000 || app.process.PORT;

app.listen(port)