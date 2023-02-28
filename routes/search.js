const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const Product = require("../models/product");

router.get("/", catchAsync(async (req, res) => {
    res.render("pages/search");
  }));

router.post("/", catchAsync(async (req, res) => {
    const {search} = req.body
    console.log(search)
    const package = await Product.find({ name: {$in: [search]  } });
    console.log(package)
    res.redirect("back");
  }));

module.exports = router;