const display = document.getElementById('display');
let currentInput = '';
let pendingExponent = false;

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => handleButtonClick(button.innerText));
});

function handleButtonClick(value) {
  switch (value) {
    case 'C':
      currentInput = '';
      pendingExponent = false;
      break;
    case '←':
      currentInput = currentInput.slice(0, -1);
      break;
    case '=':
      try {
        if (pendingExponent) {
          // Si estamos en el modo de ingreso de exponente, calculamos la potencia
          const [base, exponent] = currentInput.split('**');
          currentInput = Math.pow(parseFloat(base), parseFloat(exponent)).toString();
          pendingExponent = false; // Restablecemos pendingExponent
        } else {
          currentInput = eval(currentInput).toString();
        }
      } catch (error) {
        currentInput = 'Error';
      }
      break;
    case 'x^y':
      if (!pendingExponent) {
        currentInput += '**';
        pendingExponent = true;
      }
      break;
    default:
      currentInput += value;
      break;
  }

  display.innerText = currentInput;
}
