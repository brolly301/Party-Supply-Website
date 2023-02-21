const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const {isLoggedIn} = require("../views/pages/middleware")

router.get("/", (req, res) => {
    res.render("pages/products/marketplace/marketplaceSplash");
  });

router.get("/newListing", isLoggedIn, (req, res) => {
    res.render("pages/products/marketplace/marketplacePost");
  });

module.exports = router;