import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap';
import shield from './assets/shield1r.png';
import lock from './assets/lockr.png';

// Debug
//const gui = new dat.GUI()
const gltfLoader = new GLTFLoader();



// Scene
const scene = new THREE.Scene()

//Size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0,0,6)
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
const canvas = document.querySelector('#bg');

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: false
});
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Background 
const technoTexture = new THREE.TextureLoader().load('#bg');
scene.background = technoTexture;

//Controls
// const gridhelper = new THREE.GridHelper(200, 50);
// scene.add(gridhelper);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;


const particlesGeometry = new THREE.BufferGeometry;
const particlesCount = 500;
const positionArray = new Float32Array(particlesCount * 3);

for(let i = 0;i < particlesCount * 3; i++){
  positionArray[i] = (Math.random()-0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));

const techTexture = new THREE.TextureLoader().load(shield);
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.05,
  map: techTexture,
  transparent: true,
  color: 0xff00ba
})
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);


const particlesGeometry1 = new THREE.BufferGeometry;
const particlesCount1 = 500;
const positionArray1 = new Float32Array(particlesCount1 * 3);

for(let i = 0;i < particlesCount1 * 3; i++){
  positionArray1[i] = (Math.random()-0.5) * 10;
}

particlesGeometry1.setAttribute('position', new THREE.BufferAttribute(positionArray1, 3));

const techTexture1 = new THREE.TextureLoader().load(lock);
const particlesMaterial1 = new THREE.PointsMaterial({
  size: 0.05,
  map: techTexture1,
  transparent: true,
  color: 0xff9e00
})

const particlesMesh1 = new THREE.Points(particlesGeometry1, particlesMaterial1);
scene.add(particlesMesh1);


// Move Camera
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.002;
  camera.rotation.y = t * -0.002;
}
document.body.onscroll = moveCamera;
moveCamera();

//Control
document.addEventListener('mousemove', animateParticles);

let mouseX = 0;
let mouseY = 0;

function animateParticles() {
  mouseY = event.clientY
  mouseX = event.clientX
}

//Animation
function animate() {
  requestAnimationFrame(animate);

  particlesMesh.rotation.y += 0.0007;
  particlesMesh1.rotation.y += 0.0007;

  // if(mouseX > 0){
  //   particlesMesh.rotation.y = mouseX * 0.0001;
  //   particlesMesh.rotation.x = -mouseY * 0.0001;
  //   particlesMesh1.rotation.y = mouseX * 0.0001;
  //   particlesMesh1.rotation.x = -mouseY  * 0.0001;
  //   mouseY=0;
  //   mouseX=0;
  // }


  // controls.update();

  renderer.render(scene, camera);
}

animate();

