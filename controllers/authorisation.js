const Product = require('../models/product')
const nodemailer = require('nodemailer');
const Wishlist = require("../models/wishlist");
const User = require("../models/user");

module.exports.displayRegisterPage = (req, res) => {
    res.render('pages/authentication/register')
  }

module.exports.postRegistration = async (req, res) => {
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
              subject: `Registration Confirmation for Party Supplies`,
              html: `Dear ${firstName} ${lastName}, <br>
              <br>
              We are delighted to confirm your registration for Party Supplies! Thank you for choosing to join us on this exciting journey.<br>
              <br>
              Your registration has been received and processed. We are thrilled to have you as a part of our Party Supplies community. <br>
              With your registration, you have secured your place to access our service. Here are the details of your registration:<br>
              <br>
              Full Name: ${firstName} ${lastName}<br>
              Username: ${username}<br>
              Email: ${phoneNumber}<br>
              Phone Number: ${email}<br>
              <br>
              We hope you are as excited as we are for Party Supplies! Our team is working hard to ensure that your experience is as smooth and enjoyable as possible.<br>
              If you have any questions or concerns, please do not hesitate to reach out to us. We are always here to assist you and answer any queries you may have.<br>
              <br>
              Thank you again for choosing to be a part of Party Supplies. We look forward to seeing you there!<br>
              <br>
              Best regards,<br>
              <br>
              Marc Brolly<br>
              Party Supplies Team.`
            }
          
            transporter.sendMail(options, function (err, info) {
              if (err) {
                req.flash('error', 'Message has not been sent')
                console.log(err)
              }
               req.flash('success', 'Message has been sent')
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
  }

module.exports.displayLoginPage = (req, res) => {
    res.render('pages/authentication/login')
  }

module.exports.postLogin = async(req, res) => {
    req.flash('success', `Successful Login ${req.user.username}`)
    res.redirect('/balloons')
}

module.exports.postLogout = (req,res) => {
    req.logout(function(err) {
    if (err) return next(err)
    req.flash('success', 'Successful Logged Out')
    res.redirect('/balloons')
    })
}

module.exports.displaySearchPage = async (req, res) => {
    const {search} = req.query
  
    const page = req.query.page || 0
    const productsPerPage = 8
    const totalProducts =  await Product.find({$and: [{ name: {$regex: search || '   ', $options: 'i'}},  {category: {$ne: 'Costumes' && 'Occasions'}}]})
      
    const products = await Product.find({$and: [{ name: {$regex: search || '   ', $options: 'i'}},  {category: {$ne: 'Costumes' && 'Occasions'}}]}).skip(page * productsPerPage).limit(productsPerPage)
    res.render("pages/search", {products, search, totalProducts, productsPerPage});
  }

module.exports.displayContactUsPage = async (req, res) => {
    res.render('pages/contactUs')
   }

module.exports.postContactUs = async (req, res) => {
    const {name, subject, email, message} = req.body
  
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
      html: `Contact Email: ${email} <br>
      ${message}`
    }
  
    transporter.sendMail(options, function (err, info) {
      if (err) {
        req.flash('error', 'Message has not been sent')
        console.log(err)
      }
       req.flash('success', 'Message has been sent')
       return res.redirect('back')
    
    })
  }

module.exports.displayWishlist = async (req, res) => {
    const products = await Wishlist.find({username: req.user.username}).populate('products')
    res.render('pages/wishlist', {wishlist: products[0]})
   }

module.exports.postWishlistItem = async (req, res) => {
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
   }

module.exports.deleteWishlistProduct = async (req, res) => {
    await Wishlist.updateOne({username: req.user.username},{$pull: {products: req.body.id}} )
    res.redirect('back');
  }