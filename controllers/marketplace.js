const Product = require('../models/product')
const Review = require("../models/review");

module.exports.displayMarketplaceSplash = (req, res) => {
  res.render("pages/products/marketplace/marketplaceSplash");
  }

module.exports.displayListings = async(req, res) => {
  const page = req.query.page || 0
  const sortBy = req.query.sortBy
  const productsPerPage = 8

  let listings = []
  const totalProducts = await Product.find({ category: 'Marketplace'})
  const totalPages = totalProducts/productsPerPage -1

  if (sortBy === 'Name-A-Z') {
    (await Product.find({ category: 'Marketplace' }).sort({name: 1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => listings.push(product))
  } else if(sortBy === 'Name-Z-A') {
    (await Product.find({ category: 'Marketplace'}).sort({name: -1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => listings.push(product))
  } else if(sortBy === 'Price-Low-High') {
    (await Product.find({ category: 'Marketplace' }).sort({price: -1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => listings.push(product))
  } else if(sortBy === 'Price-High-Low') {
    (await Product.find({ category: 'Marketplace' }).sort({price: -1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => listings.push(product))
  } else {
    (await Product.find({ category: 'Marketplace' }).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => listings.push(product))
  }
  res.render("pages/products/marketplace/marketplaceMain", {listings, totalProducts, productsPerPage, totalPages});
}

module.exports.displayListingShow = async(req, res) => {
    const {id} = req.params
    const listing = await Product.findById(id).populate('reviews')
   res.render("pages/products/marketplace/marketplaceShowPage", {listing, id});
 }

module.exports.displayListingEdit = async(req, res) => {
     const {id} = req.params
     const listing = await Product.findById(id)
    res.render("pages/authentication/account/listingsEdit", {listing, id});
 }

module.exports.editListing = async(req, res) => {
    const {id} = req.params
    await Product.findByIdAndUpdate(id, { ...req.body.marketplace })
    res.redirect(`/marketplace/listings/${id}`);
  }

module.exports.postReview = async (req, res) => {
    const products = await Product.findById(req.params.id);
    const review = new Review({...req.body, username: req.user.username})
    products.reviews.push(review)
    await review.save()
    await products.save()
    res.redirect('back');
  }

module.exports.deleteListing = async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndDelete(id)
    res.redirect(`/account/${req.user.username}/listings`)
  }

module.exports.displayNewListingPost = (req, res) => {
    res.render("pages/products/marketplace/marketplacePost");
  }
 
module.exports.postNewListing = async (req, res) => {
    const {username} = req.user
    const postDetails = req.body.marketplace
    const newListing = new Product({...postDetails, username})
    newListing.save()
    const listings = await Product.find({category: 'Marketplace'})
    res.render('pages/products/marketplace/marketplaceMain', {listings})
  }