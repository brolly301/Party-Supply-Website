const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");

router.get("/sortByNameAZ", catchAsync(async (req, res) => {
    const products = await Product.find({ category: 'Balloons' }).sort({name: 1})
 res.render("pages/products/balloons/balloons", { products });
  }));

router.get("/sortByNameZA", catchAsync(async (req, res) => {
    const products = await Product.find({ category: 'Balloons' }).sort({name: -1})
    res.render("pages/products/balloons/balloons", { products });
  }));

router.get("/sortByPriceHighLow", catchAsync(async (req, res) => {
    const products = await Product.find({ category: 'Balloons' }).sort({price: -1});
    res.render("pages/products/balloons/balloons", { products });
  }));

router.get("/sortByPriceLowHigh", catchAsync(async (req, res) => {
    const products = await Product.find({ category: 'Balloons' }).sort({price: 1});
    res.render("pages/products/balloons/balloons", { products });
  }));

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