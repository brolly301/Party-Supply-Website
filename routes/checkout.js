const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const User = require('../models/user')
const Order = require('../models/order')
const Basket = require('../models/basket')

router.get("/", async(req, res) => {
    res.render("pages/checkout");
  });

router.post("/", async(req, res) => {
    
     const {username} = req.user
     const basketItem = await Basket.findOne({username: username })
     const deliveryDetails = req.body
     const newOrder = Order.create(deliveryDetails, {basket:basketItem})
     res.render("pages/checkout");

  });
    

  module.exports = router;