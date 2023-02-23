const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const User = require('../models/user')
const Order = require('../models/order')
const Basket = require('../models/basket')

router.get("/", (req, res) => {
    res.render("pages/checkout");
  });

router.post("/", async(req, res) => {
     const deliveryDetails = req.body
     const {username} = req.user
     console.log(username)
     const newOrder = new Order(deliveryDetails)
     newOrder.save()
     await newOrder.updateOne({username:username})
     res.render("pages/checkout");
  });  

  module.exports = router;