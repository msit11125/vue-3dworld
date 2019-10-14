<template>
  <div id="container"></div>
</template>

<script>
const THREE = require("three");
const OrbitControls = require("three-orbitcontrols");
const dat = require("dat.gui");

export default {
  data() {
    return {
      container: null, 
      /** @type THREE.Scene */
      scene: null,
      /** @type THREE.PerspectiveCamera */
      camera: null,
      /** @type THREE.WebGLRenderer */
      renderer: null,
      /** @type THREE.AxisHelper */
      axis: null,
      /** @type THREE.Mesh */
      cube: null,
      //聲明一個保存需求修改的相關數據的對象
      guiControls: new (function() {
        this.rotationX = 0.01;
        this.rotationY = 0.01;
        this.rotationZ = 0.01;
      })()
    };
  },

  methods: {
    initGL() {
      this.container = document.getElementById("container");

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/ window.innerHeight,
        1,
        5000
      );
      this.camera.position.x = 40;
      this.camera.position.y = 40;
      this.camera.position.z = 40;
      this.camera.lookAt(this.scene.position);

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setClearColor(0xdddddd);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.update();

      var axis = new THREE.AxesHelper(10);

      this.scene.add(axis);

      var color = new THREE.Color("rgb(255, 0, 0)");
      var grid = new THREE.GridHelper(
        50,
        5,
        color,
        0x000000
      ); /** size : number, divisions : Number, colorCenterLine : Color, colorGrid : Color  */

      this.scene.add(grid);

      var cubeGemoetry = new THREE.BoxGeometry(5, 5, 5);
      var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff3300 });
      this.cube = new THREE.Mesh(cubeGemoetry, cubeMaterial);

      var planeGemoetry = new THREE.PlaneGeometry(30, 30, 30);
      var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
      var plane = new THREE.Mesh(planeGemoetry, planeMaterial);

      plane.rotation.x = (-90 * Math.PI) / 180; // 弧度
      plane.receiveShadow = true;

      this.scene.add(plane);

      this.cube.position.x = 2.5;
      this.cube.position.y = 2.5;
      this.cube.position.z = 2.5;
      this.cube.castShadow = true;

      this.scene.add(this.cube);

      var spotLight = new THREE.SpotLight(0xffffff);
      spotLight.castShadow = true;
      spotLight.position.set(15, 30, 50);
      var spotLightHelper = new THREE.SpotLightHelper(spotLight);

      this.scene.add(spotLight);
      this.scene.add(spotLightHelper);

      var datGUI = new dat.GUI({ autoPlace: false });
      datGUI.add(this.guiControls, "rotationX", 0, 1);
      datGUI.add(this.guiControls, "rotationY", 0, 1);
      datGUI.add(this.guiControls, "rotationZ", 0, 1);
      datGUI.domElement.id = 'gui';

      this.container.appendChild(datGUI.domElement);
      this.container.appendChild(this.renderer.domElement);
        
      document.getElementById('gui').style.position = 'absolute';
      this.renderer.render(this.scene, this.camera);

    },

    animate() {
      this.cube.rotation.x += this.guiControls.rotationX;
      this.cube.rotation.y += this.guiControls.rotationY;
      this.cube.rotation.z += this.guiControls.rotationZ;
      this.renderer.render(this.scene, this.camera);

      requestAnimationFrame(this.animate);
    },

    resize(){
       
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
  },

  mounted() {
    this.initGL();

    this.animate();

    window.addEventListener('resize', this.resize, false );

  }
};
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>

</style>