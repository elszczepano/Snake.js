const playground = document.querySelector('canvas');
const ctx = playground.getContext('2d');
const score = document.querySelector('scoreBox');
document.addEventListener("keydown",moveSnake);

playground.width = 500;
playground.height = 500;

const gridSize = 20;
const snakeColor = "#ffff99";
const foodColor = "#990033";
let tileCount = playground.width/gridSize;
let velocityX = 0;
let velocityY = 0;
let trail = [];
let snakeTail = 5;

function getRandomTileCoord() {
  return Math.floor(Math.random()*tileCount);
}

let foodX = getRandomTileCoord();
let foodY = getRandomTileCoord();

let snakeX = playground.width / 2 - gridSize / 2;
let snakeY = playground.height / 2 - gridSize / 2;

function drawPlayground() {
    ctx.fillStyle = "#000";
      ctx.fillRect(0,0,playground.width,playground.height);
}
function moveSnake(ev) {
	const oldX = velocityX;
	const oldY = velocityY;
	
    switch (ev.keyCode) {
      case 37:
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
	
    // don't allow moving in the opposite direction
	// as it would end with suicide
    if((velocityX !== 0 && oldX !== 0 && velocityX !== oldX)
        || (velocityY !== 0 && oldY !== 0 && velocityY !== oldY))
    {
        velocityX = oldX;
        velocityY = oldY;
	}
}
function drawSnakeFood() {
        if(snakeX==foodX && snakeY==foodY) {
          snakeTail++;
          scoreBox.innerHTML = snakeTail-5;
          foodX = getRandomTileCoord();
          foodY = getRandomTileCoord();
          }
          ctx.fillStyle = foodColor;
          ctx.fillRect(foodX * gridSize,foodY * gridSize,gridSize-2,gridSize-2);
          }

function onGameOver() {
	alert("Game over! Your score: "+(snakeTail-5)+" points. Wanna play again?");
    location.reload();
}

function drawSnake() {
         snakeX += velocityX;
         snakeY += velocityY;
        if(snakeX < 0) {
          snakeX = tileCount-1;
        }
        if(snakeX > tileCount-1) {
          snakeX = 0;
        }
        if(snakeY < 0) {
          snakeY = tileCount-1;
        }
        if(snakeY > tileCount-1) {
          snakeY = 0;
        }
        drawPlayground();
        ctx.fillStyle = snakeColor;
        for(let i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * gridSize,trail[i].y * gridSize,gridSize-2,gridSize-2);
            if((trail[i].x == snakeX && trail[i].y == snakeY)&&(snakeX!=0||snakeY!=0)) {
                ctx.fillRect(trail[i].x * gridSize,trail[i].y * gridSize,gridSize-2,gridSize-2);
                setTimeout(onGameOver, 100);
            }
        }
        trail.push({x:snakeX,y:snakeY});
        while(trail.length>snakeTail) {
        trail.shift();
        }
}
function gameInit() {
  drawSnake();
  drawSnakeFood();
}
setInterval(gameInit,100);
