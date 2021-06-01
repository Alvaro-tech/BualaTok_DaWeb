const e = require("express");
var express = require("express");

const router = express.Router();
const Articulo = require("../public/models/Articulo");

const { ArticuloService } = require("../services/articuloService");
var articuloService = new ArticuloService();


router.get('/tusArticulos', async(req, res, next) => {

    var articulos = await articuloService.listarArticulos(req.session.idUser);

    if(articulos == "NOT_FOUND"){
        articulos = [];
        res.render('tusArticulos', {articulos})
    } else {
        res.render('tusArticulos', {articulos})
    }
     
});

module.exports = router;

