const app = require('./api/index')
const cors = require('cors')

app.use(cors())
// // connecting the server and frontend
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Content-Allow-Orgin', 'https://www.to-analytics.com')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH,DELTE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

module.exports = app