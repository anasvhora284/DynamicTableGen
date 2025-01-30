// highLow("1 2 -3 4 5");

// function highLow(str) {
//   let arr = str.split(" ");
//   let max = arr[0];
//   let min = arr[0];
//   arr.forEach((el) => {
//     if (el > max) {
//       max = el;
//     }
//   });
//   arr.forEach((el) => {
//     if (el < min) {
//       min = el;
//     }
//   });
//   console.log(`${max}`, `${min}`);
// }

// transform([1, 2, 3, 4, 5]);

// function transform(arr) {
//   let newArr = [];
//   arr.forEach((el) => {
//     if (el % 2 === 0) {
//       newArr.push(el - 1);
//     } else {
//       newArr.push(el + 1);
//     }
//   });
//   console.log(newArr);
// }

// isAutomorphic(4);

// function isAutomorphic(n) {
//   let square = n * n;
//   let strN = n.toString();
//   let strSquare = square.toString();
//   let lastDigits = strSquare.slice(-strN.length);
//   if (lastDigits === strN) {
//     console.log(true);
//   } else {
//     console.log(false);
//   }
// }

// makesTen(9, 10);

// function makesTen(a, b) {
//   if (a === 10 || b === 10 || a + b === 10) {
//     console.log(true);
//   } else {
//     console.log(false);
//   }
// }

// keyboardMistakes("51NG4P0RE");

// function keyboardMistakes(str) {
//   let arr = str.split("");
//   let newArr = arr.map((el) => {
//     if (el === "4") {
//       return "A";
//     } else if (el === "5") {
//       return "S";
//     } else if (el === "0") {
//       return "O";
//     } else if (el === "1") {
//       return "I";
//     } else {
//       return el;
//     }
//   });
//   console.log(newArr.join(""));
// }

// squaresSum(3);

// function squaresSum(n) {
//   let sum = 0;
//   for (let i = 1; i <= n; i++) {
//     sum += i * i;
//   }
//   console.log(sum);
// }

// sortByLength(["Google", "Apple", "Microsoft"]);

// function sortByLength(arr) {
//   arr.forEach((el, i) => {
//     arr.forEach((el2, j) => {
//       if (arr[j].length > arr[i].length) {
//         let temp = arr[i];
//         arr[i] = arr[j];
//         arr[j] = temp;
//       }
//     });
//   });
//   console.log(arr);
// }

// sumOfCubes([1, 5, 9]);

// function sumOfCubes(nums) {
//   let sum = 0;
//   nums.forEach((el) => {
//     sum += el ** 3;
//   });
//   console.log(sum);
// }

// sumDigits(54387189);

// function sumDigits(num) {
//   let count = 0;
//   while (num % 10 && num > 9) {
//     num /= 10;
//     count += 1;
//   }
//   console.log(count + 1);
// }

// evenOrOdd("22475");

// function evenOrOdd(str) {
//   let arr = str.split("");
//   let even = 0;
//   let odd = 0;
//   arr.forEach((el) => {
//     if (el % 2 === 0) {
//       even += Number(el);
//     } else {
//       odd += Number(el);
//     }
//   });
//   if (even > odd) {
//     console.log("Even is greater than Odd");
//   } else if (odd > even) {
//     console.log("Odd is greater than Even");
//   } else {
//     console.log("Even and Odd are the same");
//   }
// }

// reverseCapitalize("abc");

// function reverseCapitalize(str) {
//   let arr = str.split("");
//   let newArr = arr.reverse();
//   console.log(newArr.join("").toUpperCase());
// }

// nTablesPlusOne(3);

// function nTablesPlusOne(n) {
//   let arr = [];
//   for (let i = 1; i <= 10; i++) {
//     arr.push(n * i + 1);
//   }
//   console.log(arr);
// }
// function Sndmax(input) {
//   const lines = input.trim().split("\n");
//   const n1 = parseInt(lines[0]);

//   for (let i = 1; i <= n1; i++) {
//     const numbers = lines[i].split(" ").map(Number);
//     // Initialize max and secondMax to -Infinity to handle negative numbers
//     let max = -Infinity;
//     let secondMax = -Infinity;

//     numbers.forEach((el) => {
//       if (el > max) {
//         secondMax = max;
//         max = el;
//       } else if (el > secondMax && el < max) {
//         secondMax = el;
//       }
//     });

//     // Check if secondMax was updated; if not, handle the case where all numbers are the same
//     if (secondMax === -Infinity) {
//       console.log(numbers[0]);
//     } else {
//       console.log(secondMax);
//     }
//   }
// }

// process.stdin.setEncoding("utf8");
// let input = "";
// process.stdin.on("data", function (chunk) {
//   input += chunk;
// });

// process.stdin.on("end", function () {
//   Sndmax(input);
// });

// const swapStartMili = new Date().getMilliseconds();
// console.log(swap(1, 3, 1));
// const swapComMili = new Date().getMilliseconds();

// const swap2StartMili = new Date().getMilliseconds();
// console.log(swap_a(1, 3, 1));
// const swap2ComMili = new Date().getMilliseconds();

// console.log("swap time:Zaid: ", swapComMili - swapStartMili);
// console.log("swap time:Anas: ", swap2ComMili - swap2StartMili);

function swap(a, b, c) {
    c_to_a = c == a;
    c_to_b = c == b;

    while (c_to_a) {
        return b;
    }

    while (c_to_b) {
        return a;
    }
}

function swap_a(a, b, c) {
    let arr = [a, b, c];
    c_to_a = c == a; // will return true or false

    return arr[Number(c_to_a)]; // converted true of false to 1 or 0
}

// Dynamic Table Generator:
// bg color.
// rowspan & colspan.
// border width & its color.
// dynamic rows & cols by a button.
// dynamic table width & height.
// cellspacing and cellpadding.
// table alignment in window.
// store the table in local storage.
// 2 buttons merge cells and rows.
// unmerge button also.
