const {ArticuloDAO} = require("../DAO/articuloDAO");
var articuloDao = new ArticuloDAO();
const {UserDAO} = require("../DAO/userDAO");
var userDao = new UserDAO();

 class ArticuloService {
  constructor() {}
  async getArticulo(idArticulo){
    var articulo = await articuloDao.get(idArticulo);
    if(articulo == "NOT_FOUND"){
      return "NOT_FOUND";
    } else{
      return articulo;
    }
  }
  //Login OK -> ID usuario
  //Login BAD -> ERROR
  async listarArticulos(idUsuario, enVenta = false) {
    var listArticulos = await articuloDao.getByUser(idUsuario, enVenta);
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
      var articulo = await articuloDao.get(idArti);
      var usuarioLoggued = await userDao.getByID(idUser);
      var usuarioVendedor = await userDao.getByID(articulo.idUsuario);

      if(usuarioLoggued.credito >= articulo.precio){
        usuarioLoggued.credito -= articulo.precio;
        usuarioVendedor.credito += articulo.precio;

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
  
  async actualizar(articulo){
    var respuesta = await articuloDao.update(articulo);
    if(respuesta == false){
      return false;
    }else{
      return true;
    }
  }
}

module.exports.ArticuloService = ArticuloService;