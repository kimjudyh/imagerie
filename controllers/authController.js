// ======== IMPORTS
const express = require('express');
const router = express.Router();

// ======== MODELS
const db = require('../models');

// ======== ROUTES
// GET register new User
router.get('/register', (req, res) => {
  res.render('auth/register', {
    title: 'Registration',
  });
});

// POST create new User
// check if user already exists in db
//router.post('')
// if yes, redirect to login page
// else, create user in database
// then, redirect to login page

// ======== EXPORTS
module.exports = router;