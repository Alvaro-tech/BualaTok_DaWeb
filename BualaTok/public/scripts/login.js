import { hola } from './mySQLController.js';
import { createUsuario } from '../models/Usuario.js';

document.getElementById('myButton').addEventListener('click', function(e) {
    console.log('button was clicked');
    console.log(hola('hola'));
    var user = createUsuario('asadssd','','', ' ', '', '', '');
    console.log(user);
});
  
  