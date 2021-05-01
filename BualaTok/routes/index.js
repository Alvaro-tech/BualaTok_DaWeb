var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/registrarUsuario', function(req, res, next) {
  res.render('registrarUsuario', {});
});

router.get('/registrarProducto', function(req, res, next) {
  res.render('registrarProducto', {});
});

router.get('/login', function(req, res, next) {
  res.render('sigIn', {});
});
router.get('/bucador', function(req, res, next) {
  res.render('buscador', {});
});
module.exports = router;
