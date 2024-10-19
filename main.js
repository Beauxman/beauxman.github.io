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

const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
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

const scene = new THREE.Scene( { alpha: true } );
scene.background = new THREE.Color( 0x66d9ff );

const scene2 = new THREE.Scene();
scene2.scale.set(0.01, 0.01, 0.01);

// CSS3D
var content = '<div>' +
  'Computer Programmer<br>' +
  'Web Developer<br><br>' +
  '<textarea>Type freely inside here!</textarea>' +
  //'<embed type="text/html" src="test/index.html"  width="2600" height="4400">' +
'</div>';

function createCSS3DObject(content) {
  var wrapper = document.createElement('div');
  wrapper.innerHTML = content;
  var div = wrapper.firstChild;

  div.style = "width: 1000px; height: 1000px; color: #ffffff; font-size: 60px; text-shadow: 5px 4px 7px #000000; "

  var object = new CSS3DObject(div);
  return object;
}

const CSSObject1 = createCSS3DObject(content);
CSSObject1.lookAt(0, 1, 0);
CSSObject1.position.set(5.7, 0, 0);
CSSObject1.position.set(CSSObject1.position.x * 100, CSSObject1.position.y * 100, CSSObject1.position.z * 100);
CSSObject1.rotateZ(1.5708);
scene2.add(CSSObject1);

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

// Key input

var speed = 0;
var accel = 0.01;

var train1, train2, train3, train4;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 37) {
		speed += accel;
	} else if (keyCode == 39) {
		speed -= accel;
	}
}

// Animation Loop

var model1;

function animate() {
	stats.update();

	if (Math.abs(speed) > 0.005) { speed += Math.sign(speed) * -0.001; }
	else { speed = 0; }
	
	if (train1.position.z > 6 || train1.position.z < -25) { speed *= -1; }

	train1.position.z += speed;
	train2.position.z += speed;
	train3.position.z += speed;
	train4.position.z += speed;
	
	//camera.lookAt(train1.position);
	//camera.position.set( train1.position.x + 12, train1.position.y + 10, train1.position.z - 4);
	
	renderer.render(scene, camera);
	renderer2.render(scene2, camera);
}

// Model Loader

const loader = new GLTFLoader();

loader.load( 'models/scene.glb', function ( gltf ) {
    model1 = gltf.scene;
	
	// Set shadow casts

	model1.traverse( function( child ) {
		if (child.name === "Plane") {
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
	} );
	
	
	scene.add( gltf.scene );
	model1.encoding = THREE.sRGBEncoding;

    renderer.setAnimationLoop( animate );
}, undefined, function ( error ) {

	console.error( error );

} );