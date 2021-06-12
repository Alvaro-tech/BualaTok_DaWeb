var express = require('express');
//const mysql = require('mysql'); // <- Conexión con la BBDD
const app1 = require('../app');
var router = express.Router();
var multer = require("multer");
var fs = require("fs")
var conexion = require("../database");
const {Articulo} = require("../public/models/Articulo");

var storage = multer.diskStorage({

  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })



/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login')
});



module.exports = [router];
