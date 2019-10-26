<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
const default_layout = "no"

export default {
  name: 'app',
  computed: {
    layout(){
      return (this.$route.meta.layout|| default_layout) + "-layout";
    }
  }
}
</script>

<style>
@import './assets/css/simple-sidebar.css';

</style>
