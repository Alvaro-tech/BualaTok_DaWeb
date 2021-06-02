var express = require("express");
const router = express.Router();
//import {conexion} from './index'
const {Articulo} = require("../public/models/Articulo");
const { ArticuloService } = require("../services/articuloService");
var articuloService = new ArticuloService();

router.get("/cambiar/:idArticulo", async (req, res, next) => {
  const { idArticulo } = req.params;
  var articulo = await articuloService.getArticulo(idArticulo);
  var articulosPropios = await articuloService.listarArticulos(req.session.idUser, true);

  if(articulo == "NOT_FOUND"){
    res.redirect('/buscador')
  } else{
    res.render("cambiar", { articulo ,articulosPropios });
  }

  /*
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
  */
});

router.get("/intercambiar/:idArticulo/:idArticuloPropio", async (req, res, next) => {
  const { idArticulo } = req.params;
  const { idArticuloPropio } = req.params;

  var articulo = await articuloService.getArticulo(idArticulo);
  var articuloPropio = await articuloService.getArticulo(idArticuloPropio);

  if(articuloPropio.precio>=articulo.precio){
    articuloPropio.idUsuario = articulo.idUsuario;
    articulo.idUsuario = req.session.idUser;
    
    console.log("****" + articuloPropio.precio);
    console.log("****" + articulo.precio);

    articulo.disponibilidad = "cambiado"
    articuloPropio.disponibilidad = "cambiado"

    console.log("****" + articuloPropio.disponibilidad);

    var respuesta1 = await articuloService.actualizar(articulo);
    var respuesta2 = await articuloService.actualizar(articuloPropio);

    if((respuesta1 == false) || (respuesta2== false)){
      res.sendStatus(412);
    }else{
      res.sendStatus(200);
    }
  } else{
    res.sendStatus(412);
  }

  /*
  const { idArticulo } = req.params;
  const { idArticuloPropio } = req.params;

    console.log(",.,,.,.,.,. " + " " +  idArticulo + " " + idArticuloPropio);

  var sql = "SELECT PRECIO FROM daweb.articulo WHERE idArticulo = ?;";
  var paramet = [idArticulo];
  const rows = conexion.query(sql, paramet, (error, results) => {
    if (results.length > 0) {
      articuloPrecio = results[0].PRECIO;
    }

    sql = "SELECT PRECIO FROM daweb.articulo WHERE idArticulo = ?;";
    paramet = [idArticuloPropio];
    const rows1 = conexion.query(sql, paramet, (error, results) => {
      if (results.length > 0) {
        articuloPropioPrecio = results[0].PRECIO;
      }

      if(articuloPropioPrecio>=articuloPrecio){
        sql = ('DELETE FROM daweb.articulo WHERE idArticulo = ?');
        paramet = [idArticulo];
        const rows2 = conexion.query(
          sql, paramet, (error, results) => {
            sql = ('DELETE FROM daweb.articulo WHERE idArticulo = ?');
            paramet = [idArticuloPropio];
            const rows3 = conexion.query(
              sql, paramet, (error, results) => {
                  if(error) {res.sendStatus(412); 
                } else {
                    res.sendStatus(200);
                }
              }
            );
            
          }
        );

        
      } else {
        res.sendStatus(412);
      }
      
    })
  })
  console.log("************************")
  */
});

module.exports = router;
