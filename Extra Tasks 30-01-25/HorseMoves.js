knightsJump("F4");
knightsJump("A1");
knightsJump("E2");

function knightsJump(knightPos) {
    // knightPos = "F4"
    let x = knightPos.toLowerCase().charCodeAt(0) - 64;
    let y = parseInt(knightPos[1]);
    let totalMoves = [
        [x + 2, y + 1],
        [x + 2, y - 1],
        [x - 2, y + 1],
        [x - 2, y - 1],
        [x + 1, y + 2],
        [x + 1, y - 2],
        [x - 1, y + 2],
        [x - 1, y - 2],
    ];
    let possibleMoves = [];

    totalMoves.forEach((move) => {
        let [x, y] = move;
        if (x >= 33 && x <= 40 && y >= 1 && y <= 8) {
            possibleMoves.push(String.fromCharCode(x + 64).toUpperCase() + y);
        }
    });

    console.log(possibleMoves.sort());
}
