const Product = require("../models/product");

module.exports.displayPackages = async (req, res) => {
    const package = await Product.find({ category: 'Packages' });
    res.render("pages/products/packages/packages", {package});
  }

module.exports.displayPackageShow = async (req, res) => {
    const { id } = req.params;
    const package = await Product.findById(id);
    res.render("pages/products/packages/packageShowPage", { package });
  }