const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");

router.get("/", catchAsync(async (req, res) => {
  const fancyDress = await Product.find({ category: 'Fancy Dress' });
  res.render("pages/products/fancyDress/fancyDressSplash", { fancyDress });
}));

router.get("/mens", catchAsync(async (req, res) => {
  const mens = await Product.find({category:'Mens'});
  res.render("pages/products/fancyDress/clothing/mens", { mens });
}));

router.get("/mens/:id", catchAsync(async (req, res) => {
  const { id } = req.params;
  const mens = await Product.findById(id);
  res.render("pages/products/fancyDress/clothing/mensShowPage", { mens });
}));

router.get("/womens", catchAsync(async (req, res) => {
  const womens = await Product.find({category:'Womens'});
  res.render("pages/products/fancyDress/clothing/womens", { womens });
}));

router.get("/womens/:id", catchAsync(async (req, res) => {
  const { id } = req.params;
  const womens = await Product.findById(id);
  res.render("pages/products/fancyDress/clothing/womensShowPage", { womens });
}));

router.get("/kids", catchAsync(async (req, res) => {
  const kids = await Product.find({category:'Kids'});
  res.render("pages/products/fancyDress/clothing/kids", { kids });
}));

router.get("/kids/:id", catchAsync(async (req, res) => {
  const { id } = req.params;
  const kids = await Product.findById(id);
  res.render("pages/products/fancyDress/clothing/kidsShowPage", { kids });
}));
  
  module.exports = router;