// ======= IMPORTS
const mongoose = require('mongoose');

// ======= SCHEMA
const PhotoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

}, { timestamps: true });

// ========= CREATE MODEL
const Photo = mongoose.model('Photo', PhotoSchema);

// ========= EXPORT
module.exports = Photo;