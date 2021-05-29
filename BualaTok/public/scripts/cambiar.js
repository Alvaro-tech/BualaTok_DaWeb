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

  console.log("%%%% > " + idArt);
}

function intercambiarProducto(idArticulo, idArticuloPropio) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/intercambiar/" + idArticulo + "/" + idArticuloPropio);
    request.responseType = "json";
    request.onload = function () {
      if (request.status === 200) {
        console.log("Resuelve el 200")
        resolve(request.status);
      } else {
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
    console.log("---------------------------------------------")
    $('#idAlertaCompra').modal('hide');
    intercambiarProducto(idArticulo, idArticuloPropio).then((successMessage) => {
      // succesMessage es lo que sea que pasamos en la función resolve(...) de arriba.
      // No tiene por qué ser un string, pero si solo es un mensaje de éxito, probablemente lo sea.
      console.log("¡Sí! workeo ");   
      window.location.href = "http://localhost:3000/buscador";   
    });
}