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
// import * as EventSource from 'eventsource'

// import VueNativeSock from 'vue-native-websocket'

sync(store, router)

// Vue.use(VueNativeSock, 'ws://localhost:7980/chat')

Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(Vuex)
Vue.use(VueResource)

var webSocket = new window.SockJS('http://localhost:8089/messages')
webSocket.onopen = function () {

}

webSocket.onmessage = function (card) {
  let data = JSON.parse(card.data)
  switch (data.type) {
    case 'card':
      let card = data.data
      card.comments = []
      store.dispatch('saveCard', card)
      break
    case 'comment':
      store.dispatch('getCard', data.data.cardId)
      break
  }
}

// let url = 'http://localhost:8089/cards'
// let eventSource = new EventSource(url)
// eventSource.onmessage = (event) => {
//  console.debug('Received event: ', event)
//  let commentedCard = JSON.parse(event.data)
//  commentedCard.comments = []
//  store.commit('addCard', commentedCard)
//  console.log(commentedCard)
// }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
