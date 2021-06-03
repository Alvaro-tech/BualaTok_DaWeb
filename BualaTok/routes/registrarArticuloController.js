var express = require("express");
var multer = require("multer");
var fs = require("fs")
const router = express.Router();
var conexion = require("../database");
const {Articulo} = require("../public/models/Articulo");
const { ArticuloService } = require("../services/articuloService");
var articuloService = new ArticuloService();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/data/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

router.get('/descargarImg', function (req, res, next) {

});





router.get('/registrarArticulo', function (req, res, next) {
    res.render('registrarArticulo', {});
});

router.post("/registrarArticulo",upload.single('myFile') ,async (req, res, next) => {
    var nombre = req.body.name;
    var descripcion = req.body.descripcion;
    var precio = req.body.precio;
    var categoria = req.body.categoria;
    var estado = req.body.estado;


    console.log(req.file)
    var img = req.file;
    //var encode_image = img.toString('base64');




    var idUsuario = req.session.idUser;

    var foto = 'foto.jpg';
    var f = new Date();
    const fecha = f.getFullYear() + "-"+ (f.getMonth()+1)+ "-" +f.getDate();
    console.log("Hago el post");

    var articulo = new Articulo(nombre, precio, descripcion, img, fecha, categoria, estado, idUsuario)

    var respuesta = await articuloService.registrarArticulo(articulo);

    if(respuesta == false){
      res.redirect("/registrarArticulo");
    } else {
      res.redirect("/tusArticulos");
    }
});

module.exports = router;