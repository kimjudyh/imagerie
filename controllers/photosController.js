// ======== IMPORTS
const express = require('express');
const router = express.Router();

// ======== MODELS
const db = require('../models');

// ======== ROUTES
// Photo Index route
router.get('/', async (req, res) => {
  // get all photos from database
  // TODO: filter by album id
  const allPhotos = await db.Photo.find();
  res.render('photos/index', {
    title: 'Photo Index',
    photos: allPhotos,
  });
});

// GET new Photo

// POST create Photo

// ----- Dynamic Routes
// Photo Show route

// GET edit Photo

// PUT update Photo

// DELETE destroy Photo

// ======== EXPORT
module.exports = router;