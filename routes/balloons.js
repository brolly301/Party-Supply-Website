const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");
const Review = require("../models/review");
const {isLoggedIn} = require("../views/pages/middleware")

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

  
// router.get("/:theme?/:id", catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findById(id).populate('reviews')
//     if (!product) {
//       req.flash('error', 'Unable to find product.')
//       return res.redirect('/balloons')
//     }
//     res.render("pages/products/balloons/balloonsShowPage", { product });
//   }));

router.post("/:id/reviews", isLoggedIn, catchAsync(async (req, res) => {
    const products = await Product.findById(req.params.id);
    const review = new Review({...req.body, username: req.user.username})
    console.log(req.body)
    products.reviews.push(review)
    await review.save()
    await products.save()
    res.redirect('back');
  }));

router.delete("/:id", catchAsync(async (req, res) => {
    await Review.findByIdAndDelete(req.body.id)
    console.log(req.body.id)
    
    res.redirect('back');
  }));  

  module.exports = router;