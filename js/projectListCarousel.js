$(document).ready(function () {
    //Call owl carousel for new carousel

    var owl = $('.owl-carousel');
    owl.owlCarousel({
      nav: true,
      navigationText: ["Next", "Prev"],
      dots: false,
      loop: true,
      margin: 10,
      autoplay: true,
      autoplaySpeed: 5000,
      autoHeight: true,
      items: 1
    });

    $("body > button:nth-child(8)").click(function () {
      console.log("start button clicked.")
      owl.trigger('play.owl.autoplay', [2000])
    });
    $("body > button:nth-child(9)").click(function () {
      console.log("stop button clicked.")
      owl.trigger('stop.owl.autoplay')
    });

    
  });