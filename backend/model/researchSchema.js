const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    publisherId: {
        type: String,
        required: true,
    },
    publisherName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    publishedLink: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Research', researchSchema)