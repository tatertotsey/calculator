const currentOp = document.getElementById("currentOp"); //screen
const lastOp = document.getElementById("lastOp"); //above curent op
const nums = document.querySelectorAll("[data-num]");
const ops = document.querySelectorAll("[data-op]");
const deletebtn = document.getElementById("delete-btn");
const clearbtn = document.getElementById("clear-btn");
const equalButton = document.getElementById("equals");
const pointButton = document.getElementById("point");

let operand1 = "";
let operand2 = "";
let currentOperation = null;
let lastOpEqual = false;

//evaluates the expression when '=' lastOpEqual
equalButton.addEventListener("click", calculate);

//make float numbers possible with it
pointButton.addEventListener("click", addPoint);

//event listener for numbers
nums.forEach((num) => {
  num.addEventListener("click", () => getNumber(num.textContent));
});

//event listener for operator buttons
ops.forEach((op) => {
  op.addEventListener("click", () => getOperation(op.textContent));
});

//delete last digit when click 'delete'
deletebtn.onclick = () => {
  currentOp.textContent = currentOp.textContent.slice(0, -1);

  if (currentOp.textContent == "") {
    currentOp.textContent = "0";
    lastOp.textContent = lastOp.textContent.slice(0, -1);
  }
};

//clear everything from currentOp Screen when lastOpEqual
clearbtn.onclick = () => {
  currentOp.textContent = "0";
  lastOp.textContent = "";
  operand1 = "";
  operand2 = "";
  currentOperation = null;
};

function getNumber(num) {
  if (currentOp.textContent == "0" || lastOpEqual) {
    // lastOp.textContent = "";
    lastOpEqual = false;
    resetScreen();
  }
  currentOp.textContent += num;
}

//remove the first 0 after getting the number on screen
function resetScreen() {
  currentOp.textContent = "";
}

function getOperation(operator) {
  operand1 = currentOp.textContent;
  currentOperation = operator;
  lastOp.textContent = `${operand1} ${currentOperation}`;
  currentOp.textContent = "";
  lastOpEqual = false;

  //how to implement the negative numbers?
}

//lastOpEqual enables us to calculate after clicking '=' more than once
function calculate() {
  if (lastOpEqual) {
    operand1 = currentOp.textContent;
  }

  if (!lastOpEqual) {
    operand2 = currentOp.textContent;
    lastOpEqual = true;
  }

  currentOp.textContent = operate(currentOperation, operand1, operand2);
  lastOp.textContent = `${operand1} ${currentOperation} ${operand2} =`;

  if (operand2 == "0") {
    currentOp.textContent = "Err";
  }
}

function addPoint() {
  //add point after first 0 to make it float
  if (currentOp.textContent !== "") {
    currentOp.textContent += ".";
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  let opResult = a * b;
  currentOp.innerText = parseFloat(opResult);
  return currentOp.textContent;
}

function divide(a, b) {
  if (a % b == 0) {
    return a / b;
  } else {
    let opResult = a / b;
    currentOp.innerText = (Math.round(opResult * 100) / 100).toFixed(3);
    return currentOp.textContent;
  }
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "÷":
      if (b == 0) return null;
      else return divide(a, b);

    case "+":
      return add(a, b);

    case "-":
      return subtract(a, b);

    case "×":
      return multiply(a, b);

    default:
      return null;
  }
}
