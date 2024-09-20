import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/environments/RoomEnvironment.js';

// Renderer

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize($("#canvas").width(), $("#canvas").height());
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );

// Camera

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 10, 8, -3 );
camera.lookAt( 0, 2, -1 );

// Environment

const environment = new RoomEnvironment();
const pmremGenerator = new THREE.PMREMGenerator( renderer );

// Scene

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x66d9ff );
//scene.environment = pmremGenerator.fromScene( environment ).texture;
const canvas = document.getElementById("canvas");
canvas.appendChild( renderer.domElement );

// Fog

scene.fog = new THREE.Fog( 0x99ccff, .1, 45 );

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
//spotlight.shadow.radius = 2000;
//spotlight.shadow.blurSamples = 2;
scene.add( spotlight );

// Animation Loop

var model1;

function animate() {
    
	renderer.render( scene, camera );
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
		} else if ( child.isMesh ) {
			child.castShadow = true;
		}
		console.log(child.name);
	} );
	
	scene.add( gltf.scene );
	model1.encoding = THREE.sRGBEncoding;

    renderer.setAnimationLoop( animate );
}, undefined, function ( error ) {

	console.error( error );

} );