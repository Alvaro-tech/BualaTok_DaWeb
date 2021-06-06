var express = require('express');
//const mysql = require('mysql'); // <- Conexión con la BBDD
const app1 = require('../app');
var router = express.Router();
var multer = require("multer");
var fs = require("fs")
var conexion = require("../database");
const {Articulo} = require("../public/models/Articulo");

var storage = multer.diskStorage({

  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', idUser: req.session.idUser });
});

router.post('/uploadphoto', upload.single('myImage'), (req, res) => {
  
  var img = fs.readFileSync(req.file.path);


  var sql = ('SELECT *  FROM daweb.articulo WHERE idarticulo = 47;');
            const rows = conexion.query(
              sql,(error, results) => {
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


module.exports = [router];
