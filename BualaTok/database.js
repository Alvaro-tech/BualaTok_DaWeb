const mysql = require("mysql"); // <- Conexión con la BBDD
// ### MySql INIT
const conexion = mysql.createConnection({
  host: "localhost",
  user: "daweb",
  password: "daweb",
  database: "daweb",
});

//### Check Connect BBDD
conexion.connect(function (error) {
    console.log('el connect de database se ejecuta');
  if (error) throw error;
});

module.exports = conexion
