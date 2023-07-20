var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);
let funcID
    $(document).ready(function () {

      
      for (let j=1; j<=3; j++){
        for(let i = 1; i <= 5; i++){
          funcID = "#p" + j + "-" + i;
          $(funcID).click(function (){
            starRating(funcID)
            console.log("Attempted to create on click function with " + funcID);
          });
        }
        
      }
    });
  

    function starRating(idClicked) {
      let id = "#p" + idClicked.charAt(1) + "-" + idClicked.charAt(3);
      let starClass = ".p" + idClicked.charAt(1);

      $(starClass).css("color", "black");
      console.log("Attempted to make all stars black in: " + starClass);

      for (i = idClicked.charAt(3); i >= 0; i--) {
        $(id).css("color", "yellow");
        id = "#p" + idClicked.charAt(1) + "-" + i;
        
      }
      console.log("Attempted to appropriate stars yellow in " + id);

    }