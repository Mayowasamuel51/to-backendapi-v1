const app = require('./api/index')
const cors = require("cors");

// app.options("*", cors({ origin: 'http://localhost:8000', optionsSuccessStatus: 200 }));

// app.use(cors({ origin: "http://localhost:8000", optionsSuccessStatus: 200 }))
app.use(cors())
// // connecting the server and frontend
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Content-Allow-Orgin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH,DELTE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

module.exports = app