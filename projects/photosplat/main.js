import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/loaders/GLTFLoader.js';

// Renderer

const renderer = new THREE.WebGLRenderer();
renderer.setSize($("#canvas").width(), $("#canvas").height());
document.body.appendChild( renderer.domElement );

// Camera

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );
camera.position.z = 12;

// Scene

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
const canvas = document.getElementById("canvas");
canvas.appendChild( renderer.domElement );

// Lighting

const light = new THREE.AmbientLight( 0x404040, 50.0 );
scene.add( light );

const spotLight = new THREE.SpotLight( 0xffffff, 300000.0 );
spotLight.position.set( 100, 100, 100 );
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;
scene.add( spotLight );

const spotLight2 = new THREE.SpotLight( 0xffffff, 100000.0 );
spotLight2.position.set( -100, 100, -100 );
spotLight2.castShadow = true;
spotLight2.shadow.mapSize.width = 1024;
spotLight2.shadow.mapSize.height = 1024;
spotLight2.shadow.camera.near = 500;
spotLight2.shadow.camera.far = 4000;
spotLight2.shadow.camera.fov = 30;
scene.add( spotLight2 );

// Animation Loop

var model1;

function animate() {
    model1.rotation.y += 0.01;
    
	renderer.render( scene, camera );
}

// Model Loader

const loader = new GLTFLoader();

loader.load( 'models/camera.glb', function ( gltf ) {
    model1 = gltf.scene;
	scene.add( gltf.scene );
    
    renderer.setAnimationLoop( animate );

}, undefined, function ( error ) {

	console.error( error );

} );