const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const User = require('../models/user')

router.get("/", (req, res) => {
    res.render("pages/checkout");
  });

  module.exports = router;