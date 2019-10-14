<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
const THREE = require("three");

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// const OrbitControls = require("three-orbitcontrols");

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// const OBJLoader = require("three-obj-loader");

export default {
  name: "gl-tutorial2",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null
    };
  },
  methods: {
    init: function() {
      var container = document.getElementById("container");
      let that = this;
      
      this.scene = new THREE.Scene();

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      container.appendChild(this.renderer.domElement);

      const fov = 45;
      const aspect = window.innerWidth/ window.innerHeight; // the canvas default
      const near = 1;
      const far = 1000;
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.camera.position.set(0, 10, 40);


      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.update();


      this.scene.background = new THREE.Color("black");
      
      var ground = require('@/assets/models/checker.png');
      {
        const planeSize = 40;

        const loader = new THREE.TextureLoader();
        const texture = loader.load(
          ground
        );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
          map: texture,
          side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = -90 * Math.PI / 180 ; // 弧度
        that.scene.add(mesh);
      }
      
      {
        const skyColor = 0xb1e1ff; // light blue
        const groundColor = 0xb97a20; // brownish orange
        const intensity = 1;
        const light = new THREE.HemisphereLight(
          skyColor,
          groundColor,
          intensity
        );
        that.scene.add(light);
      }

      {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(0, 10, 0);
        light.target.position.set(-5, 0, 0);
        that.scene.add(light);
        that.scene.add(light.target);
      }

     
      var threeDObj = require('@/assets/models/windmill.obj');
      // instantiate a loader
      // OBJLoader(THREE);
      // var loader = new THREE.OBJLoader();
      var loader = new OBJLoader();
      {
        // load a resource
        loader.load(
          // resource URL
          threeDObj,
          // called when resource is loaded
          function(object) {
            that.scene.add(object);
          },
          // called when loading is in progresses
          function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
          // called when loading has errors
          function(error) {
            console.log("loaded error");
          }
        );
      }
    },
    animate: function() {
      requestAnimationFrame(this.animate);

      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.init();
    this.animate();
  }
};
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>

</style>