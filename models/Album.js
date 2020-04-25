const mongoose = require('mongoose');
const AlbumSchema = new mongoose.Schema({
    albumname: {
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

const Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;