const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const User = require('../models/user')
const Order = require('../models/order')
const Basket = require('../models/basket')

router.get("/", async(req, res) => {
  res.render("pages/checkout/checkout");
  });

router.post("/", async(req, res) => {
     const deliveryDetails = req.body
     const {username} = req.user
     const basketItems = await Basket.find({username})
     const newOrder = new Order({...deliveryDetails,username, basket:basketItems[0].products })
     await newOrder.save()

     res.render("pages/checkout/checkoutComplete");
  });  

  module.exports = router;