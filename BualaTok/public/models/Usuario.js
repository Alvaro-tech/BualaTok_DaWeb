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

createUsuario = (nombre, apellidos, usuario, clave, credito, provincia, mail) => {
    try {
        return new Usuario(nombre, apellidos, usuario, clave, credito, provincia, mail);
    } catch (error) {
        console.log(error);
    }
}
module.exports = { createUsuario };