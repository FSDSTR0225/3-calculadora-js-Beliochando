const display = document.getElementById('display');
const expressionDisplay = document.getElementById('expression');
const buttons = document.getElementsByClassName('boton');
const operators = document.getElementsByClassName('operador');
const resetButton = document.getElementsByClassName('resetear')[0];

let expression = '';
let hasError = false;
let currentNumber = '';
let lastResult = null;
let canInputOperator = false;
let canInputNumber = true;
let lastOperator = '';

function updateDisplay(value, type = 'display') {
    if (type === 'display') {
        display.placeholder = value;
    } else {
        expressionDisplay.textContent = value;
    }
}

Array.from(buttons).forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (hasError) {
            expression = value;
            currentNumber = value;
            hasError = false;
            updateDisplay(expression, 'display');
            canInputOperator = true;
            canInputNumber = true;
            return;
        }

        if (!canInputNumber) {
            expression = value;
            currentNumber = value;
            updateDisplay(expression, 'display');
            canInputOperator = true;
            canInputNumber = true;
            return;
        }

        if (currentNumber === '0' && value !== '0') {
            expression = value;
            currentNumber = value;
            updateDisplay(expression, 'display');
            return;
        }

        expression += value;
        currentNumber += value;
        updateDisplay(expression, 'display');
        canInputOperator = true;
    });
});

Array.from(operators).forEach(operator => {
    operator.addEventListener('click', () => {
        const value = operator.textContent;

        if (display.placeholder && value === ".") {
            if (!currentNumber.includes('.')) {
                expression += value;
                currentNumber += value;
                updateDisplay(expression, 'display');
            }
            canInputOperator = false;
            canInputNumber = true;
            return;
        }

        if (!currentNumber && value !== '-') return;

        if (!canInputOperator && value !== '-') return;
        
        if (value === '-' && expression.slice(-3, -1) === ' -') return;

        if (value === '=') {
            try {
                const safeExpression = expression
                    .replace('×', '*')
                    .replace('÷', '/');

                let result = eval(safeExpression);
                let displayResult = roundToDecimal(result, 4);

                lastResult = displayResult;

                updateDisplay(displayResult, 'display');
                updateDisplay(expression, 'expression');
                expression = displayResult;
                currentNumber = displayResult;
                canInputOperator = true;
                canInputNumber = false;
            } catch (error) {
                hasError = true;
                updateDisplay('Error', 'display');
                updateDisplay(expression, 'expression');
                canInputOperator = false;
                canInputNumber = false;
            }
        } else if (value === '÷' || value === '×' || value === '-' || value === '+') {
            expression += ` ${value} `;
            currentNumber = '';
            updateDisplay(expression, 'display');
            canInputOperator = false;
            canInputNumber = true;
        } else if (value === '.') {
            if (!canInputNumber) {
                expression = '0.';
                currentNumber = '0.';
                updateDisplay(expression, 'display');
                canInputOperator = false;
                canInputNumber = true;
                return;
            }

            if (currentNumber.includes('.')) return;

            expression += value;
            currentNumber += value;
            updateDisplay(expression, 'display');
        }
    });
});

function roundToDecimal(value, decimals) {
    let str = value.toString();
    let isNegative = value < 0;
    let absoluteValue = Math.abs(value);
    let decimalIndex = str.indexOf(".");

    if (decimalIndex !== -1) {
        let decimalPart = str.slice(decimalIndex + 1);

        if (decimalPart.length > decimals) {
            let roundedValue = Math.ceil(absoluteValue * Math.pow(10, decimals));
            let finalValue = roundedValue / Math.pow(10, decimals);
            return isNegative ? -finalValue : finalValue;
        }
    }

    return isNegative ? -absoluteValue : absoluteValue;
}

function formatNumber(value) {
    let formattedValue = value.toString();
    if (formattedValue.indexOf('.') !== -1) {
        formattedValue = formattedValue.replace(/\.?0+$/, '');
    }
    return formattedValue;
}

resetButton.addEventListener('click', () => {
    expression = '';
    currentNumber = '';
    lastResult = null;
    hasError = false;
    canInputOperator = false;
    canInputNumber = true;
    updateDisplay('Try again!', 'display');
    updateDisplay('', 'expression');
});

window.onload = function() {
    expression = '';
    hasError = false;
    updateDisplay('Auuuu, yeaah!', 'display');
    updateDisplay('', 'expression');
}
