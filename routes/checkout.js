const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const User = require('../models/user')
const Order = require('../models/order')
const Basket = require('../models/basket')
const Product = require('../models/product')
const Stripe = require('stripe')
const stripe = Stripe("sk_test_51MgRG0AYx3n7HkYcaolBrw29SN2beilaDLgGCEYSzRnnQOPYt2BCM86W5j3DGvCSGcgeCwc4VbB8I5IavwYddYON008lZ0AzGN");
const checkout = require('../public/JS/checkout')

router.get("/", async(req, res) => {
  res.render("pages/checkout/checkout");
  });

// router.post("/", async(req, res) => {

//   const deliveryDetails = req.body
//   if (!req.user) {
//     const newOrder = new Order({...deliveryDetails, basket:req.session.basket.products })
//     await newOrder.save()
//     req.session.basket = null
//     return res.render("pages/checkout/checkoutComplete");
//   }
//   const {username} = req.user
//   const newOrder = new Order({...deliveryDetails, username, basket:req.session.basket.products })
//   await newOrder.save()
//   req.session.basket = null
//   res.render("pages/checkout/checkoutComplete");
//   });  

router.post("/", async(req, res) => {
    try {
     const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.session.basket.products.map(item => {
        const storeItem = Product.findById(item.id)
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storeItem.name
            },
            unit_amount: storeItem.price * 100
            },
          quantity: 1

        }
      }),
      success_url: ('checkoutComplete'),
      cancel_url: ('/')
     })
     res.json({url: session.url})
    }catch(e) {
      res.status(500).json({error: e.message})
    }
 
});
 


  

  module.exports = router;


//   const products = req.session.basket;
//   console.log(products)


//   const paymentIntent = await stripe.paymentIntents.create({
//   amount: req.session.basket.price,
//   currency: "gbp",
//   automatic_payment_methods: {
//     enabled: true,
//   },
// });
// res.send({
//   clientSecret: paymentIntent.client_secret,
// });