$("#overlay").show();

setTimeout(function() {
  $("#overlay").fadeOut();
  $("body").show(300);
}, 5000);
