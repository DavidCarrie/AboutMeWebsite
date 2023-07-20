//Note the code in this file is not my own, taken from https://www.javascriptfreecode.com/Carousel_Slider.htm, on Feb 1 2023. Written by @phuang

//Tihs code is used to control a slide carousel with images
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    
    let i;
    //Create/assign needed variables for carousel
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    let captionText = document.getElementById("caption");
    //If current slide > max: return slideshow to image 1
    if (n > slides.length) { 
        slideIndex = 1 
    }
    //If current slide < 1: display last image
    if (n < 1) { 
        slideIndex = slides.length 
    }
    //Set all slide styles to "none"
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    //If any dots were previsouly set to " active", replace with empty string
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    //Configure carousel properly display captions, and styles. and thumbnail for current image.
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    captionText.innerHTML = dots[slideIndex - 1].alt;
}

//Old Html code used for carousel hidden here
/*
<!-- Code from  https://www.w3schools.com/howto/howto_js_slideshow_gallery.asp on Feb 3 2023, credit to W3 schools!, for unit 3-->
  <!-- Image carousel used to display pictures of projects-->
  <!-- Container for the image gallery -->
  <div class="container">

    <!-- Full-width images with number text -->
    <!-- Note all images were from Pixabay, attribution is not required-->
    <div class="mySlides">
      <div class="numbertext">1 / 4</div>
      <!-- Image by Monoar Rahman Rony from Pixabay https://pixabay.com/photos/laptop-workstation-browsing-tablet-1483974/ -->
      <img src="images/projects/laptop.jpg" style="width:100%" alt="Laptop">
    </div>

    <div class="mySlides">
      <div class="numbertext">2 / 4</div>
      <!-- Image by Alexander Fox | PaNet Fox from Pixabay https://pixabay.com/photos/raspberry-pi-pi-computer-4980917/ -->
      <img src="images/projects/raspberry-pi.jpg" style="width:100%" alt="Raspberry Pi">
    </div>

    <div class="mySlides">
      <div class="numbertext">3 / 4</div>
      <!-- Image by Thor_Deichmann from Pixabay https://pixabay.com/illustrations/speaker-wireless-internet-iot-2371550/ -->
      <img src="images/projects/speaker.jpg" style="width:100%" alt="Speaker">
    </div>

    <div class="mySlides">
      <div class="numbertext">4 / 4</div>
      <!-- Image by denispixels from Pixabay https://pixabay.com/photos/sensor-electronics-cables-6848526/ -->
      <img src="images/projects/sensor.jpg" style="width:100%" alt="Sensor">
    </div>

    <!-- Next and previous buttons -->
    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>

    <!-- Image text -->
    <div class="caption-container">
      <p id="caption"></p>
    </div>

    <!-- Thumbnail images -->
    <div class="row">
      <div class="column">
        <img class="demo cursor" src="images/projects/laptop.jpg" style="width:100%" onclick="currentSlide(1)"
          alt="Laptop">
      </div>
      <div class="column">
        <img class="demo cursor" src="images/projects/raspberry-pi.jpg" style="width:100%" onclick="currentSlide(2)"
          alt="Raspberry Pi">
      </div>
      <div class="column">
        <img class="demo cursor" src="images/projects/speaker.jpg" style="width:100%" onclick="currentSlide(3)"
          alt="Speaker">
      </div>
      <div class="column">
        <img class="demo cursor" src="images/projects/sensor.jpg" style="width:100%" onclick="currentSlide(4)"
          alt="Sensor">
      </div>
    </div>
  </div>
  */