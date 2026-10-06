let score = 0;
const gameContainer = document.getElementById('game-container');
const catcher = document.getElementById('catcher');
const fallingObject = document.getElementById('falling-object');
const scoreDisplay = document.getElementById('score');

let catcherPosition = gameContainer.offsetWidth / 2 - catcher.offsetWidth / 2;
let fallingObjectPosition = { x: Math.random() * (gameContainer.offsetWidth - fallingObject.offsetWidth), y: 0 };
let fallingSpeed = 2;

// Function to move the catcher left and right
function moveCatcher(event) {
    if (event.key === 'ArrowLeft' && catcherPosition > 0) {
        catcherPosition -= 20;
    } else if (event.key === 'ArrowRight' && catcherPosition < gameContainer.offsetWidth - catcher.offsetWidth) {
        catcherPosition += 20;
    }
    catcher.style.left = `${catcherPosition}px`;
}

// Function to move the falling object
function moveFallingObject() {
    fallingObjectPosition.y += fallingSpeed;
    fallingObject.style.top = `${fallingObjectPosition.y}px`;
    fallingObject.style.left = `${fallingObjectPosition.x}px`;

    // Check if the object is caught
    if (
        fallingObjectPosition.y + fallingObject.offsetHeight >= catcher.offsetTop &&
        fallingObjectPosition.x + fallingObject.offsetWidth >= catcherPosition &&
        fallingObjectPosition.x <= catcherPosition + catcher.offsetWidth
    ) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        resetFallingObject();
    }

    // Reset the object if it falls out of bounds
    if (fallingObjectPosition.y > gameContainer.offsetHeight) {
        resetFallingObject();
    }
}

// Function to reset the falling object position
function resetFallingObject() {
    fallingObjectPosition = { x: Math.random() * (gameContainer.offsetWidth - fallingObject.offsetWidth), y: 0 };
    fallingSpeed += 0.1; // Increase speed slightly after each catch
}

// Game loop
function gameLoop() {
    moveFallingObject();
    requestAnimationFrame(gameLoop);
}

// Start the game
document.addEventListener('keydown', moveCatcher);
gameLoop();


// Wait for the document to load
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton");
    const startPage = document.getElementById("startPage");
    const gameContainer = document.getElementById("gameContainer");

    startButton.addEventListener("click", function() {
        // Hide the start page
        startPage.style.display = "none";

        // Show the game container
        gameContainer.style.display = "block";

        // Call a function to start the game
        startGame();
    });
});

function startGame() {
    // Initialize your game logic here
    console.log("Game Started!");
    // For example: start falling objects, reset scores, etc.
}