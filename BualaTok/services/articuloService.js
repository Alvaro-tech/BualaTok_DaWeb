const {ArticuloDAO} = require("../DAO/articuloDAO");
var articuloDao = new ArticuloDAO();
const {UserDAO} = require("../DAO/userDAO");
var userDao = new UserDAO();

 class ArticuloService {
  constructor() {}
  async getUsuario(username) {
    var usuario = await usuarioDao.get(username);
    if(usuario == "NOT_FOUND"){
      return "NOT_FOUND";
    } else{
      return usuario;
    }
  }
  //Login OK -> ID usuario
  //Login BAD -> ERROR
  async listarArticulos(idUsuario) {
    var listArticulos = await articuloDao.getByUser(idUsuario);
    return listArticulos;
  }

  async listarArticulosComprables(idUsuario) {
    var listArticulos = await articuloDao.getNotByUser(idUsuario);
    return listArticulos;
  }

  async registrarArticulo(articulo){
    var registro = await articuloDao.create(articulo);
    return registro;
  }

  async comprarArticulo(idArti, idUser){
      console.log ("ArticuloService comprar idArti:" +idArti );
      console.log ("ArticuloService comprar idUser:" +idUser );
      var articulo = await articuloDao.get(idArti);
      console.log ("ArticuloService comprar articulo:" +articulo );
      var usuarioLoggued = await userDao.getByID(idUser);
      var usuarioVendedor = await userDao.getByID(articulo.idUsuario);


      console.log ("ArticuloService dinero del comprado" +usuarioLoggued.credito );
      console.log ("ArticuloService precio" +articulo.precio );

      if(usuarioLoggued.credito >= articulo.precio){
        usuarioLoggued.credito -= articulo.precio;
        usuarioVendedor += articulo.precio;

        articulo.disponibilidad = "comprado";
        articulo.idUsuario = idUser;

        await userDao.update(usuarioLoggued);
        await userDao.update(usuarioVendedor);
        await articuloDao.update(articulo);

        return("OK");

      } else {
          return ("CANT_BUY");
      }
  }

  async listByFiltros(texto, estado, precioMinimo, precioMaximo, categoria, idUser){
    var articulos = await articuloDao.getArticulosByFilter(texto, estado, precioMinimo, precioMaximo, categoria, idUser);
        if(articulos == "NOT_FOUND"){
            return ("CANT_BUY");
        } else {
            return articulos;
        }
    }
 }


module.exports.ArticuloService = ArticuloService;