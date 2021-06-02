const {Articulo} = require("../public/models/Articulo");

var conexion = require("../database");

 class ArticuloDAO {
    constructor() {}

     async get(articuloID) {
        return new Promise(resolve => {
            var sql = ('SELECT *  FROM daweb.articulo WHERE idarticulo = ?;');
            var paramet = [articuloID];
            const rows = conexion.query(
              sql,paramet,(error, results) => {
                console.log(results);
                if (results.length > 0) {
                    var articulo = new Articulo(results[0].nombre, results[0].precio, results[0].descripcion, results[0].foto, results[0].fecha, results[0].categoria, results[0].estado, results[0].idUsuario);
                        articulo.visualizaciones = results[0].visualizaciones;
                        articulo.idArticulo = results[0].idArticulo;
                        articulo.disponibilidad = results[0].disponibilidad;
                    resolve(articulo);
                } else {
                    resolve("NOT_FOUND");
                }
              }
            );
          });
        }

    async getByUser(username, enVenta = false) {
        return new Promise(resolve => {
          var sql;
          var paramet;
          if(enVenta == true){
            sql = ("SELECT * FROM daweb.articulo where idUsuario = ? AND disponibilidad = 'en venta';");
            paramet = [username];
          }else{
            sql = ('SELECT * FROM daweb.articulo where idUsuario = ?;');
            paramet = [username];
          }
          const rows = conexion.query(
            sql,paramet,(error, results) => {
                if(error) {
                    resolve("NOT_FOUND")
                }
                var lista = [];
                results.forEach(i => {
                    var articulo = new Articulo(i.nombre, i.precio, i.descripcion, i.foto, i.fecha, i.categoria, i.estado, i.idUsuario);
                    articulo.visualizaciones = i.visualizaciones;
                    articulo.idArticulo = i.idArticulo;
                    articulo.disponibilidad = i.disponibilidad;
                    lista.push(articulo);
                });
                resolve(lista); 
            }
          );
        });
      }

      async getNotByUser(idUser) {
        return new Promise(resolve => {
         var sql = ("SELECT * FROM daweb.articulo where idUsuario <> ? AND disponibilidad = ?;");
         var dispo = 'en venta'
          var paramet = [idUser, dispo];
          console.log("# . " +idUser );
          console.log("# . " +dispo );
          const rows = conexion.query(
            sql,paramet,(error, results) => {
                if(error) {
                    console.log(error)
                    resolve("NOT_FOUND")
                }
                var lista = [];
                //console.log(results)
                results.forEach(i => {
                    var articulo = new Articulo(i.nombre, i.precio, i.descripcion, i.foto, i.fecha, i.categoria, i.estado, i.idUsuario);
                    articulo.visualizaciones = i.visualizaciones;
                    articulo.idArticulo = i.idArticulo;
                    articulo.disponibilidad = i.disponibilidad;
                    lista.push(articulo);
                });
                //console.log(lista)
                resolve(lista); 
            }
          );
        });
      }

    async getID(articuloID) {
      return new Promise(resolve => {
        var sql = ('SELECT IDARTICULO FROM daweb.articulo WHERE idarticulo = ?;');
        var paramet = [articuloID];
        const rows = conexion.query(
          sql,paramet,(error, results) => {
            console.log(results);
            //console.log('SELECT CLAVE FROM daweb.usuario WHERE usuario = ? ' , [username]);
            if (results.length > 0) {
                resolve(results[0].idArticulo);
            } else {
                resolve("NOT_FOUND");
            }
          }
        );
      });
    }

    async create(articulo){
      return new Promise(resolve => {
        var sql = 'INSERT INTO daweb.articulo SET ?';
        var paramet = [articulo];
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
    
    async update(articulo){
        return new Promise(resolve => {
          var sql = 'UPDATE daweb.articulo SET ? WHERE IDARTICULO = ?';
          var paramet = [articulo, articulo.idArticulo];
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

      async getArticulosByFilter(texto, estado, precioMinimo, precioMaximo, categoria, idUser){
        return new Promise(resolve => {
            var sql = "SELECT * FROM daweb.articulo WHERE ";
            var primero = true;
          
            if(texto!=""){
              if(primero){
                sql += "nombre LIKE '%" + texto + "%' "
                primero = false;
              }
            }
          
            if(estado!="" && estado!="Cualquiera"){
              if(primero){
                sql += "estado = '" + estado + "' ";
                primero = false;
              }else{
                sql += "AND estado = '" + estado + "' ";
              }
            }
          
            if(precioMinimo!=""){
              if(primero){
                sql += "precio >= " + precioMinimo + " ";
                primero = false;
              }else{
                sql += "AND precio >= " + precioMinimo + " ";
              }
            }
          
            if(precioMaximo!=""){
              if(primero){
                sql += "precio <= " + precioMaximo + " ";
                primero = false;
              }else{
                sql += "AND precio <= " + precioMaximo + " ";
              }
            }
          
            if(categoria!="" && categoria!="Cualquiera" ){
              if(primero){
                sql += "categoria = '" + categoria + "' ";
                primero = false;
              }else{
                sql += "AND categoria = '" + categoria + "' ";
              }
            }
          
            if(primero){
              sql += "idUsuario <> '" + idUser + "' ";
              primero = false;
            }else{
              sql += "AND idUsuario <> '" + idUser + "' ";
            }
          
            console.log(sql);

            const rows = conexion.query(sql, (error, results) => {
                if(error){
                    resolve("NOT_FOUND")
                } else {
                    var lista = [];
                    results.forEach(i => {
                        var articulo = new Articulo(i.nombre, i.precio, i.descripcion, i.foto, i.fecha, i.categoria, i.estado, i.idUsuario);
                        articulo.visualizaciones = i.visualizaciones;
                        articulo.idArticulo = i.idArticulo;
                        articulo.disponibilidad = i.disponibilidad;
                        lista.push(articulo);
                    });
                    resolve(lista);  
                }
                
              });
         
        });
      }
}

module.exports.ArticuloDAO = ArticuloDAO;
