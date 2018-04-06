<template>
  <div>
    <div class="cards">
      <div v-bind:id="card.id" class="card" v-on:click="onClick" v-bind:key="card.id" v-for="card in cards">
        <h1>{{ card.title }}</h1>
        <p>
          {{ card.greetingText }}
        </p>
        <span class="author">{{ card.author }}</span>
        <span class="author">{{ formatDate(card.created) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import moment from 'moment'
export default {
  data: () => ({}),
  created () {
    // setInterval(() => {
    this.fetchCards()
    // }, 2000)
  },
  computed: mapGetters({
    cards: 'cards',
    fetched: 'fetched'
  }),
  methods: {
    ...mapActions({
      saveCards: 'saveCards'
    }),
    formatDate (date) {
      return moment(date).format('LLL')
    },
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
  .card {
    background: #f34d52;
    width: 100%;
    padding: 50px;
  }

  .card h1 {
    font-size: 48px;
    color: white;
  }

  .card p {
    color: white;
    font-size: 24px;
  }

  .card .author {
    display: block;
    text-align: right;
    font-size: 14px;
    color: white;
    font-weight: bold;
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
