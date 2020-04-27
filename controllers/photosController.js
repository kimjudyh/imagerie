// ======== IMPORTS
const express = require('express');
const router = express.Router();

// ======== MODELS
const db = require('../models');

// ======== ROUTES
// Photo Index route
router.get('/', async (req, res) => {
  try {
    // authorization
    if (!req.session.currentUser) {
      return res.redirect('/auth/login');
    }
    // get all photos from database
    // TODO: filter by album id?
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
router.get('/:albumid/photos/new', async (req, res) => {
  // authorization
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  };
  // send to new photo view
  res.render('photos/new', {
    title: 'New Photo',
    albumId: req.params.albumid,
  });
});

// POST create Photo
router.post('/:albumid/photos', async (req, res) => {
  try {
    // authorization
    if (!req.session.currentUser) {
      return res.redirect('/auth/login');
    };
    // make new photo in db
    console.log('req.body from form, ', req.body);
    const newPhoto = await db.Photo.create(req.body);
    console.log('new photo object', newPhoto);

    // add album id to Photo model
    newPhoto.album = req.params.albumid;
    const savedPhoto = await newPhoto.save();
    console.log('saved photo', savedPhoto);

    // add photo id to Album photo id array 
    // unnecessary??
    const foundAlbum = await db.Album.findById(req.params.albumid);
    foundAlbum.photos.push(savedPhoto._id);
    console.log('album photo id array', foundAlbum.photos);
    const savedAlbum = await foundAlbum.save();

    // redirect back to album edit view
    res.redirect(`/albums/${req.params.albumid}/edit`);

  } catch (err) {
    res.send(err);
  }
});

// ----- Dynamic Routes
// Photo Show route
router.get('/:albumid/photos/:id', async (req, res) => {
  try {
    // authorization
    if (!req.session.currentUser) {
      return res.redirect('/auth/login');
    };
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
router.get('/:albumid/photos/:id/edit', async (req, res) => {
  try {
    // authorization
    if (!req.session.currentUser) {
      return res.redirect('/auth/login');
    };
    // get specific photo from db
    const foundPhoto = await db.Photo.findById(req.params.id);

    // format date to match input type="date": yyyy-mm-dd
    console.log('photo.date: ', foundPhoto.date);
    //console.log('ISO date', foundPhoto.date.toISOString())
    //console.log('photo toLocale string', foundPhoto.date.toLocaleDateString())
    let photoDateString = '';
    if (foundPhoto.date) {
      // date has been defined by user
      photoDateString = foundPhoto.date.toISOString().slice(0, 10);
    } 

    res.render('photos/edit', {
      title: 'Edit Photo',
      photo: foundPhoto,
      photoDateString: photoDateString,
    });

  } catch (err) {
    res.send(err);
  }
});

// PUT update Photo
router.put('/:albumid/photos/:id', async (req, res) => {
  try {
    // authorization
    if (!req.session.currentUser) {
      return res.redirect('/auth/login');
    };
    // update photo in db
    const updatedPhoto = await db.Photo.findByIdAndUpdate(
      req.params.id,
      req.body, { new: true },
    );
    res.redirect(`/albums/${req.params.albumid}/photos/${req.params.id}`);

  } catch (err) {
    res.send(err);
  }
});

// DELETE destroy Photo
router.delete('/:albumid/photos/:id', async (req, res) => {
  try {
    // authorization
    if (!req.session.currentUser) {
      return res.redirect('/auth/login');
    };
    const deletedPhoto = await db.Photo.findByIdAndDelete(req.params.id);
    // redirect to album that photo was in
    res.redirect(`/albums/${req.params.albumid}`);

  } catch (err) {
    res.send(err);
  }
})

// ======== EXPORT
module.exports = router;