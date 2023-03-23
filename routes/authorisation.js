const express = require('express')
const router = express.Router();
const authorisation = require('../controllers/authorisation')
const catchAsync = require("../utilities/catchAsync");
const passport = require('passport');
const {isLoggedIn} = require("../views/pages/middleware")

router.get("/register", authorisation.displayRegisterPage);

router.post("/register", catchAsync(authorisation.postRegistration));
  
router.get("/login", authorisation.displayLoginPage);

router.post("/login", passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}), catchAsync(authorisation.postLogin));

router.get('/logout', authorisation.postLogout)

router.get("/search", catchAsync(authorisation.displaySearchPage));

router.get("/contactUs", catchAsync(authorisation.displayContactUsPage));

router.post("/contactUs", catchAsync(authorisation.postContactUs));

router.get("/wishlist", catchAsync(authorisation.displayWishlist));

router.post("/wishlist", isLoggedIn, catchAsync(authorisation.postWishlistItem));

router.delete("/wishlist", catchAsync(authorisation.deleteWishlistProduct));  
  
module.exports = router;