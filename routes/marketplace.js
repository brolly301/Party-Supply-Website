const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const {isLoggedIn} = require("../views/pages/middleware")
const Listing = require('../models/listing')

router.get("/", (req, res) => {
    res.render("pages/products/marketplace/marketplaceSplash");
  });

router.get("/newListing", isLoggedIn, (req, res) => {
    res.render("pages/products/marketplace/marketplacePost");
  });

router.get("/listings", isLoggedIn, async(req, res) => {
     const listings = await Listing.find({})
    res.render("pages/products/marketplace/marketplaceMain", {listings});
  });

router.post("/listings", isLoggedIn, async (req, res) => {
    const {username} = req.user
    const postDetails = req.body
    const newListing = new Listing({...postDetails, username})
    newListing.save()
    const listings = await Listing.find({})
    res.render('pages/products/marketplace/marketplaceMain', {listings})
  });

  

module.exports = router;