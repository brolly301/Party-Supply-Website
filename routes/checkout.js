const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const User = require('../models/user')
const Order = require('../models/order')
const Basket = require('../models/basket')
const Stripe = require('stripe')
const stripe = Stripe("pk_test_51MgRG0AYx3n7HkYcQrmnHO2WT49ZAxJW3UFrK2IEyYs8lQX1nn3HhT34NIGr4BCa4wGTxsYrpK8RBZ9jv8WcdFT000gR9QrtDu");

router.get("/", async(req, res) => {
  res.render("pages/checkout/checkout");
  });

// router.post("/", async(req, res) => {

//   const deliveryDetails = req.body
//   if (!req.user) {
//     const newOrder = new Order({...deliveryDetails, basket:req.session.basket.products })
//     await newOrder.save()
//     req.session.basket = null
//     return res.render("pages/checkout/checkoutComplete");
//   }
//   const {username} = req.user
//   const newOrder = new Order({...deliveryDetails, username, basket:req.session.basket.products })
//   await newOrder.save()
//   req.session.basket = null
//   res.render("pages/checkout/checkoutComplete");
//   });  

  
 


  

  module.exports = router;