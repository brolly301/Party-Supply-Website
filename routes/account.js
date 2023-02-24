const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const User = require('../models/user')

router.get("/:username", (req, res) => {
    res.render("pages/account");
  });

router.get("/:username/:edit", (req, res) => {
    res.render("pages/accountEdit");
  });

router.get("/:username/orders", (req, res) => {
    res.render("pages/orders");
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