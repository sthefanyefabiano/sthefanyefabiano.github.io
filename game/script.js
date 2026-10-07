let score = 0;

let misses = 0;

const maxMisses = 3;

let fallingSpeed = 2;

let gameRunning = true;

let animationId;

const flowerImages = [
    "images/arquivo_1_girassol.png",
    "images/arquivo_2_orquidea.png",
    "images/arquivo_3_rosa.png",
    "images/arquivo_4_margarida.png",
    "images/arquivo_5_tulipa.png"
];

let flowerIndex = -1;


/* =========================
   ELEMENTOS DO JOGO
========================= */

const gameContainer =
    document.getElementById("game-container");

const catcher =
    document.getElementById("catcher");

const fallingObject =
    document.getElementById("falling-object");

const scoreDisplay =
    document.getElementById("score");

const missesDisplay =
    document.getElementById("misses");

const gameOverScreen =
    document.getElementById("game-over");

const finalScore =
    document.getElementById("final-score");

const restartButton =
    document.getElementById("restartButton");

const leftButton =
    document.getElementById("leftButton");

const rightButton =
    document.getElementById("rightButton");


/* =========================
   POSIÇÃO DO CATCHER
========================= */

let catcherPosition =
    gameContainer.offsetWidth / 2 -
    catcher.offsetWidth / 2;


/* =========================
   OBJETO CAINDO
========================= */

let fallingObjectPosition = {
    x: Math.random() *
        (gameContainer.offsetWidth -
        fallingObject.offsetWidth),

    y: 0
};


/* =========================
   MOVIMENTO DO CATCHER
========================= */

function moveCatcher(direction) {

    const movement = 6;

    if (direction === "left") {

        catcherPosition -= movement;

    }

    if (direction === "right") {

        catcherPosition += movement;

    }

    /*
       Impede o catcher de sair
       dos limites do jogo.
    */

    if (catcherPosition < 0) {

        catcherPosition = 0;

    }

    if (
        catcherPosition >
        gameContainer.offsetWidth -
        catcher.offsetWidth
    ) {

        catcherPosition =
            gameContainer.offsetWidth -
            catcher.offsetWidth;

    }

    catcher.style.left =
        `${catcherPosition}px`;
}


/* =========================
   TECLADO
========================= */

document.addEventListener("keydown", function(event) {

    if (!gameRunning) {
        return;
    }

    if (event.key === "ArrowLeft") {

        moveCatcher("left");

    }

    if (event.key === "ArrowRight") {

        moveCatcher("right");

    }

});


/* =========================
   CONTROLE MOBILE
========================= */

let movingLeft = false;

let movingRight = false;


/*
   Começar movimento
*/

leftButton.addEventListener(
    "pointerdown",
    function(event) {

        event.preventDefault();

        movingLeft = true;

    }
);


rightButton.addEventListener(
    "pointerdown",
    function(event) {

        event.preventDefault();

        movingRight = true;

    }
);


/*
   Parar movimento
*/

leftButton.addEventListener(
    "pointerup",
    function() {

        movingLeft = false;

    }
);


rightButton.addEventListener(
    "pointerup",
    function() {

        movingRight = false;

    }
);


/*
   Também para caso o dedo
   saia do botão.
*/

leftButton.addEventListener(
    "pointerleave",
    function() {

        movingLeft = false;

    }
);


rightButton.addEventListener(
    "pointerleave",
    function() {

        movingRight = false;

    }
);


/*
   Se o usuário tirar o dedo
   da tela de outra forma.
*/

leftButton.addEventListener(
    "pointercancel",
    function() {

        movingLeft = false;

    }
);


rightButton.addEventListener(
    "pointercancel",
    function() {

        movingRight = false;

    }
);


/* =========================
   OBJETO CAINDO
========================= */

function moveFallingObject() {

    fallingObjectPosition.y +=
        fallingSpeed;

    fallingObject.style.top =
        `${fallingObjectPosition.y}px`;

    fallingObject.style.left =
        `${fallingObjectPosition.x}px`;


    /*
       Verifica se o objeto
       foi pego pelo catcher.
    */

    if (

        fallingObjectPosition.y +
        fallingObject.offsetHeight >=
        catcher.offsetTop &&

        fallingObjectPosition.x +
        fallingObject.offsetWidth >=
        catcherPosition &&

        fallingObjectPosition.x <=
        catcherPosition +
        catcher.offsetWidth

    ) {

        score++;

        scoreDisplay.textContent =
            `Score: ${score}`;

        /*
           Aumenta um pouco
           a velocidade.
        */

        fallingSpeed += 0.1;

        resetFallingObject();

    }


    /*
       Verifica se o objeto
       caiu no chão.
    */

    if (
        fallingObjectPosition.y >
        gameContainer.offsetHeight
    ) {

        misses++;

        missesDisplay.textContent =
            `Misses: ${misses} / ${maxMisses}`;

        /*
           Verifica Game Over
        */

        if (misses >= maxMisses) {

            endGame();

            return;

        }

        resetFallingObject();

    }

}


/* =========================
   RESETAR OBJETO
========================= */

function resetFallingObject() {

    flowerIndex =
        (flowerIndex + 1) % flowerImages.length;

    fallingObject.style.backgroundImage =
        `url("${flowerImages[flowerIndex]}")`;

    fallingObjectPosition = {

        x: Math.random() *
            (
                gameContainer.offsetWidth -
                fallingObject.offsetWidth
            ),

        y: 0

    };

}


/* =========================
   GAME OVER
========================= */

function endGame() {

    gameRunning = false;

    /*
       Para o game loop.
    */

    cancelAnimationFrame(animationId);

    /*
       Mostra a tela de Game Over.
    */

    gameOverScreen.style.display =
        "flex";

    finalScore.textContent =
        `Final Score: ${score}`;

}


/* =========================
   REINICIAR JOGO
========================= */

function restartGame() {

    score = 0;

    misses = 0;

    fallingSpeed = 2;

    gameRunning = true;

    flowerIndex = -1;


    scoreDisplay.textContent =
        "Score: 0";

    missesDisplay.textContent =
        "Misses: 0 / 3";


    catcherPosition =
        gameContainer.offsetWidth / 2 -
        catcher.offsetWidth / 2;


    catcher.style.left =
        `${catcherPosition}px`;


    resetFallingObject();


    gameOverScreen.style.display =
        "none";


    /*
       Começa o jogo novamente.
    */

    gameLoop();

}


/* =========================
   BOTÃO RESTART
========================= */

restartButton.addEventListener(
    "click",
    restartGame
);


/* =========================
   GAME LOOP
========================= */

function gameLoop() {

    if (!gameRunning) {
        return;
    }


    /*
       Movimento contínuo
       dos botões mobile.
    */

    if (movingLeft) {

        moveCatcher("left");

    }

    if (movingRight) {

        moveCatcher("right");

    }


    /*
       Move o objeto.
    */

    moveFallingObject();


    /*
       Próximo frame.
    */

    animationId =
        requestAnimationFrame(gameLoop);

}


/* =========================
   INICIAR JOGO
========================= */

resetFallingObject();

gameLoop();