window.show = show;
window.intercambiar = intercambiar;
window.guardarId = guardarId;

var idArticulo;
var idArticuloPropio;

function guardarId(idArticulo){
    idArticuloPropio = idArticulo;
}

function show(idArt) {
  idArticulo = idArt;
  $('#idAlertaCompra').modal('show');

}

function intercambiarProducto(idArticulo, idArticuloPropio) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/intercambiar/" + idArticulo + "/" + idArticuloPropio);
    request.responseType = "json";
    request.onload = function () {
      if (request.status === 200) {
        resolve(request.status);
      } else {
        alert("No se ha podido cambiar el artículo")
        reject(
          Error(
            "No se ha podido procesar correctamente tu petición: " + request.statusText
          )
        );
      }
    };
    request.onerror = function () {
      reject(Error("Ha ocurrido un error."));
    };
    request.send();
  });
}

function intercambiar() {

    $('#idAlertaCompra').modal('hide');
    intercambiarProducto(idArticulo, idArticuloPropio).then((successMessage) => {   
      window.location.href = "http://localhost:3000/buscador";
    });
}