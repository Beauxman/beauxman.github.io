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
renderer.domElement.style="z-index: -1; position: absolute;";
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

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 10, 8, -3 );
camera.lookAt( 0, 2, -1 );

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

const controls = new OrbitControls( camera, renderer2.domElement );

// Fog

scene.fog = new THREE.Fog( 0x99ccff, .01, 45 );

// Lighting

const light = new THREE.AmbientLight( 0x404040, 5.0 );
scene.add( light );

const spotlight = new THREE.SpotLight( 0xffffff, 40000.0 );
spotlight.position.set(0, 80, 0 );
spotlight.castShadow = true;
spotlight.shadow.mapSize.width = 10000; // Might affect FPS
spotlight.shadow.mapSize.height = 10000; // Might affect FPS
spotlight.shadow.camera.far = 4000;
spotlight.shadow.camera.near = 2;
spotlight.shadow.camera.fov = 30;
scene.add( spotlight );

const spotlight2 = new THREE.SpotLight( 0xffffff, 40000.0 );
spotlight2.position.set(0, 80, -160 );
spotlight2.castShadow = false;
scene.add( spotlight2 );

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
var accel = 0.01;
var maxSpeed = 0.05;

var train1, train2, train3, train4;
var trains = [];

function startRoute() {
	speed = -0.03;
	trains[0].speed = speed;
	trains[1].speed = speed;
	trains[2].speed = speed;
	trains[3].speed = speed;
	startMoving = true;
	moving = true;
}

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 37) {
		//speed += accel;
	} else if (keyCode == 39) {
		//speed -= accel;
		if (!moving) { startRoute(); }
	}
}

document.getElementById("canvas").addEventListener("click", function() {
	if (!moving) { startRoute(); }
});

// Animation Loop

let model1;
let roundPre = 10;
let startMoving = false;
let moving = false;

function animate() {
	stats.update();
	
	for (let i = 0; i < 4; i++) {
		if (Math.round(trains[i].position.z * roundPre) == Math.round(tracks[trains[i].nextTrack].position.z * roundPre)) {// &&
			//Math.round(trains[i].position.x * roundPre) == Math.round(tracks[trains[i].nextTrack].position.x * roundPre)) {
			if (speed <= 0) { 
				trains[i].nextTrack++;
				trains[i].trackReset = true;
			} else { 
				trains[i].nextTrack--; 
				trains[i].trackReset = true;
			}
		}

		if (trains[i].trackReset) {
			trains[i].xMulti = tracks[trains[i].nextTrack].position.x - trains[i].position.x
			trains[i].zMulti = tracks[trains[i].nextTrack].position.z - trains[i].position.z;
			trains[i].trackReset = false;
		}
		
		if (startMoving && i > 0) {
			let buffer = 1.4;
			if (i == 2) { buffer = 1.85; }
			if (i == 3) { buffer = 1.95; }
			
			if (Math.abs(trains[i - 1].position.z - trains[i].position.z) < buffer) {
				trains[i].speed = 0;
				setTimeout(() => {
					startMoving = false;
					trains[i].speed = speed;
				}, 1000);
			} else if (startMoving) {
				trains[i].speed = speed;
			}
		}
		
		trains[i].position.z += trains[i].zMulti * Math.abs(trains[i].speed);
		trains[i].position.x += trains[i].xMulti * Math.abs(trains[i].speed);
		
		trains[i].lookAt(tracks[trains[i].nextTrack].position.x, trains[i].position.y, tracks[trains[i].nextTrack].position.z);
		trains[i].rotation.y += Math.PI;
		
		//
		
		//if (trains[0].position.z <= -46.3) { trains[i].speed = 0; }
		
		if (trains[0].position.z <= -105) {
			trains[i].speed = 0;
		}
		
		
	}
	
	//camera.lookAt(train1.position);
	//camera.position.set( 12, 11, train1.position.z - 4);
	
	camera.lookAt(train1.position);
	camera.position.set( train1.position.x + 12, train1.position.y + 10, train1.position.z - 4);
	
	//camera.lookAt(0, 1, train1.position.z)
	//camera.position.set( 12, 11, train1.position.z - 4);
	
	//spotlight2.position.set(train1.position.x, train1.position.y + 80, train1.position.z);
	
	renderer.render(scene, camera);
	renderer2.render(scene2, camera);
}

// Model Loader

const loader = new GLTFLoader();

loader.load( 'models/scene.glb', function ( gltf ) {
    model1 = gltf.scene;
	
	// Set shadow casts

	model1.traverse( function( child ) {
		if (child.name.includes("Plane") || child.name.includes("Biome")) {
			child.receiveShadow = true;
		} else if (child.name === "Titles") {
			child.castShadow = false;
		} else if (child.name.includes("Mountain")) {
			child.castShadow = false;
			child.receiveShadow = true;
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
	//console.log(tracks);
	
	train1.nextTrack = findStartTrack(train1);
	train2.nextTrack = findStartTrack(train2);
	train3.nextTrack = findStartTrack(train3);
	train4.nextTrack = findStartTrack(train4);
	
	trains = [train1, train2, train3, train4];
	
	for (let i = 0; i < trains.length; i++) {
		trains[i].trackReset = true, trains[i].xMulti = 0, trains[i].zMulti = 0;
		trains[i].speed = 0;
	}
	
	scene.add( gltf.scene );
	model1.encoding = THREE.sRGBEncoding;

    renderer.setAnimationLoop( animate );
}, undefined, function ( error ) {

	console.error( error );

} );