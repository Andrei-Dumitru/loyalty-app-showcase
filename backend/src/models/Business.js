const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUri: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUri: {
        type: String,
        required: true
    },
    locationUri: {
        type: String,
        required: true
    },
    offers: [offerSchema]
});

mongoose.model('Business', businessSchema);