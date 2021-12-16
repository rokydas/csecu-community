const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    date: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model("Achievement", achievementSchema)