const currentEl = document.getElementById('current');
const historyEl = document.getElementById('history');
const MAX_DIGITS = 12;
const MAX_HISTORY_ITEMS = 5;
const DECIMAL_PRECISION = 100000;

let current = '0';
let previous = '';
let operator = null;

function updateDisplay() {
  currentEl.textContent = current;
}

function inputNumber(num) {
  if (current.replace('-', '').length >= MAX_DIGITS) return;
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

/**
 * Define el operador activo. Si ya hay una operacion pendiente, la resuelve
 * primero (encadenado). El operador % es una excepcion: actua al instante.
 */

function chooseOperator(op) {
  if (op === '%') {
    current = (parseFloat(current) / 100).toString();
    updateDisplay();
    return;
  }
  if (current === '0' && previous === '') return;
  if (previous !== '') {
    calculate();
  }
  operator = op;
  previous = current;
  current = '0';
  updateDisplay();
}

/**
 * Ejecuta la operacion pendiente usando `previous`, `operator` y `current`.
 * Redondea el resultado y lo guarda en el historial.
 */

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
    triggerErrorGlitch();
    return;
  }
      result = prev / curr;
      break;
    case '%': result = prev % curr; break;
    default: return;
  }

  result = Math.round(result * DECIMAL_PRECISION) / DECIMAL_PRECISION

  const historyEntry = `${previous} ${operator} ${curr} = ${result}`;
  if (historyLog.length > MAX_HISTORY_ITEMS) {
    historyLog.pop();
  }
  historyLog.unshift(historyEntry);
  current = result.toString();
  operator = null;
  previous = '';
  updateDisplay();
}

function clearAll() {
  current = '0';
  previous = '';
  operator = null;
  updateDisplay();
}

function deleteLast() {
  current = current.length > 1 ? current.slice(0, -1) : '0';
  updateDisplay();
}

document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const { value, action } = btn.dataset;

    if (action === 'clear') {
      clearAll();
    } else if (action === 'delete') {
      deleteLast();
    } else if (action === 'equals') {
      calculate();
    } else if (btn.classList.contains('btn-op')) {
      chooseOperator(value);
    } else if (value !== undefined) {
      inputNumber(value);
    }
  });
});

let historyLog = [];

function saveToHistory(entry) {
  historyLog.unshift(entry);
  if (historyLog.length > 5) historyLog.pop();
  renderHistoryLog();
}

function renderHistoryLog() {
  historyEl.innerHTML = historyLog
    .map((item) => `<div class="history-item">${item}</div>`)
    .join('');
}

function triggerErrorGlitch() {
  current = 'Error';
  updateDisplay();
  document.querySelector('.calculator').classList.add('glitch');
  setTimeout(() => {
    document.querySelector('.calculator').classList.remove('glitch');
    clearAll();
  }, 800);
}

document.addEventListener('keydown', (e) => {
  const { key } = e;
  if (/[0-9.]/.test(key)) {
    inputNumber(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    chooseOperator(key);
  } else if (key === 'Enter' || key === '=') {
    e.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearAll();
  }
});