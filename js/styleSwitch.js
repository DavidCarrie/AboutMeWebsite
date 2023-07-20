//File name styleSwitch.js, Written by David Carrie, Last modified July 10 20203
//On selected anchors retireves and applies stylesheet

$(document).ready(function () {
    $("#styleOptions > li > a").click(function () {
      $("link").attr("href", $(this).attr("rel"));
    })
  });