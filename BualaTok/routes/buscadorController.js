var express = require("express");

const router = express.Router();
const Articulo = require("../public/models/Articulo");
//import {conexion} from './index'
var conexion = require("../database");
var bodyParser = require("body-parser");

router.get("/buscador", function (req, res, next) {
  console.log("Entra a buscador");
  var sql = "SELECT * FROM daweb.articulo WHERE idUsuario <> ?";
  var paramet = [req.session.idUser];
  const rows = conexion.query(sql, paramet, (error, results) => {
    var articulos = Articulo.listarArticulos(results);
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
      articuloIDComprador = results[0].IDUSUARIO;
    }

    sql = "SELECT CREDITO FROM daweb.usuario WHERE idUsuario = ?;";
    paramet = [idUser];
    const rows1 = conexion.query(sql, paramet, (error, results) => {
      if (results.length > 0) {
        userCredito = results[0].CREDITO;
      }

      if ((articuloPrecio > userCredito)) {
        res.sendStatus(412); // PRECONDITION FAIL
      }

      var nuevoCredito = userCredito - articuloPrecio;
      sql = ('UPDATE daweb.usuario SET CREDITO = ? WHERE IDUSUARIO = ?');
      paramet = [nuevoCredito, idUser];
      const rows2 = conexion.query(
        sql, paramet, (error, results) => {
        }
      );

      sql = ('UPDATE daweb.usuario SET CREDITO = CREDITO + ? WHERE IDUSUARIO = ?');
      paramet = [articuloPrecio, articuloIDComprador];
      const rows3 = conexion.query(
        sql, paramet, (error, results) => {
        }
      );

      sql = ('DELETE FROM daweb.articulo WHERE idArticulo = ?');
      paramet = [idArt];
      const rows4 = conexion.query(
        sql, paramet, (error, results) => {
        }
      );
      res.status(200);
    });
  });
});


router.post("/busqueda", function (req, res, next) {
  var texto = req.body.texto;
  var estado = req.body.estado;
  var precioMinimo = req.body.precioMinimo;
  var precioMaximo = req.body.precioMaximo;
  var categoria = req.body.categoria;

  var sql = "SELECT * FROM daweb.articulo WHERE ";
  var primero = true;

  if(texto!=""){
    if(primero){
      sql += "nombre LIKE '%" + texto + "%' "
      primero = false;
    }
  }

  if(estado!="" && estado!="Cualquiera"){
    if(primero){
      sql += "estado = '" + estado + "' ";
      primero = false;
    }else{
      sql += "AND estado = '" + estado + "' ";
    }
  }

  if(precioMinimo!=""){
    if(primero){
      sql += "precio >= " + precioMinimo + " ";
      primero = false;
    }else{
      sql += "AND precio >= " + precioMinimo + " ";
    }
  }

  if(precioMaximo!=""){
    if(primero){
      sql += "precio <= " + precioMaximo + " ";
      primero = false;
    }else{
      sql += "AND precio <= " + precioMaximo + " ";
    }
  }

  if(categoria!="" && categoria!="Cualquiera" ){
    if(primero){
      sql += "categoria = '" + categoria + "' ";
      primero = false;
    }else{
      sql += "AND categoria = '" + categoria + "' ";
    }
  }

  if(primero){
    sql += "idUsuario <> '" + req.session.idUser + "' ";
    primero = false;
  }else{
    sql += "AND idUsuario <> '" + req.session.idUser + "' ";
  }

  console.log(sql);

  const rows = conexion.query(sql, (error, results) => {
    if(error){
    }
    //console.log(results);
    var articulos = Articulo.listarArticulos(results);
    //console.log(articulos);
    res.render("buscador", { articulos });
  });
});

module.exports = router;
