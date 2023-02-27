const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");

router.get("/", catchAsync(async (req, res) => {
    const products = await Product.find({ category: 'Themes' });
    res.render("pages/products/themes/themesSplash", { products });
  }));
  
  router.get("/:name", catchAsync(async (req, res) => {
    const {name} = req.params
    const toLowerCaseName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    const products = await Product.find({ category: toLowerCaseName });
    res.render("pages/products/themes/themes", { products });
  }));
  
  router.get("/:name/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const products = await Product.findById(id);
    res.render("pages/products/themes/showPage", { products });
  }));
  
  module.exports = router;