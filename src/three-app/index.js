import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight, Color } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

const staffPathMtl = 'staffs/Staff_04.mtl';
const staffPathObj = 'staffs/Staff_04.obj';

export let scene;
export let camera;
export let renderer;

export default () => {
  camera = new PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 100;
  scene = new Scene();
  scene.background = new Color(0xbbbbbb);

  addLight();

  renderer = new WebGLRenderer();

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("black");

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  document.body.appendChild(renderer.domElement);

  loadStaff(scene);

  return { scene, camera, renderer };
};


function addLight() {
  const directionalLight = new DirectionalLight(0xffffff, 1.0);
  directionalLight.castShadow = true;
  directionalLight.position.set(30, 50, 30);
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.left = -70;
  directionalLight.shadow.camera.right = 70;
  directionalLight.shadow.camera.top = 70;
  directionalLight.shadow.camera.bottom = -70;
  scene.add(directionalLight);

  const ambientLight = new AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);
}

function loadStaff(scene) {

  new MTLLoader().load(staffPathMtl, function (materials) {
    new OBJLoader().setMaterials(materials).loadAsync(staffPathObj).then((group) => {
      const staff = group.children[0];

      staff.scale.x = 4;
      staff.scale.y = 4;
      staff.scale.z = 4;

      staff.castShadow = true
      staff.receiveShadow = true

      scene.add(staff)
    })
  });

}