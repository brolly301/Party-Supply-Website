const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const {isLoggedIn, validateMarketplace} = require("../views/pages/middleware")
const Product = require('../models/product')
const ExpressError = require("../utilities/ExpressError")
const Joi = require("joi");

router.get("/", (req, res) => {
    res.render("pages/products/marketplace/marketplaceSplash");
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