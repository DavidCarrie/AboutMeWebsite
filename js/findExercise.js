//Filename findExercise.js, written by David Carrie, Last Updated July 09 2023.
//Makes API calls to get exercise information based on user input.


//Uses an API to search for exercises based on user input
function exerciseSearch() {

    //Get required inputs
    let name = document.getElementById("ename").value
    let type = document.getElementById("etype").value
    let muscle = document.getElementById("muscle").value
    let difficulty = document.getElementById("difficulty").value

    //If fields are not empty add parameter formatting
    if (name != "") {
        name = "name=" + name + "&"
    }
    if (type != "") {
        type = "type=" + type + "&"
    }
    if (muscle != "") {
        muscle = "muscle=" + muscle + "&"
    }
    if (difficulty != "") {
        difficulty = "difficulty=" + difficulty
    }

    //create variable with all parameters
    var options = name + type + muscle + difficulty
    //If last character is & remove it from url
    if (options[options.length - 1] == "&") {
        options = options.substring(0, options.length - 1)
    }
    
    //Settings for Ajax call
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?' + options,
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f7728a3a6dmsh09901dd415ac534p13e7dajsn93d3ad4c6953',
            'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
        }
    };

     //Get Div where the table will be placed
     let exerciseDiv = document.getElementById("exerciseTable");
     exerciseDiv.innerHTML = "";
     let errorP = document.getElementById("error");

    //Ajax call to get exercise data
    $.ajax(settings).done(function (response) {

        //Create map to generate colors for different exercise types
        const arr = [{ key: 'cardio', value: "blue" }, { key: 'olympic_weightlifting', value: "black" },
        { key: 'plyometrics', value: "purple" }, { key: 'powerlifting', value: "brown" }, { key: 'strength', value: "red" },
        { key: 'stretching', value: "green" }, { key: 'strongman', value: "orange" }]


        const typeMap = new Map(arr.map((obj)=> [obj.key, obj.value]));

       
        // Create the table element
        let table = document.createElement("table");
        table.className = "weatherTable"
        
        // Get table headers from JSon Keys
        let hd = Object.keys(response[0]);

        // Create the table header and table row element
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");

        // Loop through the column names and create headers for table
        hd.forEach((elem) => {
            let th = document.createElement("th");
            //Capitilize Header
            let first = elem.charAt(0).toUpperCase();
            elem = first.concat("", elem.substring(1))
            th.innerText = elem;
            //Append header to row 
            tr.appendChild(th); 
        });


        //Append header row to table
        thead.appendChild(tr); 
        table.append(tr) 

        //Loop through response data and generate a row for each element
        response.forEach((elem) => {
            let tr = document.createElement("tr");

            // Get the values of the current object being processed
            let vals = Object.values(elem);

            //For each entry create a td element and populate with data
            vals.forEach((elem, index) => {
                // Create table data element and set value from vals
                let td = document.createElement("td");
                td.innerText = elem; 

                //Set color based on value
                if (index == 4) {
                    if (elem == "beginner")
                        td.style.color = "green"
                    else if (elem == "intermediate") {
                        td.style.color = "purple"
                    }
                    else
                        td.style.color = "red"
                } else if(index == 1) {
                    td.style.color = typeMap.get(elem)
                }
                //Append data to rows
                tr.appendChild(td); 
            });
            //Append rows to table
            table.appendChild(tr); 
        });
        //Add table to document
        exerciseDiv.appendChild(table) 
    }).fail(function (response){
        errorP.innerHTML = '<p>API call failed, please try again later</p>'
    });
}


