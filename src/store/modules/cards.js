import Vue from 'vue'

const state = {
  fetched: false,
  cards: [],
  comments: []
}

const getters = {
  cards: (state, getters, rootState) => {
    return state.cards
  },
  card: (state, getters, rootState) => {
    const card = state.cards.filter(card => card.id === rootState.route.params.cardId)
    return state.cards.filter(card => card.id === rootState.route.params.cardId)[0] || {}
  },
  comments: (state, getters, rootState) => {
    const card = state.cards.filter(card => card.id === rootState.route.params.cardId)
    const comments = (card[0] || { comments: [] }).comments
    return comments
  },
  fetched: (state, getters, rootState) => {
    return state.fetched
  }
}

const actions = {
  saveCard: ({commit, state}, card) => {
    commit('addCard', card)
  },
  saveCards: ({commit, state}, cards) => {
    commit('addCards', cards)
  },
  getCard: ({commit, state}, id) => {
    Vue.http.get(`http://localhost:8089/cards/${id}`).then(cardResponse => {
      Vue.http.get(`http://localhost:8089/cards/${id}/comments`).then(commentsResponse => {
        let card = cardResponse.body
        card['comments'] = commentsResponse.body
        commit('addCard', card)
      }, response => {

      })
    }, response => {

    })
  }
}

const mutations = {
  addCard: (state, card) => {
    function compare (a, b) {
      if (a.created < b.created) return 1
      if (a.created > b.created) return -1
      return 0
    }
    state.cards = state.cards.filter(i => i.id !== card.id)
    state.cards.push(card)
    card.comments.sort(compare)
  },
  addCards: (state, cards) => {
    state.fetched = true
    state.cards = cards
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
