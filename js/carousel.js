//Note the code in this file is not my own, taken from https://www.javascriptfreecode.com/Carousel_Slider.htm, on Feb 1 2023. Written by @phuang

//This code is used to control a slide carousel with images

//Set initial slide to 1 and call showslides
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

//Controls which slides to show and hides others
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