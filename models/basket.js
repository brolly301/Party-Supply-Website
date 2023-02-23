const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BasketSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    username: String
})

module.exports = mongoose.model('Basket', BasketSchema)