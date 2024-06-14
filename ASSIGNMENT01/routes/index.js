var express = require('express');
var router = express.Router();

// GET the home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
// GET the about page
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me' });
});
// GET the projects page
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects' });
});
// GET the contact page
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Mef' });
});

module.exports = router;
