const {UserDAO} = require("../DAO/userDAO");
var usuarioDao = new UserDAO();

 class UserService {
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
  async isUsuarioLoggued(username, password) {
    var usuario = await usuarioDao.get(username);
    var IdUser = await usuarioDao.getID(username);

    console.log('Debe resolverse post selects')
    if (usuario.clave == password) {
      return IdUser;
    } else {
        return "BAD_LOG"
    }
  }

  async registrarUsuario(usuario){
    var user = await this.getUsuario(usuario.usuario);
    console.log("usuario en servicio" + user);
    if(user == "NOT_FOUND") {
      var registro = await usuarioDao.create(usuario);
      return registro;
    }else{
      return false;
    }
  }
}

module.exports.UserService = UserService;
