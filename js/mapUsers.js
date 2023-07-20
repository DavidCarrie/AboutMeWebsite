//Filename mapUser.js, Written by David Carrie, Last modified July 9 2023
//Displays a map and processes data from an external file to display markers.


//Get div location to place Users coordinates when requested
var CoordsDiv = document.getElementById("ShowCoords");

//URL where other user locations are stored
var dataUrl = 'http://localhost:3000/JSON/userData.json'

//Create leaflet map
const map = L.map('map').setView([43.81, -79.32], 7);


//On document load, get users location data and place map
$(document).ready(function () {

    //For error handling
    var failP = document.getElementById("error");

    //Catches errors in file retrieval
    function errorHandle(e) {
        failP.innerHTML = "Warning: Unable to load other user locations"
    }

    //XML request to get user data
    const req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.addEventListener('error', errorHandle);
    req.responseType = 'json';
    req.open("GET", dataUrl);

    //After attempting to get file, if 404 is encountered warn user
    req.onloadend = function () {
        if (req.status == 404) {
            failP.innerHTML = "Warning: Unable to load other user locations"
        }
    }
    req.send();
    console.log("test")



    //Add layer to map canvas, showing geographic features
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

});

//Runs after xmlhttp request is succesful, processes user data
function reqListener() {
    //For each user, create map marker
    this.response.forEach(createMarker)
}

//Gets current user's location from browser
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        CoordsDiv.innerHTML = "Geolocation is not supported by this browser.";
    }

}

//Displays current user's coordinates on page and creates map marker
function showPosition(position) {
    CoordsDiv.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    map.panTo([position.coords.latitude, position.coords.longitude])

    createMarker(position.coords)
}

//Creates a marker with given coordinates and places it on the map
function createMarker(current) {
    var circle = L.circle([current.latitude, current.longitude], {
        color: 'green',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 2000
    }).addTo(map);
}

