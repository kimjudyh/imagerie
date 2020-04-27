// ======= IMPORTS
const mongoose = require('mongoose');

// ======= SCHEMA
const PhotoSchema = new mongoose.Schema({
  url: {
    type: String,
    //unique: true,
    required: true,
  },
  date: {
    type: Date,
    //required: true,
  },
  location: {
    type: String,
    required: true,
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