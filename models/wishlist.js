const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    username: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        default: void 0
    }],
    
})

module.exports = mongoose.model('Wishlist', WishlistSchema)