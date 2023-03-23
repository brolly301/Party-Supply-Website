const Product = require("../models/product");
const Review = require("../models/review");

const uppercaseFirstLetter = (name) => {
    return name = name.charAt(0).toUpperCase() + name.slice(1);
  }

module.exports.displayProducts = async (req, res) => {
    const {name} = req.params
    const page = req.query.page || 0
    const sortBy = req.query.sortBy
    const productsPerPage = 8

    let products = []
    const totalProducts = await Product.find({ category: uppercaseFirstLetter(name)})
    const totalPages = totalProducts/productsPerPage -1

    if (sortBy === 'Name-A-Z') {
      (await Product.find({ category: uppercaseFirstLetter(name) }).sort({name: 1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => products.push(product))
    } else if(sortBy === 'Name-Z-A') {
      (await Product.find({ category: uppercaseFirstLetter(name) }).sort({name: -1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => products.push(product))
    } else if(sortBy === 'Price-Low-High') {
      (await Product.find({ category: uppercaseFirstLetter(name) }).sort({price: -1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => products.push(product))
    } else if(sortBy === 'Price-High-Low') {
      (await Product.find({ category: uppercaseFirstLetter(name) }).sort({price: -1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => products.push(product))
    } else {
      (await Product.find({ category: uppercaseFirstLetter(name) }).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => products.push(product))
    }
   
    res.render("pages/products/products", { products, name, totalProducts, productsPerPage, totalPages});
  };

  module.exports.displayProductShow = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('reviews')
    if (!product) {
      req.flash('error', 'Unable to find product.')
      return res.redirect('/balloons')
    }
    res.render("pages/products/productShowPage", { product});
  }

  module.exports.displayThemeSplash = async (req, res) => {
    let {subCategory} = req.params
    const products = await Product.find({ category: uppercaseFirstLetter(subCategory)});
      res.render("pages/products/themeSplash", { products, subCategory });
    }

  module.exports.displayThemes = async (req, res) => {
    let {name} = req.params
    if (name === 'stpatricksday') {
      name = 'St Patricks Day'
    }
    const page = req.query.page || 0
    const sortBy = req.query.sortBy
    const productsPerPage = 8

    let products = []
    const totalProducts = await Product.find({ category: uppercaseFirstLetter(name)})
    const totalPages = totalProducts/productsPerPage -1

    if (sortBy === 'Name-A-Z') {
      (await Product.find({ category: uppercaseFirstLetter(name) }).sort({name: 1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => products.push(product))
    } else if(sortBy === 'Name-Z-A') {
      (await Product.find({ category: uppercaseFirstLetter(name) }).sort({name: -1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => products.push(product))
    } else if(sortBy === 'Price-Low-High') {
      (await Product.find({ category: uppercaseFirstLetter(name) }).sort({price: -1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => products.push(product))
    } else if(sortBy === 'Price-High-Low') {
      (await Product.find({ category: uppercaseFirstLetter(name) }).sort({price: -1}).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => products.push(product))
    } else {
      (await Product.find({ category: uppercaseFirstLetter(name) }).skip(page * productsPerPage).limit(productsPerPage)).forEach(product => products.push(product))
    }
   
    res.render("pages/products/products", { products, name, totalProducts, productsPerPage, totalPages});
    }

  module.exports.displayThemeShow = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('reviews')
    if (!product) {
      req.flash('error', 'Unable to find product.')
      return res.redirect('/balloons')
    }
    
     res.render("pages/products/productShowPage", { product });
  }

  module.exports.postReview = async (req, res) => {
    const products = await Product.findById(req.params.id);
    const review = new Review({...req.body, username: req.user.username})
    products.reviews.push(review)
    await review.save()
    await products.save()
    res.redirect('back');
  }

  module.exports.deleteReview = async (req, res) => {
    await Review.findByIdAndDelete(req.body.id)
    res.redirect('back');
  }