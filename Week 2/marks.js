function calculate() {
  var m1 = Number(document.getElementById("m1").value);
  var m2 = Number(document.getElementById("m2").value);
  var m3 = Number(document.getElementById("m3").value);
  var m4 = Number(document.getElementById("m4").value);
  var m5 = Number(document.getElementById("m5").value);
  var m6 = Number(document.getElementById("m6").value);
  var m7 = Number(document.getElementById("m7").value);
  var m8 = Number(document.getElementById("m8").value);

  var total = m1 + m2 + m3 + m4 + m5 + m6 + m7 + m8;

  var result = "";
  var color = "green";

  if (total > 600) {
    result = "Distinction";
    color = "green";
  } else if (total < 300) {
    result = "Fail";
    color = "red";
  } else {
    result = "Pass";
    color = "green";
  }

  document.getElementById("output").innerHTML =
    "Total: " + total + " / 800 - <span style='color:" + color + "'>" + result + "</span>";
}