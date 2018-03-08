<template>
  <div>
    <div class="cards">
      <div v-bind:id="card.id" class="card" v-on:click="onClick" v-bind:key="card.id" v-for="card in cards">
        <h1>{{ card.title }}</h1>
        <p>
          {{ card.greetingText }}
        </p>
        <span class="author">{{ card.author }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data: () => ({}),
  created () {
    this.fetchCards()
  },
  computed: mapGetters({
    cards: 'cards',
    fetched: 'fetched'
  }),
  methods: {
    ...mapActions({
      saveCards: 'saveCards'
    }),
    onClick (event) {
      const argument = event.currentTarget.id
      this.$router.push({name: 'card', params: {cardId: argument}})
      console.log(argument)
    },
    fetchCards () {
      console.log('fetching')
      this.$http.get(`http://localhost:8089/cards`).then(response => {
        this.saveCards(response.body)
      }, response => {

      })
    }
  }
}
</script>

<style scoped>
  h1 {
    padding: 0px;
  }
  .card:nth-child(even) {
    background-color: #ffcdd2;
  }
  .card:nth-child(odd) {
    background-color: #ef9a9a;
  }
  .card {
    padding: 10px;
  }
  .card:hover {
    cursor: pointer;
  }
</style>
