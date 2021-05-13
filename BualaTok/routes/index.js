var express = require('express');
const mysql = require('mysql'); // <- Conexión con la BBDD
const app = require('../app');
var router = express.Router();   


// ### MySql INIT
const conexion = mysql.createConnection(
  {
  host:'localhost:3306',
  user:'root',
  password:'',
  database:'daweb'
  });

  //### Check Connect BBDD
  conexion.connect(function (error){
    if (error)
    console.log('Problemas de conexion con mysql');
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
  const sql = " INSERT INTO daweb.usuario (nombre, apellidos, usuario, clave, credito, provincia, mail) VALUES ('Jose', 'Gutierrez Fernandez', 'josegu', 'jose123', 45, 'Murcia', 'josegu@um.es');";
  conexion.query(sql, (error, results) => {
    if (error) throw error;
  });
  res.render('sigIn', {});
});
router.get('/bucador', function(req, res, next) {
  res.render('buscador', {});
});
module.exports = router;
