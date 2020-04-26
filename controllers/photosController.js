// ======== IMPORTS
const express = require('express');
const router = express.Router();

// ======== MODELS
const db = require('../models');

// ======== ROUTES
// Photo Index route
router.get('/', async (req, res) => {
  try {
    // get all photos from database
    // TODO: filter by album id
    const allPhotos = await db.Photo.find();
    res.render('photos/index', {
      title: 'Photo Index',
      photos: allPhotos,
    });

  } catch (err) {
    res.send(err)
  }
});
// GET new Photo
router.get('/new', async (req, res) => {
  // send to new photo view
  res.render('photo/new', {
    title: 'New Photo',
  });
});

// POST create Photo
router.get('/', async (req, res) => {
  try {
    // make new photo in db
    // TODO: link album id, user id
    const newPhoto = await db.Photo.create(req.body);
    // TODO: redirect to album edit or create page (how??)
    res.redirect('/photos');

  } catch (err) {
    res.send(err);
  }
});

// ----- Dynamic Routes
// Photo Show route
router.get('/:id', async (req, res) => {
  try {
    // get specific photo from db
    const foundPhoto = await db.Photo.findById(req.params.id);
    res.render('photos/show', {
      title: 'Show Photo',
      photo: foundPhoto,
    });

  } catch (err) {
    res.send(err);
  }
});

// GET edit Photo

// PUT update Photo

// DELETE destroy Photo

// ======== EXPORT
module.exports = router;