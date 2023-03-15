const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const {isLoggedIn, validateMarketplace} = require("../views/pages/middleware")
const Product = require('../models/product')
const ExpressError = require("../utilities/ExpressError")
const Joi = require("joi");
const Review = require("../models/review");

router.get("/", (req, res) => {
    res.render("pages/products/marketplace/marketplaceSplash");
  });


router.get("/listings", async(req, res) => {
      const page = req.query.page || 0
    const sortBy = req.query.sortBy
    const productsPerPage = 8

    let listings = []
    const totalProducts = await Product.find({ category: 'Marketplace'})
    const totalPages = totalProducts/productsPerPage -1

    if (sortBy === 'Name-A-Z') {
      (await Product.find({ category: 'Marketplace' }).sort({name: 1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => listings.push(product))
    } else if(sortBy === 'Name-Z-A') {
      (await Product.find({ category: 'Marketplace'}).sort({name: -1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => listings.push(product))
    } else if(sortBy === 'Price-Low-High') {
      (await Product.find({ category: 'Marketplace' }).sort({price: -1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => listings.push(product))
    } else if(sortBy === 'Price-High-Low') {
      (await Product.find({ category: 'Marketplace' }).sort({price: -1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => listings.push(product))
    } else {
      (await Product.find({ category: 'Marketplace' }).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => listings.push(product))
    }
    res.render("pages/products/marketplace/marketplaceMain", {listings, totalProducts, productsPerPage, totalPages});
  });

router.get("/listings/:id", async(req, res) => {
     const {id} = req.params
     const listing = await Product.findById(id).populate('reviews')
    res.render("pages/products/marketplace/marketplaceShowPage", {listing, id});
  });

router.get("/listings/:id/edit", async(req, res) => {
     const {id} = req.params
     const listing = await Product.findById(id)
    res.render("pages/authentication/account/listingsEdit", {listing, id});
  });

  router.put("/listings/:id/edit", isLoggedIn, validateMarketplace, catchAsync(async(req, res) => {
    const {id} = req.params
    await Product.findByIdAndUpdate(id, { ...req.body.marketplace })
 
    res.redirect(`/marketplace/listings/${id}`);
  }))
  router.post("/listings/:id/reviews", isLoggedIn, catchAsync(async (req, res) => {
    const products = await Product.findById(req.params.id);
    const review = new Review({...req.body, username: req.user.username})
    products.reviews.push(review)
    await review.save()
    await products.save()
    res.redirect('back');
  }));

  //Route for deleting camps
router.delete('/listings/:id', async (req, res) => {
  const { id } = req.params
  await Product.findByIdAndDelete(id)
  res.redirect(`/account/${req.user.username}/listings`)
})


    
router.get("/newListing", isLoggedIn, (req, res) => {
  res.render("pages/products/marketplace/marketplacePost");
});

router.post("/newListing", isLoggedIn, validateMarketplace ,catchAsync(async (req, res) => {
    const {username} = req.user
    const postDetails = req.body.marketplace
    const newListing = new Product({...postDetails, username})
    newListing.save()
    const listings = await Product.find({category: 'Marketplace'})
    res.render('pages/products/marketplace/marketplaceMain', {listings})
  }));

  

module.exports = router;