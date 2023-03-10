const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const {isLoggedIn} = require("../views/pages/middleware")
const Product = require('../models/product')

router.get("/", (req, res) => {
    res.render("pages/products/marketplace/marketplaceSplash");
  });

router.get("/newListing", isLoggedIn, (req, res) => {
    res.render("pages/products/marketplace/marketplacePost");
  });

router.get("/listings", async(req, res) => {
     const listings = await Product.find({category: 'Marketplace'})
    res.render("pages/products/marketplace/marketplaceMain", {listings});
  });

router.get("/listings/:id", async(req, res) => {
     const {id} = req.params
     const listing = await Product.findById(id)
    res.render("pages/products/marketplace/marketplaceShowPage", {listing, id});
  });

router.post("/listings", isLoggedIn, async (req, res) => {
    const {username} = req.user
    const postDetails = req.body
    const newListing = new Product({...postDetails, username})
    newListing.save()
    const listings = await Product.find({category: 'Marketplace'})
    res.render('pages/products/marketplace/marketplaceMain', {listings})
  });

  

module.exports = router;