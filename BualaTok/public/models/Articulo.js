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
    this.idArticulo = 0;
    this.disponibilidad = "en venta";
    }
}

module.exports.Articulo = Articulo;