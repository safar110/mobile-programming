let balance = 10000;
let correctPIN = "1234";

function checkPIN() {
  let pin = document.getElementById("pin").value;
  if (pin !== correctPIN) {
    document.getElementById("message").innerText = "Incorrect PIN";
    return false;
  }
  return true;
}

function checkBalance() {
  if (!checkPIN()) return;
  document.getElementById("message").innerText = "Balance: Rs. " + balance;
}

function withdraw() {
  if (!checkPIN()) return;
  let amount = Number(document.getElementById("amount").value);

  if (amount <= 0 || amount % 100 !== 0) {
    document.getElementById("message").innerText = "Amount must be a multiple of 100";
    return;
  }

  if (amount > balance) {
    document.getElementById("message").innerText = "Insufficient balance";
    return;
  }

  balance = balance - amount;
  document.getElementById("message").innerText = "Withdraw successful. New balance: Rs. " + balance;
}

function deposit() {
  if (!checkPIN()) return;
  let amount = Number(document.getElementById("amount").value);

  if (amount <= 0 || amount % 100 !== 0) {
    document.getElementById("message").innerText = "Amount must be a multiple of 100";
    return;
  }

  balance = balance + amount;
  document.getElementById("message").innerText = "Deposit successful. New balance: Rs. " + balance;
}