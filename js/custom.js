$("#overlay").show();

$(".gallery-grid").hide();

setTimeout(function() {
  $("#overlay").fadeOut();
  $("body").show(500);
  $(".gallery-grid").show(500);
}, 10000);
