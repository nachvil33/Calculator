const display = document.getElementById('display');
let currentInput = '';
let pendingExponent = false;
let resultShown = false;

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.innerText));
});

function handleButtonClick(value) {
    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
            if (resultShown) {
                currentInput += value;
                resultShown = false;
            } else if (!pendingExponent) {
                currentInput += value;
            }
            break;
        case 'C':
            currentInput = '0';
            pendingExponent = false;
            resultShown = false;
            break;
        case '←':
            if (currentInput === '0') {
                return; // Prevent deleting when the display is 0
            }
            currentInput = currentInput.slice(0, -1) || '0';
            break;
        case '=':
            try {
                if (pendingExponent) {
                    // Split the input into base and exponent, then calculate using Math.pow
                    const [base, exponent] = currentInput.split('^');
                    currentInput = Math.pow(parseFloat(base), parseFloat(exponent)).toString();
                    pendingExponent = false;
                } else {
                    currentInput = eval(currentInput).toString();
                }
                resultShown = true;
            } catch (error) {
                currentInput = 'Error';
            }
            break;
        case '^':
            if (!pendingExponent) {
                currentInput += '^';
                pendingExponent = true;
            }
            break;
        default:
            if (resultShown || currentInput === '0' || currentInput === 'Error') {
                currentInput = value;
                resultShown = false;
            } else {
                currentInput += value;
            }
            break;
    }

    display.innerText = currentInput;
}
// Event listener for numeric keypad input and operators (+, -, *, /, ., ^, =)
document.addEventListener('keypress', (event) => {
    const numericKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const operatorKeys = ['+', '-', '*', '/', '.', '^', '='];

    if (numericKeys.includes(event.key)) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del navegador
        document.getElementById(event.key).click(); // Trigger click event for the numeric button
    } else if (event.key === 'Enter') {
        handleButtonClick('=');
        event.preventDefault(); 
    } else if (operatorKeys.includes(event.key)) {
        event.preventDefault(); 
        handleButtonClick(event.key);
    } else {
        // Handle other keys if needed
    }
});
// Automatically initialize the calculator display with 0
display.innerText = currentInput;