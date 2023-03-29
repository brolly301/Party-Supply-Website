const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    url: String,
    fileName: String
})

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/c_fit,h_250,w_250')
})

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
    }],
    quantity: {
        type: Number,
        default: 1
    },
    marketplaceImage: [ImageSchema]
})

module.exports = mongoose.model('Product', ProductSchema)