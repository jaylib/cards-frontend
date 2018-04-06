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
import { sync } from 'vuex-router-sync'
// import VueNativeSock from 'vue-native-websocket'

sync(store, router)

// Vue.use(VueNativeSock, 'ws://localhost:7980/chat')

Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(Vuex)
Vue.use(VueResource)

// var webSocket = new WebSocket('ws://' + location.hostname + ':7980' + '/chat')
// webSocket.onopen = function () {
//   console.log('opened')
// }

var webSocket = new window.SockJS('http://localhost:8089/chat')
webSocket.onopen = function () {

}

webSocket.onmessage = function (card) {
  let commentedCard = JSON.parse(card.data)
  commentedCard.comments = []
  store.commit('addCard', commentedCard)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
