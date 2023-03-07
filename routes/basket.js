const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");
const Basket = require("../models/basket");

router.get("/",  catchAsync(async (req, res) => {

  if(!req.session.basket) {
    return res.render('pages/checkout/basket')
  } 
    let basket = []
    let total = 0;
    for (let i =0; i< req.session.basket.products.length; i++) {
       const basketItems = await Product.findById(req.session.basket.products[i])
       basket.push(basketItems)
       total+=basketItems.price
       req.session.basket.price = total
       req.session.basket.quantity = req.session.basket.products.length
  }
  
  const product = await Product.findById(req.session.basket.products[0])
  console.log(product.price)

  res.render("pages/checkout/basket", {basket, total});
  }));
 

router.post("/", catchAsync(async (req, res) => {
   
   const {id} = req.body
   const basket = new Basket(req.session.basket)
    Product.findById(id, function (error, product) {
    if (error) {
      return res.redirect('back')
    }
    basket.products.push(product._id)
    req.session.basket = basket
    req.flash('success', 'Item added to Basket')
    res.redirect('back')
    console.log(req.session)
   })
  }))

 router.delete("/", catchAsync(async (req, res) => {
    const product = req.session.basket.products
    product.pop()
    req.flash('success', 'Removed from Basket')
    res.redirect('back')
  })); 

module.exports = router;