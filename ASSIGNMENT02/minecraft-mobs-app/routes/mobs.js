var express = require('express');
var router = express.Router();

/* GET mobs page. */
router.get('/', function(req, res, next) {
  res.render('mobs', { title: 'Hostile Mobs' });
});

module.exports = router;
