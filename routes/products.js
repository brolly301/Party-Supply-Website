const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");
const Review = require("../models/review");
const {isLoggedIn} = require("../views/pages/middleware")

const uppercaseFirstLetter = (name) => {
  return name = name.charAt(0).toUpperCase() + name.slice(1);
}

router.get("/:name", catchAsync(async (req, res) => {
  let {name} = req.params
  const products = await Product.find({ category: uppercaseFirstLetter(name)});
    res.render("pages/products/products", { products, name });
  }));

  router.get("/:name/sortByNameAZ", catchAsync(async (req, res) => {
    const {name} = req.params
    const products = await Product.find({ category: uppercaseFirstLetter(name) }).sort({name: 1})
  res.render("pages/products/products", { products, name });
  }));
  
  router.get("/:name/sortByNameZA", catchAsync(async (req, res) => {
    const {name} = req.params
    const products = await Product.find({ category: uppercaseFirstLetter(name) }).sort({name: -1})
    res.render("pages/products/products", { products, name });
  }));
  
  router.get("/:name/sortByPriceHighLow", catchAsync(async (req, res) => {
    const {name} = req.params
    const products = await Product.find({ category: uppercaseFirstLetter(name) }).sort({price: -1});
    res.render("pages/products/products", { products, name });
  }));
  
  router.get("/:name/sortByPriceLowHigh", catchAsync(async (req, res) => {
    const {name} = req.params
    console.log(name)
    const products = await Product.find({ category: uppercaseFirstLetter(name) }).sort({price: 1});
    res.render("pages/products/products", { products, name });
  }));

router.get("/:name/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('reviews')
    if (!product) {
      req.flash('error', 'Unable to find product.')
      return res.redirect('/balloons')
    }
    res.render("pages/products/productShowPage", { product });
  }));

  router.post("/:name/:id/reviews", isLoggedIn, catchAsync(async (req, res) => {
    const products = await Product.findById(req.params.id);
    const review = new Review({...req.body, username: req.user.username})
    console.log(req.body)
    products.reviews.push(review)
    await review.save()
    await products.save()
    res.redirect('back');
  }));

router.delete("/:name/:id", catchAsync(async (req, res) => {
    await Review.findByIdAndDelete(req.body.id)
    console.log(req.body.id)
    res.redirect('back');
  }));  


  



  module.exports = router;