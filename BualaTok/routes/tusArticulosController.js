var express = require("express");

const router = express.Router();
const Articulo = require("../public/models/Articulo");
//import {conexion} from './index'
var conexion = require("../database");
var bodyParser = require("body-parser");



router.get('/tusArticulos', function(req, res, next) {
    var sql = ('SELECT * FROM daweb.articulo');
    const rows = conexion.query(
        sql,(error, results) => {
            console.log(results)
            var articulos = Articulo.listarArticulos(results);
            console.log(articulos)
            res.render('tusArticulos', {articulos});
    })   
});

module.exports = router;