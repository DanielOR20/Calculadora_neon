const currentEl = document.getElementById('current');
const historyEl = document.getElementById('history');

let current = '0';
let previous = '';
let operator = null;

function updateDisplay() {
  currentEl.textContent = current;
  historyEl.textContent = previous && operator ? `${previous} ${operator}` : '';
}

function inputNumber(num) {
  if (current === '0' && num !== '.') {
    current = num;
  } else if (num === '.' && current.includes('.')) {
    return;
  } else {
    current += num;
  }
  updateDisplay();
}

updateDisplay();

function chooseOperator(op) {
  if (current === '0' && previous === '') return;
  if (previous !== '') {
    calculate();
  }
  operator = op;
  previous = current;
  current = '0';
  updateDisplay();
}

function calculate() {
  const prev = parseFloat(previous);
  const curr = parseFloat(current);
  if (isNaN(prev) || isNaN(curr) || operator === null) return;

  let result;
  switch (operator) {
    case '+': result = prev + curr; break;
    case '-': result = prev - curr; break;
    case '*': result = prev * curr; break;
    case '/':
      if (curr === 0) {
        current = 'Error';
        updateDisplay();
        setTimeout(clearAll, 1000);
        return;
      }
      result = prev / curr;
      break;
    case '%': result = prev % curr; break;
    default: return;
  }

  current = result.toString();
  operator = null;
  previous = '';
  updateDisplay();
}