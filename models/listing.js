const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    condition: String,
    image: String,
    category: String,
    size: String,
    username: String
})

module.exports = mongoose.model('Listing', ListingSchema)