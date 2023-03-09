const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");
const Basket = require("../models/basket");

router.get("/",  catchAsync(async (req, res) => {
  
  if (req.session.basket) {
    let products = req.session.basket.products


    let total = []
    let hey = 0
    let hello
    for (let i =0; i<products.length; i++) {
     total.push(products[i].quantity * products[i].price)
     hello = total.reduce((acc, curVal) => acc + curVal)
    }
   req.session.basket.totalBasketPrice = hello
   console.log(req.session.basket.totalBasketPrice)
  
  
   return res.render("pages/checkout/basket");
  } else {
     res.render("pages/checkout/basket");
  }
 
  }));
 
  //Potentially working version
router.post("/", catchAsync(async (req, res) => {

const { productId, name, price, quantity, image, description } = req.body;
  try {
    let cart = req.session.basket
    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex(p => p.productId == productId);
      
      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem =   cart.products[itemIndex];
        productItem.quantity++
        cart.products[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        req.session.basket.products.push({ productId, quantity, name, price, image, description });
      }
 
      req.flash('success', 'Item added to Basket')
      return res.redirect('back')
    } else {
      //no cart for user, create new cart
      const newCart = await Basket.create({
        products: [{ productId, quantity, name, price, image, description }]
      });
      req.session.basket = newCart

      req.flash('success', 'Item added to Basket')
      return  res.redirect('back')
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
  }))

 router.delete("/", catchAsync(async (req, res) => {
  const {productId} = req.body
  let cart = req.session.basket
  let itemIndex = cart.products.findIndex((p) => p.productId == productId);

  if (itemIndex > -1) {
    cart.products.splice(itemIndex, 1);
  }
    req.flash('success', 'Removed from Basket')
    res.redirect('back')
  })); 

 
  router.put("/", catchAsync(async (req, res) => {
    const {productId} = req.body
    let cart = req.session.basket
    let itemIndex = cart.products.findIndex((p) => p.productId == productId);
  
    if (itemIndex > -1) {
    let productItem = cart.products[itemIndex];
      productItem.quantity++;
      cart.products[itemIndex] = productItem;
    }
      req.flash('success', 'Quantity Increased')
      res.redirect('back')
    })); 
  

 router.patch("/", catchAsync(async (req, res) => {
  const {productId} = req.body
  let cart = req.session.basket
  let itemIndex = cart.products.findIndex((p) => p.productId == productId);

  if (itemIndex > -1) {
  let productItem = cart.products[itemIndex];
    productItem.quantity-- ;
    cart.products[itemIndex] = productItem;
  }
    req.flash('success', 'Quantity decreased')
    res.redirect('back')
  })); 

module.exports = router;
