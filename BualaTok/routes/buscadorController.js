var express = require("express");

const router = express.Router();
const Articulo = require("../public/models/Articulo");
//import {conexion} from './index'
var conexion = require("../database");
var bodyParser = require("body-parser");

router.get("/buscador", function (req, res, next) {
  var sql = "SELECT * FROM daweb.articulo";
  const rows = conexion.query(sql, (error, results) => {
    console.log(results);
    var articulos = Articulo.listarArticulos(results);
    console.log(articulos);
    res.render("buscador", { articulos });
  });
});

router.get("/comprar/:idArt", function (req, res, next) {
  const { idArt } = req.params;
  var idUser = req.session.idUser;
  var sql = "SELECT PRECIO, IDUSUARIO FROM daweb.articulo WHERE idArticulo = ?;";
  var paramet = [idArt];
  const rows = conexion.query(sql, paramet, (error, results) => {
    if (results.length > 0) {
      articuloPrecio = results[0].PRECIO;
      articuloIDComprador= results[0].IDUSUARIO;
    }

    sql = "SELECT CREDITO FROM daweb.usuario WHERE idUsuario = ?;";
    paramet = [idUser];
    const rows1 = conexion.query(sql, paramet, (error, results) => {
      if (results.length > 0) {
        userCredito = results[0].CREDITO;
      }

      if((articuloPrecio > userCredito )){
        res.sendStatus(412); // PRECONDITION FAIL
      }

      var nuevoCredito = userCredito - articuloPrecio;
      sql = ('UPDATE daweb.usuario SET CREDITO = ? WHERE IDUSUARIO = ?');
      paramet = [nuevoCredito, idUser];
     const rows2 = conexion.query(
         sql, paramet, (error, results) => {
             console.log(results);
         }
     );

     sql = ('UPDATE daweb.usuario SET CREDITO = CREDITO + ? WHERE IDUSUARIO = ?');
     paramet = [articuloPrecio, articuloIDComprador];
    const rows2 = conexion.query(
        sql, paramet, (error, results) => {
            console.log(results);
        }
    );

    sql = ('DELETE FROM daweb.articulo WHERE idArticulo = ?');
     paramet = [idArt];
    const rows2 = conexion.query(
        sql, paramet, (error, results) => {
            console.log(results);
        }
    );

    res.sendStatus(200); 

    });
  });
  //Localizar usuarios > comprador el id: req.session.idUser
});

module.exports = router;
