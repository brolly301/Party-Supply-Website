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
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    price: {
        type: Number
    }
})

module.exports = mongoose.model('Order', OrderSchema)