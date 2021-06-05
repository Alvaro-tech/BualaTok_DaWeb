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
  console.log(provincia);
  //var provincia = Provincia.MURCIA;
  console.log("Hago el post");

  /*if(nombre == "" || apellidos == "" || username == "" || mail == "" || credito == "" || 
        provincia == "" || password_1 == "" || password_2 == ""){
          res.redirect("/registrarUsuario");
  }*/

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

router.get("/provincia/:lat/:long", function (req, res, next) {
  console.log("Esta llegando al backend");
  const { lat } = req.params;
  const { long } = req.params;
  console.log("11111 LAT: " + lat + " LONG: " + long);

  if (lat != null && lat != "" && long != null && long != "") {
    var latitudGPS = parseFloat(lat);
    var longitudGPS = parseFloat(long);

    console.log("LAT: " + latitudGPS + " LONG: " + longitudGPS);

    var latlng = "55.397563, 10.39870099999996";
    var url =
      "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng + "&sensor=false";
    $.getJSON(url, function (data) {
      for (var i = 0; i < data.results.length; i++) {
        var adress = data.results[i].formatted_address;
        alert(adress);
      }
    });
    /*
        var request = new XMLHttpRequest();
        request.open(
          "GET","https://maps.google.com/maps/api/geocode/json?latlng=" +lalatitudGPS +"," +longitudGPS +"&sensor=true"
        );
        request.responseType = "json";
        request.onload = function () {
          if (request.status >= 200 && request.status <= 299) {
            var respuesta = JSON.parse(request.body);
            console.log(respuesta);
            resolve(request.status);
          } else {
            reject(
              Error(
                "No se ha podido procesar correctamente tu petición: " +
                  request.statusText
              )
            );
          }
        };
        request.onerror = function () {
          reject(Error("Ha ocurrido un error."));
        };
        request.send();*/
  }
});

module.exports = router;
