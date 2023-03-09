const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    customerName: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    postcode: {
        type: String
    },
    basket: [{
        productId: String,
        quantity: Number,
        name: String,
        price: Number,
        image: String,
        description: String,
    }],
    price: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now() + 1000 * 60 * 60 * 24
    }
})

module.exports = mongoose.model('Order', OrderSchema)