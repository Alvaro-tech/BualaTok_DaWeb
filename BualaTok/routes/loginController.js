var express = require("express");

const router = express.Router();
//import {conexion} from './index'
var conexion = require("../database");
var bodyParser = require("body-parser");

const { UserService } = require("../services/userService");
var userService = new UserService();

router.get("/login", function (req, res, next) {
  //const sql = " INSERT INTO daweb.usuario (nombre, apellidos, usuario, clave, credito, provincia, mail) VALUES ('Jose', 'Gutierrez Fernandez', 'prueba1', 'jose123', 45, 'Murcia', 'josegu@um.es');";
  //conexion.query(sql, (error, results) => {
  //if (error) throw error;
  //});
  res.render("sigIn", {layout: 'noLoggued' });
});

router.post("/login", async (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  console.log(req.session.idUser);

  console.log("Hago el post");

  var respuesta = await userService.isUsuarioLoggued(username,password )

  if(respuesta == "BAD_LOG") {
    res.redirect('/login');
  } else {
    req.session.idUser = respuesta;
    res.redirect('/tusArticulos');
  }

  //var sql = "SELECT CLAVE FROM daweb.usuario WHERE usuario = " + "'" + username + "'";
  
});
module.exports = [router];
