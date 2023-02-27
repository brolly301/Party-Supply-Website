const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");

router.get("/", catchAsync(async (req, res) => {
  const fancyDress = await Product.find({ category: 'Fancy Dress' });
  res.render("pages/products/fancyDress/fancyDressSplash", { fancyDress });
}));

router.get("/:name", catchAsync(async (req, res) => {
  const {name} = req.params
  const products = await Product.find({category:'Clothing', subCategory: name});
  console.log(products)
  res.render("pages/products/fancyDress/clothing", { products });
}));

router.get("/:name/:id", catchAsync(async (req, res) => {
  const { id } = req.params;
  const products = await Product.findById(id);
  res.render("pages/products/fancyDress/showPage", { products });
})); 
  module.exports = router;