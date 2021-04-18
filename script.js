function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  if (operator == "+") {
    return add(a, b);
  }
  if (operator == "-") {
    return subtract(a, b);
  }
  if (operator == "x") {
    return multiply(a, b).toPrecision(5);
  }
  if (operator == "/") {
    return divide(a, b);
  }
}

let firstNum;
let secondNum;
let operator;
let shouldResetScreen = false;

const digits = document.querySelectorAll(".digit");
const screen = document.querySelector(".screen-value");
let displayValue = "";
const deleteButton = document.querySelector(".delete-btn");
const operators = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear-btn");
const percentButton = document.querySelector(".percent-btn");
const equalSign = document.querySelector(".equal-btn");
const decimalButton = document.querySelector(".decimal-btn");

digits.forEach((digit) => digit.addEventListener("click", addDigit));
document.addEventListener("keydown", keyBoardInput);
operators.forEach((operator) =>
  operator.addEventListener("click", operatorClicked)
);
deleteButton.addEventListener("click", deleteDigit);
clearButton.addEventListener("click", allClear);
percentButton.addEventListener("click", makePercentage);
equalSign.addEventListener("click", calculate);

function keyBoardInput(event) {
  const inputKey = event.key;
  const inputCode = event.code;
  if (
    (Number(inputKey) >= 0 && Number(inputKey) <= 9) ||
    inputCode == "Period"
  ) {
    if (shouldResetScreen) {
      resetScreen();
    }
    const digit = inputKey;
    displayValue += digit;
    updateScreen();
  }
  if (
    inputKey == "+" ||
    inputKey == "-" ||
    inputKey == "*" ||
    inputKey == "/"
  ) {
    if (operator != null) {
      calculate();
    }
    operator = inputKey;
    firstNum = displayValue;
    shouldResetScreen = true;
  }
  if (inputKey == "=") calculate();
  if (inputCode == "Escape") allClear();
  if (inputCode == "Backspace") deleteDigit();
  if (inputKey == "%") makePercentage();
  if (inputKey == "Enter") calculate();
}

function addDigit(event) {
  if (displayValue.includes(".")) {
    decimalButton.disabled = true;
  }
  if (shouldResetScreen) {
    resetScreen();
  }
  const digit = event.target.innerText;
  displayValue += digit;
  updateScreen();
}

function deleteDigit(event) {
  if (shouldResetScreen) {
    resetScreen();
  }
  displayValue = displayValue.substring(0, displayValue.length - 1);
  updateScreen();
}

function allClear(event) {
  resetScreen();
  firstNum = 0;
  secondNum = 0;
  operator = null;
}

function makePercentage(event) {
  displayValue = `0.${displayValue}`;
  updateScreen();
}

function operatorClicked(event) {
  if (operator != null) {
    calculate();
  }
  operator = event.target.innerText;
  firstNum = displayValue;
  shouldResetScreen = true;
}

function calculate() {
  if (operator === null || shouldResetScreen) return;
  secondNum = screen.innerText;
  displayValue = operate(operator, Number(firstNum), Number(secondNum));
  updateScreen();
  operator = null;
}

function resetScreen() {
  displayValue = "";
  updateScreen();
  shouldResetScreen = false;
}

function updateScreen() {
  screen.innerText = displayValue;
}
