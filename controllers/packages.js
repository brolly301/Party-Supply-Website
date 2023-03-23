const Product = require("../models/product");

module.exports.displayPackages = async (req, res) => {
    const package = await Product.find({ category: 'Packages' });
    res.render("pages/products/packages/packages", {package});
  }

module.exports.displayPackageShow = async (req, res) => {
    const { id } = req.params;
    const package = await Product.findById(id).populate('reviews')

    let overallReview = 0
    let totalRating = 0
    for (let i =0; i<package.reviews.length; i++) {
       totalRating += package.reviews[i].rating
       overallReview = totalRating / package.reviews.length
    }
   

    res.render("pages/products/packages/packageShowPage", { package, overallReview });
  }