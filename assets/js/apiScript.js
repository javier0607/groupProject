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
    console.log(userInputed)

    //document.getElementById("map").innerHTML ="";
  
    //initMap(lat, long)
    deleteMarkers();
   
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


// Testing

/// Weather 



const app = 
{
  init: () => {
    document
      .getElementById('btnGet')
      .addEventListener('click', app.fetchWeather);
    document
      .getElementById('btnCurrent')
      .addEventListener('click', app.getLocation);
  },
  fetchWeather: (ev) => {
    //use the values from latitude and longitude to fetch the weather
    let lat = document.getElementById('latitude').value;
    let lon = document.getElementById('longitude').value;
    let key = '9c0f79ae9abec4622cc5f41d84921f11';
    let lang = 'en';
    let units = 'metric';
    let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
    
    //fetch the weather
    fetch(url)
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((data) => {
        app.showWeather(data);
      })
      .catch(console.err);
  },
  getLocation: (ev) => {
    let opts = {
      enableHighAccuracy: true,
      timeout: 1000 * 10, //10 seconds
      maximumAge: 1000 * 60 * 5, //5 minutes
    };
    navigator.geolocation.getCurrentPosition(app.ftw, app.wtf, opts);
  },
  ftw: (position) => {
    //got position
    document.getElementById('latitude').value =
      position.coords.latitude.toFixed(2);
    document.getElementById('longitude').value =
      position.coords.longitude.toFixed(2);
  },
  wtf: (err) => {
    //geolocation failed
    console.error(err);
  },
  showWeather: (resp) => {
    console.log(resp);
    let row = document.querySelector('.weather.row');
    //clear out the old weather and add the new
    // row.innerHTML = '';
    row.innerHTML = resp.daily
      .map((day, idx) => {
        if (idx <= 0) {
          let dt = new Date(day.dt * 1000); //timestamp * 1000
          let sr = new Date(day.sunrise * 1000).toTimeString();
          let ss = new Date(day.sunset * 1000).toTimeString();
          return `<div class="col">
              <div class="card">
              <h5 class="card-title p-2">${dt.toDateString()}</h5>
                <img
                  src="http://openweathermap.org/img/wn/${
                    day.weather[0].icon
                  }@4x.png"
                  class="card-img-top"
                  alt="${day.weather[0].description}"
                />
                <div class="card-body">
                  <h3 class="card-title">${day.weather[0].main}</h3>
                  <p class="card-text">High ${day.temp.max}&deg;C Low ${
            day.temp.min
          }&deg;C</p>
                  <p class="card-text">High Feels like ${
                    day.feels_like.day
                  }&deg;C</p>
                  <p class="card-text">Pressure ${day.pressure}mb</p>
                  <p class="card-text">Humidity ${day.humidity}%</p>
                  <p class="card-text">UV Index ${day.uvi}</p>
                  <p class="card-text">Precipitation ${day.pop * 100}%</p>
                  <p class="card-text">Dewpoint ${day.dew_point}</p>
                  <p class="card-text">Wind ${day.wind_speed}m/s, ${
            day.wind_deg
          }&deg;</p>
                  <p class="card-text">Sunrise ${sr}</p>
                  <p class="card-text">Sunset ${ss}</p>
                </div>
              </div>
            </div>
          </div>`;
        }
      })
      .join(' ');
  },
}


app.init();
