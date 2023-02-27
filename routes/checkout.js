const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const User = require('../models/user')
const Order = require('../models/order')
const Basket = require('../models/basket')

let array = []

router.get("/", async(req, res) => {
  const {username} = req.user
  

  const basketItems = await Basket.find({username: username})
  for(let i = 0; i<basketItems.length; i++) {
    array.push(basketItems[i].product)
  }

  console.log(array)

    res.render("pages/checkout");
  });

router.post("/", async(req, res) => {
     const deliveryDetails = req.body
     const {username} = req.user
  
     const basketItems = await Basket.find({username: username})
     const newOrder = new Order(deliveryDetails)
     await newOrder.save()
 
     console.log(newOrder)
     console.log(basketItems)
    
     await newOrder.updateOne({products: [array]})
     console.log(basketItems[0].product[0])
   
     res.render("pages/checkout");
  });  

  module.exports = router;