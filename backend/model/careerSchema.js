const mongoose = require('mongoose')

const careerSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    deadline: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Career', careerSchema)