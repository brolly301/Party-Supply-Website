const express = require('express')
const router = express.Router();
const authorisation = require('../controllers/authorisation')
const catchAsync = require("../utilities/catchAsync");
const passport = require('passport');
const {isLoggedIn} = require("../views/pages/middleware")

router.route("/register")
.get(authorisation.displayRegisterPage)
.post(catchAsync(authorisation.postRegistration))
  
router.route("/login")
.get(authorisation.displayLoginPage)
.post(passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}), catchAsync(authorisation.postLogin))

router.get('/logout', authorisation.postLogout)

router.get("/search", catchAsync(authorisation.displaySearchPage));

router.route("/contactUs")
.get(catchAsync(authorisation.displayContactUsPage))
.post(catchAsync(authorisation.postContactUs))

router.route("/wishlist")
.get(catchAsync(authorisation.displayWishlist))
.post(isLoggedIn, catchAsync(authorisation.postWishlistItem))
.delete(catchAsync(authorisation.deleteWishlistProduct))

module.exports = router;