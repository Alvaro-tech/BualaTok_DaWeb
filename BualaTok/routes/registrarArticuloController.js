var express = require("express");

const router = express.Router();
//import {conexion} from './index'
var conexion = require("../database");
//const Provincia = require("../public/models/Provincia");
const Articulo = require("../public/models/Articulo");
const Categoria = require("../public/models/Categoria");
const Estado = require("../public/models/Estado");

router.get('/registrarArticulo', function (req, res, next) {
    res.render('registrarArticulo', {});
});

router.post("/registrarArticulo", function (req, res, next) {
    var nombre = req.body.name;
    var descripcion = req.body.descripcion;
    var precio = req.body.precio;
    var categoria = Categoria.obtenerCategoria(req.body.categoria);
    var estado = Estado.obtenerEstado(req.body.radiobuttonset);

   

    //var foto = 'foto.jpg';
    var f = new Date();
    const fecha = f.getDate() + "-"+ (f.getMonth()+1)+ "-" +f.getFullYear();
    var foto = req.body.foto;
    console.log("Hago el post");

    var articulo = Articulo.createArticulo(nombre, descripcion, precio, categoria, estado, foto, fecha);
    console.log(articulo);
    var sql = ('INSERT INTO daweb.articulo SET ?');
    var paramet = [articulo];
    const rows = conexion.query(
        sql, paramet, (error, results) => {
        }
    );
    res.render('index', { title: nombre, contrasena: precio });
});
/*
function readFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var filePreview = document.createElement('img');
            filePreview.id = 'file-preview';
            //e.target.result contents the base64 data from the image uploaded
            filePreview.src = e.target.result;
            console.log(e.target.result);

            var previewZone = document.getElementById('file-preview-zone');
            previewZone.appendChild(filePreview);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

var foto = document.getElementById('');
fileUpload.onchange = function (e) {
readFile(e.srcElement);
}
*/


module.exports = router;