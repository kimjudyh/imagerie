// ======== IMPORTS
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

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
router.post('/register', async (req, res) => {
  console.log('user body: ', req.body);
  try {
  // check if user already exists in db
    const user = await db.User.findOne({username: req.body.username});
    if (user) {
      // user comes back as truthy, account exists
      // TODO: redirect to login with error message
      return res.send('Account already exists, please login');
    }
    // TODO: verify "password" and "confirm password" match

    // generate salt (adds complication to our password hash)
    const salt = bcrypt.genSaltSync(10);
    // hash password- takes 2 params: password to hash, salt
    const hash = bcrypt.hashSync(req.body.password, salt);

    // creating an object with username, email, hashed password
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: hash,
    };

    // else, create user in database
    const newUser = await db.User.create(userData);
    // then, redirect to login page
    res.redirect('/auth/login');
  } catch (err) {
    res.send(err);
  }
});

// GET new login
router.get('/login', (req, res) => {
  res.render('auth/login', {
    title: 'Login',
  });
});

// POST create new session
router.post('/login', async (req, res) => {
  try {
  // check for existing user account
  console.log(req.body);
  const user = await db.User.findOne({username: req.body.username});
  console.log(user);

  // user doesn't exist
  if (!user) {
    // send back to login page
    return res.render('auth/login', {
      title: 'Login',
      error: 'Invalid Credentials',
    })
  }

  // verify found user and password sent from login matches db 
  const passwordsMatch = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordsMatch) {
    // wrong password, send back to login page
    return res.render('auth/login', {
      title: 'Login',
      error: 'Invalid Credentials',
    });
  }
  // if passwords match, create new session, redirect to profile page
  console.log('user confirmed');
  console.log('session: ', req.session);
  // attach currentUser property to cookie
  req.session.currentUser = user._id;

  console.log('user added: ', req.session);

  // TODO: redirect to profile page
  res.send('logged in');

  } catch (err) {
    res.send(err);
  }
});

// GET logout destroy session



// ======== EXPORTS
module.exports = router;