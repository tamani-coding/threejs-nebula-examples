import "reset-css";
import * as THREE from "three";
import Nebula, { SpriteRenderer } from "three-nebula";
import getThreeApp from "./three-app";
import json from "./magic-particle-system.json";

function animate(nebula, app) {
  requestAnimationFrame(() => animate(nebula, app));

  nebula.update();
  app.renderer.render(app.scene, app.camera);
}

Nebula.fromJSONAsync(json.particleSystemState, THREE).then(loaded => {

  loaded.emitters.forEach(emitter => {
    emitter.position.y = 11
  })

  const app = getThreeApp();
  const nebulaRenderer = new SpriteRenderer(app.scene, THREE);
  const nebula = loaded.addRenderer(nebulaRenderer);

  animate(nebula, app);
});