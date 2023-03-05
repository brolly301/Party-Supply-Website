const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");
const Review = require("../models/review");
const {isLoggedIn} = require("../views/pages/middleware")

router.get("/:name", catchAsync(async (req, res) => {
  let {name} = req.params
  name = name.charAt(0).toUpperCase() + name.slice(1);
  const products = await Product.find({ category: name });
  res.render("pages/products/balloons/balloons", { products, name });
}));

router.get("/:theme?/:name", catchAsync(async (req, res) => {
  let {name} = req.params
  name = name.charAt(0).toUpperCase() + name.slice(1);
  const products = await Product.find({ category: name });
    res.render("pages/products/balloons/balloons", { products, name });
  }));

router.get("/:theme?/:name/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('reviews')
    if (!product) {
      req.flash('error', 'Unable to find product.')
      return res.redirect('/balloons')
    }
    res.render("pages/products/balloons/balloonsShowPage", { product });
  }));

  module.exports = router;