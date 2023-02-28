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
  if (!req.user) {
    const newOrder = new Order({...deliveryDetails, basket:req.session.basket.products })
    await newOrder.save()
    req.session.basket = null
    res.render("pages/checkout/checkoutComplete");
  }
  const {username} = req.user
  const newOrder = new Order({...deliveryDetails, username, basket:req.session.basket.products })
  await newOrder.save()
  req.session.basket = null
  res.render("pages/checkout/checkoutComplete");
  });  

  

  module.exports = router;