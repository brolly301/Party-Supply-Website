const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const User = require('../models/user')
const Order = require('../models/order')
const Listing = require('../models/listing')

router.get("/:username", (req, res) => {
    res.render("pages/account");
  });

router.get("/:username/listings", async(req, res) => {
    const {username} = req.user
    const listings = await Listing.find({username: username})
    res.render("pages/listings", {listings});
  });

router.get("/:username/orders", async(req, res) => {
    const {username} = req.user
    const orders = await Order.find({username: username}).populate('basket')
    res.render("pages/orders", {orders});
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