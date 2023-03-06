const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");
const Review = require("../models/review");
const {isLoggedIn} = require("../views/pages/middleware")





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