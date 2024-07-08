const screen = document.getElementsByClassName("screen")[0];
const startingProps = ["dot", "text1", "text2", "text3", "text4"];

function createDiv(name) {
	var div = document.createElement("div");
	div.classList.add(name);
	screen.appendChild(div);
	return div
}

function createButton(name, innerText) {
	var but = document.createElement("button");
	but.classList.add(name);
	but.type = "button"
	but.innerHTML = innerText;
	screen.appendChild(but);
	return but;
}

function chatWriter (elem, chatText, timeout) {
	if (timeout > 0) {
		for (let i = 0; i < chatText.length; i++) {
			setTimeout(() => {
				elem.innerHTML += chatText[i];
			}, timeout + timeout * i)
		}
	} else {
		elem.innerHTML = chatText;
	}
}

function createChatbox(screenVar, chatSpeakerClass, chatSpeakerName, chatText, duration, textTimeout, animString) {
	var chatbox = createDiv("chatbox");
	var chatSpeaker;
	setTimeout(() => {
		chatSpeaker = createDiv(chatSpeakerClass);
		chatSpeaker.style = "animation: " + animString;
		chatWriter(chatbox, chatSpeakerName + ":<br>", 0);
		chatWriter(chatbox, chatText, textTimeout);
		setTimeout(() => {
			screenVar.removeChild(chatSpeaker);
			chatbox.innerHTML = "";
			chatbox.style = "animation: chatboxanim2 1s;"
			setTimeout(() => {
				screenVar.removeChild(chatbox);
			}, 850)
		}, duration)
	}, 1000)
}

function spawnEnemies() {
	var enemies = []
	
	for (let i = 0; i < 8 ; i++) {
		enemies.push(createDiv("squareenc2"));
	}
	for (let i = 8; i < 16 ; i++) {
		enemies.push(createDiv("squareenc3"));
	}
	for (let i = 16; i < 24 ; i++) {
		enemies.push(createDiv("squareenc4"));
	}
		
	enemies[0].style.marginLeft = "10vw";
	enemies[1].style.marginLeft = "20vw";
	enemies[2].style.marginLeft = "30vw";
	enemies[3].style.marginLeft = "40vw";
	enemies[4].style.marginLeft = "56vw";
	enemies[5].style.marginLeft = "66vw";
	enemies[6].style.marginLeft = "76vw";
	enemies[7].style.marginLeft = "86vw";

	enemies[8].style.marginLeft = "10vw";
	enemies[9].style.marginLeft = "20vw";
	enemies[10].style.marginLeft = "30vw";
	enemies[11].style.marginLeft = "40vw";
	enemies[12].style.marginLeft = "56vw";
	enemies[13].style.marginLeft = "66vw";
	enemies[14].style.marginLeft = "76vw";
	enemies[15].style.marginLeft = "86vw";	

	enemies[16].style.marginLeft = "10vw";
	enemies[17].style.marginLeft = "20vw";
	enemies[18].style.marginLeft = "30vw";
	enemies[19].style.marginLeft = "40vw";
	enemies[20].style.marginLeft = "56vw";
	enemies[21].style.marginLeft = "66vw";
	enemies[22].style.marginLeft = "76vw";
	enemies[23].style.marginLeft = "86vw";
	
	return enemies;
}

function creditsScene() {
	screen.style = "animation: screencredits1 1s 1s normal forwards;";
	setTimeout(() => {
		var textcredits1 = createDiv("textcredits1");
			setTimeout(() => {
				screen.removeChild(textcredits1);
				var textcredits2= createDiv("textcredits2");
				setTimeout(() => {
					screen.removeChild(textcredits2);
				}, 4000)
			}, 4000)
	}, 2000)
}

function outroScene() {
	var dot = createDiv("dotoutro");
	var dot2, dot3, dot4;
	var outrotext1 = createDiv("textoutro1");

	setTimeout(() => {
		var dot2 = createDiv("dotoutro2");
		var dot3 = createDiv("dotoutro3");
		var dot4 = createDiv("dotoutro4");
		setTimeout(() => {
			createChatbox(screen, "chatdot3", "Spot", "Dot, you did it!", 3000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;");
			setTimeout(() => {
				createChatbox(screen, "chatdot4", "Sprinkle", "You saved us!", 3000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;");
				setTimeout(() => {
					createChatbox(screen, "chatdot2", "Blob", "We owe you one, bud.", 3000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;");
					setTimeout(() => {
						createChatbox(screen, "chatdot3", "Spot", "It's celebration time!", 3500, 80, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;");
						setTimeout(() => {
							dot2.style = "animation: dotsoutro2anim2 0.5s infinite alternate;"
							dot3.style = "animation: dotsoutro2anim2 0.4s infinite alternate;"
							dot4.style = "animation: dotsoutro2anim2 0.5s infinite alternate;"
							setTimeout(() => {
								screen.style = "animation: screenoutro1 0.75s normal forwards;";
								setTimeout(() => {
									screen.removeChild(dot2);
									screen.removeChild(dot3);
									screen.removeChild(dot4);
									screen.removeChild(outrotext1);
									setTimeout(() => {
										createChatbox(screen, "chatTriangle1", "Mischievous traingle", "Hehehehe!", 3000, 150, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;");
										setTimeout(() => {
											var outrotext2 = createDiv("textoutro2");
											setTimeout(() => {
												screen.removeChild(outrotext2)
												screen.removeChild(dot);
												creditsScene();
											}, 7000)
										}, 5000)
									}, 1000)
								}, 250)
							}, 5000)
						}, 5000);
					}, 5000);
				}, 5000);
			}, 5000);
		}, 1000);
	}, 2000);
}

function fightScene(enemies) {
	var dot = createDiv("dotenc2");
	var clickFunc;
	var movFunc;
	
	var gameTickSpeed = 33
	var bulletSpeed = 20
	var bulletTimeout = 2000
	
	var bullets = [];
	var enemyBullets = [];
	var enemyBulletSpacing = 300
	
	var bossfight = false;
	var bosshealth = 100;
	var damagePerHit = 2;
	
	var gameLoop = setInterval(onTimerTick, gameTickSpeed);
	
	function onTimerTick() {
		for (let i = 0; i < bullets.length; i++) {
			var pos = bullets[i].getBoundingClientRect();
			bullets[i].style.marginTop = (pos.top - bulletSpeed) + "px";
			
			for (let j = 0; j < enemies.length; j++) {
				var enPos = enemies[j].getBoundingClientRect();
				if ((pos.x <= enPos.right && pos.x >= enPos.left)
					&& (pos.y >= enPos.top && pos.y <= enPos.bottom)) {
					bullets[i].style = "z-index: -1;";
					bullets[i].style = "background-color: #000000;";
					if (!bossfight) {
						screen.removeChild(enemies[j]);
						enemies.splice(j, 1);
						if (enemies.length == 16) {
							createChatbox(screen, "chatSquare2", "Evil square", "Wha..What are you doing?", 4000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;")
						} else if (enemies.length == 8) {
							createChatbox(screen, "chatSquare2", "Evil square", "This is not possible...", 4000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;")
						} else if (enemies.length == 0) {
							createChatbox(screen, "chatSquare2", "Evil square", "I can't believe it!", 4000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;")
							setTimeout(() => {
								setTimeout(() => {		
									createChatbox(screen, "chatSquare2", "Evil square", "I'll just do it myself then...", 4000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;")
									setTimeout(() => {
										bossfight = true;
										enemies = [createDiv("squareencboss")];
										healthbarboss = createDiv("healthbarboss");
										enemyBulletSpacing = 50;
										screen.style = "animation: screenbossanim1 1s, screenbossanim2 5s 5s infinite;"
										createChatbox(screen, "chatSquare2", "Evil square", "I will destroy you!", 4000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;")
									}, 7000);
								}, 3000);
							}, 3000);
						}
					} else {
						bosshealth -= damagePerHit;
						if (bosshealth >= 0) {
							healthbarboss.style = "width: " + (.9 * bosshealth) + "vw;"
							
							if (bosshealth == 66) {
								createChatbox(screen, "chatSquare2", "Evil square", "You will pay for that!", 4000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;")
							} else if (bosshealth == 32) {
								createChatbox(screen, "chatSquare2", "Evil square", "Ow! That hurt.", 4000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;")
							}
						} else if (bosshealth <= 0 && bosshealth >= -99) {
							bosshealth = -120
							if (document.getElementsByClassName("healthbarboss").length > 0) {
								screen.removeChild(healthbarboss);
							}
							screen.removeEventListener("click", clickFunc);
							setTimeout(() => {
								screen.style = "animation: screenbossanim3 1s;";
								setTimeout(() => {
									screen.removeChild(enemies[0]);
									enemies = []
									setTimeout(() => {
										clearInterval(gameLoop);
										screen.removeEventListener("mousemove", movFunc);
										dot.style = "animation: dotenc2anim1 2s normal forwards;";
										setTimeout(() => {
											screen.removeChild(dot);
											
											var child = screen.lastElementChild;
											while (child) {
												screen.removeChild(child);
												child = screen.lastElementChild;
											}
											outroScene();
										}, 2000);
									}, 2000);
								}, 500);
							}, 2000);
						}
					}
				}
			}
		}
		
		if (enemies.length > 0) {
			if (Math.floor(Math.random() *  (enemyBulletSpacing / enemies.length)) == 0) {
				var firingEnemy = enemies[Math.floor(Math.random() * enemies.length)];
				var enemyBul = createDiv("enemyBullet");
				var position = firingEnemy.getBoundingClientRect();
				enemyBul.style.marginTop = position.bottom + "px";
				enemyBul.style.marginLeft = (position.left + (dot.offsetWidth / 2)) + "px";
				enemyBullets.push(enemyBul);
			}
		}
		
		for (let i = 0; i < enemyBullets.length; i++) {
			var pos = enemyBullets[i].getBoundingClientRect();
			var enPos = dot.getBoundingClientRect();
			enemyBullets[i].style.marginTop = (pos.top + bulletSpeed) + "px";
			if (pos.bottom >= (screen.offsetHeight - (screen.offsetHeight / 40))) {
				screen.removeChild(enemyBullets[i]);
				enemyBullets.splice(i, 1);
			}
			
			if ((pos.x <= enPos.right && pos.x >= enPos.left)
				&& (pos.y >= enPos.top && pos.y <= enPos.bottom)) {
				enemyBullets[i].style = "z-index: -1;";
				enemyBullets[i].style = "background-color: transparent;";
			}
		}
	}
	
	screen.addEventListener("mousemove", movFunc = function(event) {
		let x = event.clientX;
		let y = event.clientY;
	  
		if (x > screen.offsetWidth - (dot.offsetWidth / 2)) {
			x = screen.width - dot.offsetWidth;
		} else if (x < + (dot.offsetWidth / 2)) {
			x = dot.offsetWidth / 2;
		} else {
			dot.style = "margin-left: " + (x - (dot.offsetWidth / 2)) + "px;";
		}
	});
	
	screen.addEventListener("click", clickFunc = function(event) {
		var bul = createDiv("bullet");
		var position = dot.getBoundingClientRect();
		bul.style.marginTop = position.top + "px";
		bul.style.marginLeft = (position.left + (dot.offsetWidth / 2)) + "px";
		bullets.push(bul);
		setTimeout(() => {
			screen.removeChild(bul);
			bullets.shift();
		}, bulletTimeout);
	});
}

function encounterScene() {
	setTimeout(() => {
		var dot = createDiv("dotenc");
		var textenc1 = createDiv("textenc1");
		
		setTimeout(() => {
			createChatbox(screen, "chatSquare1", "Unknown", "Ha! Your friends are gone!", 4000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;");
			screen.removeChild(textenc1);
			var textenc2 = createDiv("textenc2");
			setTimeout(() => {
				screen.removeChild(textenc2);
				var textenc3 = createDiv("textenc3");
				createChatbox(screen, "chatSquare1", "Unknown", "Muwhahahaha!", 4000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;");
				setTimeout(() => {
					screen.removeChild(textenc3);
					createChatbox(screen, "chatSquare1", "Unknown", "Very well.", 4000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;");
					setTimeout(() => {
						var enemy1 = createDiv("squareenc1");
						var textenc4 = createDiv("textenc4");
						setTimeout(() => {
							screen.removeChild(textenc4);
							createChatbox(screen, "chatSquare2", "Evil square", "And I'm not alone.", 4000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;");
							setTimeout(() => {
								screen.style = "animation: screenanim1 1s;";
								screen.style = "animation: screenanim1 1s 1s reverse;";
								setTimeout(() => {
									enemies = spawnEnemies()
									setTimeout(() => {
										createChatbox(screen, "chatSquare2", "Evil square", "Behold my 4-sided army!", 4000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;")
										setTimeout(() => {
											createChatbox(screen, "chatSquare2", "Evil square", "Squares, take care of this.", 4000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;")
											setTimeout(() => {
												screen.removeChild(enemy1);
												var textenc4 = createDiv("textenc5");
													setTimeout(() => {
														screen.removeChild(textenc4);
														createChatbox(screen, "chatdot1", "Dot", "I got this!", 4000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;")
														setTimeout(() => {
															screen.removeChild(dot);
															fightScene(enemies)
														}, 5000)
													}, 8000)
												}, 3750)
										}, 5000)
									}, 1000)
								}, 1000)
							}, 5000)
						}, 8000)
					}, 7000)
				}, 10000)
			}, 9000)
		}, 12000)
	}, 1000)
}

var newProps1;
function chooseDotScene() {
	var dot1 = createDiv("dot1");
	var dot2 = createDiv("dot2");
	var dot3 = createDiv("dot3");
	var dot4 = createDiv("dot4");

	var optionsText = createDiv("optionsText");	
	var option1 = createButton("option1", "Dot");
	var option2 = createButton("option2", "Blob");
	var option3 = createButton("option3", "Spot");
	var option4 = createButton("option4", "Sprinkle");
	
	newProps1 = [dot1, dot2, dot3, dot4, optionsText, option1, option2, option3, option4];
	
	option1.addEventListener('mouseover', () => {
		dot1.style = "animation: dotanim2 0.4s 0.2s infinite alternate"
	});
	option1.addEventListener("mouseleave", (event) => {
		dot1.style = "animation: dotanim1 0.4s 0.2s infinite alternate"
	});
	
	option2.addEventListener('mouseover', () => {
		dot2.style = "animation: dotanim2 0.4s 0s infinite alternate"
	});
	option2.addEventListener("mouseleave", (event) => {
		dot2.style = "animation: dotanim1 0.4s 0s infinite alternate"
	});
	
	option3.addEventListener('mouseover', () => {
		dot3.style = "animation: dotanim2 0.4s 0.3s infinite alternate"
	});
	option3.addEventListener("mouseleave", (event) => {
		dot3.style = "animation: dotanim1 0.4s 0.3s infinite alternate"
	});
	
	option4.addEventListener('mouseover', () => {
		dot4.style = "animation: dotanim2 0.4s 0.1s infinite alternate"
	});
	option4.addEventListener("mouseleave", (event) => {
		dot4.style = "animation: dotanim1 0.4s 0.1s infinite alternate"
	});
	
	screen.style = "animation: screenanim1 1s 7s;";
	screen.style = "animation: screenanim1 1s 8s reverse;";
	setTimeout(() => {
		for (let i = 4; i < newProps1.length; i++) {
			screen.removeChild(newProps1[i]);
		}
	}, 8000)
	setTimeout(() => {
		createChatbox(screen, "chatdot4", "Sprinkle", "What was that?", 3000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;");
		setTimeout(() => {
			createChatbox(screen, "chatdot2", "Blob", "I'm not sure!", 3000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;");
			setTimeout(() => {
				createChatbox(screen, "chatdot3", "Spot", "It was probably nothing.", 3000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;");
				
				screen.style = "animation: screenanim2 1s 6s;";
				screen.style = "animation: screenanim2 2s 7s reverse;";	
				setTimeout(() => {
					createChatbox(screen, "chatdot4", "Sprinkle", "There it is again!", 3000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;");
					setTimeout(() => {
						createChatbox(screen, "chatdot3", "Spot", "I saw it this time!", 3000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;");
						setTimeout(() => {
							createChatbox(screen, "chatSquare1", "Unknown", "Muwhahaha!", 3000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;");
							setTimeout(() => {
								createChatbox(screen, "chatdot2", "Blob", "Uhmm... Who is that?", 3000, 100, "chatdotanim2 0.5s infinite alternate, chatdotanim1 0.5s infinite alternate;");
								setTimeout(() => {
									screen.style = "animation: screenanim3 3s 1s;";
									var lamp = document.getElementsByClassName("lamp")[0];
									setTimeout(() => {
										screen.removeChild(lamp);
										for (let i = 0; i < 4; i++) {
											screen.removeChild(newProps1[i]);
										}
										encounterScene();
									}, 3250)
								}, 5000)
							}, 5000)
						}, 5000)
					}, 5000)
				}, 9000)
			}, 5000)
		}, 5000)
	}, 10000)
}

function introScene() {
	for (let i = 0; i < startingProps.length; i++) {
		createDiv(startingProps[i]);
	}
	screen.style = "animation: 	screenintro1 1s 8.2s forwards, screenintro2 1s 25s forwards;";
	
	var button1;
	var button2;
	screen.addEventListener("animationend", (event) => {
		if (event.animationName == "screenintro2") {
			button1 = createButton("button1", "Yes")
			button2 = createButton("button2", "No")
			
			for (let i = 0; i < startingProps.length; i++) {
				screen.removeChild(document.getElementsByClassName(startingProps[i])[0]);
			}		

			button1.addEventListener('click', () => {
				if (document.getElementsByClassName("lamp").length < 1) {
					var lamp = document.createElement("div");
					lamp.classList.add("lamp");
					screen.appendChild(lamp);
					lamp.style="animation: lampanim0 1s, lampanim1 2s 1s, lampanim2 2s 1s reverse both";
				}
			});
		}
	});

	screen.addEventListener("animationend", (event) => {
		if (event.animationName == "lampanim2") {
			screen.removeChild(button1);
			screen.removeChild(button2);
			
			chooseDotScene();
		}
	});
}

introScene();