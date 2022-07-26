const calculator = document.querySelector(".calc");
const buttons = document.querySelector(".calc__body");
const output = document.querySelector(".result");
const text = document.querySelector(".text");
const title = document.querySelector(".title");
const equal = document.querySelector("#btn-equal");
const clear = document.querySelector("#btn-clear");

let firstOperand = "";
let secondOperand = "";
let result = 0;
let operator = undefined;
let decimal = false;
let danger = false;
let maxLength = 10;
let maxLengthX = 18;
let intervalID;

addEvents();

function addEvents() {
    buttons.addEventListener("click", displayData);
    equal.addEventListener("click", operate);
    clear.addEventListener("click", clearAll);
}

function displayData(e) {
    let btn = e.target;
    if (btn.className.includes("num")) {
        if (!operator) {
            if (result) {
                clearAll();
            }
            if (btn.innerText === "." && decimal) return;
            if (btn.innerText === ".") decimal = true;
            firstOperand += btn.innerText;
            if (firstOperand === ".") firstOperand = "0.";
            output.innerText = firstOperand;
            lengthCheck(firstOperand);
        } else {
            if (btn.innerText === "." && decimal) return;
            if (btn.innerText === ".") decimal = true;
            secondOperand += btn.innerText;
            if (secondOperand === ".") secondOperand = "0.";
            text.innerText = `${firstOperand} ${operator}`;
            output.innerText = secondOperand;
            lengthCheck(secondOperand);
        }
    } else if (btn.className.includes("op")) {
        if (firstOperand) {
            if (secondOperand) {
                operate();
                if (danger) return;
            }
        } else {
            firstOperand = "0";
        }
        operator = btn.innerText;
        text.innerText = firstOperand;
        output.innerText = operator;
        decimal = false;
    }
}

function operate() {
    if (firstOperand && secondOperand) {
        let firstNum = Number(firstOperand);
        let secondNum = Number(secondOperand);
        if (operator === "+") {
            result = firstNum + secondNum;
        } else if (operator === "−") {
            result = firstNum - secondNum;
        } else if (operator === "x") {
            result = firstNum * secondNum;
        } else if (operator === "/") {
            result = firstNum / secondNum;
            if (secondNum === 0) danger = true;
        }

        if (danger) {
            dangerAnimation();
            return;
        }

        result = result.toString();
        if (result.includes(".")) {
            result = Number(result).toFixed(2);
        }

        text.innerText = `${firstOperand} ${operator} ${secondOperand}`;
        output.innerText = result;
        firstOperand = result;
        secondOperand = "";
        operator = undefined;
        decimal = false;
        lengthCheck(result);
    }
}

function clearAll() {
    firstOperand = "";
    secondOperand = "";
    operator = undefined;
    result = 0;
    decimal = false;
    danger = false;
    text.innerText = 0;
    output.innerText = 0;
    output.classList.remove("result-small");
    output.classList.remove("result-xsmall");
    title.classList.remove("danger");
    title.textContent = ""
    clearInterval(intervalID);
}

function lengthCheck(input) {
    if (input.length > maxLength && input.length <= maxLengthX) {
        output.classList.add("result-small");
        output.classList.remove("result-xsmall");
    }else if(input.length > maxLengthX) {
        output.classList.add("result-xsmall");
        output.classList.remove("result-small");
    }else{
        output.classList.remove("result-small");
        output.classList.remove("result-xsmall");
    }
}

function dangerAnimation() {
    title.textContent = "Don't Divide By Zero!"
    intervalID = setInterval(() => {
        title.classList.toggle("danger");
    }, 200);
    text.innerText = "Infinity";
    output.innerText = "";
    output.innerText = "😠😠😠😠😠"
}
