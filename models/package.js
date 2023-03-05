const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PackageSchema = new Schema({
    name: String,
    description: String,
    image: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    price: Number,
})

module.exports = mongoose.model('Package', PackageSchema)