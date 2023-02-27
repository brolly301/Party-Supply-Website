const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    category: {
        type: String,
    },
    size: String,
    color: String,
    theme: String,
    matieral: String,
    package: {
        products: [String]
    }
})

module.exports = mongoose.model('Product', ProductSchema)