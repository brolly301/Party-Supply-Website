const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");
const Basket = require("../models/basket");

router.get("/",  catchAsync(async (req, res) => {

  if(!req.session.basket) {
    return res.redirect('/')
  } 
    let basket = []
    for (let i =0; i< req.session.basket.products.length; i++) {
       const basketItems = await Product.findById(req.session.basket.products[i])
       basket.push(basketItems)
  }

  res.render("pages/checkout/basket", {basket});
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
    console.log(req.session)
    res.redirect('/')
   })

 

    // const username = req.user.username
    // const id = req.body.id
    // const product = await Product.findById(id)
    // let basketItem = await Basket.findOne({ username }).populate('products');
    // if (basketItem) {
    //   basketItem.products.push(product)
    //   basketItem.save()
    //   req.flash('success', 'Added to Basket')
    //   res.redirect('back')
    // } else {
    //   const newBasket = new Basket({username, products: product});
    //   newBasket.save()
    //   req.flash('success', 'Added to Basket')
    //   res.redirect('back')
    // }
  }))

 router.delete("/", catchAsync(async (req, res) => {
    const {username} = req.user
    const id = req.body.id
    const basket =  await Basket.updateOne({username: username}, {"$pull": {"products": id }});
    console.log(basket)
    req.flash('success', 'Removed from Basket')
    res.redirect('back')
  })); 

module.exports = router;