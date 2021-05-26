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
    var categoria = req.body.categoria;
    var estado = req.body.estado;

    var idUsuario = req.session.idUser;

    var foto = 'foto.jpg';
    var f = new Date();
    const fecha = f.getFullYear() + "-"+ (f.getMonth()+1)+ "-" +f.getDate();
    console.log("Hago el post");

    var articulo = Articulo.createArticulo(nombre, precio, descripcion, foto, fecha, categoria, estado, idUsuario);
    console.log(articulo);
    var sql = ('INSERT INTO daweb.articulo SET ?');
    var paramet = [articulo];
    const rows = conexion.query(
        sql, paramet, (error, results) => {
            console.log(error);
        }
    );
    res.render('index', { title: nombre, contrasena: precio });
});

module.exports = router;