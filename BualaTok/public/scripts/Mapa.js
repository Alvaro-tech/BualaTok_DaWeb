const Provincia = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']

var coordenadas = new Map();

//coordenadas = {
  coordenadas.set('Alava', "42.836741 -2.813313"); 
  coordenadas.set('Albacete', "38.993140608826195 -1.8586686463586226");
  coordenadas.set('Alicante', "38.359838154088024 -0.47939100219357544");
  coordenadas.set('Almería', "36.844626565851435 -2.451033731069842"); 
  coordenadas.set('Asturias', "43.32099214640745 -5.8965304597251045");
  coordenadas.set('Avila', "40.65649409698063 -4.685627068138754");
  coordenadas.set('Badajoz', "38.878840287361584 -6.977208331311715");
  coordenadas.set('Barcelona', "41.39966210179483 2.152885494010329");
  coordenadas.set('Burgos', "42.343486284287756 -3.704993283133506");
  coordenadas.set('Cáceres', "39.47573910574317 -6.37321031040294");
  coordenadas.set('Cádiz', "36.52741745382697 -6.2883042288655915");
  coordenadas.set('Cantabria', "43.40249297731314 -4.121700969130751");
  coordenadas.set('Castellón', "39.98877336420589 -0.04977975552445467");
  coordenadas.set('Ciudad Real', "38.98670960003686 -3.9291338607615627");
  coordenadas.set('Córdoba', "37.89302937798221 -4.78276926872404");
  coordenadas.set('La Coruña', "43.3618688086671 -8.413027565047692");
  coordenadas.set('Cuenca', "40.07044431820673 -2.1390128189620055");
  coordenadas.set('Gerona', "41.98637236000354 2.81677837185103");
  coordenadas.set('Granada', "37.18477050329439 -3.6044902638784113");
  coordenadas.set('Guadalajara', "40.63349156307685 -3.177035021641035");
  coordenadas.set('Guipúzcoa', "43.14737011892694 -2.2214509265319107");
  coordenadas.set('Huelva', "37.26950054907862 -6.940119649878882");
  coordenadas.set('Huesca', "42.137592672735096 -0.4073933867396404");
  coordenadas.set('Islas Baleares', "39.63740619911305, 2.8998542071413316");
  coordenadas.set('Jaén', "37.7781257318144 -3.793689409978059");
  coordenadas.set('León', "42.60499417508279 -5.577992251681654");
  coordenadas.set('Lérida', "41.61904679152795 0.6246553993243446");
  coordenadas.set('Lugo', "43.01767543949985 -7.561478825111094");
  coordenadas.set('Madrid', "40.441527963677416 -3.6685593405336387");
  coordenadas.set('Málaga', "36.71357624345757 -4.44273802999603");
  coordenadas.set('Murcia', "37.989051050717755 -1.1287208343849566");
  coordenadas.set('Navarra', "42.792753794265195 -1.6561390875873576");
  coordenadas.set('Orense', "42.33943981306589 -7.868921409524066");
  coordenadas.set('Palencia', "42.01181216150823 -4.526610665205178"),
  coordenadas.set('Las Palmas', "28.116891981750545 -15.44030718532962");
  coordenadas.set('Pontevedra', "42.43208570113062 -8.641148231685401");
  coordenadas.set('La Rioja', "42.40209282344989 -2.486275550372991");
  coordenadas.set('Salamanca', "40.9625945992892 -5.672130483427725");
  coordenadas.set('Segovia', "40.94306417951456 -4.111429563737255");
  coordenadas.set('Sevilla', "37.39335474130714 -5.9739433480031146");
  coordenadas.set('Soria', "41.76808042688289 -2.474235865659781");
  coordenadas.set('Tarragona', "41.12140291693016 1.239269536165442");
  coordenadas.set('Santa Cruz de Tenerife', "28.454646566798164 -16.29165669211079");
  coordenadas.set('Teruel', "40.34428869241441 -1.108947245352437");
  coordenadas.set('Toledo' , "39.864032931551975 -4.032734533293701");
  coordenadas.set('Valencia', "39.4554331089727 -0.374566709087611");
  coordenadas.set('Valladolid', "41.64931757753865 -4.731916661982098");
  coordenadas.set('Vizcaya', "43.26823792285507 -2.9831592646962686");
  coordenadas.set('Zamora', "41.50547972058436 -5.743935374077931");
  coordenadas.set('Zaragoza', "41.648992311304895 -0.9052811383953432");
//};

/*let map ;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}*/
window.initialize = initialize;
window.centerMap =  centerMap;
window.centerMapDefault =  centerMapDefault;
window.clearMap =  clearMap;
window.addMarker =  addMarker;
window.cargar = cargar;
window.ajustarMapa = ajustarMapa;

var map;
var markers = [];
var marker;


const geocoder = new google.maps.Geocoder();
const infowindow = new google.maps.InfoWindow()

function ajustarMapa(){
  var select = document.getElementById("provincia");
  var provincia = select.options[select.selectedIndex].text;


  var coordenada = coordenadas.get(provincia);


  var coor = coordenada.split(" ");

  var lat  = coor[0];
  
  var lng = coor[1];

  if (markers[0]) {
    markers[0].setMap(null)
  };
  markers = [];

  var latLng = new google.maps.LatLng(lat, lng);
  marker = new google.maps.Marker({
    position: latLng,
    draggable: true,
  });

  markers.push(marker);
  map.setCenter(new google.maps.LatLng(latLng.lat(), latLng.lng()));
  marker.setMap(map);
}

function cargar() {
  var select = document.getElementById("provincia"); //Seleccionamos el select
  
  for(var i=0; i < Provincia.length; i++){ 
      var option = document.createElement("option"); //Creamos la opcion
      option.innerHTML = Provincia[i]; //Metemos el texto en la opción
      select.appendChild(option); //Metemos la opción en el select
  }
}

function initialize() { //provinciaSelected
  cargar();


  var select = document.getElementById("provincia");

  var provincia  = select.options[select.selectedIndex].text;

  var coordenada = coordenadas.get(provincia);

  var coor = coordenada.split(" ");

  var lat  = coor[0];
  
  var lng = coor[1];

  var latLng = new google.maps.LatLng(lat, lng);
  marker = new google.maps.Marker({
    position: latLng,
    draggable: true,
  });

  markers.push(marker)

  map = new google.maps.Map(document.getElementById("map_canvas"), {
    zoom: 5,
    center: new google.maps.LatLng(latLng.lat(), latLng.lng()),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    maxZoom: 19,
  });
  marker.setMap(map);
}

function centerMap(Lat, Long) {
  var latLng = new google.maps.LatLng(Lat, Long);
  map.center = latLng;
}

function centerMapDefault() {
  map.setCenter(new google.maps.LatLng(40.41874, -3.686235));
}

function addMarker(Lat, Long) {
  if (markers[0]) markers[0].setMap(null);
  markers = [];

  var latLng = new google.maps.LatLng(Lat, Long);
  marker = new google.maps.Marker({
    position: latLng,
    draggable: true,
  });
  markers.push(marker);
  map.setCenter(new google.maps.LatLng(latLng.lat(), latLng.lng()));
  marker.setMap(map);
}

function clearMap() {
  if (markers[0]) markers[0].setMap(null);
  markers = [];
}

