// ======== IMPORTS
const express = require('express');
const router = express.Router();

// import connect-multiparty to handle file upload
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// import cloudinary
const cloudinary = require('cloudinary');
// configure cloudinary w/ account details
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

// ======== MODELS
const db = require('../models');

// ======== ROUTES
// Photo Index route: replaced by Album Show route
// router.get('/', async (req, res) => {
//   try {
//     // authorization
//     if (!req.session.currentUser) {
//       return res.redirect('/auth/login');
//     }
//     // get all photos from database
//     const allPhotos = await db.Photo.find();
//     res.render('photos/index', {
//       title: 'Photo Index',
//       photos: allPhotos,
//     });

//   } catch (err) {
//     res.send(err)
//   }
// });

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
router.post('/:albumid/photos', multipartMiddleware, async (req, res) => {
  try {
    // authorization
    if (!req.session.currentUser) {
      return res.redirect('/auth/login');
    };

    // Cloudinary photo upload
    let result;
    if (!req.body.url) {
      // if file was uploaded instead of url
      // send temp file storage path to cloudinary, receive URL
      result = await cloudinary.v2.uploader.upload(req.files.image.path);
      // save URL to req.body
      req.body.url = result.secure_url;
      req.body.cloudinaryPublicId = result.public_id;
    }

    // make new photo in db
    const newPhoto = await db.Photo.create(req.body);

    // redirect back to album edit view
    res.redirect(`/albums/${req.params.albumid}/edit`);

    // add album id to Photo model
    newPhoto.album = req.params.albumid;
    const savedPhoto = await newPhoto.save();

    // add photo id to Album photo id array 
    const foundAlbum = await db.Album.findById(req.params.albumid);
    foundAlbum.photos.push(savedPhoto._id);
    const savedAlbum = await foundAlbum.save();


  } catch (err) {
    return res.render('photos/new', {
      title: 'New Photo',
      albumId: req.params.albumid,
      error: 'Please choose a file or URL'
    })
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
    // get album that contains this photo from db
    const foundAlbum = await db.Album.findById(req.params.albumid);
    // use Album.photos array to navigate to previous, next photo
    const albumPhotosArray = await foundAlbum.photos;
    // find this photo's position in the photos array
    const foundPhotoPosition = await foundAlbum.photos.indexOf(req.params.id);

    res.render('photos/show', {
      title: 'Show Photo',
      photo: foundPhoto,
      albumName: foundAlbum.albumName,
      albumPhotosArray: albumPhotosArray, 
      photoPosition: foundPhotoPosition,
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
    let photoDateString = '';
    if (foundPhoto.date) {
      // date has been defined by user
      // adjust date for timezone
      let photoDate = foundPhoto.date;
      // convert date to ms
      // get timezone offset and convert from min to ms
      // convert ms to date
      photoDate = new Date(photoDate.getTime() - (photoDate.getTimezoneOffset() * 60000));
      // format date to match input type="date": yyyy-mm-dd
      photoDateString = photoDate.toISOString().slice(0, 10);
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
    // delete photo object
    const deletedPhoto = await db.Photo.findByIdAndDelete(req.params.id);
    // remove photo id from albums photos array
    const foundAlbum = await db.Album.findById(req.params.albumid);
    const deletedPhotoIndex = foundAlbum.photos.pull({_id: req.params.id});
    const savedAlbum = await foundAlbum.save();
    // delete cloud version of picture
    cloudinary.v2.uploader.destroy(deletedPhoto.cloudinaryPublicId, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
    // redirect to album edit view that photo was in
    res.redirect(`/albums/${req.params.albumid}/edit`);

  } catch (err) {
    res.send(err);
  }
})

// ======== EXPORT
module.exports = router;