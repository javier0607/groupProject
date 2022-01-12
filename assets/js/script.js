

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 26.7153, lng: 80.0534 },
    zoom: 8,
  });
}