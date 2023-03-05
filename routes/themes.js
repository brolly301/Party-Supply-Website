const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");

router.get("/", catchAsync(async (req, res) => {
    const products = await Product.find({ category: 'Themes' });
    res.render("pages/products/themes/themesSplash", { products });
  }));
  

  
  
  module.exports = router;