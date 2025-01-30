const someVar = 10;
const someVar2 = 20;

console.log(sum(someVar, someVar2));
console.log(sub(someVar, someVar2));
console.log(mul(someVar, someVar2));
console.log(div(someVar, someVar2));

// Function to add two numbers

function sum(var1, var2) {
  return var1 + var2;
}

// Function to subtract two numbers
function sub(var1, var2) {
  return var1 > var2 ? var1 - var2 : var2 - var1;
}

// Function to multiply two numbers
function mul(var1, var2) {
  return var1 * var2;
}

// Function to divide two numbers
function div(var1, var2) {
  return var1 / var2;
}

function pow(var1, var2) {
  return Math.pow(var1, var2);
}

// Function to calculate factorial
function factorial(var1) {
  if (var1 === 0 || var1 === 1) {
    return 1;
  } else {
    return var1 * factorial(var1 - 1);
  }
}
