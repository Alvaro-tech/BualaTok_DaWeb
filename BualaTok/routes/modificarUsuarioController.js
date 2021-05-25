var express = require("express");

const router = express.Router();
//import {conexion} from './index'
var conexion = require("../database");
var bodyParser = require("body-parser");
//const Provincia = require("../public/models/Provincia");
const user = require("../public/models/Usuario");
//import { createUsuario } from '../public/models/Usuario';


router.get('/modificarUsuario', function(req, res, next) {
    var sql = ('SELECT * FROM daweb.usuario WHERE IDUSUARIO = 1;');
    const rows = conexion.query(
        sql,(error, results) => {
            var usuarios = user.listarUsuarios(results);
            var usuario = usuarios[0];
            console.log(usuario);
            res.render('modificarUsuario', {usuario});
    })   
});

router.post("/modificarUsuario", function (req, res, next) {
    var nombre = req.body.name;
    var apellidos = req.body.apellidos;
    var username = req.body.username;
    var password_1 = req.body.pass1;
    var password_2 = req.body.pass2;
    var mail = req.body.mail;
    var credito = req.body.credito;
    //var provincia = Provincia.MURCIA;
    console.log("Hago el post");

    var usuariobasedatos = '';
    var sql = ('SELECT * FROM daweb.usuario WHERE usuario = ?;');
    var paramet = [username];
    const rows = conexion.query(
        sql, paramet, (error, results) => {
            console.log(results);
            //console.log('SELECT USUARIO FROM daweb.usuario WHERE usuario = ? ' , [username]);
            if (results.length > 0) {
                usuariobasedatos = results[0].USUARIO;
            }
            console.log(usuariobasedatos);

            if (password_1 != password_2) {
                res.redirect('/modificarUsuario');
            } else if (usuariobasedatos == username && results[0].IDUSUARIO != "1") {
                res.redirect('/modificarUsuario');
            } else {
                var usuario = user.createUsuario(nombre, apellidos, username, password_1, credito, "Murcia", mail);
                console.log(usuario);
                var sql = ('UPDATE daweb.usuario SET ? WHERE IDUSUARIO = 1');
                var paramet = [usuario];
                const rows = conexion.query(
                    sql, paramet, (error, results) => {
                        console.log(results);
                    }
                );

                res.redirect('tusArticulos');
            }
        }
    );
});

module.exports = router;