// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'

import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import store from './store'
import VueResource from 'vue-resource'
import VueFormGenerator from 'vue-form-generator'
Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueFormGenerator)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
