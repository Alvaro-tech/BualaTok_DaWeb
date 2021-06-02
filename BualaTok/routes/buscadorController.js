var express = require("express");

const router = express.Router();
//import {conexion} from './index'
const {Articulo} = require("../public/models/Articulo");
const { ArticuloService } = require("../services/articuloService");
var articuloService = new ArticuloService();

router.get("/buscador", async (req, res, next) => {

  var articulos = await articuloService.listarArticulosComprables(req.session.idUser);
  console.log("Estoy en en controller, acabo de cargar todos los articulos")
  console.log(articulos);
  if(articulos == "NOT_FOUND"){
    articulos = [];
    res.render('buscador', {articulos})
  } else {
    res.render('buscador', {articulos})
  }
});

router.get("/comprar/:idArt", async (req, res, next) => {
  const { idArt } = req.params;
  var idUser = req.session.idUser;

  var respuesta = await articuloService.comprarArticulo(idArt, idUser);

  if(respuesta == "CANT_BUY"){
    console.log("ERROR de busqueda")
    res.sendStatus(412);
  }else {
    console.log("Busqueda OK")
    res.sendStatus(200);
  }

});


router.post("/busqueda", async (req, res, next) =>{
  var texto = req.body.texto;
  var estado = req.body.estado;
  var precioMinimo = req.body.precioMinimo;
  var precioMaximo = req.body.precioMaximo;
  var categoria = req.body.categoria;
  var idUser = req.session.idUser;

  var articulos = await articuloService.listByFiltros(texto, estado, precioMinimo, precioMaximo, categoria, idUser);

  if(articulos == "NOT_FOUND"){
    articulos = [];
    res.render('buscador', {articulos})
  } else {
    res.render('buscador', {articulos})
  }


});

module.exports = router;
