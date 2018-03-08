import Vue from 'vue'
import Router from 'vue-router'
import Card from '@/components/Card'
import CardList from '@/components/CardList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cards',
      name: 'cards',
      component: CardList
    },
    {
      path: '/cards/:cardId',
      name: 'card',
      component: Card
    }
  ]
})
