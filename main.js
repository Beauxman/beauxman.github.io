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
document.body.appendChild(stats.dom)

// Renderer

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.domElement.style = "z-index: -1; position: absolute;";
canvas.appendChild( renderer.domElement );

const renderer2 = new CSS3DRenderer();
renderer2.setSize(window.innerWidth, window.innerHeight);
canvas.appendChild(renderer2.domElement);

// Scene

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x66d9ff );

const scene2 = new THREE.Scene();
scene2.scale.set(0.01, 0.01, 0.01);

// CSS3D

function createCSS3DObject(content, style, x, y, z) {
	let div = document.createElement('div');
	div.innerHTML = content;
	div.style = style;

	let object = new CSS3DObject(div);
	object.lookAt(0, 1, 0);
	object.position.set(x, y, z);
	object.position.set(object.position.x * 100, object.position.y * 100, object.position.z * 100);
	object.rotateZ(1.5708);
	
	return object;
}

let object0Content = '<div id="start">Start</div>';
let object0Style = 'width: 350px; height: 175px; padding-top: 25px; text-align: center; color: #ffffff; font-size: 60px; text-shadow: 2px 2px 3px #000000; border-style: solid; border-color: #ffffff; border-width: 10px';

const CSSObject0 = createCSS3DObject(object0Content, object0Style, 4.2, 0, -6.4);

let object1Content = '<div>' +
    'Computer Programmer<br>' +
    'Web Developer<br><br>' +
    //'<textarea>Type freely inside here!</textarea>' +
    //'<embed type="text/html" src="test/index.html"  width="800" height="800">' +
    '</div>';

const CSSObject1 = createCSS3DObject(object1Content, "width: 1200px; height: 1000px; color: #ffffff; font-size: 84px; text-shadow: 2px 2px 3px #000000;", 6.7, 0, -1);

let object2Content = `<div style="background-color: #ffb380; background-color:rgba(255, 179, 128, 1); border-radius: 30px; padding: 30px;">
	<img src="images/titans.png"></img><br>
    <span style="color: #003066; text-shadow: 2px 2px 3px #ffffff;">California State University, Fullerton</span><br>
    <span style="font-family: Pacifico; color: #ff6600; text-shadow: 2px 2px 3px #ffffff;">Computer Science, B.S.</span><br><br>
    </div>`;

const CSSObject2 = createCSS3DObject(object2Content, "color: #ffffff; font-size: 28px; text-shadow: 2px 2px 3px #000000;", 7, 0, -38);

let object3Content = '<div>' +
	'<span>About</span>' +
    '</div>';

const CSSObject3 = createCSS3DObject(object3Content, "color: #ffffff; font-size: 108px; text-shadow: 2px 2px 3px #000000;", 0.5, 0, -43.6);

scene2.add(CSSObject0);
scene2.add(CSSObject1);
scene2.add(CSSObject2);
scene2.add(CSSObject3);

// Camera

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(10, 8, -3);
camera.lookAt(0, 2, -1);

// Window
    
function scaleWindow() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer2.setSize(window.innerWidth, window.innerHeight);
}

window.onresize = scaleWindow;
scaleWindow();

// Controls

const controls = new OrbitControls(camera, renderer2.domElement);

// Fog

scene.fog = new THREE.Fog(0x99ccff, .01, 45);

// Lighting

const light = new THREE.AmbientLight(0x404040, 5.0);
scene.add(light);

const spotlight = new THREE.SpotLight(0xffffff, 40000.0);
spotlight.position.set(0, 80, 0);
spotlight.shadow.mapSize.width = 10000; // Affects FPS
spotlight.shadow.mapSize.height = 10000; // Affects FPS
scene.add(spotlight);

const spotlight2 = new THREE.SpotLight(0xffffff, 20000.0);
spotlight2.position.set(0, 80, -100);
scene.add(spotlight2);

const spotlight3 = new THREE.SpotLight(0xffffff, 3000.0);
spotlight3.position.set(0, 25, -150);
scene.add(spotlight3);


const spotlight4 = new THREE.SpotLight(0xffffff, 6000.0);
spotlight4.position.set(0, 50, -200);
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
const accel = 0.001;
const maxSpeed = -0.06;

var train1, train2, train3, train4;
var trains = [];

function startRoute() {
	if (!moving) { 
		if (dir) { speed = -0.001; }
		else { speed = 0.001; }
	}
	moving = !moving;
}

function checkDirections() {
	if (speed == 0) {
		dir = !dir;
		if (!dir) {
			for (let i = 0; i < 4; i++) { trains[i].nextTrack--; }
		} else {
			for (let i = 0; i < 4; i++) { trains[i].nextTrack++; }
		}
		startRoute();
	} else {
		setTimeout(() => {
			checkDirections();
		}, 100)
	}
}

function switchDirections() {
	moving = false;
	checkDirections();
}

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
	if (keyCode == 39) {
		switchDirections();
	} else if (keyCode == 37) {
		startRoute();
	}
}

document.getElementById("canvas").addEventListener("click", function() {
	startRoute();
});

// Animation Loop

let sceneObject;
let moving = false;
let dir = true;

function animate() {
	stats.update();
	
	if (moving && Math.abs(speed) < Math.abs(maxSpeed)) { speed += accel * Math.sign(speed)};
	if (!moving && Math.abs(speed) > 0) { speed -= accel * Math.sign(speed)};
	
	for (let i = 0; i < 4; i++) {
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
	
	if (trains[0].position.z >= -2.8978211879730225 && dir == false) { switchDirections(); }
	if (trains[0].position.z <= -165 && dir == true) { switchDirections(); }
	
	//camera.lookAt(train1.position);
	//camera.position.set( 12, 11, train1.position.z - 4);
	
	camera.lookAt(train1.position);
	camera.position.set( train1.position.x + 12, train1.position.y + 10, train1.position.z - 4);
	
	//camera.lookAt(0, 1, train1.position.z)
	//camera.position.set( 12, 11, train1.position.z - 4);
	
	renderer.render(scene, camera);
	renderer2.render(scene2, camera);
}

// Model Loader

const loader = new GLTFLoader();

loader.load( 'models/scene.glb', function ( gltf ) {
    sceneObject = gltf.scene;
	
	// Set shadow casts

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
		} else if (child.name.includes("Cliff")) {
			child.castShadow = true;
			child.receiveShadow = false;
		} else if ( child.isMesh ) {
			child.castShadow = true;
		}
		
		if (child.name === "Train1") {
			train1 = child;
		} else if (child.name === "Train2") {
			train2 = child;
		} else if (child.name === "Train3") {
			train3 = child;
		} else if (child.name === "Train4") {
			train4 = child;
		}
		
		if (child.name.includes("Track")) {
			tracks.push(child);
		}
	} );
	
	quickSort(tracks, 0, tracks.length - 1);
	tracks = tracks.reverse();
	
	train1.nextTrack = findStartTrack(train1);
	train2.nextTrack = findStartTrack(train2);
	train3.nextTrack = findStartTrack(train3);
	train4.nextTrack = findStartTrack(train4);
	
	trains = [train1, train2, train3, train4];
	
	if (tracks.length > 120) { spotlight3.target = tracks[120]; }
	
	if (window.innerWidth >= 768) { spotlight.castShadow = true; }
	
	scene.add( gltf.scene );
	sceneObject.encoding = THREE.sRGBEncoding;

    renderer.setAnimationLoop( animate );
}, undefined, function ( error ) {

	console.error( error );

} );