var express = require('express');
var router = express.Router();

var params = {
  title: 'irma gostosa do felipe'
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', params);
});

module.exports = router;
