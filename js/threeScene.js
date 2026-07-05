// ===============================
// THREE.JS HERO BACKGROUND
// ===============================

// Create Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 6;

// Renderer
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.zIndex = "-1";
renderer.domElement.style.pointerEvents = "none";

document.body.appendChild(renderer.domElement);

// ===============================
// Lights
// ===============================

const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x5B6CFF, 3);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// ===============================
// Main Sphere
// ===============================

const sphereGeometry = new THREE.IcosahedronGeometry(1.4, 2);

const sphereMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x5B6CFF,
    metalness: 0.8,
    roughness: 0.15,
    transmission: 0.35,
    clearcoat: 1,
    transparent: true
});

const sphere = new THREE.Mesh(
    sphereGeometry,
    sphereMaterial
);

scene.add(sphere);

// ===============================
// Floating Cubes
// ===============================

const cubes = [];

for (let i = 0; i < 30; i++) {

    const geometry = new THREE.BoxGeometry(0.18, 0.18, 0.18);

    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff
    });

    const cube = new THREE.Mesh(geometry, material);

    cube.position.x = (Math.random() - 0.5) * 10;
    cube.position.y = (Math.random() - 0.5) * 8;
    cube.position.z = (Math.random() - 0.5) * 6;

    cube.rotation.x = Math.random() * Math.PI;
    cube.rotation.y = Math.random() * Math.PI;

    scene.add(cube);

    cubes.push(cube);

}

// ===============================
// Mouse Interaction
// ===============================

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {

    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;

    mouseY = (event.clientY / window.innerHeight - 0.5) * 2;

});

// ===============================
// Animation Loop
// ===============================

function animate() {

    requestAnimationFrame(animate);

    // Rotate Sphere
    sphere.rotation.x += 0.003;
    sphere.rotation.y += 0.004;

    // Follow Mouse
    sphere.position.x += (mouseX * 1.5 - sphere.position.x) * 0.04;
    sphere.position.y += (-mouseY * 1.5 - sphere.position.y) * 0.04;

    // Animate Cubes
    cubes.forEach((cube, index) => {

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.015;

        cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;

    });

    renderer.render(scene, camera);

}

animate();

// ===============================
// Resize
// ===============================

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

});
