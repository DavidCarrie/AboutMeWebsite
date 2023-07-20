//Filename submitData.js, written by David Carrie, Last Updated Feb. 22 2023.
//Reads data from a input fields and writes to a file.


//Function called when user clicks submit Data and it passes validation
function submitData() {
    const userData = new feedBack();
}

//Class feedBack: gets and processes user submit data
class feedBack {
    #data;
    #userFullName;
    #userAge;
    #userEmail;
    #userGender;
    #userCountry;
    #userComments;

    //Creates instance of class 
    constructor() {

        this.#getData();
        this.#outputData();
        /* Old validation code no longer required. Uses jQeury validate instead
        if (this.#validateData()) {
            this.#outputData();
        } else {
            this.#dataError();
        }*/

    }

    //Gets data from form on page
    #getData() {
        //Get information from fields and store in variables
        this.#userFullName = document.getElementById("fullName");
        this.#userAge = document.getElementById("age");
        this.#userEmail = document.getElementById("email");
        this.#userGender = document.getElementById("gender");
        this.#userCountry = document.getElementById("country");
        this.#userComments = document.getElementById("comments");

        //Creates main data variable
        this.#data = "Full Name: " + this.#userFullName.value + '\n' +
            "Age: " + this.#userAge.value + '\n' +
            "Email: " + this.#userEmail.value + '\n' +
            "Gender: " + this.#userGender.value + '\n' +
            "Country: " + this.#userCountry.value + '\n' +
            "Comments: " + this.#userComments.value + '\n';

        //Future iterations may use a map for easier maintenance and delivery
        //Creates main data variable
        /*this.#data = new Map();
        this.#data.set("Full Name", document.getElementById("fullName").value);
        this.#data.set("Age", document.getElementById("age").value);
        this.#data.set("Email", document.getElementById("email").value);
        this.#data.set("Gender", document.getElementById("gender").value);
        this.#data.set("Country", document.getElementById("country").value);
        this.#data.set("Comments", document.getElementById("comments").value);*/
    }

   
    /* The validate and error function have been replaced with jQuery plugin validation
    //Currently just validates age 
    #validateData() {
        if (typeof this.#userAge.value != "string") {
            return false;
        }  // we only process strings!  
        return !isNaN(this.#userAge.value) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(this.#userAge.value)) // ...and ensure strings of whitespace fail
    }
    //Notifies user of invalid data
    #dataError() {
        alert("You have entered invalid data")
    }*/

    //Method to send data to storage - currently a local file. Potentially change to live data source.
    #outputData() {
        const BLOBtext = new Blob([this.#data], { type: 'text/plain' });

        //filename of data
        const sFileName = 'UserData.txt';
        //Create a link to download the file
        let link = document.createElement("a");
        link.download = sFileName;

        //If there is a current valid webkitURL 
        if (window.webkitURL != null) {
            link.href = window.webkitURL.createObjectURL(BLOBtext);
        } else {
            link.href = window.URL.createObjectURL(BLOBtext);
            link.style.display = 'none';
            document.body.appendChild(link);
        }
        //downloads file
        link.click();
    }
}

//On document load call validate plugin
$().ready(function () {
    $("#commentForm").validate({
        rules: {
            fullName: {
                required: true,
                minlength: 3
            },
            age: {
                digits: true
            },
            email: {
                required: true,
                email: true
            }

        },
        //if validatin succesful submit form
        submitHandler: function (form) {
            //console.log("In submit handler")
            submitData()
        }
    })
})