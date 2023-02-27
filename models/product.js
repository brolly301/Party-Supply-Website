const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    category: {
        type: String,
        default: 'Marketplace'
    },
    subCategory: String,
    condition: String,
    size: String,
    color: String,
    theme: String,
    matieral: String,
    subCategory: String,
    username: String,
    package: {
        products: [String]
    },
    clothing: [this]
})

module.exports = mongoose.model('Product', ProductSchema)