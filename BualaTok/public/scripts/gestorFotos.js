
window.guardarImagen = guardarImagen;
window.onload = function() {

    console.log("Se usa el onload")
    var fileDisplayArea = document.getElementById('fileDisplayArea');
    var fileInput = document.getElementById("myImage");

    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var imageType = /image.*/;

        if (file.type.match(imageType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
                fileDisplayArea.innerHTML = "";

                var img = new Image();
                img.src = reader.result;


                //var myFile = new File([img], "NoMeMareesLaPerdiz.png", {type: "text/image; charset=ISO-8859-1"});
                //saveAs(myFile)
            

                fileDisplayArea.appendChild(img);
            }

            reader.readAsDataURL(file);	
        } else {
            fileDisplayArea.innerHTML = "File not supported!"
        }
    });

}

function guardarImagen(){
    $('#myImage').trigger('click');
    
}
