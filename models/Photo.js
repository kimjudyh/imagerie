const mongoose = require('mongoose');
const PhotoSchema = new mongoose.Schema({
    url: {
        type: String,
        unique: true,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

}, { timestamps: true });

const Photo = mongoose.model('Photo', PhotoSchema);
module.exports = Photo;