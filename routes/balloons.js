const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");

router.get("/", catchAsync(async (req, res) => {
    const products = await Product.find({ category: 'Balloons' });
    res.render("pages/products/balloons/balloons", { products });
  }));
  
router.get("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      req.flash('error', 'Unable to find product.')
      return res.redirect('/balloons')
    }
    res.render("pages/products/balloons/balloonsShowPage", { product });
  }));

  module.exports = router;