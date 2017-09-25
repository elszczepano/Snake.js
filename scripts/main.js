
  const playground = document.querySelector('canvas');
  const ctx = playground.getContext('2d');

playground.width = 500;
playground.height = 500;

const snakeMeasurement = 20;
const snakeColor = "#ffff33";
const foodColor = "#33ff00";
const snakeSpeed = 1.2;
let foodX = Math.random()*480;
let foodY = Math.random()*480;

let foodCollected = 3;

let snakeX = playground.width / 2 - snakeMeasurement / 2
let snakeY = playground.height / 2 - snakeMeasurement / 2

function drawSnake() {
      ctx.fillStyle = snakeColor;
      for(let i=0; i<foodCollected; i++)
      {
        ctx.fillRect(snakeX,snakeY+(i*25),snakeMeasurement,snakeMeasurement);
        snakeY -= snakeSpeed;
      }
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
function gameInit()
{
  drawPlayground();
  drawSnake();
  drawSnakeFood();
}
setInterval(gameInit,20);
