const express = require('express')
const router = express.Router();
const checkout = require('../controllers/checkout')
const catchAsync = require("../utilities/catchAsync");

router.route("/")
.get(checkout.displayCheckout)
.post(catchAsync(checkout.postOrder))

router.get("/checkoutComplete", catchAsync(checkout.displayCheckoutConfirmation));

router.route("/payment")
.get(checkout.displayPaymentPage)
.post(catchAsync(checkout.postPayment))
 
router.get("/config", checkout.displayConfig)

module.exports = router;


