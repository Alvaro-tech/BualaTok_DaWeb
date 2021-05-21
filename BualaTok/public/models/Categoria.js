const Categoria = {
    Hogar: 'Hogar',
    Electronica: 'Electronica',
    Videojuegos: 'Videojuegos',
    Automoviles: 'Automoviles'
}

obtenerCategoria = (categoria) => {
    try {
        return Categoria.categoria;
    } catch (error) {
        console.log(error);
    }
}
module.exports = { obtenerCategoria };