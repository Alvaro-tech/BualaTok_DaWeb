
window.guardarImagen = guardarImagen;
window.onload = function() {

    var fileDisplayArea = document.getElementById('fotoArti');fotoArti //fileDisplayArea
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

                fileDisplayArea.appendChild(img).style="height: 320 px; width: 270px; ";
                
                
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
