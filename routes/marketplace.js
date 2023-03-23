const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const marketplace = require('../controllers/marketplace')
const {isLoggedIn, validateMarketplace} = require("../views/pages/middleware")

router.get("/", marketplace.displayMarketplaceSplash );

router.get("/listings", marketplace.displayListings);

router.get("/listings/:id", marketplace.displayListingShow);

router.get("/listings/:id/edit", marketplace.displayListingEdit);

router.put("/listings/:id/edit", isLoggedIn, validateMarketplace, catchAsync(marketplace.editListing))

router.post("/listings/:id/reviews", isLoggedIn, catchAsync(marketplace.postReview));

router.delete('/listings/:id', marketplace.deleteListing)

router.get("/newListing", isLoggedIn, marketplace.displayNewListingPost);

router.post("/newListing", isLoggedIn, validateMarketplace ,catchAsync(marketplace.postNewListing));


module.exports = router;