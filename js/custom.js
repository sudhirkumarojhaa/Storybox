$("#overlay").show();
setTimeout(function() {
  $("#overlay").fadeOut();
  $("body").show(500);
}, 15000);


var aText = new Array(
  "Sometimes ","you should just ",
  "sit back and relax",
  "Maybe someday ","it will all make sense..",
);
var iSpeed = 150; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

function typewriter() {
  sContents = ' ';
  iRow = Math.max(0, iIndex - iScrollAt);
  var destination = document.getElementById("typedtext");

  while (iRow < iIndex) {
    sContents += aText[iRow++] + '<br />';
  }
  destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "|";
  if (iTextPos++ == iArrLength) {
    iTextPos = 0;
    iIndex++;
    if (iIndex != aText.length) {
      iArrLength = aText[iIndex].length;
      setTimeout("typewriter()", 300);
    }
  } else {
    setTimeout("typewriter()", iSpeed);
  }
}
typewriter();
