const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const User = require("../models/user");
const passport = require('passport');


router.get("/register", (req, res) => {
    res.render('pages/register')
  });

router.post("/register", catchAsync(async (req, res) => {
    try {
        const {email, password, username} = req.body
        const newUser = new User({email, username})
        const registerUser = await User.register(newUser, password)
        //Logs in once registerd 
        req.login(registerUser, err => {
          if (err) return next(err)
        req.flash('success', `Registration Successful, Welcome :)! `)
        res.redirect('/balloons')
      })
    } 
    catch (error) {
        req.flash('error', error.message)
        res.redirect('/register')
    }
  }));
  
router.get("/login", (req, res) => {
    res.render('pages/login')
  });

//Authenticates user and allows for logging in.
router.post("/login", passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}), catchAsync(async(req, res) => {
        req.flash('success', `Successful Login ${req.user.username}`)
        res.redirect('/balloons')
  }));

router.post('/logout', (req,res) => {
    req.logout(function(err) {
    if (err) return next(err)
    req.flash('success', 'Successful Logged Out')
    res.redirect('/balloons')
    })
})
  
module.exports = router;