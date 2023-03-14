const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const User = require('../models/user')
const Order = require('../models/order')
const Basket = require('../models/basket')
const Product = require('../models/product')
const Stripe = require('stripe')
const stripe = Stripe("sk_test_51MgRG0AYx3n7HkYcaolBrw29SN2beilaDLgGCEYSzRnnQOPYt2BCM86W5j3DGvCSGcgeCwc4VbB8I5IavwYddYON008lZ0AzGN");
require('dotenv').config()



router.get("/", async(req, res) => {
  res.render("pages/checkout/checkout");
  });

router.get("/checkoutComplete", async(req, res) => {
  res.render("pages/checkout/checkoutComplete");
  });

router.get("/payment", async(req, res) => {
  res.render("pages/checkout/payment");
  });

router.post("/", async(req, res) => {
  const deliveryDetails = req.body
  
  if (!req.user) {
    const newOrder = new Order({...deliveryDetails, basket:[...req.session.basket.products]})
    await newOrder.save()
    return res.render("pages/checkout/payment");
  }
  const {username} = req.user
  const newOrder = new Order({...deliveryDetails, username, basket:[...req.session.basket.products]})
  await newOrder.save()
  res.render("pages/checkout/payment");
  });  

router.post("/payment", async(req, res) => {
 
  if (!req.session.basket) {
     return  res.render('pages/home')
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'gbp',
      payment_method_types: ['card'],
    });
    res.send({clientSecret: paymentIntent.client_secret})
  }
 
});
 
router.get("/config", (req,res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  })
  
})


  

  module.exports = router;


