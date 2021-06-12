var express = require("express");

const router = express.Router();


const { UserService } = require("../services/userService");
var userService = new UserService();

router.get("/login", function (req, res, next) {
  res.render("sigIn", {layout: 'noLoggued' });
});

router.post("/login", async (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;


  var respuesta = await userService.isUsuarioLoggued(username,password )

  if(respuesta == "BAD_LOG") {
    res.redirect('/login');
  } else {
    req.session.idUser = respuesta;
    res.redirect('/tusArticulos');
  }

  
});
module.exports = [router];
