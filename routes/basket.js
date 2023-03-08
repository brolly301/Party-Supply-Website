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
// const totalPrice 

  try {
    let cart = req.session.basket

    if (cart) {
      //cart exists for user
      let itemIndex = req.session.basket.products.findIndex(p => p.productId == productId);
      
    

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem =  req.session.basket.products[itemIndex];
        productItem.quantity++
        productItem.price = productItem.totalPrice * productItem.quantity
        
        req.session.basket.products[itemIndex] = productItem;
        
      } else {
        //product does not exists in cart, add new item
        req.session.basket.products.push({ productId, quantity, name, price, image, description });
        console.log(req.session.basket.products)
      }
 
      req.flash('success', 'Item added to Basket')
      return res.redirect('back')
    } else {
      //no cart for user, create new cart
      const newCart = await Basket.create({
        products: [{ productId, quantity, name, price, image, description, totalPrice }]
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
    const product = req.session.basket.products
    product.pop()
    req.flash('success', 'Removed from Basket')
    res.redirect('back')
  })); 

module.exports = router;

//WORKING WITH ONLY USERNAME
// router.post("/", catchAsync(async (req, res) => {

//   const { productId, name, price, quantity } = req.body;
  
//     try {
//       let cart = await Basket.findOne({username: req.user.username });
  
//       if (cart) {
//         //cart exists for user
//         let itemIndex = req.session.basket.products.findIndex(p => p.productId == productId);
  
//         if (itemIndex > -1) {
//           //product exists in the cart, update the quantity
//           let productItem =  req.session.basket.products[itemIndex];
//           productItem.quantity++
//           req.session.basket.products[itemIndex] = productItem;
//         } else {
//           //product does not exists in cart, add new item
//           req.session.basket.products.push({ productId, quantity, name, price });
//           console.log(req.session.basket.products)
//         }
//         cart = await cart.save();
//         return res.status(201).send(cart);
//       } else {
//         //no cart for user, create new cart
//         const newCart = await Basket.create({
//           username : req.user.username,
//           products: [{ productId, quantity, name, price }]
//         });
//         req.session.basket = newCart
//         console.log(req.session.basket.products)
  
//         return res.status(201).send(req.session.basket.products);
//       }
//     } catch (err) {
//       console.log(err);
//       res.status(500).send("Something went wrong");
//     }
  
//     }))