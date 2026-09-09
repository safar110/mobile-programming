function calculateSum(){
 let number1 = Number(document.getElementById("num1").value);
 let number2 = Number(document.getElementById("num2").value);
 let sum = number1 + number2;
 document.getElementById("result").innerHTML = sum;
}
