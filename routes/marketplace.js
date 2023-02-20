const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");

router.get("/", (req, res) => {
    res.render("pages/products/marketplace/marketplaceSplash");
  });

module.exports = router;