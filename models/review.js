const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    username: String,
    body: String,
    rating: Number,
    createdDate: {
        type: Number,
        default: Date.now
    } 
})

module.exports = mongoose.model('Review', ReviewSchema)