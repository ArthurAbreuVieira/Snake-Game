const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const elementSize = 20; // DEFAULT = 20;
const canvasBlockSize = 28; // DEFAULT = 28;

canvas.setAttribute("width", elementSize*canvasBlockSize);
canvas.setAttribute("height", elementSize*canvasBlockSize);

let startedGame = false;
let loop;
let direction = undefined;

let dificultyLevel;
let score = 0;

let snake = [
    {
        x:Math.floor((Math.random()*((canvasBlockSize*elementSize-elementSize*2)-elementSize*2)+elementSize*2)/elementSize)*elementSize,
        y:Math.floor((Math.random()*((canvasBlockSize*elementSize-elementSize*2)-elementSize*2)+elementSize*2)/elementSize)*elementSize,
    }
];
const food = {
    x:Math.floor((Math.random()*((canvasBlockSize*elementSize-elementSize*6)-elementSize*6)+elementSize*6)/elementSize)*elementSize,
    y:Math.floor((Math.random()*((canvasBlockSize*elementSize-elementSize*6)-elementSize*6)+elementSize*6)/elementSize)*elementSize,
}

//Sounds
const eatSound = new Audio("./assets/sounds/eat.wav");
const gameOverSound = new Audio("./assets/sounds/game_over.wav");
// const eatSound = new Audio("./assets/sounds/eat.wav");

function drawStage(){
    ctx.fillStyle = "rgba(0,0,0,.65)";
    ctx.fillRect(0,0,elementSize*canvasBlockSize,elementSize*canvasBlockSize);
}

const scoreHTML = document.querySelector(".score");
function updateScore(){
    if(snake.length % 10 === 0)score+=10;
    else score+=5;

    scoreHTML.innerText = score;
}

function defineSnakeLengthStart(len = 1){
    if(len <= 0)len = 1;
    for (let i = 1; i < len; i++) {
        snake.push({
            x:snake[0].x+elementSize*i,
            y:snake[0].y
        })    
    }
}

function drawSnake(){
    for (let i = 0; i < snake.length; i++) {
        if(i % 5 == 0)ctx.fillStyle = "#ff4800";
        else if(i % 3 == 0)ctx.fillStyle = "#ff6200";
        else if(i % 2 == 0)ctx.fillStyle = "#ff8000";
        else ctx.fillStyle = "#ffa200";
        
        
        /* Snake body gradient
        const gradient = ctx.createLinearGradient(snake[i].x,snake[i].y,snake[i].x+elementSize,snake[i].y+elementSize);

        if(i % 5 == 0){
            gradient.addColorStop(0, "#ff4800");
            gradient.addColorStop(1, "#ffa200");
        }
        else if(i % 3 == 0){
            gradient.addColorStop(0, "#ff6200");
            gradient.addColorStop(1, "#ff4800");
        }
        else if(i % 2 == 0){
            gradient.addColorStop(0, "#ff8000");
            gradient.addColorStop(1, "#ff4800");
        }
        else{
            gradient.addColorStop(0, "#ffa200");
            gradient.addColorStop(1, "#ff8000");
        }

        ctx.fillStyle = gradient;
        */

        ctx.fillRect(snake[i].x,snake[i].y,elementSize,elementSize);
    }
}

function snakeEat(){
    const newHead = {
        x:snake[0].x,
        y:snake[0].y
    }
    snake.unshift(newHead);

    if(snake[0].x == food.x && snake[0].y == food.y){
        food.x = food.y = Math.floor((Math.random()*((canvasBlockSize*elementSize-elementSize*2)-elementSize*2)+elementSize*2)/elementSize)*elementSize;
        updateScore();
        lengthHTML.innerText = snake.length;
        eatSound.play();
    }else{
        snake.pop();
    }
}
function moveSnake(){
    if(direction)startedGame=true;
    
    if(snake[0].x < 0)snake[0].x = canvasBlockSize*elementSize;
    if(snake[0].x > canvasBlockSize*elementSize)snake[0].x = 0;
    if(snake[0].y < 0)snake[0].y = canvasBlockSize*elementSize;
    if(snake[0].y > canvasBlockSize*elementSize)snake[0].y = 0;

    if(direction == "up")snake[0].y -= elementSize;
    if(direction == "left")snake[0].x -= elementSize;
    if(direction == "down")snake[0].y += elementSize;
    if(direction == "right")snake[0].x += elementSize;
}
function snakeCollision(){
    if(startedGame){
        for (let i = 1; i < snake.length; i++) {
            if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) gameOver();
        }
    }
}

function drawFood(){
    ctx.fillStyle = "#00b02c";
    ctx.fillRect(food.x,food.y,elementSize,elementSize);
}

function updateDirection(event){
    if((event.key == 'w' || event.key == 'W' || event.key == 'ArrowUp') && direction != "down"){
        setTimeout(()=>direction = "up", dificultyLevel+1);
    }
    if((event.key == 'a' || event.key == 'A' || event.key == 'ArrowLeft') && direction != "right"){
        // direction = "left";
        setTimeout(()=>direction = "left", dificultyLevel+1);
    }
    if((event.key == 's' || event.key == 'S' || event.key == 'ArrowDown') && direction != "up"){
        // direction = "down";
        setTimeout(()=>direction = "down", dificultyLevel+1);
    }
    if((event.key == 'd' || event.key == 'D' || event.key == 'ArrowRight') && direction != "left"){
        // direction = "right";
        setTimeout(()=>direction = "right", dificultyLevel+1);
    }
}

function defineFirstDirection(){
    const firstDirection = Math.floor(Math.random()*(4-1+1)+1);
    if(firstDirection === 1)direction = "up";
    else if(firstDirection === 2)direction = "left";
    else if(firstDirection === 3)direction = "down";
    else if(firstDirection === 4)direction = "right";
}

function startGame(dificulty){
    defineFirstDirection();
    
    disableMenu("disable");
    startedGame = true;

    document.documentElement.requestFullscreen();

    if(dificulty === 1)dificultyLevel = 80;
    else if(dificulty === 2)dificultyLevel = 50;
    else if(dificulty === 3)dificultyLevel = 30;
    loop = setInterval(updateGame, dificultyLevel);  
}
function restartGame(){
    clearInterval(loop);

    snake = [];
    snake.unshift({
        x:Math.floor((Math.random()*((canvasBlockSize*elementSize-elementSize*2)-elementSize*2)+elementSize*2)/elementSize)*elementSize,
        y:Math.floor((Math.random()*((canvasBlockSize*elementSize-elementSize*2)-elementSize*2)+elementSize*2)/elementSize)*elementSize,
    });
    defineSnakeLengthStart(snakeLength);

    scoreHTML.innerText = score = 0;
    lengthHTML.innerText = snakeLength;

    startGame(dificulty);
}
function gameOver(){
    drawSnake();
    clearInterval(loop);

    disableMenu("enable");
    startedGame = false;

    const restartButtonCanvas = document.createElement("div");
    restartButtonCanvas.classList.add("restart-btn-cnv");
    const buttonText = document.createElement("p");
    buttonText.innerText = "Restart";

    gameContainer.appendChild(restartButtonCanvas);
    restartButtonCanvas.appendChild(buttonText);
    verifyButtonInCanvas();
    gameOverSound.play();
}

function updateGame(){
    window.addEventListener("keydown", updateDirection);
    drawStage();
    drawFood();
    drawSnake();
    snakeEat();
    moveSnake();
    snakeCollision();
}

drawStage();
drawFood();
drawSnake();