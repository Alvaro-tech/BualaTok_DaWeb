var express = require("express");

const router = express.Router();
const Articulo = require("../public/models/Articulo");
//import {conexion} from './index'
var conexion = require("../database");
var bodyParser = require("body-parser");



router.get('/tusArticulos', function(req, res, next) {
    var sql = ('SELECT * FROM daweb.articulo where idUsuario = ?;');
    var paramet = [req.session.idUser];
    const rows = conexion.query(
        sql,paramet,(error, results) => {
            var articulos = Articulo.listarArticulos(results);
            res.render('tusArticulos', {articulos});
    })   
});

module.exports = router;