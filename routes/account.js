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

router.put("/:username", catchAsync(async(req, res) => {
  const {username} = req.params
  await User.findOneAndUpdate(username, {...req.body})
  res.redirect(username);
}))





  module.exports = router;