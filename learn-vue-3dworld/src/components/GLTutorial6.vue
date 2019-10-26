<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from "three";

export default {
  mounted() {
    var container = document.getElementById("container");
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("#e5e5e5");
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);

    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();
    });

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshLambertMaterial({ color: 0xf7f7f7 });
    //var mesh = new THREE.Mesh(geometry, material);

    //scene.add(mesh);

    var meshX = -10;
    for (var i = 0; i < 15; i++) {
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 10;
      mesh.position.y = (Math.random() - 0.5) * 10;
      mesh.position.z = (Math.random() - 0.5) * 10;
      scene.add(mesh);
      meshX += 1;
    }

    var light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(0, 0, 0);
    scene.add(light);

    var light = new THREE.PointLight(0xffffff, 2, 1000);
    light.position.set(0, 0, 25);
    scene.add(light);

    var render = function() {
      requestAnimationFrame(render);

      renderer.render(scene, camera);
    };

    function onMouseMove(event) {
      event.preventDefault();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      var intersects = raycaster.intersectObjects(scene.children, true);
      for (var i = 0; i < intersects.length; i++) {
        var obj = intersects[i].object;
        console.log(obj);
      }
    }

    window.addEventListener("mousemove", onMouseMove);
    render();
  }
};
</script>

<style scoped>
body {
  margin: 0;
  height: 100vh;
}

canvas {
  display: block;
}
</style>