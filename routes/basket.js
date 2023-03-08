const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");
const Basket = require("../models/basket");

router.get("/",  catchAsync(async (req, res) => {
  
  res.render("pages/checkout/basket", {total: 10});
  }));
 
  //Potentially working version
router.post("/", catchAsync(async (req, res) => {

const { productId, name, price, quantity, image, description } = req.body;
let totalPrice = 1
totalPrice *= price

  try {
    let cart = req.session.basket

    if (cart) {
      //cart exists for user
      let itemIndex = req.session.basket.products.findIndex(p => p.productId == productId);
      
      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem =  req.session.basket.products[itemIndex];
        productItem.quantity++
        productItem.price = totalPrice * productItem.quantity
        req.session.basket.totalBasketPrice +=totalPrice
        req.session.basket.products[itemIndex] = productItem;
        console.log( req.session.basket.totalBasketPrice)
      } else {
        //product does not exists in cart, add new item
        req.session.basket.products.push({ productId, quantity, name, price, image, description });
        req.session.basket.totalBasketPrice += totalPrice
      }
 
      req.flash('success', 'Item added to Basket')
      return res.redirect('back')
    } else {
      //no cart for user, create new cart
      const newCart = await Basket.create({
        products: [{ productId, quantity, name, price, image, description, totalPrice }]
      });
      req.session.basket = newCart
      req.session.basket.totalBasketPrice = totalPrice

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
    let productItem =  req.session.basket.products[itemIndex]
    // req.session.basket.totalBasketPrice -= productItem.price
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
    productItem.quantity += 1;
    cart.products[itemIndex] = productItem;
  }
    req.flash('success', 'Quantity decreased')
    res.redirect('back')
  })); 

 router.patch("/", catchAsync(async (req, res) => {
  const {productId} = req.body
  let cart = req.session.basket
  let itemIndex = cart.products.findIndex((p) => p.productId == productId);

  if (itemIndex > -1) {
  let productItem = cart.products[itemIndex];
    productItem.quantity -= 1;
    cart.products[itemIndex] = productItem;
  }
    req.flash('success', 'Quantity decreased')
    res.redirect('back')
  })); 

module.exports = router;
