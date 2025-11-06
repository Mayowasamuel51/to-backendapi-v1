const express = require("express");
const router = express.Router();
const cors = require("cors");
const Stripe = require("stripe");
require("dotenv").config();
const UserProgress = require("../model/userprogress.js");
const authController = require("../controller/authController");
const { body } = require("express-validator");
const User = require("../model/user");

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Enable CORS and JSON body parsing for this router
router.use(cors());
router.use(express.json());

// Create Checkout Session route
router.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: item.price * 100, // amount in cents
        },
        quantity: item.quantity,
      })),
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

