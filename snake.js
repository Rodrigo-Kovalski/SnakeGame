var canvas;
var ctx;

var pixel = 15;
var snakeX = snakeY = 1;
var snake = [];
snake[0] = {
	x: 8 * pixel,
	y: 8 * pixel
}

var apple = {
	x : 0,
	y : 0
}

var gameover;

var direction = "RIGHT";

	window.onload = function(){
		canvas = document.getElementById("game");
		ctx = canvas.getContext("2d");

		document.addEventListener("keydown",updateDirection);

		gameover = setInterval(drawGame,1000/10);
	}

	function updateDirection(event){
		var key = event.keyCode;
		if(key == 37 && direction != "RIGHT") direction = "LEFT";
		if(key == 38 && direction != "DOWN") direction = "UP";
		if(key == 39 && direction != "LEFT") direction = "RIGHT";
		if(key == 40 && direction != "UP") direction = "DOWN";
	}

	function insertApple(){
		apple.x = Math.floor(Math.random()* 40) * pixel;
		apple.y = Math.floor(Math.random()* 40) * pixel;
	}

	function drawMap(){
		ctx.fillStyle = 'Black';
		ctx.fillRect(0,0,40*pixel,40*pixel);
	}

	function drawSnake(){

		//Testa se a cobra atingiu alguma borda e define cabeça na borda contrária.
		if(snake[0].x >= 40*pixel && direction == "RIGHT") snake[0].x = 0;
		if(snake[0].x < 0 && direction == "LEFT") snake[0].x = 40*pixel;
		if(snake[0].y >= 40*pixel && direction == "DOWN") snake[0].y = 0;
		if(snake[0].y < 0 && direction =="UP") snake[0].y = 40*pixel;	

		//Desenha corpo da cobra.
		ctx.fillStyle = 'Green';
		for (var i = 0 ; i < snake.length ; i++){
			ctx.fillRect(snake[i].x, snake[i].y,pixel,pixel);
			ctx.fillStyle = '#329c3a';
		}
	}

	function moveSnake(){
		snakeX = snake[0].x;
		snakeY = snake[0].y;
		if(direction == "LEFT") snakeX -= pixel;
		if(direction == "UP") snakeY -= pixel;
		if(direction == "RIGHT") snakeX += pixel;
		if(direction == "DOWN") snakeY += pixel;

		snake.pop();

		var newHead = {
			x: snakeX,
			y: snakeY
		}

		snake.unshift(newHead);
	}

	function drawGame(){
		drawMap();
		drawSnake();
		moveSnake();

		ctx.fillStyle = "Red";
		ctx.fillRect(apple.x,apple.y,pixel,pixel);

		if(snakeX == apple.x && snakeY == apple.y){
			snake.push(snakeX,snakeY);
			insertApple();
		}

		for(var i = 1 ; i < snake.length ; i++){
			if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
				clearInterval(gameover);
				ctx.font = "30px Georgia";
				ctx.fillStyle = "yellow";
				ctx.fillText("GAME OVER",15*pixel, 20*pixel);
			}
		}
	}