const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// Routes --------------------
// get album index
router.get('/', async(req, res) => {
    try {
        const allAlbums = await db.Album.find();
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
        const createAlbum = await db.Album.create(req.body);
        res.redirect('/albums')
    } catch (err) {
        return res.send(err)
    }
});


module.exports = router;