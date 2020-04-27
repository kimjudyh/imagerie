// ======= IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('dotenv').config();

const path = require('path');
const session = require('express-session');

// store sessions in mongoDB
const MongoStore = require('connect-mongo')(session);

const app = express();
const port = process.env.PORT || 4000;

console.log('testing dotenv : ', process.env.TEST)

// ======= VIEW ENGINE
app.set('view engine', 'ejs');

// ======= CONTROLLERS
const authController = require('./controllers/authController');
const albumsController = require('./controllers/albumsController');
const photosController = require('./controllers/photosController');

// ======= MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // only save session if set or mutate property on session object
    saveUninitialized: false, // only save a cookie when we set a property
    // store session in mongodb
    store: new MongoStore(
        // connection url
        { url: process.env.SESSION_MONGODB_URI }),
}));


// ======= ROUTES
app.get('/', (req, res) => {
  res.render('index', {
     title: 'Homepage',
    });
})

// Auth/User routes
app.use('/auth', authController);

// Album routes
app.use('/albums', albumsController);

// Photo Routes
app.use('/photos', photosController);

// ======= SERVER LISTENER
app.listen(port, () => {
    console.log('Server running on port', port);
})