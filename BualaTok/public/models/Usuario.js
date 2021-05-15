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
export function createUsuario(nombre, apellidos, usuario, clave, credito, provincia, mail) {
    var user = new Usuario(nombre, apellidos, usuario, clave, credito, provincia, mail);
    return user;
}