# Project 1: Full-Stack Website
https://imagerie-sei.herokuapp.com/

By Judy Kim & Freshta Bashari, SEI '20
## Imagerie, an image collection app
A menagerie is a varied collection of items. On Imagerie, a user can sign up to create, edit and view their collections of images. The images can be either be uploaded as files or rendered from a URL. This means that a user has the flexibility to add photos from their device, from cloud storage accounts like Google Photos, or from other websites.

The album view page:

<img src="./public/img/readme/desktop_album_view.jpg" height=350>

The photo view page:

<img src="./public/img/readme/desktop_photo_show.jpg" height=350>

Imagerie is responsive to mobile screen sizes: 

<img src="./public/img/readme/mobile_profile.jpg" height=350> <img src="./public/img/readme/mobile_album_view.jpg" height=350> <img src="./public/img/readme/mobile_photo_show.jpg" height=350>

## Scope
In this project, we fulfilled all core requirements. Our website has:
- Full CRUD on 2 of the 3 linked database models defined by Mongoose schema
- 7 RESTful routes for 2 models
- User authentication and authorization using sessions and bcrypt 
- Front-end data validation
- Templating using the EJS view engine
- Responsive front-end styling using Flexbox and Bootstrap CSS
- External Cloudinary API integration 
- Deployment to Heroku

## Technologies Used
- Front-end: Bootstrap, Flexbox, CSS, HTML, JavaScript
- Back-end: Mongoose, MongoDB, Express, Node.js
- Dependencies: bcyptjs, body-parser, cloudinary, connect-multiparty, connect-mongo, dotenv, ejs, express, express-session, method-override, mongoose

## User Stories
- User creates an account
- User logs in
- User logs out
- User creates an album
- User creates a photo and adds to album
- User edits an album
- User deletes an album
- User edits a photo
- User deletes a photo

## Wireframes
During our planning, we used figma to create wireframes for each page.
1. Home Page & Sign Up  
<img src="./public/img/readme/home.png" height=350>
2. Log In  
<img src="./public/img/readme/sign_up.png" height=350>
3. Profile Page & Album Index  
<img src="./public/img/readme/profile.png" height=350>
4. New Album  
<img src="./public/img/readme/add-album.png" height=350>
5. View Album  
<img src="./public/img/readme/album-view.png" height=350>
6. Edit Album  
<img src="./public/img/readme/edit-album.png" height=350>
7. New Photo  
<img src="./public/img/readme/add-photo.png" height=350>
8. View Photo  
<img src="./public/img/readme/photo-view.png" height=350>
8. Edit Photo  
<img src="./public/img/readme/edit-photo.png" height=350>


## Data Models
Imagerie uses 3 linked models
1. Users: one-to-many relationship with Albums
2. Albums: one-to-many relationship with Photos
3. Photos  
<img src="./public/img/readme/ERD_v3.png">

