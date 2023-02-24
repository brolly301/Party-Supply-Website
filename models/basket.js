const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BasketSchema = new Schema({
    username: String,
    products: [
        {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
  ],
    price: 0,
})

module.exports = mongoose.model('Basket', BasketSchema)