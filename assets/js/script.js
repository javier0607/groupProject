// var searchButton = document.getElementById('search-button')

// function getApi() {
// 	var url = 'https://maps.googleapis.com/maps/api/place/details/output?parameters';

// 	fetch(url)
// .then(function (response) {
// 	return response.json();
//   })
// }


let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 26.7153, lng: 80.0534 },
    zoom: 8,
  });
}