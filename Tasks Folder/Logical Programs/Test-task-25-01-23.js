// Progragram - 1 (calculate rectangels from square matrix)
function rectangles(inputInteger) {
    return ((inputInteger * (inputInteger + 1)) / 2) ** 2;
}

// Progragram - 2 (add from 1 to given number)
function addUpTo(lastNumber) {
    if (lastNumber === 1) {
        return 1;
    } else {
        return lastNumber + addUpTo(lastNumber - 1);
    }
}

// Progragram - 3 (get sum of the array elements)
function getSumOfItems(ArrayInput) {
    let sum = 0;
    ArrayInput.forEach((element) => {
        sum += element;
    });

    return sum;
}

// Progragram - 4 (convert from integer to array of boolean)
function integerBoolean(binaryInput) {
    const convertedArray = new Array();

    for (const BinaryInputElement of binaryInput) {
        BinaryInputElement === "1"
            ? convertedArray.push(true)
            : convertedArray.push(false);
    }

    return convertedArray;
}

// Program - 5 (find max of each subarray)
function findLargestNums(nestedArrayInput) {
    const MaxofEachArray = new Array();

    nestedArrayInput.forEach((element, index) => {
        for (let i = 0; i < element.length; i++) {
            MaxofEachArray[index] >= element[i]
                ? ""
                : (MaxofEachArray[index] = element[i]);
        }
    });

    return MaxofEachArray;
}

// Program - 6 (sort the array by length of string)
function sortByLength(alphabetArray) {
    for (let i = 0; i < alphabetArray.length; i++) {
        for (let j = 0; j < alphabetArray.length - 1; j++) {
            if (alphabetArray[j].length > alphabetArray[j + 1].length) {
                let temp = alphabetArray[j];
                alphabetArray[j] = alphabetArray[j + 1];
                alphabetArray[j + 1] = temp;
            }
        }
    }

    return alphabetArray;
}

// function call values
const numberOfMatrix = 3;
const addUpToNumber = 7;
const ArrayElemetsInput = [-2, 84, 23];
const binaryInput = 1011010;
const nestedArrays = [
    [0.4321, 0.7634, 0.652],
    [1.324, 9.32, 2.5423, 6.4314],
    [9, 3, 6, 3],
];
const aplhabetArray = ["a", "ccc", "dddd", "bb"];

console.log(`Rectangles for: ${1}`, rectangles(numberOfMatrix));
console.log(`Fectorial unto ${10}:`, addUpTo(addUpToNumber));
console.log(
    `Sum of Array: ${ArrayElemetsInput}: `,
    getSumOfItems(ArrayElemetsInput)
);
console.log(
    `Boolean for the input ${binaryInput}:`,
    integerBoolean(`${binaryInput}`)
);
console.log(
    `Max numbers out of the arrays: ${nestedArrays}`,
    findLargestNums(nestedArrays)
);
console.log(
    `The sorted array by length of ${aplhabetArray}:`,
    sortByLength(aplhabetArray)
);
