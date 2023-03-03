const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const Product = require("../models/product");

router.get("/", catchAsync(async (req, res) => {
 
    const {search} = req.query
    const products = await Product.find({ name: {$regex: search || '___' , $options: 'i'}});
    res.render("pages/search", {products, search});
  
  }));

module.exports = router;