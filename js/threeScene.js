// ======================================================
// IMPORTS
// ======================================================

import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

import { GLTFLoader } from "https://unpkg.com/three@0.165.0/examples/jsm/loaders/GLTFLoader.js";


// ======================================================
// CONTAINER
// ======================================================

const container = document.getElementById("three-container");


// ======================================================
// SCENE
// ======================================================

const scene = new THREE.Scene();


// ======================================================
// CAMERA
// ======================================================

const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
);

camera.position.set(0, 1.3, 3);


// ======================================================
// RENDERER
// ======================================================

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.shadowMap.enabled = true;

container.appendChild(renderer.domElement);


// ======================================================
// LIGHTING
// ======================================================

// Ambient Light
const ambientLight = new THREE.AmbientLight(
    0xffffff,
    2
);

scene.add(ambientLight);


// Main Directional Light
const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    3
);

directionalLight.position.set(5, 8, 5);

directionalLight.castShadow = true;

scene.add(directionalLight);


// Blue Rim Light
const rimLight = new THREE.DirectionalLight(
    0x64c7ff,
    1.5
);

rimLight.position.set(-5, 5, -5);

scene.add(rimLight);


// ======================================================
// FLOOR SHADOW
// ======================================================

const floor = new THREE.Mesh(

    new THREE.CircleGeometry(1.3, 64),

    new THREE.ShadowMaterial({
        opacity: 0.18
    })

);

floor.rotation.x = -Math.PI / 2;

floor.position.y = -1.05;

floor.receiveShadow = true;

scene.add(floor);


// ======================================================
// LOAD MODEL
// ======================================================

let avatar;

const loader = new GLTFLoader();

loader.load(

    "models/priyanka.glb",

    (gltf) => {

        avatar = gltf.scene;

        // Scale
        avatar.scale.set(1.5, 1.5, 1.5);

        // Position
        avatar.position.set(0, -1, 0);

        // Enable shadows
        avatar.traverse((child) => {

            if (child.isMesh) {

                child.castShadow = true;
                child.receiveShadow = true;

            }

        });

        scene.add(avatar);

    },

    (xhr) => {

        console.log(
            Math.round(xhr.loaded / xhr.total * 100) + "% loaded"
        );

    },

    (error) => {

        console.error("Unable to load model");

        console.error(error);

    }

);


// ======================================================
// MOUSE TRACKING
// ======================================================

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {

    mouseX =
        (event.clientX / window.innerWidth) * 2 - 1;

    mouseY =
        (event.clientY / window.innerHeight) * 2 - 1;

});


// ======================================================
// ANIMATION LOOP
// ======================================================

const clock = new THREE.Clock();

function animate() {

    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    if (avatar) {

        // Floating animation
        avatar.position.y =
            -1 + Math.sin(elapsed * 2) * 0.08;

        // Smooth mouse follow
        avatar.rotation.y +=
            ((mouseX * 0.5) - avatar.rotation.y) * 0.05;

        avatar.rotation.x =
            mouseY * 0.08;

        // Gentle idle sway
        avatar.rotation.z =
            Math.sin(elapsed) * 0.02;

    }

    renderer.render(scene, camera);

}

animate();


// ======================================================
// RESIZE
// ======================================================

window.addEventListener("resize", () => {

    camera.aspect =
        container.clientWidth /
        container.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

});


// ======================================================
// OPTIONAL AUTO ROTATION
// ======================================================

// Uncomment if you want the avatar to slowly rotate
/*
function autoRotate(){

    if(avatar){

        avatar.rotation.y += 0.002;

    }

    requestAnimationFrame(autoRotate);

}

autoRotate();
*/
