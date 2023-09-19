function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function sum(numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

function multiply(...numbers) {
  return numbers.reduce((acc, curr) => acc * curr, 1);
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function factorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial,
};
