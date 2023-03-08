const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");
const Basket = require("../models/basket");

router.get("/",  catchAsync(async (req, res) => {














  // if(!req.session.basket) {
  //   return res.render('pages/checkout/basket')
  // } 
  //   let basket = []
  //   let total = 0;
  //   for (let i =0; i< req.session.basket.products.length; i++) {
  //      const basketItems = await Product.find({id: req.session.basket.products[i]})
  //      basket.push(basketItems)
  //      console.log(basket)
    
  // }

  // res.render("pages/checkout/basket", {basket, total});
  }));
 
  //Potentially working version
router.post("/", catchAsync(async (req, res) => {

const { productId, name, price, quantity } = req.body;

  try {
    let cart = req.session.basket

    if (cart) {
      //cart exists for user
      let itemIndex = req.session.basket.products.findIndex(p => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem =  req.session.basket.products[itemIndex];
        productItem.quantity++
        req.session.basket.products[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        req.session.basket.products.push({ productId, quantity, name, price });
        console.log(req.session.basket.products)
      }
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
      const newCart = await Basket.create({
        products: [{ productId, quantity, name, price }]
      });
      req.session.basket = newCart
      console.log(req.session.basket.products)

      return res.status(201).send(req.session.basket.products);
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