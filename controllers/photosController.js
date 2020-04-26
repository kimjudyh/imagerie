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
  res.render('photos/new', {
    title: 'New Photo',
  });
});

// POST create Photo
router.post('/', async (req, res) => {
  try {
    // make new photo in db
    // TODO: link album id, user id
    console.log('new photo, ', req.body);
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
router.get('/:id/edit', async (req, res) => {
  try {
    // get specific photo from db
    const foundPhoto = await db.Photo.findById(req.params.id);
    res.render('photos/edit', {
      title: 'Edit Photo',
      photo: foundPhoto,
    });

  } catch (err) {
    res.send(err);
  }
});

// PUT update Photo
router.put('/:id', async (req, res) => {
  try {
    const updatedPhoto = await db.Photo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true},
    );
    res.redirect(`/photos/${req.params.id}`);

  } catch (err) {
    res.send(err);
  }
});

// DELETE destroy Photo
router.delete('/:id', async (req, res) => {
  try {
    const deletedPhoto = await db.Photo.findByIdAndDelete(req.params.id);
    // TODO: redirect to album that photo was in
    res.redirect('/photos');

  } catch (err) {
    res.send(err);
  }
})

// ======== EXPORT
module.exports = router;