largestIsland([
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 1],
]); // should return 1 as 1's are clashing in diagonally only

largestIsland([
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 1],
]); // should return 5 as 1's are clashing in diagonally, horizontally and vertically

largestIsland([
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 1],
]);

function largestIsland(arrayOfIsland) {
    let visited = new Set();
    let count = 0;

    function dfs(row, col) {
        if (
            row < 0 ||
            row >= arrayOfIsland.length ||
            col < 0 ||
            col >= arrayOfIsland[0].length ||
            arrayOfIsland[row][col] === 0 ||
            visited.has(`${row},${col}`)
        ) {
            return 0;
        }

        visited.add(`${row},${col}`);
        let size = 1; // Count this cell
        size += dfs(row - 1, col); // Up
        size += dfs(row + 1, col); // Down
        size += dfs(row, col + 1); // Right
        size += dfs(row, col - 1); // Left
        size += dfs(row - 1, col + 1); // Up-Right
        size += dfs(row - 1, col - 1); // Up-Left
        size += dfs(row + 1, col + 1); // Down-Right
        size += dfs(row + 1, col - 1); // Down-Left
        return size;
    }

    for (let row = 0; row < arrayOfIsland.length; row++) {
        for (let col = 0; col < arrayOfIsland[0].length; col++) {
            if (
                arrayOfIsland[row][col] === 1 &&
                !visited.has(`${row},${col}`)
            ) {
                count = Math.max(count, dfs(row, col));
            }
        }
    }

    console.log(count, visited);
}
