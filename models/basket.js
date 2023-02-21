const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BasketSchema = new Schema({
    products: [],
    price: 0,
    username: String
})

module.exports = mongoose.model('Basket', BasketSchema)