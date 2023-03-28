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
    totalPrice: {
        type: Number
    },
    date: {
        type: Number,
        default: Date.now
    }
})

module.exports = mongoose.model('Order', OrderSchema)