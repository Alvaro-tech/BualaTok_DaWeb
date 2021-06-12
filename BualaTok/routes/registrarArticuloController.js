var express = require("express");
var multer = require("multer");
const router = express.Router();
const {Articulo} = require("../public/models/Articulo");
const { ArticuloService } = require("../services/articuloService");
var articuloService = new ArticuloService();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/data/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + ".png")
  }
})
 
var upload = multer({ storage: storage })





router.get('/registrarArticulo', function (req, res, next) {
    res.render('registrarArticulo', {});
});

router.post("/registrarArticulo",upload.single('myImage') ,async (req, res, next) => {
    var nombre = req.body.name;
    var descripcion = req.body.descripcion;
    var precio = req.body.precio;
    var categoria = req.body.categoria;
    var estado = req.body.estado;
    var rutaF = req.file.filename;

    var idUsuario = req.session.idUser;

    var f = new Date();
    const fecha = f.getFullYear() + "-"+ (f.getMonth()+1)+ "-" +f.getDate();

    var articulo = new Articulo(nombre, precio, descripcion, rutaF, fecha, categoria, estado, idUsuario)

    var respuesta = await articuloService.registrarArticulo(articulo);

    if(respuesta == false){
      res.redirect("/registrarArticulo");
    } else {
      res.redirect("/tusArticulos");
    }
});

module.exports = router;