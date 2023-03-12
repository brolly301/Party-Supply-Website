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
    const {name} = req.params
    const page = req.query.page || 0
    const sortBy = req.query.sortBy
    const productsPerPage = 8

    let products = []
    const totalProducts = await Product.find({ category: uppercaseFirstLetter(name)})

    if (sortBy === 'Name-A-Z') {
      (await Product.find({ category: uppercaseFirstLetter(name) }).sort({name: 1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => products.push(product))
    } else if(sortBy === 'Name-Z-A') {
      (await Product.find({ category: uppercaseFirstLetter(name) }).sort({name: -1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => products.push(product))
    } else if(sortBy === 'Price-Low-High') {
      (await Product.find({ category: uppercaseFirstLetter(name) }).sort({price: -1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => products.push(product))
    } else if(sortBy === 'Price-High-Low') {
      (await Product.find({ category: uppercaseFirstLetter(name) }).sort({price: -1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => products.push(product))
    } else {
      (await Product.find({ category: uppercaseFirstLetter(name) }).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => products.push(product))
    }
   
    res.render("pages/products/products", { products, name, totalProducts, productsPerPage});
  }));

  router.get("/themes/:subCategory", catchAsync(async (req, res) => {
    let {subCategory} = req.params
    const products = await Product.find({ category: uppercaseFirstLetter(subCategory)});
      res.render("pages/products/themeSplash", { products, subCategory });
    }));

  router.get("/themes/:subCategory/:name", catchAsync(async (req, res) => {
    let {name} = req.params
    if (name === 'stpatricksday') {
      name = 'St Patricks Day'
    }
    const products = await Product.find({ category: uppercaseFirstLetter(name)});
    res.render("pages/products/products", { products, name });
    }));

    router.get("/themes/:subCategory/:name/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('reviews')
    if (!product) {
      req.flash('error', 'Unable to find product.')
      return res.redirect('/balloons')
    }
    res.render("pages/products/productShowPage", { product });
  }));

  
router.get("/:name", catchAsync(async (req, res) => {
  let {name} = req.params
  const products = await Product.find({ category: uppercaseFirstLetter(name)});
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
    products.reviews.push(review)
    await review.save()
    await products.save()
    res.redirect('back');
  }));

router.delete("/:name/:id", catchAsync(async (req, res) => {
    await Review.findByIdAndDelete(req.body.id)
    res.redirect('back');
  }));  


  



  module.exports = router;