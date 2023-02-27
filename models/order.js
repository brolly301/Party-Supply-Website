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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
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