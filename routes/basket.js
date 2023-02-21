const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");
const Basket = require("../models/basket");

router.get("/", catchAsync(async (req, res) => {
    const username = req.user.username
    const basketItems = await Basket.find({username: username})
    let total = 0;
    res.render("pages/basket", {basketItems, total, username});
  }));
  
router.post("/", catchAsync(async (req, res) => {
    const id = req.body.id
    const product = await Product.findById(id)
    const newItemAdded = new Basket({products: product, price: product.price, username: req.user.username})
    await newItemAdded.save()
    req.flash('success', 'Added to Basket')
    res.redirect('back')
  }))
  
router.delete("/", catchAsync(async (req, res) => {
    const id = req.body.id
    await Basket.findByIdAndDelete(id);
    req.flash('success', 'Removed from Basket')
    res.redirect('back')
  }));

module.exports = router;