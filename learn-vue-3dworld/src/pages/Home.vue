<template>
  <div class="d-flex flex-row">
    <div class="p-2">
      <img src="@/assets/logo.png" alt />
      <a :href="obj" download>Download</a>
    </div>
    <div class="p-2">
      <PathFinding />
    </div>
  </div>
</template>

<script>
var file = require("@/assets/logo.png");

import PathFinding from "../components/PathFinding.vue";

export default {
  components:{
    PathFinding
  },
  data() {
    return {
      obj: file
    };
  },
  mounted() {}
};
</script>