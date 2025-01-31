// polybius("Hi") => "2324"
// polybius("2324") => "hi"

function polybius(text) {
    let matrix = [
        ["a", "b", "c", "d", "e"],
        ["f", "g", "h", "i", "k"],
        ["l", "m", "n", "o", "p"],
        ["q", "r", "s", "t", "u"],
        ["v", "w", "x", "y", "z"],
    ];

    text = text.toString().toLowerCase().replace(/j/g, "i");
    let result = "";

    // Check if input contains only numbers and spaces (decoding) or letters (encoding)
    const isDecoding = !isNaN(text.split(" ").join(""));

    if (isDecoding) {
        // Decoding numbers to letters
        let numbers = text.split(" ");
        let decodedResult = "";

        for (let k = 0; k < numbers.length; k++) {
            let num = numbers[k];
            if (!num) {
                decodedResult += " ";
                continue;
            }

            let decoded = "";
            for (let i = 0; i < num.length; i += 2) {
                const row = parseInt(num[i]) - 1; // -1 because array index starts from 0 ;)
                const col = parseInt(num[i + 1]) - 1;
                if (matrix[row] && matrix[row][col]) {
                    // making sure that row and col exists in matrix
                    decoded += matrix[row][col];
                }
            }
            decodedResult += decoded;

            if (k < numbers.length - 1) {
                decodedResult += " ";
            }
        }
        return decodedResult;
    } else {
        // Encoding letters to numbers
        let chars = text.split("");
        let encodedResult = "";

        for (let k = 0; k < chars.length; k++) {
            let char = chars[k];
            if (char === " ") {
                encodedResult += " ";
                continue;
            }

            let found = false;
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix[i].length; j++) {
                    if (matrix[i][j] === char) {
                        encodedResult += `${i + 1}${j + 1}`;
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }
            if (!found) encodedResult += "";
        }
        return encodedResult;
    }
}

// Iterate loops through each word and calculate value of it at last check if word is capital if yes multiply by 2
function get_sentence_value(sentence) {
    let matrix = [
        ["a", "b", "c", "d", "e"],
        ["f", "g", "h", "i", "j"],
        ["k", "l", "m", "n", "o"],
        ["p", "q", "r", "s", "t"],
        ["u", "v", "w", "x", "y"],
        ["z"],
    ];
    let value = 0;
    const words = sentence.trim().split(" ");

    for (const word of words) {
        let wordValue = 0;
        const isAllCaps = word === word.toUpperCase();

        for (const char of word.toLowerCase()) {
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix[i].length; j++) {
                    if (matrix[i][j] === char) {
                        wordValue += i * 5 + (j + 1); // Main logic: rowIndex * 5, but we have z also so ( rowIndex * 5 + (colIndex +1))
                        break;
                    }
                }
            }
        }

        if (isAllCaps) {
            wordValue *= 2;
        }

        value += wordValue;
    }

    return value;
}

// Create 2 arrays chunk array & resultArray then push each chunk array to resultArray.
function chunk(array, subArraySize) {
    let resultArray = [];
    let chunk = [];

    for (let index = 0; index < array.length; index++) {
        chunk.push(array[index]);

        if (chunk.length === subArraySize || index === array.length - 1) {
            // checks for chunk array length and given size.
            resultArray.push(chunk);
            chunk = [];
        }
    }

    return resultArray;
}

// Task - 1 Calls
console.log(polybius("Hi Hi Hi")); // Should output: "2324 2324 2324"
console.log(polybius("2324 4423154215")); // Should output: "hi there"
console.log(
    polybius("543445 14343344 522433 21422415331443 52244423 4311311114"),
    "\n"
);

// Task 2 Calls
console.log(get_sentence_value("HELLO world")); // Should output: (8+5+12+12+15) * 2(because whole word is cap) + (23+15+18+12+4) = 176
console.log(get_sentence_value("Edabit is LEGENDARY"), "\n");

// Tasl 3 Calls
console.log(chunk([1, 2, 3, 4, 5], 2)); // Make a sub array of given numbers of elemets. 2 elements in each sub array.
console.log(chunk([1, 2, 3, 4, 5, 6, 7], 3));
console.log(chunk([1, 2, 3, 4, 5], 10));
