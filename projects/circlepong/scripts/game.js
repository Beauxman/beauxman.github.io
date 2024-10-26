const screen = document.getElementsByClassName("screen")[0];
const board = document.getElementsByClassName("board")[0];
const ball = document.getElementsByClassName("ball")[0];
const paddle = document.getElementsByClassName("paddle")[0];
const score = document.getElementsByClassName("score")[0];

var boardPos = board.getBoundingClientRect();
var ballPos = ball.getBoundingClientRect();
var paddleAngle = 0;

function radToDeg(val) {
	return (val * 180 / Math.PI + 180);
}

function degToRad(val) {
	return (val * Math.PI / 180 - 180);
}

function game() {
	var clickFunc;
	var movFunc;
	var gameTickSpeed = 5;
	var currentScore = 0;
	var startBallSpeed = board.getBoundingClientRect().width / 200;
	var ballSpeed = startBallSpeed;
	var ballDir = Math.floor(Math.random() * 360);
	var canHitAgain = true;
	
	var gameLoop = setInterval(onTimerTick, gameTickSpeed);
	
	ball.style = "margin-left: " + ((boardPos.height / 2) -  (ballPos.height / 2)) + "px; margin-top: " + ((boardPos.width / 2) - (ballPos.width / 2)) + "px;";
	
	board.addEventListener("mousemove", movFunc = function(event) {
		boardPos = board.getBoundingClientRect();
		var paddlePos = paddle.getBoundingClientRect();
		var newPaddleHeight = (boardPos.width / 3);
		
		var pX = (boardPos.width / 2);
		var pY = (boardPos.height / 2);
		var x = event.clientX;
		var y = event.clientY;
		
		x -= boardPos.left;
		y -= boardPos.top;
		
		var atan = Math.atan2(y - pY, x - pX);
		paddleAngle = radToDeg(atan);
		
		pY += Math.sin(atan) * (boardPos.width / 2.5);
		pX += Math.cos(atan) * (boardPos.width / 2.5);

		paddle.style = "height: " + newPaddleHeight 
					+ "px;  margin-left: " + (pX - (newPaddleHeight / 20))  
					+ "px; margin-top: " + (pY - (newPaddleHeight / 2)) 
					+ "px; transform: rotate(" + paddleAngle  + "deg)";
	});
	
	function onTimerTick() {
		ballPos = ball.getBoundingClientRect();
		boardPos = board.getBoundingClientRect();
		paddlePos = paddle.getBoundingClientRect();

		var pX = (boardPos.width / 2);
		var pY = (boardPos.height / 2);
		
		x = ballPos.x - boardPos.left;
		y = ballPos.y - boardPos.top;
		
		var atan = Math.atan2(y - pY, x - pX);
		var ballAngle = radToDeg(atan);
		
		
		x += Math.cos(degToRad(ballDir)) * ballSpeed;
		y += Math.sin(degToRad(ballDir)) * ballSpeed;
		
		var dist = Math.sqrt(Math.pow((x - pX), 2) + Math.pow((y - pY), 2));
					
		ball.style = "margin-left: " + x + "px; margin-top: " + y + "px;";
		score.innerHTML = currentScore;
		
		if (dist > (boardPos.width / 3) && dist < (boardPos.width / 2.5)) {
			if (Math.abs(ballAngle - paddleAngle) <= 25) {
				if (canHitAgain) {
					ballDir += Math.random() * (220 - 140) + 140;
					ballDir = ballDir % 360;
					ballSpeed += 1;
					currentScore++;
					canHitAgain = false;
					setTimeout(() => {
						canHitAgain = true;
					}, 200);
				}
			}
		}	
		if (dist > (boardPos.width)) {
			currentScore = 0;
			ballSpeed = startBallSpeed;
			ballDir = Math.floor(Math.random() * 360);
			ball.style = "margin-left: " + ((boardPos.height / 2) -  (ballPos.height / 2)) + "px; margin-top: " + ((boardPos.width / 2) - (ballPos.width / 2)) + "px;";
		}
	}
}

game();