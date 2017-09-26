const playground = document.querySelector('canvas');
const ctx = playground.getContext('2d');
document.addEventListener("keydown",moveSnake);

playground.width = 500;
playground.height = 500;

const snakeMeasurement = 20;
const snakeColor = "#ffff33";
const foodColor = "#33ff00";
let velocityX = 0;
let velocityY = 0;
let foodX = Math.random()*480;
let foodY = Math.random()*480;

let foodCollected = 3;

let snakeX = playground.width / 2 - snakeMeasurement / 2
let snakeY = playground.height / 2 - snakeMeasurement / 2

function moveSnake(ev) {
    switch (ev.keyCode) {
      case 37:
        //move left
        velocityX = -1;
        velocityY = 0;
        break;
      case 38:
        //move up
        velocityX = 0;
        velocityY = -1;
        break;
      case 39:
        //move right
        velocityX = 1;
        velocityY = 0;
        break;
      case 40:
        //move down
        velocityX = 0;
        velocityY = 1;
        break;
    }
}
function drawSnake(snakeBlocks) {
        ctx.fillStyle = snakeColor;
        ctx.fillRect(snakeX,snakeY+(snakeBlocks*25),snakeMeasurement,snakeMeasurement);
        snakeX += velocityX;
        snakeY += velocityY;
}

function drawSnakeFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX,foodY,snakeMeasurement,snakeMeasurement);
}

function drawPlayground() {
    ctx.fillStyle = "#000";
      ctx.fillRect(0,0,playground.width,playground.height);
}

function detectCollision() {
  if(snakeY <= 0 || snakeY >= 500 || snakeX <= 0 || snakeX >= 500 ) {
    for(let i = 0; i < foodCollected; i++)
    {
      ctx.fillStyle = snakeColor;
      ctx.fillRect(snakeX,snakeY+(i*25),snakeMeasurement,snakeMeasurement);
    }
    //for later use... disabled in production.
    //alert("Game over! Your score: "+(foodCollected-3)+" points. Wanna play again?");
    //location.reload();
  }
  else {
    for(let i = 0; i < foodCollected; i++)
    {
      drawSnake(i);
    }
  }
}

function gameInit() {
  drawPlayground();
  detectCollision();
  drawSnakeFood();
}
setInterval(gameInit,1000/60);
