const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // application/json
const cors = require("cors");
const dashboardroutes = require("../routes/dashboard.js");
const authroutes = require("../routes/auth.js");
const pagesroutes = require("../routes/pages.js");
const adminroutes = require("../routes/adminroutes.js");
const Paypal = require("@paypal/checkout-server-sdk");
const Middleware = require("../middleware/auth");
const dotenv = require("dotenv");
const paypal = require("@paypal/checkout-server-sdk");
const dotenvb = require("dotenv").config();
const cookiesMiddleware = require("universal-cookie-express");
const Payment = require("../model/payment.js");
var cookieParser = require("cookie-parser");
// var cookieParser = require('cookie-parser')
// app.use(cookieParser())
// require("dotenv").config({ path: __dirname + "/.env" });
const CronJob = require("cron").CronJob;
mongoose
  .connect(
    "mongodb+srv://fpasamuelmayowa51:5iX35jgh9yB9P6Im@cluster0.unk3ntp.mongodb.net/datausers"
  )
  .then((res) => console.log("database connected!!!"))
  .catch((err) => console.log(err.message));

app.use(cors());

app.set("cookie.sameSite", "Strict"); // Default for all cookies
app.use(cookiesMiddleware());

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

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
// const storeItems = new Map([
//   [1, { price: 100, name: "Learn React Today" }],
//   [2, { price: 200, name: "Learn CSS Today" }],
// ])

// app.post("/create-order", async (req, res) => {
//   const request = new paypal.orders.OrdersCreateRequest()
//   const total = req.body.items.reduce((sum, item) => {
//     return sum + storeItems.get(item.id).price * item.quantity
//   }, 0)
//   request.prefer("return=representation")
//   request.requestBody({
//     intent: "CAPTURE",
//     purchase_units: [
//       {
//         amount: {
//           currency_code: "USD",
//           value: total,
//           breakdown: {
//             item_total: {
//               currency_code: "USD",
//               value: total,
//             },
//           },
//         },
//         items: req.body.items.map(item => {
//           const storeItem = storeItems.get(item.id)
//           return {
//             name: storeItem.name,
//             unit_amount: {
//               currency_code: "USD",
//               value: storeItem.price,
//             },
//             quantity: item.quantity,
//           }
//         }),
//       },
//     ],
//   })

//   try {
//     const order = await paypalClient.execute(request)
//     res.json({ id: order.result.id })
//   } catch (e) {
//     res.status(500).json({ error: e.message })
//   }
// })

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
  res.cookie("myCookie", "value", { sameSite: "Strict" });
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Content-Allow-Orgin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH,DELTE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// const { twitterClient, twitterNews } = require("../twitterclient.js");
// const tweet = async () => {
//   try {
//     // await twitterClient.v2.tweet("new calls from me  to twitters");
//     // const response = await (await twitterNews.currentUserV2()).data.username
//     const secondRespone = await ((await twitterNews.v2.followers()).data)
//     console.log(secondRespone)
//     // console.log(response);
//   } catch (e) {
//     console.log(e);
//   }
// };
// const cronTweet = new CronJob("30 * * * * *", async () => {
// tweet();
// });
// cronTweet.start();

app.use("/api", pagesroutes);
app.use("/api", dashboardroutes);
app.use("/api", authroutes);
app.use("/api", adminroutes);

function get_access_token() {
  const auth = `${client_id}:${client_secret}`;
  const data = "grant_type=client_credentials";
  return fetch(endpoint_url + "/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(auth).toString("base64")}`,
    },
    body: data,
  })
    .then((res) => res.json())
    .then((json) => {
      return json.access_token;
    })
    .catch((err) => console.log(err.message));
}
const environment = process.env.ENVIRONMENT || "sandbox";
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const endpoint_url =
  environment === "sandbox"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PORT = 8888 } = process.env;
const base = "https://api-m.sandbox.paypal.com";

// app.post('/create_order', (req, res) => {

//     get_access_token()
//         .then(access_token => {
//             let order_data_json = {
//                 intent: req.body.intent.toUpperCase(),
//                 item:req.body.items,
//                 purchase_units: [{
//                     amount: {
//                         'currency_code': 'USD',
//                         'value':req.body.items[0].quantity
//                         //  req.body.items[0].quantity
//                     }
//                 }]
//             };
//             console.log(req.body.items[0].quantity)
//             const data = JSON.stringify(order_data_json)
//             fetch(endpoint_url + '/v2/checkout/orders', {
//             //https://developer.paypal.com/docs/api/orders/v2/#orders_create
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${access_token}`
//                     },
//                     body: data
//                 })
//                 .then(res => res.json())
//                 .then(json => {
//                     res.send(json);
//                     console.log(json)

//                 }) //Send minimal data to client
//         })
//         .catch(err => {
//             console.log(err.message);
//             res.status(500).send(err)
//         })
// });
// app.post('/complete_order', (req, res, next) => {
//     get_access_token()
//         .then(access_token => {
//             fetch(endpoint_url + '/v2/checkout/orders/' + req.body.orderID + '/' + req.body.intent, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${access_token}`
//                     }
//                 })
//                 .then(res => res.json())
//                 .then(json => {
//                     // will update the database here
//                     console.log(json);
//                     console.log("order done well!!!!")
//                     res.send(json);
//                 }) //Send minimal data to client
//         })
//         .catch(err => {
//             if (!err) {
//                 if (!err.statusCode) {
//                     err.statusCode = 500;
//                 }
//                 next(err)
//                 console.log(err.message)
//            }
//         })
// });

const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};
/// new one below
// /**
//  * Create an order to start the transaction.
//  * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
//  */

let mainPrice = 0;
let mainCourseName = "";
let mainStudentName = "";
const createOrder = async (cart) => {
  // use the cart information passed from the front-end to calculate the purchase unit details
  console.log(
    "shopping cart information passed from the frontend createOrder() callback:",
    cart
  );
  // console.log(cart)
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;

  cart.forEach((item) => {
    // console.log(item.studentName, item.price, item.courseName);
    mainCourseName = [item.courseName];
    mainStudentName = item.studentName;
    mainPrice += item.price;
    console.log(mainCourseName, mainStudentName, mainPrice);
  });
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          // value: mainPrice,
          value:1.00,
          studentName: mainStudentName,
          courseName: mainCourseName,
          // total,               // come from the frontend
        },
      },
    ],
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });

  return handleResponse(response);
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

app.post("/api/orders", async (req, res) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const { cart } = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

app.post("/api/orders/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    //now it time to store the data from the frontend to the database  and make the payment to paypal ;
    if (httpStatusCode === 201 || httpStatusCode === 200) {
      let db = new Database();
      let userId = db.getUserFromToken(req.token);
      let order = {
        Order: new Date(),
        UserId: userId._id,
        Products: jsonResponse.purchase_units[0].description,
        Amount: jsonResponse.purchase_units[0].amount.value,
        Status: "In Process",
      };
      const { studentName, courseName, payment_mode, payment_id, price } =
        req.body;
      try {
        const paymentuser = await Payment.create({
          studentName: jsonResponse.purchase_units[0].amount.studentName,
          courseName: jsonResponse.purchase_units[0].amount.courseName,
          payment_id: orderID,
          payment_mode: payment_mode,
          price: jsonResponse.purchase_units[0].amount.value,
        });
        res.status(201).json({
          data: paymentuser,
          message: "payment created well!!!!!!",
        });

        console.log(paymentuser, "finished");
      } catch (err) {
        // making an error message to the frontend
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
        console.log(err.message);
      }
    }
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

/// genral error express
app.use((error, req, res, next) => {
  console.log(error.message);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message, error: "server error" });
});

const port = 8000 || process.env.PORT;
app.listen(port, () => {
  console.log("SERVER IS RUNNING   " + port);
});

module.exports = app;
