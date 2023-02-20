const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");

router.get("/", catchAsync(async (req, res) => {
    const package = await Product.find({ category: 'Packages' });
    res.render("pages/products/packages/packages", {package});
  }));
  
router.get("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const package = await Product.findById(id);
    res.render("pages/products/packages/packageShowPage", { package });
  }));

module.exports = router;