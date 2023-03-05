const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");

router.get("/", catchAsync(async (req, res) => {
  const fancyDress = await Product.find({ category: 'Fancy Dress' });
  res.render("pages/products/fancyDress/fancyDressSplash", { fancyDress });
}));





  module.exports = router;