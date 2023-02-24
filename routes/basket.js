const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");
const Basket = require("../models/basket");

// router.get("/",  catchAsync(async (req, res) => {
//   if (typeof req.user === 'undefined') {
//     const basketItems = await Basket.find({username: {$exists: false}})
//     let total = 0;
//     return res.render("pages/basket", {basketItems, total});
//   }
//     const {username} = req.user
//     const basketItems = await Basket.find({username: username})
//     let total = 0;
//     res.render("pages/basket", {basketItems, total});
//   }));
   
// router.delete("/", catchAsync(async (req, res) => {
//     const id = req.body.id
//     await Basket.findByIdAndDelete(id);
//     req.flash('success', 'Removed from Basket')
//     res.redirect('back')
//   }));


  router.post("/", catchAsync(async (req, res) => {
    
    const username = req.user.username
    const id = req.body.id
    const product = await Product.findById(id)
     
    let basket = await Basket.findOne({ username }).populate('products');
    if (basket) {
      basket.products.push(product)
      basket.save()
    } else {
      const newBasket =  await Basket.create({username, products: product});
      newBasket.save()
    }
  }))


module.exports = router;