// join(["oven", "envier", "erase", "serious"]) => ["ovenvieraserious", 2];
// join(["move", "over", "overcome", "oven", "move"]) => ["moveovercomeoven", 1];
// join(["oven", "over", "move", "erase", "overcome"]) => ["oveneraseovercome", 0];

console.log(join(["oven", "envier", "erase", "serious"]));

function join(array) {
    let result = array[0];
    let count = [];

    for (let i = 0; i < array.length - 1; i++) {
        let word = array[i];
        let nextWord = array[i + 1];
        let maxOverlap = 0;

        // Try all possible cases between current word and next word
        for (let j = 1; j <= Math.min(word.length, nextWord.length); j++) {
            let suffix = word.slice(-j); // returns from right to left. <---
            console.log(suffix);
            let prefix = nextWord.slice(0, j); // returns from left to right --->
            console.log(prefix);

            if (suffix === prefix) {
                maxOverlap = j;
                count[i] = suffix.length;
            }
        }

        if (maxOverlap > 0) {
            result += nextWord.slice(maxOverlap);
        } else {
            result += nextWord;
        }

        count = Math.max(count);
    }

    return [result, count];
}

console.log(sayNumber(100));

function sayNumber(number) {
    let initialNumbers = {
        0: "zero",
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
        10: "ten",
        11: "eleven",
        12: "twelve",
        13: "thirteen",
        14: "fourteen",
        15: "fifteen",
        16: "sixteen",
        17: "seventeen",
        18: "eighteen",
        19: "nineteen",
        20: "twenty",
        30: "thirty",
        40: "forty",
        50: "fifty",
        60: "sixty",
        70: "seventy",
        80: "eighty",
        90: "ninety",
    };

    if (number <= 20 || initialNumbers[number] !== undefined) {
        return initialNumbers[number];
    } else if (number < 100) {
        return (
            initialNumbers[number - (number % 10)] +
            ` ${initialNumbers[number] !== undefined ? " and" : ""}` +
            initialNumbers[number % 10]
        );
    } else if (number < 1000) {
        return (
            console.log(Math.floor(number / 100)),
            initialNumbers[Math.floor(number / 100)] +
                ` hundred${number % 100 !== 0 ? " and" : ""} ` +
                (number % 100 !== 0 ? sayNumber(number % 100) : "")
        );
    } else if (number < 1000000) {
        return (
            console.log(Math.floor(number / 1000)),
            sayNumber(Math.floor(number / 1000)) +
                ` thousand${number % 1000 !== 0 ? ", " : "and "} ` +
                (number % 1000 !== 0 ? sayNumber(number % 1000) : "")
        );
    } else if (number < 1000000000) {
        return (
            console.log(Math.floor(number / 1000000)),
            sayNumber(Math.floor(number / 1000000)) +
                ` million${number % 1000000 !== 0 ? ", " : ""} ` +
                (number % 1000000 !== 0 ? sayNumber(number % 1000000) : "")
        );
    } else if (number < 1000000000000) {
        return (
            console.log(Math.floor(number / 1000000000)),
            sayNumber(Math.floor(number / 1000000000)) +
                ` billion${number % 1000000000 !== 0 ? ", " : ""} ` +
                (number % 1000000000 !== 0
                    ? sayNumber(number % 1000000000)
                    : "")
        );
    } else if (number < 1000000000000000) {
        return (
            console.log(Math.floor(number / 1000000000000)),
            sayNumber(Math.floor(number / 1000000000000)) +
                ` trillion${number % 1000000000000 !== 0 ? ", " : ""} ` +
                (number % 1000000000000 !== 0
                    ? sayNumber(number % 1000000000000)
                    : "")
        );
    }
}

console.log(sentence(["car", "plane", "truck", "boat"]));
function sentence(arrayOfWords) {
    let resultString = "";
    for (let i = 0; i < arrayOfWords.length; i++) {
        const word = arrayOfWords[i];
        const startsWithVowel = /^[aeiou]/i.test(word);
        const article = startsWithVowel ? "an" : "a";
        if (i === 0) {
            resultString = `${article} ${word}`;
        } else if (i === arrayOfWords.length - 1) {
            resultString += ` and ${article} ${word}`;
        } else {
            resultString += `, ${article} ${word}`;
        }
    }

    return resultString;
}
