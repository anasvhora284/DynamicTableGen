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
const isMobile = window.innerWidth <= 768;
const MOBILE_GRID_SIZE = 20; // Smaller grid for mobile
const MOBILE_SNAKE_SIZE = 15; // Smaller snake size for mobile
const MOBILE_GAME_SPEED = 150; // Slower speed (higher number = slower) for mobile
const DESKTOP_GAME_SPEED = 100; // Original speed for desktop
const SNAKE_N_FOOD_SIZE = isMobile ? MOBILE_SNAKE_SIZE : 20;
const GRID_SIZE = isMobile ? MOBILE_GRID_SIZE : 30;
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
  // Hide all screens except start screen initially
  screens.forEach((screen) => {
    const element = document.getElementById(screen);
    if (element) {
      element.style.display = screen === "start" ? "block" : "none";
    }
  });

  document.getElementById("start-game-button").addEventListener("click", () => {
    showAnimation();
    setTimeout(() => {
      screens.forEach((screen) => {
        const element = document.getElementById(screen);
        if (element) {
          element.style.display = screen === "game" ? "block" : "none";
        }
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
          const element = document.getElementById(screen);
          if (element) {
            element.style.display = screen === "game" ? "block" : "none";
          }
        });
        startGame();
      }, 3000);
    });
});

function startGame() {
  // Reset game state
  snake.length = 1;
  snake[0] = {
    x: Math.floor(GRID_SIZE / 2), // Center the snake
    y: Math.floor(GRID_SIZE / 2), // Center the snake
  };
  direction.x = 0;
  direction.y = 0;
  score = 0;

  // First hide all screens
  screens.forEach((screen) => {
    const element = document.getElementById(screen);
    if (element) {
      element.style.display = "none";
    }
  });

  // Then show only game screen
  const gameScreen = document.getElementById("game");
  if (gameScreen) {
    gameScreen.style.display = "block";
  }

  updateScore();
  generateFood();
  makePlayGround();
  renderSnake();
  renderFood();
  setupControls();

  // Clear any existing interval before setting a new one
  if (gameInterval) {
    clearInterval(gameInterval);
  }
  gameInterval = null;

  const gameSpeed = isMobile ? MOBILE_GAME_SPEED : DESKTOP_GAME_SPEED;
  gameInterval = setInterval(onMove, gameSpeed);
}

function setupControls() {
  // Remove any existing event listeners to prevent duplicates
  const playground = document.getElementById("play-ground");
  const newPlayground = playground.cloneNode(true);
  playground.parentNode.replaceChild(newPlayground, playground);

  document.removeEventListener("keydown", handleKeyPress);
  document.addEventListener("keydown", handleKeyPress);

  let touchStartX = 0;
  let touchStartY = 0;

  newPlayground.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      e.preventDefault();
    },
    { passive: false }
  );

  newPlayground.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );

  // Adjust swipe sensitivity for mobile
  const minSwipeDistance = isMobile ? 20 : 30; // More sensitive on mobile

  newPlayground.addEventListener(
    "touchend",
    function (e) {
      if (!gameInterval) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      if (
        Math.abs(deltaX) > minSwipeDistance ||
        Math.abs(deltaY) > minSwipeDistance
      ) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (deltaX > 0 && direction.x !== -1) {
            direction.x = 1;
            direction.y = 0;
          } else if (deltaX < 0 && direction.x !== 1) {
            direction.x = -1;
            direction.y = 0;
          }
        } else {
          // Vertical swipe
          if (deltaY > 0 && direction.y !== -1) {
            direction.x = 0;
            direction.y = 1;
          } else if (deltaY < 0 && direction.y !== 1) {
            direction.x = 0;
            direction.y = -1;
          }
        }
      }

      e.preventDefault();
    },
    { passive: false }
  );
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
  // Adjust food generation for smaller grid on mobile
  const maxPosition = GRID_SIZE - 1;
  food.x = Math.floor(Math.random() * GRID_SIZE);
  food.y = Math.floor(Math.random() * GRID_SIZE);

  // Ensure food doesn't spawn on snake or outside grid
  while (
    isSnakeAtFood() ||
    food.x < 0 ||
    food.y < 0 ||
    food.x > maxPosition ||
    food.y > maxPosition
  ) {
    food.x = Math.floor(Math.random() * GRID_SIZE);
    food.y = Math.floor(Math.random() * GRID_SIZE);
  }
}

function renderFood() {
  const foodElement = document.getElementById("food");
  const foodSize = isMobile ? "8px" : "10px"; // Smaller food on mobile

  foodElement.style.height = foodSize;
  foodElement.style.width = foodSize;
  foodElement.style.borderRadius = "50%";
  foodElement.style.left = `${food.x * SNAKE_N_FOOD_SIZE}px`;
  foodElement.style.top = `${food.y * SNAKE_N_FOOD_SIZE}px`;
}

function renderSnake() {
  const snakeElement = document.getElementById("snake");
  snakeElement.innerHTML = "";

  const segmentSize = isMobile ? "10px" : "12px"; // Smaller snake segments on mobile

  snake.forEach((segment) => {
    const segmentElement = document.createElement("div");
    segmentElement.style.left = `${segment.x * SNAKE_N_FOOD_SIZE}px`;
    segmentElement.style.top = `${segment.y * SNAKE_N_FOOD_SIZE}px`;
    segmentElement.style.height = segmentSize;
    segmentElement.style.width = segmentSize;
    segmentElement.classList.add("snake-segment");
    snakeElement.appendChild(segmentElement);
  });
}

function makePlayGround() {
  const playground = document.getElementById("play-ground");

  // Add mobile instructions before the playground
  if (isMobile) {
    const instructions = document.createElement("div");
    instructions.className = "mobile-instructions";
    instructions.textContent =
      "Swipe inside the golden border to control the snake";
    playground.parentElement.insertBefore(instructions, playground);
  }

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
    .some((segment) => segment.x === position.x && segment.y === position.y);
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
  // Clear the game interval first
  clearInterval(gameInterval);
  gameInterval = null;

  // First hide all screens
  screens.forEach((screen) => {
    const element = document.getElementById(screen);
    if (element) {
      element.style.display = "none";
    }
  });

  // Then show only game-over screen
  const gameOverScreen = document.getElementById("game-over");
  if (gameOverScreen) {
    gameOverScreen.style.display = "block";
  }

  // Reset snake and direction
  snake.length = 1;
  snake[0] = {
    x: Math.floor(GRID_SIZE / 2),
    y: Math.floor(GRID_SIZE / 2),
  };
  direction.x = 0;
  direction.y = 0;
}
