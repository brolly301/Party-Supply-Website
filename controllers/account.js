const User = require('../models/user')
const Order = require('../models/order')
const Product = require('../models/product')
const Review = require('../models/review')

module.exports.displayUserAccount = (req, res) => {
    res.render("pages/authentication/account/account");
  }

module.exports.displayUserReviews = async(req, res) => {
    const products = await Product.find({reviews: {$exists: true, $not: {$size: 0}}}).populate('reviews')
    const reviews = await Review.find({username: req.user.username})
    res.render("pages/authentication/account/reviews", {products, reviews});
  }

module.exports.deleteUserReviews = async (req, res) => {
    await Review.findByIdAndDelete(req.body.id)
    res.redirect('back');
  }

module.exports.displayUserListings = async(req, res) => {
    const {username} = req.user
    const listings = await Product.find({username: username})
    res.render("pages/authentication/account/listings", {listings});
  }

module.exports.displayUserOrders = async(req, res) => {
    const {username} = req.user
    const orders = await Order.find({username: username}).populate('basket')
    res.render("pages/authentication/account/orders", {orders});
  }

module.exports.displayUserOrderDetails = async(req, res) => {
    const { id } = req.params;
    const orders = await Order.findById(id).populate('basket')
    res.render("pages/authentication/account/orderProducts", {orders});
  }

module.exports.displayUserEditPage = (req, res) => {
    res.render("pages/authentication/account/accountEdit");
  }

module.exports.editUserAccount = async(req, res) => {
    const {username} = req.params
    const {password} = req.body
    await User.find({username})
    await User.updateMany({username}, {...req.body})
  
    //Setting password
    await User.findByUsername(username).then(function(user) {
      if (user) {
        user.setPassword(password, () => {
          user.save();
        })
      }
    })
    res.redirect(username);
  }