const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const marketplace = require('../controllers/marketplace')
const {isLoggedIn, validateMarketplace} = require("../views/pages/middleware")

router.get("/", marketplace.displayMarketplaceSplash );

router.get("/listings", catchAsync(marketplace.displayListings));

router.route("/listings/:id")
.get(catchAsync(marketplace.displayListingShow))
.delete(catchAsync(marketplace.deleteListing))

router.route("/listings/:id/edit")
.get(catchAsync(marketplace.displayListingEdit))
.put(isLoggedIn, validateMarketplace, catchAsync(marketplace.editListing))

router.post("/listings/:id/reviews", isLoggedIn, catchAsync(marketplace.postReview));

router.route("/newListing")
.get(isLoggedIn, marketplace.displayNewListingPost)
.post(isLoggedIn, validateMarketplace ,catchAsync(marketplace.postNewListing))

module.exports = router;