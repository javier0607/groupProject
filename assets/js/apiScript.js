// Searches for the button with the ID Searching
var pressed = document.getElementById("searching")

// Global Variables to be able to use later
var userInputed = "";
var lat
var long
var url = `https://floating-headland-95050.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyCOYW44XORsf-nBZKXvYwZ8VPxDIgq8X7w`

// Creates a empty a array named markers
let markers = [];

// What hapopens when the button is clicked 
function buttonClicked() {

    // Looks too see what the user wrote down and stores it.
    userInputed = document.querySelector("#userInput").value;
    //document.getElementById("map").innerHTML ="";
  
    //initMap(lat, long)
    deleteMarkers();
    console.log(userInputed)
    getTrails(lat, long)
  
  }

  let map;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  lat = position.coords.latitude
  long = position.coords.longitude
  console.log(lat, long);
  initMap(lat, long)
  //getTrails(lat, long)
}

function initMap(lat, long) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: long },
    zoom: 8,
  });
}

getLocation();

const getTrails = (lat, long,) => {


  let trailUrl = `${url}&location=${lat},${long}&radius=50000&keyword=${userInputed}`;
  console.log(trailUrl)


  fetch(trailUrl, {
    method: 'GET',
    dataType: 'json',
    headers: {}
  })

    .then(response => response.json())
    .then(data => {

      google.maps.event.trigger(map, 'resize');
      console.log(data)



      //map over this data and create markers on the map
      data.results.forEach(place => {
        console.log(data)
        
        const marker = new google.maps.Marker({
          position: place.geometry.location,
          map,
          // icon: hiker, //If you add a custom icon you can add that here
          title: place.name,
          
        });
        markers.push(marker)

      });

    })
    .catch(err => console.log(err))
}

function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function hideMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
// function showMarkers() {
//   setMapOnAll(map);
// }

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  hideMarkers();
  markers = [];
}


// Is listening to see when the button is clicked 
pressed.addEventListener("click", buttonClicked)

  