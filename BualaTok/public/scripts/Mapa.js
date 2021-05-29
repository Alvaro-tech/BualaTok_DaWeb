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


var map;
var markers = [];
var marker;
function initialize() {
  map = new google.maps.Map(document.getElementById("map_canvas"), {
    zoom: 16,
    center: new google.maps.LatLng(40.41874, -3.686235),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    //zoomControl: true,
    maxZoom: 19,
  });
  google.maps.event.addListener(map, "click", function (e) { //dblclick
    console.log("Click en el mapa")
    if (markers[0]) markers[0].setMap(null);
    markers = [];
    marker = new google.maps.Marker({
      position: e.latLng,
      draggable: true,
      animation: google.maps.Animation.DROP,
    });
    markers.push(marker);
    map.setCenter(new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()));
    /*map = new google.maps.Map(document.getElementById('map_canvas'),
            {
                zoom: 16,
                center: new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true,
                zoomControl: false,
                maxZoom: 16
            });*/
    marker.setMap(map);
    // if you don't do this, the map will zoom in
    event = e || window.event;
    event.stopPropagation();
    window.external.AddMarker(e.latLng.lat(), e.latLng.lng());
  });
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
