const playground = document.querySelector('canvas');
const ctx = playground.getContext('2d');

playground.width = 500;
playground.height = 500;

const snakeMeasurement = 15;
const snakeColor = "#ffff33";

function drawPlayground() {
      ctx.fillRect(0,0,playground.width,playground.height);
}
function drawSnake() {
      ctx.fillStyle = snakeColor;
      ctx.fillRect(playground.width/2-10,playground.height/2-10,snakeMeasurement,snakeMeasurement);
}
drawPlayground();
drawSnake();
