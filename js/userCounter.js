//Filename userCounter.js, written by David Carrie, Last Updated July 9 2023.
//Adds a counter to the page, displaying total user views
//Uses API Ninjas Counter api: https://api-ninjas.com/api/counter
const settings = {
	async: true,
	crossDomain: true,
	url: 'https://counter10.p.rapidapi.com/?COLOR=red&CLABEL=blue',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f7728a3a6dmsh09901dd415ac534p13e7dajsn93d3ad4c6953',
		'X-RapidAPI-Host': 'counter10.p.rapidapi.com'
	}
};

const counterID = "counter"
$.ajax(settings).done(function (response) {
    document.getElementById(counterID).innerHTML = response.message
	
}).fail(function (response){
	document.getElementById(counterID).innerHTML = '<p>Call to Counter Failed</p>'
});;



