largestIsland([
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 1],
]); // should return 1 as diagonal clash only

largestIsland([
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 1],
]); // should return 7 (horizontal + diagonal + vertical + diagonal + horizontal + diagonal + vertical clashes)

largestIsland([
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 1],
]);

function largestIsland(arrayOfIsland) {
    let count = 0;

    function countConnections(row, col) {
        if (
            row < 0 ||
            row >= arrayOfIsland.length ||
            col < 0 ||
            col >= arrayOfIsland[0].length ||
            arrayOfIsland[row][col] === 0
        ) {
            return 0;
        }

        let connections = 1;

        // Check horizontal
        if (
            col + 1 < arrayOfIsland[0].length &&
            arrayOfIsland[row][col + 1] === 1
        ) {
            connections++;
        }

        // Check vertical
        if (
            row + 1 < arrayOfIsland.length &&
            arrayOfIsland[row + 1][col] === 1
        ) {
            connections++;
        }

        // Check diagonals
        if (
            row + 1 < arrayOfIsland.length &&
            col + 1 < arrayOfIsland[0].length &&
            arrayOfIsland[row + 1][col + 1] === 1
        ) {
            connections++;
        }
        if (
            row + 1 < arrayOfIsland.length &&
            col - 1 >= 0 &&
            arrayOfIsland[row + 1][col - 1] === 1
        ) {
            connections++;
        }

        return connections;
    }

    for (let row = 0; row < arrayOfIsland.length; row++) {
        for (let col = 0; col < arrayOfIsland[0].length; col++) {
            if (arrayOfIsland[row][col] === 1) {
                count += countConnections(row, col);
            }
        }
    }

    console.log(count);
}
