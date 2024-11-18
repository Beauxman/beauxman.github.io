let divNav = document.createElement("div");
divNav.id = "navigation";
document.body.appendChild(divNav);

document.getElementById("navigation").hidden = true;
document.getElementById("navigation").innerHTML = `
	<style>
		#nav {
			position: fixed;
			z-index: 2;
			-background-color: rgba(55, 55, 55, 0.2);
			width: 100vw;
			height: 50px;
			padding-left: 30px;
			padding-right: 30px;
			padding-top: 2px;
			padding-bottom: 2px;
			color: #f2f2f2;;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 1.2vw;
			overflow: hidden;
			backdrop-filter: blur(15px);
			
		}
		
		#nav-icons {
			align-items: center;
			padding-left: 0.5vw;
			padding-right: 0.5vw;
		}
		
		#nav-icons > img {
			width: 2vw;
			height: 2vw;
			filter: saturate(0%);
		}
		
		#nav-options {
			width: 80%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		
		.nav-option {
			margin-right: 6%;
			padding-left: 2%;
			padding-right: 2%;
			height: 100%;
			border-radius: 2px;
			cursor: pointer;
			display: flex;
			align-items: center;
		}
		
		.nav-option-2 {
			padding: 5px;
			padding-left: 2%;
			padding-right: 2%;
			border-radius: 20px;
			font-family: Pacifico;
			cursor: pointer;
			display: inline;
		}
		
		.nav-option:hover, .nav-option-2:hover {
			background-color: #ffffff;
			color: #444444;
			transition: 0.5s;
		}
		
		.nav-option-2:hover {
			color: #000000;
		}
		
		#nav-links {
			height: 100%;
			font-family: Pacifico;
			display: flex;
			align-items: center;
			justify-content: space-evenly;
		}
		
		#nav-home:hover {
			background-color: #FF0027;
		}
		
		#nav-about:hover {
			background-color: #FF5500;
		}
		
		#nav-link:hover {
			background-color: #004AE7;
		}
		
		#nav-skills:hover {
			background-color: #FFFF00;
		}
		
		#nav-projects:hover {
			background-color: #00E76E;
		}
		
		.nav-red {
			background-color: #FF0027;
			color: #444444;
			transition: 0.5s;
		}
		
		.nav-orange {
			background-color: #FF5500;
			color: #444444;
			transition: 0.5s;
		}
		
		.nav-blue {
			background-color: #004AE7;
			color: #444444;
			transition: 0.5s;
		}
		
		.nav-yellow {
			background-color: #FFFF00;
			color: #444444;
			transition: 0.5s;
		}
		
		.nav-green {
			background-color: #00E76E;
			color: #444444;
			transition: 0.5s;
		}
		
		.nav-saturate {
			filter: saturate(100%) !important;
			ransition: 0.5s;
		}
		
		#nav-other {
			width: 100%;
			margin-left: 20%;
		}
		
		#nav-other {
			width: 100%;
			margin-left: 20%;
		}
		
		#nav-title {
			color: #222222;
			background-color: #ffffff;
			border-radius: 10px;
			padding: 5px;
			padding-left: 5%;
			padding-right: 5%;
			margin-left: 4%;
			cursor: pointer;
			display: inline;
		}
		
		#nav-title:hover {
			background-color: #222222;
			color: #ffffff;
			transition: 0.5s;
		}
		
		@media (width <= 1100px) {
			#nav {
			}		
		}
	</style>
	<div id="nav">
		<div id="nav-icons">
			<img id="nav-x" src="images/x.webp" draggable="false">
			<img id="nav-o" src="images/o.webp" draggable="false">
			<img id="nav-c" src="images/b.webp" draggable="false">
			<img id="nav-s" src="images/s.webp" draggable="false">
			<img id="nav-t" src="images/t.webp" draggable="false">
		</div>
		<div id="nav-options">
			<div id="nav-links">
				<span id="nav-home" class="nav-option">Home</span>
				<span id="nav-about" class="nav-option">About</span>
				<span id="nav-link" class="nav-option">Links</span>
				<span id="nav-skills" class="nav-option">Skills</span>
				<span id="nav-projects" class="nav-option">Projects</span>
			</div>
			<div id="nav-other">
				<div id="nav-contact" class="nav-option-2">Contact</div>
				<div id="nav-title">andrewbowman.dev</div>
			</div>
		</div>
	</div>
`;

const scrollDiff = document.documentElement.scrollHeight - document.documentElement.clientHeight			

$("#nav-home").on("click", function() { window.scrollTo(0, 0); });
$("#nav-about").on("click", function() { window.scrollTo(0, scrollDiff / 7.2); });
$("#nav-link").on("click", function() { window.scrollTo(0, scrollDiff / 4.05); });
$("#nav-skills").on("click", function() { window.scrollTo(0, scrollDiff / 2.45); });
$("#nav-projects").on("click", function() { window.scrollTo(0, scrollDiff / 2.03); });
$("#nav-contact").on("click", function() { window.scrollTo(0, scrollDiff / 1.19); });
$("#nav-title").on("click", function() { window.scrollTo(0, scrollDiff); });