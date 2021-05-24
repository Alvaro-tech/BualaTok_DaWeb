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

listarArticulos = (results) => {
    try {
        var lista = [];

        results.forEach(i => {
            var articulo = new Articulo(i.nombre, i.precio, i.descripcion, i.foto, i.fecha, i.categoria, i.estado, i.idUsuario);
            articulo.visualizaciones = i.visualizaciones;
            lista.push(articulo);
        });
        return lista;
    } catch (error) {
        console.log(error);
    }
}
module.exports = { createArticulo, listarArticulos };