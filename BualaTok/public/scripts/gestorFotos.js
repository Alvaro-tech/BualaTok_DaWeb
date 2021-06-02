window.guardarImagen = guardarImagen;
window.cambiarImagenGuardada  = cambiarImagenGuardada;


var fotoGuardada;

function guardarImagen(){
$('#file-input').trigger('click');

}

function cambiarImagenGuardada(){
    console.log("######################################################## cambiar imagenGuardada")
   var fotoEnMem  =  document.getElementById("file-input");
   document.getElementById("fotoArti").src =fotoEnMem;
}