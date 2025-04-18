import { manager } from './main.js'

document.body.style.overflowY = "hidden"; 
let divProg = document.createElement("div");
divProg.id = "progress";
document.body.appendChild(divProg);

document.getElementById("progress").innerHTML = `
	<style>
		#loading-bar {
			position: fixed;
			z-index: 5;
			width: 100vw;
			height: 100vh;
			margin: auto;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			font-family: Verdana;
			font-weight: bold;
			animation: loading0 2.5s;
		}

		#loading-bar > img {
			width: 5vw;
			height: 5vw;
		}

		#loading-text {
			font-size: 60px;
			color: #ffffff;
			animation: loading2 5s -1s both infinite;
		}

		#loading-1 {
			animation: loading1 5s -1s both infinite;
			opacity: 40%;
		}

		#loading-2 {
			animation: loading1 5s 0s both infinite;
			opacity: 40%;
		}

		#loading-3 {
			animation: loading1 5s 1s both infinite;
			opacity: 40%;
		}

		#loading-4 {
			animation: loading1 5s 2s both infinite;
			opacity: 40%;
		}

		#loading-5 {
			animation: loading1 5s 3s both infinite;
			opacity: 40%;
		}
		
		@keyframes loading0 {
			0% {opacity: 0%;}
			100% {opacity: 100%;}
		}

		@keyframes loading1 {
			0% {opacity: 40%;}
			20% {opacity: 100%;}
			40% {opacity: 40%;}
			100% {opacity: 40%;}
		}

		@keyframes loading2 {
			0% {color: #00B456;}
			20% {color: #FF0027;}
			40% {color: #FF5500;}
			60% {color: #004AE7;}
			80% {color: #FFFF00;}
			100% {color: #00B456;}
		}
		
		#loading-background {
			position: fixed;
			z-index: 4;
			width: 100vw;
			height: 100vh;
			background-color: #1a1a1a;
		}

	</style>
	<div id="loading-background">
		<div id="loading-bar">
			<div id="loading-text"></div>
			<img id="loading-1" src="images/x.webp" draggable="false">
			<img id="loading-2" src="images/o.webp" draggable="false">
			<img id="loading-3" src="images/b.webp" draggable="false">
			<img id="loading-4" src="images/s.webp" draggable="false">
			<img id="loading-5" src="images/t.webp" draggable="false">
		</div>
	</div>
`;

manager.onLoad = function ( ) {
	document.getElementById('loading-bar').style.animation = "loading0 1.5s reverse both";
	document.getElementById('loading-background').style.animation = "loading0 1s 1.7s reverse both";
	document.getElementById("navigation").hidden = false;
	setTimeout(() => {
		document.body.style.overflowY = "scroll"; 
		document.getElementById("progress").remove();
	}, 3000);
};