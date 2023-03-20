const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const User = require('../models/user')
const Order = require('../models/order')
const Product = require('../models/product')

router.get("/:username", (req, res) => {
    res.render("pages/authentication/account/account");
  });

router.get("/:username/reviews", async(req, res) => {
    const products = await Product.find({reviews: {$exists: true, $not: {$size: 0}}}).populate('reviews')
    res.render("pages/authentication/account/reviews", {products});
  });

router.delete("/:username/reviews", catchAsync(async (req, res) => {
    await Review.findByIdAndDelete(req.body.id)
    console.log(req.body.id)
    
    res.redirect('back');
  }));    

router.get("/:username/listings", async(req, res) => {
    const {username} = req.user
    const listings = await Product.find({username: username})
    res.render("pages/authentication/account/listings", {listings});
  });

router.get("/:username/orders", async(req, res) => {
    const {username} = req.user
    const orders = await Order.find({username: username}).populate('basket')
    res.render("pages/authentication/account/orders", {orders});
  });

router.get("/:username/orders/:id", async(req, res) => {

  const { id } = req.params;
  const orders = await Order.findById(id).populate('basket')
  res.render("pages/authentication/account/orderProducts", {orders});
  });

router.get("/:username/:edit", (req, res) => {
    res.render("pages/authentication/account/accountEdit");
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