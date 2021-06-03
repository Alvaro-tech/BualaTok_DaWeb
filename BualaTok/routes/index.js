var express = require('express');
//const mysql = require('mysql'); // <- Conexión con la BBDD
const app1 = require('../app');
var router = express.Router();
var multer = require("multer");
var fs = require("fs")
var conexion = require("../database");
const {Articulo} = require("../public/models/Articulo");

var storage = multer.diskStorage({
  /*destination: function (req, file, cb) {
    cb(null, './public/data/uploads/')
  },*/
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

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
  res.render('index', { title: 'Express', idUser: req.session.idUser });
});

router.post('/uploadphoto', upload.single('myImage'), (req, res) => {
  
  var img = fs.readFileSync(req.file.path);

  console.log(img);

  var sql = ('SELECT *  FROM daweb.articulo WHERE idarticulo = 47;');
            const rows = conexion.query(
              sql,(error, results) => {
                console.log(results);
                if (results.length > 0) {
                    var articulo = new Articulo(results[0].nombre, results[0].precio, results[0].descripcion, results[0].foto, results[0].fecha, results[0].categoria, results[0].estado, results[0].idUsuario);
                        articulo.visualizaciones = results[0].visualizaciones;
                        articulo.idArticulo = results[0].idArticulo;
                        articulo.disponibilidad = results[0].disponibilidad;
                        articulo.foto = img;
                        sql = 'UPDATE daweb.articulo SET ? WHERE IDARTICULO = ?';
                        paramet = [articulo, articulo.idArticulo];
                        const rows1 = conexion.query(sql, paramet, (error, results) => {
                        })
                }
              })

  

  res.redirect('/')
 
})

/*router.get('/registrarUsuario', function(req, res, next) {
  res.render('registrarUsuario', {});
});

router.get('/registrarProducto', function(req, res, next) {
  res.render('registrarProducto', {});
});
*/

/*router.get('/buscador', function(req, res, next) {
  res.render('buscador', {});
});*/

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
