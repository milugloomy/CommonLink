import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import WeVue from 'we-vue'
import 'we-vue/lib/style.css'

Vue.use(WeVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
