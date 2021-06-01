const {UserDAO} = require("../DAO/userDAO");
var usuarioDao = new UserDAO();

 class UserService {
  constructor() {}
  getUsuario(username, password) {
    var usuario = usuarioDao.get(username);
    return usuario;
  }
  //Login OK -> ID usuario
  //Login BAD -> ERROR
  async isUsuarioLoggued(username, password) {
    var usuario = await usuarioDao.get(username)
    var IdUser = await usuarioDao.getID(username);

    console.log('Debe resolverse post selects')
    if (usuario.clave == password) {
      return IdUser;
    } else {
        return "BAD_LOG"
    }
  }
}

module.exports.UserService = UserService;
