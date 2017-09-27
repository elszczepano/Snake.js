const playground = document.querySelector('canvas');
const ctx = playground.getContext('2d');
document.addEventListener("keydown",moveSnake);

playground.width = 500;
playground.height = 500;

const gridSize = 20;
const snakeColor = "#ffff33";
const foodColor = "#33ff00";
let tileCount = playground.width/gridSize;
let velocityX = 0;
let velocityY = 0;
let trail = [];
let snakeTail = 5;
let foodX = Math.floor(Math.random()*tileCount);
let foodY = Math.floor(Math.random()*tileCount);

let snakeX = playground.width / 2 - gridSize / 2;
let snakeY = playground.height / 2 - gridSize / 2;

function drawPlayground() {
    ctx.fillStyle = "#000";
      ctx.fillRect(0,0,playground.width,playground.height);
}

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

function drawSnakeFood() {
        if(snakeX==foodX && snakeY==foodY) {
          snakeTail++;
          foodX = Math.floor(Math.random()*tileCount);
          foodY = Math.floor(Math.random()*tileCount);
          }
          ctx.fillStyle = foodColor;
          ctx.fillRect(foodX * gridSize,foodY * gridSize,gridSize-2,gridSize-2);
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
            if(trail[i].x == snakeX && trail[i].y == snakeY) {
                snakeTail = 5;
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

// function detectCollision() {
//   if(!(snakeY <= 0 || snakeY >= playground.width || snakeX <= 0 || snakeX >= playground.height )) {
//
//   }
//   else {
//     //for later use... disabled in production.
//     //alert("Game over! Your score: "+(snakeTail-5)+" points. Wanna play again?");
//     //location.reload();
//   }
// }
setInterval(gameInit,100);
