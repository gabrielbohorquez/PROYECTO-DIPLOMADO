import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/es'
import 'element-ui/lib/theme-chalk/index.css'
import VueFire from 'firebase'

Vue.config.productionTip = false

Vue.use(elementUI, {locale}, VueFire);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

