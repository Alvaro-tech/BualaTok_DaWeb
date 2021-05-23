var express = require('express');
//const mysql = require('mysql'); // <- Conexión con la BBDD
const app1 = require('../app');
var router = express.Router();

// ### MySql INIT
/*
const conexion = mysql.createConnection(
  {
  host:'localhost',
  user:'daweb',
  password:'daweb',
  database:'daweb'
  })

  //### Check Connect BBDD
  conexion.connect(function (error){
    if (error)
    throw error;
  });*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*router.get('/registrarUsuario', function(req, res, next) {
  res.render('registrarUsuario', {});
});

router.get('/registrarProducto', function(req, res, next) {
  res.render('registrarProducto', {});
});
*/

router.get('/buscador', function(req, res, next) {
  res.render('buscador', {});
});

/*
// ### POST methods ###
router.post('/submit-login', (req, res) => {
  //const username = req.body.username
  console.log("Estoy haciendo el submit en el  index");
  //loginController.sumbitLogin();
  res.render('sigIn', {});
  //res.end()
  
});*/

module.exports = [router];
