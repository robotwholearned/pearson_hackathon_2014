//need a camera, a scene, and a renderer 
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//renderer: 
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
document.body.appendChild(renderer.domElement);

//add multi cube 
var geometryColored = new THREE.BoxGeometry(1, 1, 1);
var i;
for (i = 0; i < geometryColored.faces.length; i++) {
    geometryColored.faces[i].color.setHex(Math.random() * 0xffffff);
    console.log(geometryColored.faces[i].color);
}
var materialColored = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });
var coloredCube = new THREE.Mesh(geometryColored, materialColored);
coloredCube.position.set(-1.5, 0.0, 0.0);
scene.add(coloredCube);
var videoInput = document.getElementById('inputVideo');
var canvasInput = document.getElementById('inputCanvas');
var htracker = new headtrackr.Tracker();
htracker.init(videoInput, canvasInput);
htracker.start();

htracker.addEventListener("found", function (event) {
    coloredCube.rotationZ(event.angle)
        .positionX(event.x).positionY(event.y)
        .scaleX(event.width).scaleY(event.height);
});
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();