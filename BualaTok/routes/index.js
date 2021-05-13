var express = require('express');
const mysql = require('mysql'); // <- Conexión con la BBDD
const app = require('../app');
var router = express.Router();   


// ### MySql INIT
const conexion = mysql.createConnection(
  {
  host:'localhost',
  user:'daweb',
  password:'daweb',
  database:'daweb'
  });

  //### Check Connect BBDD
  conexion.connect(function (error){
    if (error)
    throw error;
    });




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
  const sql = " INSERT INTO daweb.usuario (nombre, apellidos, usuario, clave, credito, provincia, mail) VALUES ('Jose', 'Gutierrez Fernandez', 'albertocrt', 'jose123', 45, 'Murcia', 'josegu@um.es');";
  conexion.query(sql, (error, results) => {
    if (error) throw error;
  });
  res.render('sigIn', {});
});
router.get('/bucador', function(req, res, next) {
  res.render('buscador', {});
});
module.exports = router;
