<template>
  <div>
    <b-card title="Demo" no-body>
      <b-card-header header-tag="nav">
        <b-nav card-header tabs>
          <b-nav-item :active="view=='../webgl1'" @click.prevent="changeView('webgl1')">WebGL</b-nav-item>
          <b-nav-item :active="view=='../tutorial1'" @click.prevent="changeView('tutorial1')">ThreeJs</b-nav-item>
          <b-nav-item :active="view=='../tutorial2'" @click.prevent="changeView('tutorial2')">ObjLoader</b-nav-item>
          <b-nav-item :active="view=='../tutorial3'" @click.prevent="changeView('tutorial3')">Dat.Gui</b-nav-item>
          <b-nav-item :active="view=='../tutorial4'" @click.prevent="changeView('tutorial4')">Camera</b-nav-item>
          <b-nav-item :active="view=='../tutorial5'" @click.prevent="changeView('tutorial5')">Skybox</b-nav-item>
          <b-nav-item :active="view=='../tutorial6'" @click.prevent="changeView('tutorial6')">Raycaster</b-nav-item>
        </b-nav>

      </b-card-header>
      <!-- <b-card-body>
        <component :is="view"></component>        
      </b-card-body> -->

      <iframe :src="view" class="border-0">
      </iframe>
    </b-card>
  </div>
</template>

<script>
import webgl1 from "../components/WebGL1.vue";
import tutorial1 from "../components/GLTutorial1.vue";
import tutorial2 from "../components/GLTutorial2.vue";
import tutorial3 from "../components/GLTutorial3.vue";
import tutorial4 from "../components/GLTutorial4.vue";
import tutorial5 from "../components/GLTutorial5.vue";
import tutorial6 from "../components/GLTutorial6.vue";

export default {
  components: {
    webgl1,
    tutorial1,
    tutorial2,
    tutorial3,
    tutorial4,
    tutorial5,
    tutorial6
  },
  data() {
    return {
      view: "../tutorial1"
    };
  },
  methods: {
    changeView(viewName) {
      this.view = "../" +  viewName;
    }
  }
};
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
iframe {
  width: 100%;
  height: 80vh;
}
</style>
