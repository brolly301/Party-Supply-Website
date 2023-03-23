const express = require('express')
const router = express.Router();
const checkout = require('../controllers/checkout')
const catchAsync = require("../utilities/catchAsync");

router.get("/", checkout.displayCheckout);

router.get("/checkoutComplete", checkout.displayCheckoutConfirmation);

router.get("/payment", checkout.displayPaymentPage);

router.post("/", checkout.postOrder);  

router.post("/payment", checkout.postPayment);
 
router.get("/config", checkout.displayConfig)

module.exports = router;


