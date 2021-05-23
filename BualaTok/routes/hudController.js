var express = require("express");

const router = express.Router();
//import {conexion} from './index'
var conexion = require("../database");
var bodyParser = require("body-parser");

router.get("/hud", function (req, res, next) {
    //const sql = " INSERT INTO daweb.usuario (nombre, apellidos, usuario, clave, credito, provincia, mail) VALUES ('Jose', 'Gutierrez Fernandez', 'prueba1', 'jose123', 45, 'Murcia', 'josegu@um.es');";
    //conexion.query(sql, (error, results) => {
    //if (error) throw error;
    //});
    res.render("hud", {});
  });

module.exports = router;