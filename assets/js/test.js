var pressed = document.getElementById("tacos")


 var searched 
 var lat
 var long
 var url = `https://floating-headland-95050.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyCOYW44XORsf-nBZKXvYwZ8VPxDIgq8X7w`


function doSomething(){
   searched = document.querySelector("#userInput").value;
   
  console.log(searched)
   getTrails(lat,long)
   
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
  getTrails(lat, long)
}

function initMap(lat, long) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: long },
    zoom: 8,
  });
}

getLocation();
        
const getTrails = (lat, long,) => {
   

  let trailUrl = `${url}&location=${lat},${long}&radius=50000&keyword=${searched}`;
console.log(trailUrl)
  var hiker = "./images/hiker.png";

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
       
       
      new google.maps.Marker({
        position: place.geometry.location,
        map,
        // icon: hiker, //If you add a custom icon you can add that here
        title: place.name,
      });
     
    });

  })
  .catch(err =>  console.log(err))
}

pressed.addEventListener("click",doSomething)
