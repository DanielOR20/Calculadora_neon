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