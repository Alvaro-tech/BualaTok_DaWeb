class Articulo {
    constructor(nombre, descripcion, precio, categoria, estado, foto, fecha) {
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.foto = foto;
    this.fecha = fecha;
    this.categoria = categoria;
    this.estado = estado;
    this.visualizaciones = 0;
    }
}

createArticulo = (nombre, descripcion, precio, categoria, estado, foto, fecha) => {
    try {
        return new Articulo(nombre, descripcion, precio, categoria, estado, foto, fecha);
    } catch (error) {
        console.log(error);
    }
}
module.exports = { createArticulo };