const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const User = require('../models/user')
const Order = require('../models/order')

router.get("/", (req, res) => {
    res.render("pages/checkout");
  });

router.post("/", async(req, res) => {
     const deliveryDetails = req.body
     const newOrder = new Order(deliveryDetails)
     newOrder.save()
     res.render("pages/checkout");
  });  

  module.exports = router;