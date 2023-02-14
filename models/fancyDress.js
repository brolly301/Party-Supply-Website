const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const costumeSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    size: {
        enum: ['S', 'M', 'L']
    }
})

module.exports = mongoose.model('Costume', costumeSchema)