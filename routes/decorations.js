const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");

router.get("/", catchAsync(async (req, res) => {
    const products = await Product.find({ category: 'Decorations' });
    res.render("pages/products/decorations/decorations", { products });
  }));
  
router.get("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("pages/products/decorations/decorationsShowPage", { product });
  }));
  
  module.exports = router;