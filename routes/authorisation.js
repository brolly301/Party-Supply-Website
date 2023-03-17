const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const User = require("../models/user");
const passport = require('passport');
const Product = require('../models/product')
const nodemailer = require('nodemailer');
const Wishlist = require("../models/wishlist");

router.get("/register", (req, res) => {
    res.render('pages/authentication/register')
  });

router.post("/register", catchAsync(async (req, res) => {
    try {
        const {confirmPassword, firstName, lastName, phoneNumber, email, password, username} = req.body
        const newUser = new User({email, username, firstName, lastName, phoneNumber})

        if (confirmPassword !== password) {
            req.flash('error', `Passwords do not match`)
            res.redirect('/register')
        } else {
          const registerUser = await User.register(newUser, password)
          //Logs in once registerd 
          req.login(registerUser, err => {
            if (err) return next(err)
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "marcrobertjohn@gmail.com",
                pass: "qklbtfcwnloxeckw"
              }
            })
          
            const options = {
              from: "marcrobertjohn@gmail.com",
              to: email,
              subject: `Welcome ${firstName} ${lastName} to Party Supplies`,
              text: `This is an automated message for welcoming you to our website. `
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
          req.flash('success', `Registration Successful, Welcome :)! `)
          res.redirect('/balloons')
        })
        }
    } 
    catch (error) {
        req.flash('error', error.message)
        res.redirect('/register')
    }
  }));
  
router.get("/login", (req, res) => {
    res.render('pages/authentication/login')
  });

//Authenticates user and allows for logging in.
router.post("/login", passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}), catchAsync(async(req, res) => {
        req.flash('success', `Successful Login ${req.user.username}`)
        res.redirect('/balloons')
  }));

router.get('/logout', (req,res) => {
    
    req.logout(function(err) {
    if (err) return next(err)
    req.flash('success', 'Successful Logged Out')
    res.redirect('/balloons')
    })
})

router.get("/search", catchAsync(async (req, res) => {
  const {search} = req.query

    const page = req.query.page || 0
    const productsPerPage = 8
 const totalProducts =  await Product.find({$and: [{ name: {$regex: search || '   ', $options: 'i'}},  {category: {$ne: 'Costumes' && 'Occasions'}}]})
    

  const products = await Product.find({$and: [{ name: {$regex: search || '   ', $options: 'i'}},  {category: {$ne: 'Costumes' && 'Occasions'}}]}).skip(page * productsPerPage).limit(productsPerPage)
  res.render("pages/search", {products, search, totalProducts, productsPerPage});
}));

router.get("/contactUs", catchAsync(async (req, res) => {
  
 res.render('pages/contactUs')
}));

router.post("/contactUs", catchAsync(async (req, res) => {
 
  const {name, subject, message} = req.body
  console.log(name, subject, message)

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "marcrobertjohn@gmail.com",
      pass: "qklbtfcwnloxeckw"
    }
  })

  const options = {
    from: name,
    to: "marcrobertjohn@gmail.com",
    subject: subject,
    text: `${message}`
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
}));

router.get("/wishlist", catchAsync(async (req, res) => {

  const products = await Wishlist.find({username: req.user.username}).populate('products')
  console.log(products[0].products[0])

  res.render('pages/wishlist', {wishlist: products[0]})
 }));

router.post("/wishlist", catchAsync(async (req, res) => {
   
      
  const {id} = req.body
  
  try {
    let wishlist = await Wishlist.findOne({username: req.user.username})
    
    if (wishlist) {
      //cart exists for user
      let itemIndex = wishlist.products.findIndex(p => p._id == id);
   
          if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          req.flash('error', 'Item already added to Wishlist')
          return res.redirect('back')
      } else {
        wishlist.products.push({_id : id})
        wishlist.save()
        console.log(wishlist)
      }
      req.flash('success', 'Item added to Wishlist')
      return res.redirect('back')
    } else {
      const newWishlist = await Wishlist.create({products: id, username: req.user.username})
        newWishlist.save()
        req.flash('success', 'Item added to wishlist')
        return res.redirect('back')
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
  


  res.render('pages/wishlist')
 }));
  
module.exports = router;