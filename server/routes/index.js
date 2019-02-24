const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controller/userController');

router.get('/', (req, res)=>{
  res.render('index');
})

// router.post('/post', (req, res) => {
//   res.redirect('/');
// })

router.get('/post/:id', (req, res) => {
  res.render('index');
})

router.get('/post/:id/edit', (req, res) => {
  res.render('index');
})

router.get('/signup', (req, res) => {
  res.render('index');
})

router.post('/signup', userController.registerUser);
// router.post('/login', userController.loginUser);

router.get('/login', (req, res) => {
  res.render('index');
})

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    res.redirect('/');
  }
)

router.get('/newPost', (req, res) => {
  res.render('index');
})

router.post('/api/');


module.exports = router;