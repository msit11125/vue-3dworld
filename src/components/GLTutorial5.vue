<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from "three";

const OrbitControls = require("three-orbitcontrols");

export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      pointLight2: null,
      angle: 0
    };
  },
  methods: {
    initGL() {
      var container = document.getElementById("container");

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        50000
      );
      this.camera.position.set(10, 10, 10);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.scene.add(this.camera);

      // renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true });

      this.renderer.setSize(window.innerWidth, window.innerHeight);

      container.appendChild(this.renderer.domElement);

      // controls
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.minDistance = 10;
      controls.maxDistance = 500;
      controls.update();

      // plane
      //   var planeGemoetry = new THREE.PlaneGeometry(12, 12, 12, 22); // size: 12, split: 22
      //   var planeMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa});

      //   var plane = new THREE.Mesh(planeGemoetry, planeMaterial);

      //   plane.rotation.x = (-90 * Math.PI) / 180; // 弧度
      //   plane.receiveShadow = true;

      //   this.scene.add(plane);

      var ground = require("@/assets/models/rock.jpg");

      const loader = new THREE.TextureLoader();
      const texture = loader.load(ground);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.NearestFilter;
      const cubeSize = 4;

      // cube
      var cubeGeometry = new THREE.BoxBufferGeometry(
        cubeSize,
        cubeSize,
        cubeSize
      );
      var cubeMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        normalMap: texture // 法向貼圖
      });
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.y = 2;
      cube.castShadow = true;

      this.scene.add(cube);

      //   var pointLight1 = new THREE.SpotLight(0xffffff, 1, 40, Math.PI / 6, 25);
      //   pointLight1.position.set(5, 9, 3);
      //   pointLight1.castShadow = true;
      //   pointLight1.shadow.bias = 0.001;
      //   this.scene.add(pointLight1);

      //添加可以移动的点光源
      this.pointLight2 = new THREE.PointLight(0xffffff, 1, 40, Math.PI / 6, 25);
      this.pointLight2.position.set(0, 5, 0);
      this.pointLight2.castShadow = true;
      this.scene.add(this.pointLight2);

      this.pointLight2.add(
        new THREE.Mesh(
          new THREE.SphereGeometry(0.05, 20, 20),
          new THREE.MeshBasicMaterial({ color: 0x00ffff })
        )
      );
      // skybox
      let materialArray = [];
      let texture_ft = new THREE.TextureLoader().load(
        require("@/assets/models/Plants/posx.jpg")
      );
      let texture_bk = new THREE.TextureLoader().load(
        require("@/assets/models/Plants/negx.jpg")
      );
      let texture_up = new THREE.TextureLoader().load(
        require("@/assets/models/Plants/posy.jpg")
      );
      let texture_dn = new THREE.TextureLoader().load(
        require("@/assets/models/Plants/negy.jpg")
      );
      let texture_rt = new THREE.TextureLoader().load(
        require("@/assets/models/Plants/posz.jpg")
      );
      let texture_lf = new THREE.TextureLoader().load(
        require("@/assets/models/Plants/negz.jpg")
      );

      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

      for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;
      let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
      let skybox = new THREE.Mesh(skyboxGeo, materialArray);
      this.scene.add(skybox);

      var ambient = new THREE.AmbientLight(0x666666);
      this.scene.add(ambient);
    },

    render() {
      //设置点光源的移动
      this.angle += 1;
      var radian = (this.angle / 180) * Math.PI;
      var x = Math.sin(radian);
      var y = Math.cos(radian);
      var r = 2;
      this.pointLight2.position.z = x * r;
      this.pointLight2.position.x = y * r - r;

      this.renderer.render(this.scene, this.camera);

      requestAnimationFrame(this.render);
    }
  },
  mounted() {
    this.initGL();
    this.render();
  }
};
</script>


<style  rel="stylesheet/scss" lang="scss" scoped>
</style>