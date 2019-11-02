import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

import axios from 'axios';
import VueAxios from 'vue-axios';

import './assets/styles/main.scss'; // 載入 bootstrap CSS 檔
import 'bootstrap';      // 載入 bootstrap 的 JS 檔
import 'jquery';        // 載入 jQuery

import Default from './layouts/Default.vue';

// Jquery
window.$ = require('jquery');
window.JQuery = require('jquery');

// Axios
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;
Vue.config.devtools = true;


Vue.component('default-layout', Default);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
