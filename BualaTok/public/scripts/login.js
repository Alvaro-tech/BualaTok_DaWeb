import { hola } from './mySQLController.js';

document.getElementById('myButton').addEventListener('click', function(e) {
    console.log('button was clicked');
    console.log(hola('hola'));
    
});
  
  