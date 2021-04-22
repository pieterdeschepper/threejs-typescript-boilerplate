import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls';

//Create a scene
const scene:THREE.Scene = new THREE.Scene();
scene.background = new THREE.Color(0x333333);

//Create a camera
const camera:THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(2, 1, 2);
camera.lookAt(0, 0, 0);

//Create the renderer
const renderer:THREE.WebGLRenderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Add axeshelper for reference
const axesHelper:THREE.AxesHelper = new THREE.AxesHelper(10);
scene.add( axesHelper );

//Create dat object for debugging
const gui:dat.GUI = new dat.GUI();

//Add lighting
const lights:THREE.Light[] = [];
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const dirLight = new THREE.DirectionalLight(0xffffff);
dirLight.position.set(10, 10, 20);
scene.add(dirLight);

//Add orbit controls to pan around
const controls:OrbitControls = new OrbitControls(camera, renderer.domElement);

//Add objects
const cube:THREE.Mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({color: 0xff0000, roughness: 0.7, metalness: 0.3}));
scene.add(cube);

const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(camera.position, "x", -5, 5, 0.01);
cubeFolder.add(camera.position, "y", -5, 5, 0.01);
cubeFolder.add(camera.position, "z", -5, 5, 0.01);
cubeFolder.open();

//Make sure renderer and camera aspectratio's update on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});

renderScene();

function renderScene() {
    //Updates go here
    cube.rotation.y += 0.01;
    
    //Update the Orbit Controller
    controls.update();

    //Update the gui
    gui.updateDisplay();

    //Render the scene
	renderer.render( scene, camera );

    requestAnimationFrame( renderScene );
}