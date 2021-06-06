const {Usuario} = require("../public/models/Usuario");

var conexion = require("../database");

 class UserDAO {
    constructor() {}

     async get(username) {
      return new Promise(resolve => {
        var sql = ('SELECT * FROM daweb.usuario WHERE usuario = ?;');
        var paramet = [username];
        const rows = conexion.query(
          sql,paramet,(error, results) => {
            if (results.length > 0) {
                var usuario = new Usuario(results[0].nombre, results[0].apellidos, results[0].usuario, results[0].clave, results[0].credito, results[0].provincia, results[0].mail)
                resolve(usuario);
            } else {
              resolve("NOT_FOUND");
            }
          }
        );
      });
    }

    async getByID(idUser) {
      return new Promise(resolve => {
        var sql = ('SELECT * FROM daweb.usuario WHERE idUsuario = ?;');
        var paramet = [idUser];
        const rows = conexion.query(
          sql,paramet,(error, results) => {
            if (results.length > 0) {
                var usuario = new Usuario(results[0].nombre, results[0].apellidos, results[0].usuario, results[0].clave, results[0].credito, results[0].provincia, results[0].mail)
                resolve(usuario);
            } else {
              resolve("NOT_FOUND");
            }
          }
        );
      });
    }

    async getID(username) {
      return new Promise(resolve => {
        var sql = ('SELECT IDUSUARIO FROM daweb.usuario WHERE usuario = ?;');
        var paramet = [username];
        const rows = conexion.query(
          sql,paramet,(error, results) => {
            if (results.length > 0) {
                resolve(results[0].IDUSUARIO);
            } else {
              resolve("NOT_FOUND");
            }
          }
        );
      });
    }

    async create(usuario){
      return new Promise(resolve => {
        var sql = "INSERT INTO daweb.usuario SET ?";
        var paramet = [usuario];
        const rows = conexion.query(sql, paramet, (error, results) => {
          if(error){
            resolve(false);
          }else{
            resolve(true);
          }
        });
      });
    }

    async update(usuario){
      return new Promise(resolve => {
        var sql = 'UPDATE daweb.usuario SET ? WHERE usuario = ?';
        var paramet = [usuario, usuario.usuario];
        const rows = conexion.query(sql, paramet, (error, results) => {
          if(error){
              console.log(error);
            resolve(false);
          }else{
            resolve(true);
          }
        });
      });
    }
    
}

module.exports.UserDAO = UserDAO;
