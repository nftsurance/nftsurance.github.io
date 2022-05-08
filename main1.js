import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap';
import lock from './assets/lock1.gltf?url';
import umbrella from './assets/umbrella1.gltf?url';
import coin from './assets/coin1.gltf?url';
import shield from './assets/shield1.gltf?url';

// Debug
const gltfLoader = new GLTFLoader();
let tl = gsap.timeline();
let tl1 = gsap.timeline();
let tl2 = gsap.timeline();
let tl3 = gsap.timeline();



// Scene
const scene = new THREE.Scene()

//Size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0,0,5)
camera.lookAt(0,0,0);

scene.add(camera)

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Canvas
const canvas = document.querySelector('#bg1');

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: false
});
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Background 
const technoTexture = new THREE.TextureLoader().load('assets/bg.jpg');
scene.background = technoTexture;

//Controls
// const gridhelper = new THREE.GridHelper(200, 50);
// scene.add(gridhelper);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

//Padlock1

gltfLoader.load(lock, (gltf) => {
    scene.add(gltf.scene);
    tl.to(gltf.scene.rotation, {y: 2000, duration: 10000});
    gltf.scene.position.set(3,-11.5,1.5);

});
gltfLoader.load(umbrella, (gltf) => {
    scene.add(gltf.scene);
    tl2.to(gltf.scene.rotation, {y: 2000, duration: 10000});
    gltf.scene.position.set(-5.5,-20.5,-1);

});

gltfLoader.load(coin, (gltf) => {
    scene.add(gltf.scene);
    tl3.to(gltf.scene.rotation, {y: 2000, duration: 10000});
    gltf.scene.position.set(3.5,-29,1);

});

gltfLoader.load(shield, (gltf) => {
    scene.add(gltf.scene);
    tl1.to(gltf.scene.rotation, {y: 2000, duration: 10000});
    gltf.scene.position.set(-3.8,-38.5,1);

});


// Move Camera
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  

  // camera.position.z = t * -0.01;
  // camera.position.x = t * -0.002;
   camera.position.y = t * 0.01;
}
document.body.onscroll = moveCamera;
moveCamera();


//Animation
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  //controls.update();
}

animate();

