const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// Routes --------------------
// get alnum index
router.get('/', async(req, res) => {
    try {
        const foundAlbum = await db.Album.find();
        res.render('albums/index', {
            album: foundAlbum,
            title: "Albums",
        })
    } catch (err) {
        return res.send
    }
});