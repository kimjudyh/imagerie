// ======= IMPORTS
const mongoose = require('mongoose');

// ======= SCHEMA
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    unique: true,
  },
  albums: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
  }],
}, { timestamps: true });

// ========== CREATE MODEL
const User = mongoose.model('User', UserSchema);

// ========= EXPORT
module.exports = User;