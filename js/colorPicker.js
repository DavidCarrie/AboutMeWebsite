//Filename colorPicker.js, written by David Carrie, Last Updated June 14 2023.
//Contains code for color picker, changes menu or background color based on button clicked

//Initial code was taken from https://jqueryui.com/slider/#colorpicker and modified for my use.

//Wait until doucment is loaded then proceed
$(function () {
    //Represents current mode selected
    let buttonSelected = 0;

    //Add click events to buttons
    document.getElementById("backgroundColor").addEventListener("click", setMode0);
    document.getElementById("menuColor").addEventListener("click", setMode1);
    //Get required dom elements
    const menuItems = document.querySelectorAll(".mainNav > li");
    const active = document.querySelector(".mainNav .active");

    //Sets sliders to change background color
    function setMode0() {
      buttonSelected = 0;
    }

    //Sets sliders to change menu colors
    function setMode1() {
      buttonSelected = 1;
    }

    //Create hex variable from numbers
    function hexFromRGB(r, g, b) {
      var hex = [
        r.toString(16),
        g.toString(16),
        b.toString(16)
      ];
      $.each(hex, function (nr, val) {
        if (val.length === 1) {
          hex[nr] = '0' + val;
        }
      });
      return hex.join('').toUpperCase();
    }

    //Update respective css when slider is changed
    function refreshColors() {
      var red = $('#red').slider('value'),
        green = $('#green').slider('value'),
        blue = $('#blue').slider('value'),
        hex = hexFromRGB(red, green, blue);
      //inverted hex for active link
      hexInv = hexFromRGB(255 - red, 255 - green, 255 - blue);
      console.log(typeof(red));

      //Logic for selecting which elements to change when buttons are clicked
      if (buttonSelected == 0) {
        //change background
        $('body').css('background-color', '#' + hex); 
        console.log("Background changing");
      } else {
        //change menu
        active.style.backgroundColor = '#' + hexInv;
        menuItems[0].style.backgroundColor = '#' + hex;
        menuItems[1].style.backgroundColor = '#' + hex;
      }

    }
    //Create 3 sliders in respective divs
    $('#red, #green, #blue').slider({
        //Set slider properties
      orientation: 'horizontal',
      range: 'min',
      max: 255,
      slide: refreshColors
    });
    //Sets initial slider values
    $('#red').slider('value', 173);
    $('#green').slider('value', 216);
    $('#blue').slider('value', 236);
  });