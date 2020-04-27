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
  try {
  // check if user already exists in db
  console.log('req body',req.body)
    const user = await db.User.findOne({username: req.body.username});
    if (user) {
      // user comes back as truthy, account exists
      // TODO: redirect to login with error message
      return res.render('auth/login', {
        error: 'Account already excites',
        title: 'Login',
      });
    }
    
       // TODO: verify "password" and "confirm password" match
    // check password match
    if (req.body.password !== req.body.password2) {
      
      return res.render('auth/register', {
        title: 'Register',
        error: 'Password do not match',
      });
    }
    // check password length
    if(req.body.password.length < 3){
      return res.render('auth/register', {
        title: 'Register',
        error: 'Password should be at least 4 characters',
      });
    }

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

  // redirect user to albums view
  res.redirect('/albums');

  } catch (err) {
    res.send(err);
  }
});

// GET logout destroy session
router.get('/logout', async (req, res) => {
  // TODO: first check if user is logged in
  try {
    await req.session.destroy();
    console.log('session destroyed:', req.session);
    res.redirect('/auth/login');
    

  } catch (err) {
    res.send(err);
  }
});

// ======== EXPORTS
module.exports = router;