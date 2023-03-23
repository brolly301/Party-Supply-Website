const Product = require("../models/product");
const Basket = require("../models/basket");

module.exports.displayBasket = async (req, res) => {
    if (req.session.basket) {
      let products = req.session.basket.products
      let totalArray = []
      let totalPrice
      for (let i =0; i<products.length; i++) {
        totalArray.push(products[i].quantity * products[i].price)
        totalPrice = totalArray.reduce((acc, curVal) => acc + curVal)
      }
     req.session.basket.totalBasketPrice = totalPrice
     return res.render("pages/checkout/basket");
    } else {
       res.render("pages/checkout/basket");
    }
    }

module.exports.postBasketItem = async (req, res) => {
    const { productId, name, price, image, description, category, scrollQTY } = req.body;
    let {quantity} =  req.body
    if (scrollQTY) {
      quantity *= scrollQTY
    } else {
      quantity === 1
    }
    
      try {
        let cart = req.session.basket
        if (cart) {
          //cart exists for user
          let itemIndex = cart.products.findIndex(p => p.productId == productId);
          
          if (itemIndex > -1) {
            //product exists in the cart, update the quantity
            let productItem =   cart.products[itemIndex];
            if (scrollQTY) {
              productItem.quantity = parseFloat(productItem.quantity) + parseFloat(scrollQTY)
            } else {
              productItem.quantity++
            }
            
            cart.products[itemIndex] = productItem;
          } else {
            //product does not exists in cart, add new item
            req.session.basket.products.push({ productId, quantity, name, price, image, description, category });
          }
          req.flash('success', 'Item added to Basket')
          return res.redirect('back')
        } else {
          const newCart = await Basket.create({
            products: [{ productId, quantity, name, price, image, description, category }]
          });
          req.session.basket = newCart
          req.session.basket.totalBasketPrice = price * 10
    
          req.flash('success', 'Item added to Basket')
          return  res.redirect('back')
        }
      } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
      }
      }

module.exports.deleteBasketItem = async (req, res) => {
    const {productId} = req.body
    let cart = req.session.basket
    let itemIndex = cart.products.findIndex((p) => p.productId == productId);
  
    if (itemIndex > -1) {
      cart.products.splice(itemIndex, 1);
    }
      req.flash('success', 'Removed from Basket')
      res.redirect('back')
    }

module.exports.increaseItemQuantity = async (req, res) => {
    const {productId} = req.body
    let cart = req.session.basket
    let itemIndex = cart.products.findIndex((p) => p.productId == productId);
  
    if (itemIndex > -1) {
    let productItem = cart.products[itemIndex];
      productItem.quantity++;
      cart.products[itemIndex] = productItem;
    }
      req.flash('success', 'Quantity Increased')
      res.redirect('back')
    }

module.exports.decreaseItemQuantity = async (req, res) => {
    const {productId} = req.body
    let cart = req.session.basket
    let itemIndex = cart.products.findIndex((p) => p.productId == productId);
  
    if (itemIndex > -1) {
    let productItem = cart.products[itemIndex];
      productItem.quantity-- ;
      cart.products[itemIndex] = productItem;
    }
      req.flash('success', 'Quantity decreased')
      res.redirect('back')
}