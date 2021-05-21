const Estado = {
    Nuevo: 'Nuevo',
    Bueno: 'Bueno',
    Malo: 'Malo'
}

obtenerEstado = (estado) => {
    try {
        return Estado.estado;
    } catch (error) {
        console.log(error);
    }
}
module.exports = { obtenerEstado };