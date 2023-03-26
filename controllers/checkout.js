const Order = require('../models/order')
const Stripe = require('stripe')
const stripe = Stripe("sk_test_51MgRG0AYx3n7HkYcaolBrw29SN2beilaDLgGCEYSzRnnQOPYt2BCM86W5j3DGvCSGcgeCwc4VbB8I5IavwYddYON008lZ0AzGN");
const nodemailer = require('nodemailer');
require('dotenv').config()

module.exports.displayCheckout = (req, res) => {
  res.render("pages/checkout/checkout");
  }

module.exports.displayCheckoutConfirmation = async(req, res) => {
  const order = await Order.find().sort({date: -1}).limit(1)
  console.log(order[0].basket)
  res.render("pages/checkout/checkoutComplete", {order: order[0]});
  }

module.exports.displayPaymentPage = (req, res) => {
  res.render("pages/checkout/payment");
  }

module.exports.postOrder = async(req, res) => {
  const deliveryDetails = req.body
  if (!req.user) {
    const newOrder = new Order({...deliveryDetails, basket:[...req.session.basket.products], totalPrice: req.session.basket.totalBasketPrice})
    await newOrder.save()

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "marcrobertjohn@gmail.com",
        pass: "qklbtfcwnloxeckw"
      }
    })
  
    const options = {
      from: "marcrobertjohn@gmail.com",
      to: req.body.email,
      subject: "Order Confirmation",
      text: `This is a test order confirmation!`
    }
  
    transporter.sendMail(options, function (err, info) {
      if (err) {
        req.flash('error', 'Message has not been sent')
        console.log(err)
      }
       req.flash('success', 'Message has been sent')
       console.log("Sent:" + info.messageId)
       return res.redirect('back')
    
    })

    return res.redirect("checkout/checkoutComplete");
  }
  const {username} = req.user
  const newOrder = new Order({...deliveryDetails, username, basket:[...req.session.basket.products], totalPrice: req.session.basket.totalBasketPrice})
  await newOrder.save()

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "marcrobertjohn@gmail.com",
      pass: "qklbtfcwnloxeckw"
    }
  })

  const options = {
    from: "marcrobertjohn@gmail.com",
    to: req.body.email,
    subject: "Order Confirmation",
    text: `This is a test order confirmation!`
  }

  transporter.sendMail(options, function (err, info) {
    if (err) {
      req.flash('error', 'Message has not been sent')
      console.log(err)
    }
     req.flash('success', 'Message has been sent')
     console.log("Sent:" + info.messageId)
     return res.redirect('back')
  
  })

  return res.redirect("checkout/checkoutComplete");
  }

module.exports.postPayment = async(req, res) => {
  if (!req.session.basket) {
     return  res.render('pages/home')
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'gbp',
      payment_method_types: ['card'],
    });
    res.send({clientSecret: paymentIntent.client_secret})
  }
}

module.exports.displayConfig = (req,res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  }) 
}