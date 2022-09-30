//Escenario
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a2b3c);
var loader = new THREE.TextureLoader();
loader.load('../Imagenes/fondo.png', function(texture){
    scene.background = texture; 
    });

//camaras
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//render
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Geometria
const geometry = new THREE.BoxGeometry( 32, 10, 31 );
const textureLoader = new THREE.TextureLoader;
const matcap = textureLoader.load(0x000000)
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcap
material.flatShading = true;
const cylinder = new THREE.Mesh( geometry, material );
scene.add( cylinder );

//ROBOT
const gltfLoader = new THREE.GLTFLoader();

gltfLoader.load('../Imagenes/Robot/scene.gltf',
(gltf) => {
    var loaderObjeto = gltf.scene;
    loaderObjeto.scale.set(0.4,0.4,0.4);
    const Directionallight = new THREE.AmbientLight(0xffffff);
    scene.add(Directionallight);
    console.log('carga completa');
    scene.add(loaderObjeto);
    loaderObjeto.position.x = 0
    loaderObjeto.position.y = 1
const controls1 = new THREE.DragControls([loaderObjeto], camera, renderer.domElement );

}, ()=>{
    console.log('cargando');  
}, ()=>{
    console.log('error');
}
);

camera.position.z = 100;


//animation
function animate() {
	requestAnimationFrame( animate );
    /*cylinder.rotation.x += 0.02;
    cylinder.rotation.y += 0.05;*/
	renderer.render( scene, camera );
}
animate();



