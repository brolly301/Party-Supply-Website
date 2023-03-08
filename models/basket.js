const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BasketSchema = new Schema({
    username: String,
    products: [
        {
        productId: String,
        quantity: Number,
        name: String,
        price: Number,
        image: String,
        description: String,
        totalPrice: {
          type: Number,
          default: 0
        }
      },
  ],
    totalBasketPrice: 0,
})

BasketSchema.statics.generateProducts = () => {
      
}

module.exports = mongoose.model('Basket', BasketSchema)