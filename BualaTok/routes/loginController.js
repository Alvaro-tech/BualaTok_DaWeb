var express = require("express");

const router = express.Router();
//import {conexion} from './index'
var conexion = require("../database");
var bodyParser = require("body-parser");

router.get("/login", function (req, res, next) {
  //const sql = " INSERT INTO daweb.usuario (nombre, apellidos, usuario, clave, credito, provincia, mail) VALUES ('Jose', 'Gutierrez Fernandez', 'prueba1', 'jose123', 45, 'Murcia', 'josegu@um.es');";
  //conexion.query(sql, (error, results) => {
  //if (error) throw error;
  //});
  res.render("sigIn", {});
});

router.post("/login", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  console.log("Hago el post");

  //var sql = "SELECT CLAVE FROM daweb.usuario WHERE usuario = " + "'" + username + "'";
  var sql = ('SELECT CLAVE FROM daweb.usuario WHERE usuario = ?;');
  var paramet = [username];
  const rows = conexion.query(
    sql,paramet,(error, results) => {
      console.log(results);
      //console.log('SELECT CLAVE FROM daweb.usuario WHERE usuario = ? ' , [username]);
      if (results.length > 0) {
        var pass = results[0].CLAVE;
        if(pass==password){
            res.render('index', {title: 'Express' });
        } else{
            res.redirect('sigIn'); //redirect???
        }
      }
      res.end();
    }
  );
});
module.exports = [router];
