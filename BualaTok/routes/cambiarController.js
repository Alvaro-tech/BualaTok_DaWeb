var express = require("express");
const Articulo = require("../public/models/Articulo");
const router = express.Router();
//import {conexion} from './index'
var conexion = require("../database");
var bodyParser = require("body-parser");

router.get("/cambiar/:idArticulo", function (req, res, next) {
  const { idArticulo } = req.params;
  var sql = "SELECT * FROM daweb.articulo WHERE idArticulo = ?";
  var paramet = [idArticulo];
  const rows = conexion.query(sql, paramet, (error, results) => {
    var articulos = Articulo.listarArticulos(results);
    var articulo = articulos[0];

    var sql1 = "SELECT * FROM daweb.articulo where idUsuario = ?;";
    var paramet1 = [req.session.idUser];
    const rows1 = conexion.query(sql1, paramet1, (error, results) => {
      var articulosPropios = Articulo.listarArticulos(results);
      res.render("cambiar", { articulo ,articulosPropios });
    });
  });
});

module.exports = router;
