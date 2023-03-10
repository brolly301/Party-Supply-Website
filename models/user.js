const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: { 
        type: String,
        required: true,
    },
    phoneNumber: { 
        type: Number,
        required: true,
    }
})

UserSchema.plugin(passportLocalMongoose)


module.exports = mongoose.model('User', UserSchema)