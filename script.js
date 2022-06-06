const currentOp = document.getElementById('currentOp');
const nums = document.querySelectorAll('[data-num]');
const ops = document.querySelectorAll('[data-op]');


function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
    //currentOp.innerText = opResult.toFixed(2);
}



nums.forEach(num => {
    num.addEventListener('click', () => numtoScreen(num.textContent))
});
  
ops.forEach(op => {
    op.addEventListener('click', () => operation(op.textContent))
});


function numtoScreen(number) {
    if (currentOp.textContent == '0') {
        resetScreen();
        currentOp.textContent += number;
    }
}

function resetScreen() {
    currentOp.textContent = "";
}


// function delete() {
//     currentOp.textContent = currentOp.textContent.slice(0, -1);

// }