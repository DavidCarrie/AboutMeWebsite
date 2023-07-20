//Filename hobbiesAPI.js, written by David Carrie, Last modified July 9 2023
//Gets 5 random hobbies from API and creates list of them in document


//Uses API ninja hobbies 

//Setting for ajax call
const settings = {
    async: true,
    crossDomain: true,
    //url only replies with "competitive" hobbies
    url: 'https://hobbies-by-api-ninjas.p.rapidapi.com/v1/hobbies?category=competition',
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'f7728a3a6dmsh09901dd415ac534p13e7dajsn93d3ad4c6953',
        'X-RapidAPI-Host': 'hobbies-by-api-ninjas.p.rapidapi.com'
    }
};

//ID of element that will recieve list
eleID = "hobbyList"
var ul = document.getElementById(eleID);

//Generate 5 random hobbies
for (let i = 0; i < 5; i++) {
    let li = document.createElement("li");
    let a = document.createElement("a");

    //API request using settings
    $.ajax(settings).done(function (response) {
        
        a.title = "link"
        a.href = response.link
        //Ensure first letter is capitalized
        let hobby = response.hobby[0].toUpperCase() + response.hobby.substring(1)

        //Make new list item and append hobby name and link
        ul.appendChild(li)
        li.appendChild(document.createTextNode(hobby + " "))
        li.appendChild(a)
        a.appendChild(document.createTextNode(": " + response.link))
        
    }).fail(function (response){
        ul.appendChild(li)
        li.innerHTML = 'API call failed, please try again later'
        
    });
}
