const express = require('express');
const router = express.Router();
const passport = require('passport');
const jsonwebtoken = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const userController = require('../controller/userController');

// Local host address(URL)
const url = 'http://localhost:8000/'

// applying middleware for authorized user
const isUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    return next();
  }
  res.status(403).redirect('/login');
}

router.get('/', (req, res) => {
  let userId = req.user ? req.user._id : null;
  res.render('index', { user: req.user, id: userId });
})

// router.post('/post', (req, res) => {
//   res.redirect('/');
// })

router.get('/post/:id', (req, res) => {
  res.render('index');
})

router.get('/post/:id/edit', isUser ,(req, res) => {
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

// router.post('/login', 
//   passport.authenticate('local', {
//     session: false
//   }),
//   (req, res) => {
//     const token = jsonwebtoken.sign({ user: req.user }, 'secret');
//     // res.redirect(`${url}?t=${token}`)
//     res.json({
//       token: token,
//       user: req.user
//     })
//   }
// )

router.post('/login', 
  passport.authenticate('local', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    res.redirect('/');
  }
)

router.get('/logout', userController.logoutUser);

router.get('/newPost', (req, res) => {
  res.render('index');
})

router.get('/profile', (req, res) => {
  res.render('index');
})

router.post('/api/');


module.exports = {
  router: router,
  isLoggedIn: isUser
};