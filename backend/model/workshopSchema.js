const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructorName: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    videoLink: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Workshops', workshopSchema)