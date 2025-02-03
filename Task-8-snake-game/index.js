// Snake game implementation with core game logic and rendering
// PLay ground is a NxN grid where snake moves and collects food
// Core functions:
// - renderFood: Displays food at random position
// - onEat: Handles food collection and score update
// - onGameOver: Handles game over state
// - onMove: Updates snake position each tick
// - onTurn: Handles direction changes
// - renderSnake: Displays snake segments
// - startGame: Initializes game state
// - updateScore: Updates score display
// - makePlayground: Creates NxN game grid
// - moveSnake: move snake in the direction of the head
// - isSnakeAtFood: check if snake is at a same position as food?
// - isSnakeAtWall: check if snake is at the wall?
// - isSnakeAtSnake: check if snake head touch own skin?
// - We will increase snake's length by 1 segament when it eats food by adding a common snake-body-div class to each snake segment

const snake = [{ x: 20, y: 20 }];
const food = { x: 5, y: 5 };
const direction = { x: 0, y: 0 };
let score = 0;
let gameInterval = null;
let screens = ["start", "game", "game-over"];
const SNAKE_N_FOOD_SIZE = 20; // Size of snake segments and food
const GRID_SIZE = 30; // Number of divs in each direction
const totalPlayGroundSize = SNAKE_N_FOOD_SIZE * GRID_SIZE;

function showAnimation() {
    const text1 = document.getElementById("start-game-button");
    text1.classList.add("animate-start");
}

function showRestartAnimation() {
    const text1 = document.getElementById("restart-game-button");
    text1.classList.add("animate-start");
}

document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("start-game-button")
        .addEventListener("click", () => {
            showAnimation();
            setTimeout(() => {
                screens.forEach((screen) => {
                    document.getElementById(screen).style.display =
                        screen === "game" ? "block" : "none";
                });
                startGame();
            }, 3000);
        });

    document
        .getElementById("restart-game-button")
        .addEventListener("click", () => {
            showRestartAnimation();
            setTimeout(() => {
                screens.forEach((screen) => {
                    document.getElementById(screen).style.display =
                        screen === "game" ? "block" : "none";
                });
                startGame();
            }, 3000);
        });
});

function startGame() {
    // Reset game state
    snake.length = 1;
    snake[0] = { x: 20, y: 20 };
    direction.x = 0;
    direction.y = 0;
    score = 0;
    updateScore();
    generateFood();

    makePlayGround();
    renderSnake();
    renderFood();
    setupControls();

    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(onMove, 100);
}

function setupControls() {
    document.removeEventListener("keydown", handleKeyPress);
    document.addEventListener("keydown", handleKeyPress);
}

function handleKeyPress(event) {
    const head = snake[0];
    console.log(snake);
    console.log();
    switch (event.key) {
        case "ArrowUp":
            if (direction.y !== 1) {
                direction.x = 0;
                direction.y = -1;
            }
            break;
        case "ArrowDown":
            if (direction.y !== -1) {
                direction.x = 0;
                direction.y = 1;
            }
            break;
        case "ArrowLeft":
            if (direction.x !== 1) {
                direction.x = -1;
                direction.y = 0;
            }
            break;
        case "ArrowRight":
            if (direction.x !== -1) {
                direction.x = 1;
                direction.y = 0;
            }
            break;
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * GRID_SIZE);
    food.y = Math.floor(Math.random() * GRID_SIZE);
    while (
        isSnakeAtFood() ||
        food.x < 0 ||
        food.y < 0 ||
        food.x >= GRID_SIZE ||
        food.y >= GRID_SIZE
    ) {
        food.x = Math.floor(Math.random() * GRID_SIZE);
        food.y = Math.floor(Math.random() * GRID_SIZE);
    }
}

function renderFood() {
    const foodElement = document.getElementById("food");
    foodElement.style.height = "10px";
    foodElement.style.width = "10px";
    foodElement.style.borderRadius = "50%";
    foodElement.style.left = `${food.x * SNAKE_N_FOOD_SIZE}px`;
    foodElement.style.top = `${food.y * SNAKE_N_FOOD_SIZE}px`;
    console.log(foodElement);
}

function renderSnake() {
    const snakeElement = document.getElementById("snake");
    snakeElement.innerHTML = "";
    snake.forEach((segment) => {
        const segmentElement = document.createElement("div");
        segmentElement.style.left = `${segment.x * SNAKE_N_FOOD_SIZE}px`;
        segmentElement.style.top = `${segment.y * SNAKE_N_FOOD_SIZE}px`;
        segmentElement.classList.add("snake-segment");
        snakeElement.appendChild(segmentElement);
    });
}

function makePlayGround() {
    const playground = document.getElementById("play-ground");
    playground.innerHTML = `
        <div id="snake"></div>
        <div id="food"></div>
    `;
}

function onMove() {
    const head = snake[0];
    const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y,
    };

    if (isSnakeAtWall(newHead) || isSnakeAtSnake(newHead)) {
        onGameOver();
        return;
    }

    snake.unshift(newHead);
    if (isSnakeAtFood()) {
        onEat();
    } else {
        snake.pop();
    }
    renderSnake();
}

function isSnakeAtFood() {
    const head = snake[0];
    return head.x === food.x && head.y === food.y;
}

function isSnakeAtWall(position) {
    return (
        position.x < 0 ||
        position.x >= GRID_SIZE ||
        position.y < 0 ||
        position.y >= GRID_SIZE
    );
}

function isSnakeAtSnake(position) {
    return snake
        .slice(1)
        .some(
            (segment) => segment.x === position.x && segment.y === position.y
        );
}

function onEat() {
    score += 10;
    updateScore();
    generateFood();
    renderFood();
}

function updateScore() {
    let scoreDisplay = document.querySelector(".score-display");
    if (!scoreDisplay) {
        scoreDisplay = document.createElement("div");
        scoreDisplay.className = "score-display";
        document.getElementById("info").prepend(scoreDisplay);
    }
    scoreDisplay.textContent = `Score: ${score}`;
}

function onGameOver() {
    clearInterval(gameInterval);
    screens.forEach((screen) => {
        document.getElementById(screen).style.display =
            screen === "game-over" ? "block" : "none";
    });
}
