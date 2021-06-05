window.validateLogin = validateLogin;
window.validateRegistroUsuario = validateRegistroUsuario;
window.validateRegistroArticulo = validateRegistroArticulo;

function validateLogin(){
    var x = document.forms["loginform"]["username"].value;
    if (x == "") {
        alert("El usuario no puede estar vacio");
        return false;
    }

    var y = document.forms["loginform"]["password"].value;
    if (y == "") {
        alert("La contraseña no puede estar vacía");
        return false;
    }
}

function validateRegistroUsuario(){
    console.log("entra a validar")
    var x;
    x = document.forms["my-form"]["name"].value;
    if (x == "") {
        alert("El nombre no puede estar vacio");
        return false;
    }

    x = document.forms["my-form"]["apellidos"].value;
    if (x == "") {
        alert("La etiqueta apellidos no puede estar vacía");
        return false;
    }

    x = document.forms["my-form"]["username"].value;
    if (x == "") {
        alert("El username no puede estar vacío");
        return false;
    }

    x = document.forms["my-form"]["pass1"].value;
    if (x == "") {
        alert("La contraseña no puede estar vacía");
        return false;
    }

    var y = document.forms["my-form"]["pass2"].value;
    if (y == "") {
        alert("La confirmación de la contraseña no puede estar vacía");
        return false;
    }

    if(x != y){
        alert("Las contraseñas deben ser identicas");
        return false;
    }

    var y = document.forms["my-form"]["mail"].value;
    if (y == "") {
        alert("El mail no puede estar vacío");
        return false;
    }

}

function validateRegistroArticulo(){
    console.log("entra a validar")
    var x;
    x = document.forms["my-form"]["name"].value;
    if (x == "") {
        alert("El nombre no puede estar vacio");
        return false;
    }

    x = document.forms["my-form"]["descripcion"].value;
    if (x == "") {
        alert("La descripcion no puede estar vacía");
        return false;
    }

    x = document.forms["my-form"]["precio"].value;
    if (x <= 0) {
        alert("El producto no puede ser gratis");
        return false;
    }

    x = document.forms["my-form"]["estado"].value;
    if (x == "") {
        alert("El estado no puede estar vacío");
        return false;
    }

    var fileInput = document.getElementById("myImage");
    var file = fileInput.files[0];
    if (file == "" || file == undefined) {
        alert("Debe añadir una foto");
        return false;
    }
}