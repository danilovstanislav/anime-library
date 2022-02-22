import axios from 'axios'

export const characterPage = {
  namespaced: true,

  state: () => ({
    currentChar: null,
  }),

  mutations: {
    setCurrentChar(state, payload) {
      state.currentChar = payload
    },
  },

  actions: {
    async getCurrentChar({ commit }, id) {
      try {
        const res = await axios.get(`https://api.jikan.moe/v4/characters/${id}`)
        commit('setCurrentChar', res.data.data)
      } catch (err) {
        console.error(err)
      }
    },
  },
}
