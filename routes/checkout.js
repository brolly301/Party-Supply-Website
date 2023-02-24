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
  let basketItem = await Basket.findOne({username: username }).populate('products')
  let array = basketItem.products
     console.log(array)
     const deliveryDetails = req.body
     const newOrder = new Order(deliveryDetails)
     newOrder.save()
     newOrder.update(basketItem.products)
     res.render("pages/checkout");
  });  

  module.exports = router;