 class Usuario {
    constructor(nombre, apellidos, usuario, clave, credito, provincia, mail) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.usuario = usuario;
    this.clave = clave;
    this.credito = credito;
    this.provincia = provincia;
    this.mail = mail;
    }
}

module.exports.Usuario = Usuario;
