import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/renderers/CSS3DRenderer.js';
import Stats from 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/libs/stats.module.js';

const canvas = document.getElementById("canvas");

// Stats

const stats = new Stats()
stats.showPanel(0)
//document.body.appendChild(stats.dom)

// Renderer

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.domElement.style = "z-index: -1; position: absolute;";
canvas.appendChild( renderer.domElement );

const renderer2 = new CSS3DRenderer();
renderer2.setSize(window.innerWidth, window.innerHeight);
canvas.appendChild(renderer2.domElement);

// Scene

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );

const scene2 = new THREE.Scene();
scene2.scale.set(0.01, 0.01, 0.01);

// CSS3D

const css3dObjects = [];
function createCSS3DObject(content, style, x, y, z, rX) {
	let div = document.createElement('div');
	div.innerHTML = content;
	div.style = style;

	let object = new CSS3DObject(div);
	object.lookAt(0, 1, 0);
	object.position.set(x, y, z);
	object.position.set(object.position.x * 100, object.position.y * 100, object.position.z * 100);
	object.rotateZ(1.5708);
	if (rX !== undefined) {
		object.rotateX(rX);
	}
	
	return object;
}

fetch("data.xml")
  .then((response) => response.text())
  .then((text) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/xml");
	for (let i = 0; i < doc.getElementsByTagName("entry").length; i++) {
		const cssObject = createCSS3DObject(doc.getElementsByTagName("content")[i].innerHTML, 
										doc.getElementsByTagName("style")[i].innerHTML, 
										doc.getElementsByTagName("x")[i].innerHTML, 
										doc.getElementsByTagName("y")[i].innerHTML, 
										doc.getElementsByTagName("z")[i].innerHTML,
										doc.getElementsByTagName("rx")[i].innerHTML);
		scene2.add(cssObject);
		css3dObjects.push(cssObject);
	}
});
  
// Camera

const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 1, 300);
camera.position.set(14, 16, 0);
camera.lookAt(0, 0, 0);

// Window
    
function scaleWindow() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.fov = ((window.innerHeight / window.innerWidth) * 30) + 25;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer2.setSize(window.innerWidth, window.innerHeight);
}

window.onresize = scaleWindow;
scaleWindow();

// Controls

let followCam = 1;
if (followCam == 0) { const controls = new OrbitControls(camera, renderer2.domElement); }

// Fog

scene.fog = new THREE.Fog(0x001122, .01, 55);

// Lighting

const light = new THREE.AmbientLight(0x404040, 20.0);
scene.add(light);

const spotlight = new THREE.SpotLight(0xffffff, 70000.0);
spotlight.position.set(40, 80, 10);
spotlight.shadow.mapSize.width = 1024;
spotlight.shadow.mapSize.height = 1024;
scene.add(spotlight);

const spotlight2 = new THREE.SpotLight(0xffffff, 60000.0);
spotlight2.position.set(0, 80, -100);
scene.add(spotlight2);

const spotlight3 = new THREE.SpotLight(0xffffff, 5500.0);
spotlight3.position.set(0, 25, -150);
scene.add(spotlight3);

const spotlight4 = new THREE.SpotLight(0xffffff, 400000.0);
spotlight4.position.set(150, 80, -300);
scene.add(spotlight4);

// Sort functions

function partition(arr, low, high) {
    let pivot = arr[high].position.z;
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
        if (arr[j].position.z < pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return i + 1;
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function quickSort(arr, low, high) {
    if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// Pathing

var tracks = [];

function findStartTrack(train) {
	var curTrack;
	for (let i = 0; i < tracks.length - 1; i++) {
		if (tracks[i].position.z >= train.position.z && tracks[i + 1].position.z < train.position.z) {
			curTrack = i + 1;
			break;
		}
	}
	return curTrack;
}

// Key input

var speed = 0;
const accel = 0.008;
let maxSpeed = -0.16;

const startBounds = -1;
const endBounds = -305;

var trains = [];

function startRoute() {
	if (!moving) { 
		if (dir) { speed = -accel; }
		else { speed = accel; }
	}
	moving = !moving;
}

function switchDirections() {
	moving = false;
	if (speed == 0) {
		dir = !dir;
		if (!dir) {
			for (let i = 0; i < trains.length; i++) { trains[i].nextTrack--; }
		} else {
			for (let i = 0; i < trains.length; i++) { trains[i].nextTrack++; }
		}
		if (trains[0].position.z < startBounds && trains[0].position.z > endBounds) { startRoute(); }
	} else {
		setTimeout(() => {
			switchDirections();
		}, 100)
	}
}

const scrollProgress = document.getElementById("scroll");
let currentScroll;

window.scrollTo(0, 0);

function checkScrollBounds() {
	let scrollTo = ((endBounds - startBounds) * (currentScroll / 100));
	if (!(dir && trains[0].position.z > scrollTo || !dir && trains[0].position.z < scrollTo)) {
		moving = false;
	}
}

window.addEventListener("scroll", (event) => {
	let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	let scrollPercent = (scrollTop / scrollHeight) * 100;
	let carPercent = (trains[0].position.z / (endBounds - startBounds)) * 100;
	
	if (dir && scrollPercent < carPercent
		|| !dir && scrollPercent > carPercent) { 
		let tSpeed = speed;
		speed = 0;
		switchDirections();
		if (tSpeed != 0) { speed = -tSpeed; }
	}
	
	currentScroll = scrollPercent;
	
	if (!moving) { startRoute(); }

	checkScrollBounds();
});

let camOffset = 0;
let atEnd = false;

function updateObjects() {
	if (moving && Math.abs(speed) < Math.abs(maxSpeed)) { speed += accel * Math.sign(speed)};
	if (!moving && Math.abs(speed) > 0) { speed -= accel * Math.sign(speed)};
	
	for (let i = 0; i < trains.length; i++) {
		var direction = new THREE.Vector3();
		trains[i].getWorldDirection(direction);
		
		if (dir) {
			if (trains[i].position.z <= tracks[trains[i].nextTrack].position.z + Math.abs(speed * 2)) { trains[i].nextTrack++; }
			
			trains[i].position.add(direction.multiplyScalar(speed));
			
			trains[i].lookAt(tracks[trains[i].nextTrack].position.x, trains[i].position.y, tracks[trains[i].nextTrack].position.z);
			trains[i].rotation.y += Math.PI;
		} else {
			if (trains[i].position.z >= tracks[trains[i].nextTrack].position.z - Math.abs(speed * 2)) { trains[i].nextTrack--; }
			
			direction.x *= -1, direction.z *= -1;
			trains[i].position.add(direction.multiplyScalar(-speed));
			
			trains[i].lookAt(tracks[trains[i].nextTrack].position.x, trains[i].position.y, tracks[trains[i].nextTrack].position.z);
			trains[i].rotation.y;
		}
	}

	if (trains[0].position.z >= startBounds && dir == false) { switchDirections(); }
	if (trains[0].position.z <= endBounds && dir == true) { switchDirections(); }
	
	let prevSpeed = 0;

	if (trains[0].position.z >=  -167 && atEnd == false) {
		camOffset = Math.abs(speed) * 20;
	} else if (trains[0].position.z >=  -167) {
		if (camOffset < Math.abs(speed) * 20) {
			camOffset += Math.abs(accel) * 4;
		} else {
			atEnd = false;
		}
	} else {
		if (camOffset > 0) {
			camOffset -= Math.abs(accel) * 4;
			atEnd = true;
		}
	}
	
	if (followCam == 1) {
		camera.lookAt(trains[0].position);
		if (!(prevSpeed != 0 && speed == 0)) {
			camera.position.set(trains[0].position.x + 16 - camOffset, trains[0].position.y + 14 - camOffset / 2, trains[0].position.z);
		}
	}
	prevSpeed = speed;
}

const navHome = document.getElementById("nav-home");
const navAbout = document.getElementById("nav-about");
const navLinks = document.getElementById("nav-link");
const navSkills = document.getElementById("nav-skills");
const navProjects = document.getElementById("nav-projects");

function updateNavigation() {
	let carPos = trains[0].position.z;

	if (carPos >= -23) {
		navHome.classList.add("nav-red");
		navAbout.classList.remove("nav-orange");
	} else if (carPos < -23 && carPos >= -59) {
		navHome.classList.remove("nav-red");
		navAbout.classList.add("nav-orange");
		navLinks.classList.remove("nav-blue");
	} else if (carPos < -59 && carPos >= -101) {
		navAbout.classList.remove("nav-orange");
		navLinks.classList.add("nav-blue");
		navSkills.classList.remove("nav-yellow");
	} else if (carPos < -101 && carPos >= -132) {
		navLinks.classList.remove("nav-blue");
		navSkills.classList.add("nav-yellow");
		navProjects.classList.remove("nav-green");
	} else if (carPos < -132 && carPos >= -167) {
		navSkills.classList.remove("nav-yellow");
		navProjects.classList.add("nav-green");
	} else {
		navHome.classList.remove("nav-red");
		navAbout.classList.remove("nav-orange");
		navLinks.classList.remove("nav-blue");
		navSkills.classList.remove("nav-yellow");
		navProjects.classList.remove("nav-green");
	}
}

function updateOverlay() {
	let overlayElem  = document.querySelector(".overlay");
	if (Math.abs(speed) > 0) {
		overlay.style.opacity = 0.4; 
	} else {
		overlay.style.opacity = 0; 
	}
	
	if (dir) {
		overlay.style.transform = "rotate(" + (trains[0].rotation.y * (180 / Math.PI) + 180) + "deg)";
	} else {
		overlay.style.transform = "rotate(" + (trains[0].rotation.y * (180 / Math.PI) + 180) * -1 + "deg)";
	}
	
}

function updateCSS3DVisibility() {
    const maxDistance = 70;
    const cameraWorldPos = new THREE.Vector3();
    camera.getWorldPosition(cameraWorldPos);
	
    css3dObjects.forEach(obj => {
      const objWorldPos = new THREE.Vector3();
	  obj.getWorldPosition(objWorldPos);
	  const distance = cameraWorldPos.distanceTo(objWorldPos);

        if (distance < maxDistance) {
			obj.visible = true;
        } else {
		   obj.visible = false;
        }
    });
}
// Animation Loop

let sceneObject;
let moving = false;
let dir = true;
let lastTime = 0;
const targetFrameRate = 65;

function animate() {
	const currentTime = performance.now();
	const deltaTime = currentTime - lastTime;
	
	if (deltaTime >= 1000 / targetFrameRate) {
		stats.update();
		updateObjects();
		updateNavigation();
		checkScrollBounds();
		updateCSS3DVisibility();
		//updateOverlay();
		
		scrollProgress.style.marginTop = 2 + (trains[0].position.z / (endBounds - startBounds)) * 77 + "vh";
		
		renderer.render(scene, camera);
		renderer2.render(scene2, camera);
		
		lastTime = currentTime;
		
	}
  requestAnimationFrame(animate);
}

// Model Loader

const manager = new THREE.LoadingManager();

export { manager };

const loader = new GLTFLoader( manager );

loader.load( 'models/scene.glb', function ( gltf ) {
    sceneObject = gltf.scene;
	sceneObject.traverse( function( child ) {
		if (child.name.includes("Plane") || child.name.includes("Biome")) {
			child.receiveShadow = true;
		} else if (child.name === "Titles") {
			child.castShadow = false;
		} else if (child.name.includes("Track")) {
			child.castShadow = false;
		} else if (child.name.includes("Mountain")) {
			child.castShadow = false;
			child.receiveShadow = true;
		} else if (child.name.includes("Cliff") || child.name.includes("Road")) {
			child.castShadow = true;
			child.receiveShadow = false;
		} else if ( child.isMesh ) {
			child.castShadow = true;
		}
		
		if (child.name.includes("Train")) { trains.push(child); }
		
		if (child.name.includes("Track")) { tracks.push(child); }
		
		if (child.name === "Spotlight3") { 
			spotlight3.target = child; 
			spotlight4.target = child; 
		}
	});
	
	quickSort(tracks, 0, tracks.length - 1);
	tracks = tracks.reverse();
	
	for (let i = 0; i < trains.length; i++) {
		trains[i].nextTrack = findStartTrack(trains[i]);
	}
	
	//if (window.innerWidth >= 768) { spotlight.castShadow = true; }
	
	scene.add( gltf.scene );
	sceneObject.encoding = THREE.sRGBEncoding;
	
	animate();
}, undefined, function ( error ) {
	console.error( error );
} );