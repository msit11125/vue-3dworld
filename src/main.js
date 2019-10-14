import Vue from 'vue';
import App from './App.vue';
import router from './router';

import 'jquery';        // 載入 jQuery
import 'bootstrap/dist/css/bootstrap.css'; // 載入 bootstrap CSS 檔
import 'bootstrap';      // 載入 bootstrap 的 JS 檔
import PortalVue from 'portal-vue';
import BootstrapVue from 'bootstrap-vue';

window.$ = require('jquery');
window.JQuery = require('jquery');
Vue.use(BootstrapVue);
Vue.use(PortalVue);

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // fas: 全部icon
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);

import Default from './layouts/Default.vue';
import NoLayout from './layouts/NoLayout.vue';

Vue.component('default-layout', Default);
Vue.component('no-layout', NoLayout);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
