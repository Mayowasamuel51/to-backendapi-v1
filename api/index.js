const express = require('express');
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // application/json
const cors = require('cors')
const dashboardroutes = require('../routes/dashboard.js')
const authroutes = require('../routes/auth.js')
const pagesroutes = require('../routes/pages.js')
const Paypal = require('@paypal/checkout-server-sdk')
const Middleware = require('../middleware/auth')
const dotenv = require('dotenv')
const dotenvb = require('dotenv').config();
mongoose.connect("mongodb+srv://fpasamuelmayowa51:5iX35jgh9yB9P6Im@cluster0.unk3ntp.mongodb.net/datausers")
    .then((res) => console.log('database connected!!!'))
    .catch((err) => console.log(err.message))

app.use(cors())

// const paypal = require("@paypal/checkout-server-sdk")
// const Environment =
//   process.env.NODE_ENV === "production"
//     ? paypal.core.LiveEnvironment
//     : paypal.core.SandboxEnvironment
// const paypalClient = new paypal.core.PayPalHttpClient(
//   new Environment(
//     process.env.PAYPAL_CLIENT_ID,
//     process.env.PAYPAL_CLIENT_SECRET
//   )
// )

// // connecting the server and frontend
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Content-Allow-Orgin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH,DELTE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})
function get_access_token() {
    const auth = `${client_id}:${client_secret}`
    const data = 'grant_type=client_credentials'
    return fetch(endpoint_url + '/v1/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
            },
            body: data
        })
        .then(res => res.json())
        .then(json => {
            return json.access_token;
        }).catch((err)=>console.log(err.message))
}
const environment = process.env.ENVIRONMENT || 'sandbox';
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const endpoint_url = environment === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

app.post('/create_order', (req, res) => {
  
    get_access_token()
        .then(access_token => {
            let order_data_json = {
                intent: req.body.intent.toUpperCase(),
                item:req.body.items,
                purchase_units: [{
                    amount: {
                        'currency_code': 'USD',
                        'value':req.body.items[0].quantity 
                        //  req.body.items[0].quantity
                    }
                }]
            };
            console.log(req.body.items[0].quantity)
            const data = JSON.stringify(order_data_json)
            fetch(endpoint_url + '/v2/checkout/orders', {
            //https://developer.paypal.com/docs/api/orders/v2/#orders_create
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    },
                    body: data
                })
                .then(res => res.json())
                .then(json => {
                    res.send(json);
                    console.log(json)

                }) //Send minimal data to client
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).send(err)
        })
});
app.post('/complete_order', (req, res, next) => {
    get_access_token()
        .then(access_token => {
            fetch(endpoint_url + '/v2/checkout/orders/' + req.body.orderID + '/' + req.body.intent, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
                    }
                })
                .then(res => res.json())
                .then(json => {
                    // will update the database here
                    console.log(json);
                    console.log("order done well!!!!")
                    res.send(json);
                }) //Send minimal data to client
        })
        .catch(err => {
            if (!err) {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err)
                console.log(err.message)
           }
        })
});

app.use('/api', pagesroutes)
app.use('/api', dashboardroutes)
app.use('/api', authroutes)


app.get('/okay', (req, res) => {
    res.json({ ok: "sdsfs" })
})



/// genral error express
app.use((error, req, res, next) => {
    console.log(error.message)
    
    const status = error.statusCode || 500
    const message = error.message;
    res.status(status).json({message: message, error: "server error" })
})


const port = 8000 || process.env.PORT;
app.listen(port, () => {
    console.log('SERVER IS RUNNING   ' + port)
})

module.exports = app;