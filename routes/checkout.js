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
     const newOrder = new Order({customerName: req.body.customerName, username,  basket:basketItem.products})
     newOrder.save()
     basketItem.delete({})
     res.render("pages/checkoutComplete");

  });
    

  module.exports = router;