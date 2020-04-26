const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// Routes --------------------
// get alnum index
router.get('/', async(req, res) => {
    try {
        const allAlbums = await db.Album.find();
        res.render('albums/index', {
            album: allAlbums,
            title: "Albums",
        })
    } catch (err) {
        return res.send
    }
});