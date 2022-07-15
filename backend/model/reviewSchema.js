const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    rating: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    teacherId: {
        type: String,
        required: true
    },
    teacherName: {
        type: String,
        required: true
    },
    teacherImg: {
        type: String,
        required: true
    },
    researchId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Review', reviewSchema)