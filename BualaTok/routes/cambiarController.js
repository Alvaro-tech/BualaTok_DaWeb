var express = require("express");
const router = express.Router();
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
  
});

router.get("/intercambiar/:idArticulo/:idArticuloPropio", async (req, res, next) => {
  const { idArticulo } = req.params;
  const { idArticuloPropio } = req.params;

  var articulo = await articuloService.getArticulo(idArticulo);
  var articuloPropio = await articuloService.getArticulo(idArticuloPropio);

  if(articuloPropio.precio>=articulo.precio){
    articuloPropio.idUsuario = articulo.idUsuario;
    articulo.idUsuario = req.session.idUser;
    

    articulo.disponibilidad = "cambiado"
    articuloPropio.disponibilidad = "cambiado"


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

});

module.exports = router;
