const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PackageSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    products: [String]
})

module.exports = mongoose.model('Package', PackageSchema)