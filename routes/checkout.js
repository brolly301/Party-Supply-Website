const express = require('express')
const router = express.Router();
const checkout = require('../controllers/checkout')
const catchAsync = require("../utilities/catchAsync");

router.route("/")
.get(checkout.displayCheckout)
.post(checkout.postOrder)

router.get("/checkoutComplete", checkout.displayCheckoutConfirmation);

router.route("/payment")
.get(checkout.displayPaymentPage)
.post(checkout.postPayment)
 
router.get("/config", checkout.displayConfig)

module.exports = router;


