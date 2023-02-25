const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const User = require('../models/user')
const Order = require('../models/order')
const Product = require('../models/product')

router.get("/:username", (req, res) => {
    res.render("pages/account");
  });

router.get("/:username/orders", async(req, res) => {
    const {username} = req.user
    const orders = await Order.find({username: username})
    const productArray = []
    //Get all ids from basket, best to do this over in ejs probably
     for (let i = 0; i<orders.length; i++)  {
       for (let j = 0; j<orders[i].basket.length; j++)  {
           productArray.push(orders[i].basket[j])
        }
      }
     //Get all product information
      let products = [];
      for(let i = 0; i<productArray.length; i++) {
        products = await Product.findById(productArray[i])
        console.log(products)
      }
     
     

    res.render("pages/orders", {orders, productArray});
  });

router.get("/:username/:edit", (req, res) => {
    res.render("pages/accountEdit");
  });


router.put("/:username", catchAsync(async(req, res) => {
  const {username} = req.params
  const {password} = req.body
  await User.find({username})
  await User.updateMany({username}, {...req.body})

  //Setting password
  await User.findByUsername(username).then(function(user) {
    if (user) {
      user.setPassword(password, () => {
        user.save();
      })
    }
  })
  res.redirect(username);
}))

  module.exports = router;