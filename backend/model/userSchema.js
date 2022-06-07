const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    varsityId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    },
    userType: { 
        type: String,
        required: true
    },
    isAdmin: {
        type: Number,
        required: false
    },
    img: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: false
    },
    facebook: {
        type: String,
        required: false
    },
    youtube: {
        type: String,
        required: false
    },
    github: {
        type: String,
        required: false
    },
    medium: {
        type: String,
        required: false
    },
    linkedin: {
        type: String,
        required: false
    },
    mobileNumber: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('User', userSchema)