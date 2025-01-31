// rotateTransform([ [2, 4],
//                   [0, 0]      => [ [0, 2],
//                 ], 1)              [0, 4]
//                                  ]

// if given -ve then rotate counter clock wise else rotate clockwise.

console.log(
    rotateTransform(
        [
            [2, 4],
            [0, 0],
        ],
        -3
    )
); // Should output: [ [0, 2], [0, 4] ]

function rotateTransform(array, rotateFrequency) {
    if (rotateFrequency < 0) {
        rotateFrequency = Math.abs(rotateFrequency);
        for (let i = 0; i < rotateFrequency; i++) {
            array = rotateCounterClockWise(array);
            array = array.reverse();
        }
    } else {
        for (let i = 0; i < rotateFrequency; i++) {
            array = rotateClockWise(array);
        }
    }
    return array;
}

function rotateCounterClockWise(array) {
    let resultArray = [];
    for (let i = 0; i < array.length; i++) {
        let tempArray = [];
        for (let j = 0; j < array[i].length; j++) {
            tempArray.push(array[j][i]);
        }
        resultArray.push(tempArray);
    }
    return resultArray;
}

function rotateClockWise(array) {
    let resultArray = [];
    for (let i = 0; i < array.length; i++) {
        let tempArray = [];
        for (let j = array[i].length - 1; j >= 0; j--) {
            tempArray.push(array[j][i]);
        }
        resultArray.push(tempArray);
    }
    return resultArray;
}
