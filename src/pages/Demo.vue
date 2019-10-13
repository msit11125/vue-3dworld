<template>
  <div>
    <b-card title="Demo" no-body>
      <b-card-header header-tag="nav">
        <b-nav card-header tabs>
          <b-nav-item :active="view=='webgl1'" @click.prevent="changeView('webgl1')">WebGL1</b-nav-item>
          <b-nav-item :active="view=='tutorial1'" @click.prevent="changeView('tutorial1')">Tutorial1</b-nav-item>
          <b-nav-item :active="view=='tutorial2'" @click.prevent="changeView('tutorial2')">Tutorial2</b-nav-item>
          <b-nav-item :active="view=='tutorial3'" @click.prevent="changeView('tutorial3')">Tutorial3</b-nav-item>
        </b-nav>
      </b-card-header>
      <b-card-body>
        <component :is="view"></component>        
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import webgl1 from "../components/WebGL1.vue";
import tutorial1 from "../components/GLTutorial1.vue";
import tutorial2 from "../components/GLTutorial2.vue";
import tutorial3 from "../components/GLTutorial3.vue";

export default {
  components: {
    webgl1,
    tutorial1,
    tutorial2,
    tutorial3
  },
  data() {
    return {
      view: "tutorial1"
    };
  },
  methods: {
    changeView(viewName) {
      this.view = viewName;
    }
  }
};
</script>
