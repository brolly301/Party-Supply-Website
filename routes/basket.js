const express = require('express')
const router = express.Router();
const basket = require('../controllers/basket')
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")

router.get("/",  catchAsync(basket.displayBasket));
 
  //Potentially working version
router.post("/", catchAsync(basket.postBasketItem))

router.delete("/", catchAsync(basket.deleteBasketItem)); 

router.put("/", catchAsync(basket.increaseItemQuantity)); 
  
router.patch("/", catchAsync(basket.decreaseItemQuantity)); 

module.exports = router;
