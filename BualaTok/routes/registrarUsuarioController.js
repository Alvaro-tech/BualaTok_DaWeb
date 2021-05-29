var express = require("express");

const router = express.Router();
//import {conexion} from './index'
var conexion = require("../database");
var bodyParser = require("body-parser");
//const Provincia = require("../public/models/Provincia");
const user = require("../public/models/Usuario");
//import { createUsuario } from '../public/models/Usuario';


router.get('/registrarUsuario', function (req, res, next) {
    res.render('registrarUsuario', {layout: 'noLoggued' });
});

router.post("/registrarUsuario", function (req, res, next) {
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

    var usuariobasedatos = '';
    var sql = ('SELECT USUARIO FROM daweb.usuario WHERE usuario = ?;');
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
                res.redirect('/registrarUsuario');
            } else if (usuariobasedatos == username) {
                res.redirect('/registrarUsuario');
            } else {
                var usuario = user.createUsuario(nombre, apellidos, username, password_1, credito, "Murcia", mail);
                console.log(usuario);
                var sql = ('INSERT INTO daweb.usuario SET ?');
                var paramet = [usuario];
                const rows = conexion.query(
                    sql, paramet, (error, results) => {
                        //console.log('SELECT CLAVE FROM daweb.usuario WHERE usuario = ? ' , [username]);
                    }
                );
                res.render('index', { title: username, contrasena: password_1 });
            }
        }
    );
    /*
    console.log(usuariobasedatos);

    if(password_1!=password_2){
        res.redirect('/registrarUsuario');
    }else if(usuariobasedatos==usuario){
        res.redirect('/registrarUsuario');
    }else{
        var usuario = user.createUsuario(nombre, apellidos, username, password_1, credito, "Murcia", mail);
        console.log(usuario);
        var sql = ('INSERT INTO daweb.usuario SET ?');
        var paramet = [usuario];
        const rows = conexion.query(
            sql,paramet,(error, results) => {
                //console.log('SELECT CLAVE FROM daweb.usuario WHERE usuario = ? ' , [username]);
            }
        );
        res.render('index', { title: username, contrasena: password_1});
    }*/
});


router.get("/provincia/:lat/:long", function (req, res, next) {

    

});


module.exports = router;