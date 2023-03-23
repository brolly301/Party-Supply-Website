const express = require('express')
const router = express.Router();
const products = require('../controllers/products')
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const {isLoggedIn} = require("../views/pages/middleware")

router.get("/:name", catchAsync(products.displayProducts))

router.get("/themes/:subCategory", catchAsync(products.displayThemeSplash));

router.get("/themes/:subCategory/:name", catchAsync(products.displayThemes));

router.get("/themes/:subCategory/:name/:id", catchAsync(products.displayThemeShow));

router.route("/:name/:id")
.get(catchAsync(products.displayProductShow))
.delete(catchAsync(products.deleteReview));

router.post("/:name/:id/reviews", isLoggedIn, catchAsync(products.postReview));


module.exports = router;