let screens = ["home", "player-selection", "game"];
let currentScreen = "home";
let player1Name = "";
let player2Name = "";
let gameStage = 0;
let playerTurn = "X";
let board1 = Array(9).fill(null);
let board2 = Array(9).fill(null);
let board3 = Array(9).fill(null);
const winningPositions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

document.addEventListener("DOMContentLoaded", () => {
    restoreGameData();
    updateUIFromGameData();
});

$(document).ready(function () {
    if (currentScreen === "home") {
        $(".player-selection-screen").hide();
        $(".game-board-screen").hide();
    }
    $(".alert").hide();

    $("#choose-players-button").click(function () {
        currentScreen = "player-selection";
        $(".home-screen").hide();
        $(".player-selection-screen").show();
        $(".alert").hide();
        $("#player-1-name").val("");
        $("#player-2-name").val("");
        resetGame();
    });

    $("#start-game-button").click(function () {
        currentScreen = "game";
        player1Name = $("#player-1-name").val();
        player2Name = $("#player-2-name").val();

        if (player1Name == "" || player2Name == "") {
            $("#alert-error").text("Please enter player names!").show();
            if (player1Name == "" && player2Name == "") {
                $("#player-2-name").addClass("error-input");
                $("#player-1-name").addClass("error-input");
                console.log("Here1");
            } else if (player2Name == "") {
                $("#player-1-name").removeClass("error-input");
                $("#player-2-name").addClass("error-input");
                console.log("Here2");
            } else {
                $("#player-1-name").addClass("error-input");
                $("#player-2-name").removeClass("error-input");
                console.log("Here3");
            }
        } else if (player1Name == player2Name) {
            $(".alert").text("Player names should be different").show();
        } else {
            $(".player-selection-screen").hide();
            gameStage = 1;
            $(".game-board-screen").show();
            $("#player-1-name").val(player1Name);
            $("#player-2-name").val(player2Name);
            $("#game-stage").text(`Game - ${gameStage}`);
            $(".current-player-turn").html(
                `Current Player: <i class="fa ${
                    playerTurn === "X"
                        ? "fa-times cross-icon"
                        : "fa-circle-o circle-icon"
                }" aria-hidden="true"></i>`
            );
            storeLocalData();
        }
    });

    $(document).on("click", ".cell", function () {
        $(".current-player-turn").html(
            `Current Player: <i class="fa ${
                playerTurn === "X"
                    ? "fa-circle-o circle-icon"
                    : "fa-times cross-icon"
            }" aria-hidden="true"></i>`
        );
        console.log("Here1");
        if ($(this).text() == "") {
            $(this).html(
                playerTurn === "X"
                    ? `<div class = "cross-icon">X</div>`
                    : `<div class = "circle-icon">O</div>`
            );
            const cellIndex =
                parseInt($(this).attr("id").replace("cell", "")) - 1;
            let currentBoard;
            if (gameStage == 1) {
                board1[cellIndex] = playerTurn;
                currentBoard = board1;
            } else if (gameStage == 2) {
                board2[cellIndex] = playerTurn;
                currentBoard = board2;
            } else if (gameStage == 3) {
                board3[cellIndex] = playerTurn;
                currentBoard = board3;
            }

            if (checkWinner(currentBoard, playerTurn, gameStage)) {
                if (gameStage < 3) {
                    showNextStageButton();
                    nextStage(); // Automatically move to next stage
                } else {
                    $("#game-alert").append("<p>Game Complete!</p>");
                    currentScreen = "home";
                    $(".game-board-screen").hide();
                    $(".home-screen").show();
                    localStorage.removeItem("ticTacToeData");
                    resetGame();
                    $("#player-1-name").val("");
                    $("#player-2-name").val("");
                    storeLocalData();
                }
            }

            playerTurn = playerTurn === "X" ? "O" : "X";
            storeLocalData();
        } else {
            $("#game-alert")
                .text("That place is already marked. Please choose another!")
                .show();
        }
    });

    $(document).on("click", "#next-stage-btn", nextStage);

    $("#player-1-name, #player-2-name").on("change", function () {
        const playerId = $(this).attr("id");
        const playerNum = playerId.includes("1") ? "1" : "2";
        const avatarImg = $(this)
            .closest(".player-card")
            .find(".player-avatar");
        const newSeed = $(this).val() || `player${playerNum}`;
        avatarImg.attr(
            "src",
            `https://api.dicebear.com/6.x/avataaars/svg?seed=${newSeed}`
        );
    });
});

function nextStage() {
    gameStage++;
    $("#game-stage").text(`Game - ${gameStage}`);
    $(".cell").text("");
    $("#game-alert").empty().hide();
    $("#next-stage-btn").remove();
    storeLocalData();
}

function showNextStageButton() {
    $("#game-alert").append(
        "<button id='next-stage-btn' class='btn btn-primary mt-3'>Next Stage</button>"
    );
}

function checkWinner(gameBoard, playerSign, gameStage) {
    const currentDate = new Date().toLocaleString();
    console.log(currentDate);
    for (let positions of winningPositions) {
        if (positions.every((pos) => gameBoard[pos] === playerSign)) {
            const winner = playerSign === "X" ? player2Name : player1Name;
            $(".game-history").append(
                `<p class = ${
                    playerSign == "X" ? "cross-icon" : "circle-icon"
                }>Game ${gameStage}: ${winner} (${playerSign}) is the winner! <span class = "date-text" >${currentDate}</span></p>`
            );
            return true;
        }
    }

    if (gameBoard.filter((cell) => cell !== null).length === 9) {
        $(".game-history").append(
            `<p>Game ${gameStage}: The game has been drawn!</p>`
        );
        return true;
    }
    return false;
}

function resetGame() {
    board1 = Array(9).fill(null);
    board2 = Array(9).fill(null);
    board3 = Array(9).fill(null);
    player1Name = "";
    player2Name = "";
    gameStage = 0;
    playerTurn = "X";
    $(".cell").text("");
    $("#game-alert").empty();
    $("#player-1-name").val("");
    $("#player-2-name").val("");
    $("#game-stage").text("Game 1");
    storeLocalData();
    updateUIFromGameData();
}

function storeLocalData() {
    const playerData = { player1O: player1Name, player2X: player2Name };
    const gameData = {
        stage1: board1,
        stage2: board2,
        stage3: board3,
        currentStage: gameStage,
        currentTurn: playerTurn,
    };
    const leaderBoardData = $(".game-history").html();
    const playerTurnHtml = $(".current-player-turn").html();
    const allData = {
        currentScreen,
        playerData,
        gameData,
        leaderBoardData,
        playerTurnHtml,
    };

    localStorage.setItem("ticTacToeData", JSON.stringify(allData));
}

function restoreGameData() {
    const data = JSON.parse(localStorage.getItem("ticTacToeData"));
    if (data) {
        currentScreen = data.currentScreen;
        player1Name = data.playerData.player1O;
        player2Name = data.playerData.player2X;
        board1 = data.gameData.stage1;
        board2 = data.gameData.stage2;
        board3 = data.gameData.stage3;
        gameStage = data.gameData.currentStage;
        playerTurn = data.gameData.currentTurn;
        $(".game-history").html(data.leaderBoardData);
        $(".current-player-turn").html(data.playerTurnHtml);
    }
}

function updateUIFromGameData() {
    if (currentScreen === "player-selection") {
        $(".home-screen").hide();
        $(".game-board-screen").hide();
        $(".player-selection-screen").show();
        $("#player-1-name").val(player1Name);
        $("#player-2-name").val(player2Name);
    } else if (currentScreen === "game") {
        $(".home-screen").hide();
        $(".player-selection-screen").hide();
        $(".game-board-screen").show();
        $("#game-stage").text(`Game - ${gameStage}`);

        const updateBoard = (board) => {
            board.forEach((value, index) => {
                if (value) {
                    $(`#cell${index + 1}`).text(value);
                }
            });
        };

        if (gameStage === 1) updateBoard(board1);
        if (gameStage === 2) updateBoard(board2);
        if (gameStage === 3) updateBoard(board3);
    }
}
