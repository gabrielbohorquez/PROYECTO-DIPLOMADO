import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFire from 'firebase'
import axios from 'axios'
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

Vue.prototype.$http = axios


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
