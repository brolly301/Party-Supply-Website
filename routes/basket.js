const express = require('express')
const router = express.Router();
const basket = require('../controllers/basket')
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")

router.route("/")
.get(catchAsync(basket.displayBasket))
.post(catchAsync(basket.postBasketItem))
.delete(catchAsync(basket.deleteBasketItem))
.put(catchAsync(basket.increaseItemQuantity))
.patch(catchAsync(basket.decreaseItemQuantity))

module.exports = router;
