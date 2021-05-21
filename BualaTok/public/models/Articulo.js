class Articulo {
    constructor(nombre, precio, descripcion, foto, fecha, categoria, estado, idUsuario) {
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.foto = foto;
    this.fecha = fecha;
    this.categoria = categoria;
    this.estado = estado;
    this.idUsuario = idUsuario;
    this.visualizaciones = 0;
    }
}

createArticulo = (nombre, precio, descripcion, foto, fecha, categoria, estado, idUsuario) => {
    try {
        return new Articulo(nombre, precio, descripcion, foto, fecha, categoria, estado, idUsuario);
    } catch (error) {
        console.log(error);
    }
}
module.exports = { createArticulo };