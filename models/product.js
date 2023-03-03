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
    subCategory: String,
    username: String,
    reviews:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

module.exports = mongoose.model('Product', ProductSchema)