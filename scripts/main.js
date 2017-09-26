
  const playground = document.querySelector('canvas');
  const ctx = playground.getContext('2d');

playground.width = 500;
playground.height = 500;

const snakeMeasurement = 20;
const snakeColor = "#ffff33";
const foodColor = "#33ff00";
let snakeSpeed = 1.1;
let foodX = Math.random()*480;
let foodY = Math.random()*480;

let foodCollected = 3;

let snakeX = playground.width / 2 - snakeMeasurement / 2
let snakeY = playground.height / 2 - snakeMeasurement / 2

function drawSnake(parts) {
        ctx.fillStyle = snakeColor;
        ctx.fillRect(snakeX,snakeY+(parts*25),snakeMeasurement,snakeMeasurement);
        snakeY -= snakeSpeed;
}

function drawSnakeFood()
{
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX,foodY,snakeMeasurement,snakeMeasurement);
}

function drawPlayground() {
    ctx.fillStyle = "#000";
      ctx.fillRect(0,0,playground.width,playground.height);
}

function detectCollision()
{
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

function gameInit()
{
  drawPlayground();
  detectCollision();
  drawSnakeFood();
}

setInterval(gameInit,1000/60);
