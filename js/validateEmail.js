//Note the code in this file is not my own, taken from https://www.w3resource.com/javascript/form/email-validation.php, on Feb 6 2023. By w3resource.

//Checks if the inputText represents a valid email address
function ValidateEmail(inputText) {
    //Storeing the regular expression to check for a valid email in mainformat
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //If the regular expression matches the input text, the email is valid
    if (inputText.value.match(mailformat)) {
        alert("Valid email address!");
        document.form1.text1.focus();
        //window.open("mailto:david.carrie@gmail.com");
        return true;
    }
    else {
        //else the email is invalid
        alert("You have entered an invalid email address!");
        document.form1.text1.focus();
        return false;
    }
}