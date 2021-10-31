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
    instructorId: {
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
        type: Date,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    videoLink: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Workshop', workshopSchema)