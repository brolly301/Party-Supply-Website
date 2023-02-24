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
    basket: {
        type: Object
    },
    price: {
        type: Number
    }
})

module.exports = mongoose.model('Order', OrderSchema)