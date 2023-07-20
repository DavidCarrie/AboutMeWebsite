//Code to graph website data. Both project specific data and user demographics
//Written by: David Carrie, last modified: Feb 20, 2023.

//Function used to draw a new chart

function drawChart(xVal, yVal, barColor, text) {

    //create new chart with required parameters
    infoChart = new Chart("myChart", {
        type: "bar",
        data: {
            labels: xVal,
            datasets: [{
                backgroundColor: barColor,
                data: yVal
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: text
            }
        }
    });

}



//Displays data on chart for user to view
function displayData() {
    //Depending on currently selected view, draw appropriate chart
    switch (currentView) {
        case 0:
            drawChart(countryData[0], countryData[1], countryData[2], countryData[3]);
            break;
        case 1:
            drawChart(projectData[0], projectData[1], projectData[2], projectData[3]);
            break;
        case 2:
            drawChart(ageData[0], ageData[1], ageData[2], ageData[3]);
            break;
    }
}

//Current implementation requires user uploaded data
function uploadData() {
    console.log("File uploaded");
}


//Future updates will process data from a file
function processData() {

}

//Changes currently viewed chart 
function userControls() {
    //Increase counter representing current view
    currentView++;
    //If beyond total amount of graphs to view, restart at beggining
    if (currentView >= totalViews) {
        currentView = 0;
    }
    //Destroy old chart 
    infoChart.destroy();

    //Process data (Currently unavaiable)
    //processData();

    //Change graph to display new data
    displayData();

}

//Start of Main Code
//Hard coded values for unit-5. Plan to change to processing live data
var currentView = 0;
var totalViews = 3;

var xValCountry = ["Italy", "France", "Canada", "USA", "Argentina"];
var yValCountry = [55, 49, 44, 24, 15];
var barColCountry = ["red", "green", "blue", "orange", "brown"];
var textCountry = ["User Demographics - Country"];
var countryData = [xValCountry, yValCountry, barColCountry, textCountry];

var xValAge = ["0-19", "20-30", "30-50", "50-70", "70+"];
var yValAge = [0, 13, 21, 4, 1];
var barColAge = ["red", "green", "blue", "orange", "brown"];
var textAge = ["User Demographics - Age"];
var ageData = [xValAge, yValAge, barColAge, textAge];


var xValProjects = ["Snake Game", ["Project 2"], ["Project 3"], ["Project 4"]];
var yValProjects = [34, 16, 7, 2];
var barColProjects = ["red", "green", "blue", "orange"];
var textProjects = ["Project Viewed"];
var projectData = [xValProjects, yValProjects, barColProjects, textProjects];


//Initialize Chart
var infoChart;

//Process Data for initial chart display. (Future update)
//processData();

//Draw initial chart to display
drawChart(xValCountry, yValCountry, barColCountry, textCountry);

//Used for getting user input file from web page
const input = document.querySelector('input');

//Add even listener for when files are added
input.addEventListener('change', uploadData);