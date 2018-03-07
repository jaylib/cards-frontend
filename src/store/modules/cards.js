
const state = {
  cards: []
}

const getters = {
  cards: (state, getters, rootState) => {
    return state.cards
  }
}

const actions = {
  saveCard: ({commit, state}, card) => {
    commit('addCard', card)
  }
}

const mutations = {
  addCard: (state, card) => {
    state.cards.push(card)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
