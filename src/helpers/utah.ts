import * as Scene from '../engine/scene';
import { WebGLRenderer } from '../engine/renderer';
import { VertexBufferObject, setCanvasFullScreen, uniform } from '../engine/glUtils';
import Loader from '../engine/loader';
import { ShaderManager } from '../engine/shader';
import { mat4, vec3 } from '../engine/MV';
import { getPointsByDivide } from './teapot';

export const makeDivideCurve = () => {
  let camera: Scene.Camera;
  let scene: Scene.Graph;
  let renderer: WebGLRenderer = new WebGLRenderer();
  let material: Scene.Material;
  let mesh: Scene.SimpleMesh;
  let loader: Loader;
  let shaderManager: ShaderManager;
  const gl = renderer.getGLRenderContext();

  loader = new Loader('./assets/shader/');
  loader.load(['terrain.vert', 'terrain.frag', 'transform.glsl', 'sunlight.glsl']);
  loader.setOnRendy(init);

  function init() {
    // 资源管理相关

    shaderManager = new ShaderManager(loader.resources, gl);

    const terrainShader = shaderManager.get('terrain');

    camera = new Scene.Camera();
    camera.position = new Float32Array([0, 0, 60]);

    const moutainVBO = new VertexBufferObject(new Float32Array(getPointsByDivide(3)), gl);

    mesh = new Scene.SimpleMesh({ position: moutainVBO });
    const transform = new Scene.Transform([mesh]);
    material = new Scene.Material(
      terrainShader,
      {
        sunColor: uniform.Vec3([0.8, 0.5, 0.5]),
        sunDirection: uniform.Vec3(vec3.normalize(new Float32Array([0.3, -0.6, 0.2]))),
      },
      [transform],
    );

    scene = new Scene.Graph();

    scene.append(material);

    renderer.setAnimationLoop(animation);
    renderer.start();
    document.querySelector('ion-content').appendChild(renderer.domElement);
    setCanvasFullScreen(renderer.domElement, scene);

    initModeView();

    function initModeView() {
      const FAR_AWAY = 10;
      const HEIGHT = 10;
      mat4.translate(transform.wordMatrix, new Float32Array([-FAR_AWAY / 2, -HEIGHT / 2, -FAR_AWAY / 2]));
      mat4.scale(transform.wordMatrix, new Float32Array([FAR_AWAY, HEIGHT, FAR_AWAY]));
    }
  }

  function animation(_time: number) {
    renderer.render(scene, camera);
  }
};
