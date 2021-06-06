var express = require("express");

const router = express.Router();
const { Usuario } = require("../public/models/Usuario");
const { Provincia } = require("../public/models/Provincia");
const { UserService } = require("../services/userService");
var userService = new UserService();

router.get("/registrarUsuario", function (req, res, next) {

  res.render("registrarUsuario", { layout: "noLoggued", Provincia });
});

router.post("/registrarUsuario", async (req, res, next) => {
  var nombre = req.body.name;
  var apellidos = req.body.apellidos;
  var username = req.body.username;
  var password_1 = req.body.pass1;
  var password_2 = req.body.pass2;
  var mail = req.body.mail;
  var credito = req.body.credito;
  var provincia = req.body.provincia;


  if(password_1 != password_2){
    res.redirect("/registrarUsuario");
  }

  var usuario = new Usuario(nombre, apellidos, username, password_1, credito, provincia, mail);
  var respuesta = await userService.registrarUsuario(usuario);
  if(respuesta == false){
    res.redirect("/registrarUsuario");
  } else {
    res.redirect("/login");
  }
});


module.exports = router;
