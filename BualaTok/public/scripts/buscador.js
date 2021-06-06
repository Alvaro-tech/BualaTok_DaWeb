window.show = show;
window.comprar = comprar;

var idArticulo;

function show(idArt) {
  idArticulo = idArt;
  $('#idAlertaCompra').modal('show');

}

function devolverProducto(idArt) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/comprar/" + idArt);
    request.responseType = "json";
    request.onload = function () {
      if (request.status === 200) {
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

function comprar() {
    $('#idAlertaCompra').modal('hide');
    devolverProducto(idArticulo).then((successMessage) => { 
    console.log(successMessage)
        window.location.href = "http://localhost:3000/buscador";
    });
    
}