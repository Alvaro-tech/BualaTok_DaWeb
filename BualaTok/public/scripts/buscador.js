//import {conexion} from './index'
//const Provincia = require("../public/models/Provincia");
//import { createUsuario } from '../public/models/Usuario';
/*
document.getElementById('btn_Comprar').addEventListener('click', function(e) {
    console.log('button was clicked');
});
*/

window.show = show;

function show(idArt) {
  console.log("%%%% > " + idArt);

//TODO: ALERTA
  
  devolverProducto(idArt).then((successMessage) => {
    // succesMessage es lo que sea que pasamos en la función resolve(...) de arriba.
    // No tiene por qué ser un string, pero si solo es un mensaje de éxito, probablemente lo sea.
    console.log("¡Sí! workeo ");
  });
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

/*
let devolverProducto = new Promise((resolve, reject) => {
    // Llamamos a resolve(...) cuando lo que estabamos haciendo finaliza con éxito, y reject(...) cuando falla.
    // En este ejemplo, usamos setTimeout(...) para simular código asíncrono.
    // En la vida real, probablemente uses algo como XHR o una API HTML5.
    setTimeout(function(){
      resolve("¡Éxito!"); // ¡Todo salió bien!
    }, 250);
  });
  
  miPrimeraPromise.then((successMessage) => {
    // succesMessage es lo que sea que pasamos en la función resolve(...) de arriba.
    // No tiene por qué ser un string, pero si solo es un mensaje de éxito, probablemente lo sea.
    console.log("¡Sí! " + successMessage);
  });*/
