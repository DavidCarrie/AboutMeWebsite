//Filename weather.js, written by David Carrie, Last Updated July 9 2023.
//Contains code to generate weather information based on user locations, using WeatherAPI.com

//Set global variables.
var weatherDiv;
var x;
var loc;

//On document load get required elements and call current weather.
$(document).ready(function () {

    x = document.getElementById("demo");
    weatherDiv = document.getElementById("weather");

    getLocation(callCurrentWeather);

});

//Gets user location with callback to a weather display function.
function getLocation(myCallBack) {
    if (navigator.geolocation) {

        //Set defaults in case of being unable to get user location.
        loc = {
            lati: '53.1',
            longi: '-0.13'
        };
        //Get user location.

        navigator.geolocation.getCurrentPosition(function (position) {
            loc = {
                lati: position.coords.latitude,
                longi: position.coords.longitude
            };

            //Display user coordinates on page.
            x.innerHTML = "<p>Latitude: " + position.coords.latitude +
                "<br>Longitude: " + position.coords.longitude + "</p>";
            myCallBack();
        }, error)


    } else {
        //If geolocation not supported display to user.
        x.innerHTML = "Geolocation is not supported by this browser.";
        myCallBack();
    }
    //Displays weather

}


//Error message if geolocation request was unsuccesful.
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

//Get current weather using API.
function callCurrentWeather() {

    //Settings for Ajax call.
    const settings = {
        async: true,
        crossDomain: true,
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json?q=' + loc.lati + '%2C' + loc.longi,
        //Headers required for API call.
        headers: {
            'X-RapidAPI-Key': 'f7728a3a6dmsh09901dd415ac534p13e7dajsn93d3ad4c6953',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    //Ajax call to get current weather.
    $.ajax(settings).done(function (response) {
        displayCurrentWeather(weatherDiv, response);
    }).fail(function (response){
        weatherDiv.innerHTML = '<p>API call failed, please try again later</p>'
    });

   

}

//Displays current weather.
function displayCurrentWeather(weatherDiv, response) {
    //Build HTML to display data.
    var header = "<h2>Current Weather for: " + response.location.name + "</h2>";
    var theader = "<table class='weatherTable'><tr><th>Location</th><th>Temperature</th><th>Condition</th><th>Humidity</th><th>UV Index</th></tr>";
    var icon = response.current.condition.icon.slice(21);
    var trow = "<tr><td>" + response.location.name + "</td><td>" + response.current.temp_c + "</td><td><img src='images/" + icon + "'></td><td>"
        + response.current.humidity + "</td><td>" + response.current.uv + "</td>";

    //Insert data into webpage.
    weatherDiv.innerHTML = header + theader + trow;
}

//Get 3 day forcast using API.
function call3Day() {

    //Settings for Ajax call.
    const forecast = {
        async: true,
        crossDomain: true,
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=' + loc.lati + '%2C' + loc.longi + '&days=3',
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f7728a3a6dmsh09901dd415ac534p13e7dajsn93d3ad4c6953',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    }
    //API call to get 3 day forcast.
    $.ajax(forecast).done(function (response) {
        display3DayForcast(weatherDiv, response);
    }).fail(function (response){
        weatherDiv.innerHTML = '<p>API call failed, please try again later</p>'
    });
}

//Displays 3 day forcast.
function display3DayForcast(weatherDiv, response) {
    //Build HTML to display weather information to user.
    var icon = response.forecast.forecastday[0].day.condition.icon.slice(21);
    var header = "<h2>3 Day Forcast for: " + response.location.name + "</h2>";
    var theader = "<table class='weatherTable'><tr><th>Date</th><th>Min Temp</th><th>Max Temp</th><th>Condition</th><th>Humidity</th><th>UV Index</th></tr>";
    var trow1 = "<tr><td>" + response.forecast.forecastday[0].date + "</td><td>" + response.forecast.forecastday[0].day.maxtemp_c + "</td><td>" +
        response.forecast.forecastday[0].day.mintemp_c + "</td><td><img src='images/" + icon + "'></td><td>" + response.forecast.forecastday[0].day.avghumidity
        + "</td><td>" + response.forecast.forecastday[0].day.uv + "</td></tr>";
    var trow2 = "<tr><td>" + response.forecast.forecastday[1].date + "</td><td>" + response.forecast.forecastday[1].day.maxtemp_c + "</td><td>" +
        response.forecast.forecastday[1].day.mintemp_c + "</td><td><img src='images/" + icon + "'></td><td>" + response.forecast.forecastday[1].day.avghumidity
        + "</td><td>" + response.forecast.forecastday[1].day.uv + "</td></tr>";
    var trow3 = "<tr><td>" + response.forecast.forecastday[2].date + "</td><td>" + response.forecast.forecastday[2].day.maxtemp_c + "</td><td>" +
        response.forecast.forecastday[2].day.mintemp_c + "</td><td><img src='images/" + icon + "'></td><td>" + response.forecast.forecastday[2].day.avghumidity
        + "</td><td>" + response.forecast.forecastday[2].day.uv + "</td></tr>";

    //Insert data into webpage.
    weatherDiv.innerHTML = header + theader + trow1 + trow2 + trow3;
}

//Get hourly forcast using API.
function callHourly() {

    //Settings for Ajax call.
    const forecast = {
        async: true,
        crossDomain: true,
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=' + loc.lati + '%2C' + loc.longi + '&days=1',
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f7728a3a6dmsh09901dd415ac534p13e7dajsn93d3ad4c6953',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    }

    //API call to get hourly forcast.
    $.ajax(forecast).done(function (response) {
        displayHourly(response);
    }).fail(function (response){
        weatherDiv.innerHTML = '<p>API call failed, please try again later</p>'
    });

}

//Displays hourly forcast.
function displayHourly(response) {

    //Build html to display forcast to user.
    var header = "<h2>Hourly Forcast for: " + response.location.name + ". Date: " + response.forecast.forecastday[0].date + "</h2>";
    var theader = "<table class='weatherTable weatherHourly'><tr><th>Hour</th>";
    var trow1 = "<tr><td>Temp C</td>";
    var trow2 = "<tr><td>Condition</td>"
    var icon;

    //Generate headers for each hour.
    for (let i = 0; i <= 23; i++) {
        theader += "<th>" + i + "</th>";
    }

    //For each hour populate temperatue value and condition icon.
    for (const property in response.forecast.forecastday[0].hour) {
        icon = response.forecast.forecastday[0].hour[property].condition.icon.slice(21);
        trow1 += "<td>" + response.forecast.forecastday[0].hour[property].temp_c + "</td>";
        trow2 += "<td><img src='images/" + icon + "'></img></td>";
    }
    //End rows and display data to user.
    theader += "</tr>";
    trow1 += "</tr>";
    weatherDiv.innerHTML = header + theader + trow1 + trow2;
}

