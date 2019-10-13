<template>
  <div>
    <div id="container"></div>
    <div id="Stats-output"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import Stats from "stats-js"; // FPS工具

export default {
  name: "gl-tutorial1",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      cube: null,

      alpha: 0,
      stats: new Stats()
    };
  },
  methods: {
    init: function() {
      var container = document.getElementById("container");

      this.scene = new THREE.Scene();
      // THREE.OrthographicCamera(left, right, top, bottom, near, far)
      this.camera = new THREE.OrthographicCamera(-10, 10, 7.5, -7.5, 1, 1000);
      this.camera.position.set(3, 2, 5);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.scene.add(this.camera);

      var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(8, 8, 8, 16),
        new THREE.MeshLambertMaterial({ color: 0xcccccc })
      );
      plane.position.y = -1;
      plane.rotation.x = (-90 * Math.PI) / 180; // 弧度
      plane.receiveShadow = true;
      this.scene.add(plane);

      this.cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshLambertMaterial({ color: 0x00ff00 })
      );
      this.cube.position.x = 2;
      this.cube.castShadow = true;
      this.scene.add(this.cube);

      var light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
      light.position.set(2, 5, 3);
      light.target = this.cube;
      light.castShadow = true;

      this.scene.add(light);

      // ambient light
      var ambient = new THREE.AmbientLight(0x666666);
      this.scene.add(ambient);

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(800, 600);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMapSoft = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      container.appendChild(this.renderer.domElement);
    },

    animate: function() {
      this.stats.begin();
      this.moveCube();
      this.renderer.render(this.scene, this.camera);

      this.stats.end();

      requestAnimationFrame(this.animate);
    },

    moveCube() {
      this.alpha += 0.01;
      if (this.alpha > Math.PI * 2) {
        this.alpha -= Math.PI * 2;
      }

      this.cube.position.set(
        2 * Math.cos(this.alpha),
        0,
        2 * Math.sin(this.alpha)
      );

      this.renderer.render(this.scene, this.camera);
    },

    setStats() {
      this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
      this.stats.domElement.style.position = "fixed";
      this.stats.domElement.style.bottom = "0px";
      this.stats.domElement.style.right = "0px";
      this.stats.domElement.style.top = null;
      this.stats.domElement.style.left = null;
      document
        .getElementById("Stats-output")
        .appendChild(this.stats.domElement);
    }
  },
  mounted() {
    this.setStats();
    this.init();
    this.animate();
  }
};
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
#container {
  width: 100%;
  height: 80vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>