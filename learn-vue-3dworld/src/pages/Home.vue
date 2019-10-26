<template>
  <div class="p-4">
    <img src="@/assets/logo.png" alt="">
    <a :href="obj" download>Download</a>
   
  </div>
</template>

<script>
var file = require('@/assets/logo.png');

export default {
  data(){
    return{
        obj: file
    }

  },
  mounted(){
  }
};
</script>