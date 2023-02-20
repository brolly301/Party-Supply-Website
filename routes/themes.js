const express = require('express')
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const ExpressError = require("../utilities/ExpressError")
const Product = require("../models/product");

router.get("/", catchAsync(async (req, res) => {
    const products = await Product.find({ category: 'Themes' });
    res.render("pages/products/themes/themesSplash", { products });
  }));
  
  router.get("/easter", catchAsync(async (req, res) => {
    const easter = await Product.find({ category: 'Easter' });
    res.render("pages/products/themes/themes/easter", { easter });
  }));
  
  router.get("/easter/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const easter = await Product.findById(id);
    res.render("pages/products/themes/themes/easterShowPage", { easter });
  }));
  
  router.get("/christmas", catchAsync(async (req, res) => {
    const christmas = await Product.find({ category: 'Christmas' });
    res.render("pages/products/themes/themes/christmas", { christmas });
  }));
  
  router.get("/christmas/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const christmas = await Product.findById(id);
    res.render("pages/products/themes/themes/christmasShowPage", { christmas });
  }));
  
  router.get("/halloween", catchAsync(async (req, res) => {
    const halloween = await Product.find({ category: 'Halloween' });
    res.render("pages/products/themes/themes/halloween", { halloween });
  }));
  
  router.get("/halloween/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const halloween = await Product.findById(id);
    res.render("pages/products/themes/themes/halloweenShowPage", { halloween });
  }));
  
  router.get("/valentines", catchAsync(async (req, res) => {
    const valentines = await Product.find({ category: 'Valentines' });
    res.render("pages/products/themes/themes/valentines", { valentines });
  }));
  
  router.get("/valentines/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const valentines = await Product.findById(id);
    res.render("pages/products/themes/themes/valentinesShowPage", { valentines });
  }));
  
  router.get("/stpatricksday", catchAsync(async (req, res) => {
    const stpatricksday = await Product.find({ category: 'St Patricks Day' });
    res.render("pages/products/themes/themes/paddysDay", { stpatricksday });
  }));
  
  router.get("/stpatricksday/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const stpatricksday = await Product.findById(id);
    res.render("pages/products/themes/themes/paddysDayShowPage", { stpatricksday });
  }));
  
  router.get("/birthdays", catchAsync(async (req, res) => {
    const birthdays = await Product.find({ category: 'Birthdays' });
    res.render("pages/products/themes/themes/birthdays", { birthdays });
  }));
  
  router.get("/birthdays/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const birthday = await Product.findById(id);
    res.render("pages/products/themes/themes/birthdaysShowPage", { birthday });
  }));

  module.exports = router;