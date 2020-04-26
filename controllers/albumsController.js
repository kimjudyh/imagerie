const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// Routes --------------------
// get album index
router.get('/', async(req, res) => {
    try {
      // TODO: filter by user id
      console.log('cookie', req.session.currentUser)
      const allAlbums = await db.Album.find({user: req.session.currentUser});
      //  const allAlbums = await db.Album.find();
        res.render('albums/index', {
            albums: allAlbums,
            title: "Albums",
        })
    } catch (err) {
        return res.send
    }
});

// get albums new
router.get('/new', (req, res) => {
    res.render('albums/new', {
        title: 'Create'
    });
});

// post albums create
router.post('/', async(req, res) => {
    try {
      // assign user in cookie to album
        const createAlbum = await db.Album.create(req.body);
        createAlbum.user = req.session.currentUser;
        const savedAlbum = await createAlbum.save();
        console.log('saved album: ', savedAlbum);
        res.redirect('/albums')
    } catch (err) {
        return res.send(err)
    }
});

// get albums show
router.get('/:id', async(req, res) => {
    try {
        const foundAlbum = await db.Album.findById(req.params.id);
        res.render('albums/show', {
            album: foundAlbum,
            title: 'Show',
        });
    } catch (err) {

        return res.send(err)
    }
});

// get albums edit
router.get('/:id/edit', async(req, res) => {
    try {
        const foundAlbum = await db.Album.findById(req.params.id);
        // format date to match input type="date": yyyy-mm-dd
        albumDateString = foundAlbum.date.toISOString().slice(0, 10);
        console.log(albumDateString);
        res.render('albums/edit', {
            album: foundAlbum,
            albumDateString: albumDateString,
            title: 'Edit',
        })
    } catch (err) {
        return res.send(err)
    }
});

// get albums update
router.put('/:id', async(req, res) => {
    try {
        const editAlbum = await db.Album.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );
        res.redirect(`/albums/${req.params.id}`)
    } catch (err) {
        return res.send(err)
    }
});

// delete albums
router.delete('/:id', async(req, res) => {
    try {
        const deleteAlbum = await db.Album.findByIdAndDelete(req.params.id);
        res.redirect('/albums');
    } catch (err) {
        return res.send(err);
    }
});

module.exports = router;