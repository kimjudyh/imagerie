// ======== IMPORTS
const mongoose = require('mongoose');

// ======== SCHEMA
const AlbumSchema = new mongoose.Schema({
  albumName: {
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  photos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo',
  }],
}, { timestamps: true });

// ======= CREATE SCHEMA
const Album = mongoose.model('Album', AlbumSchema);

// ======= EXPORT
module.exports = Album;