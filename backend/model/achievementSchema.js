const mongoose = require('mongoose');

const achievement = new mongoose.Schema({
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
})