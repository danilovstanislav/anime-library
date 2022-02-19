import axios from 'axios'

export const homePage = {
  namespaced: true,

  state: () => ({
    topAnime: [],
    recentEpisodes: [],
  }),

  mutations: {
    setTopAnime(state, topAnime) {
      state.topAnime = topAnime
    },
    setRecentEpisodes(state, recentEpisodes) {
      state.recentEpisodes = recentEpisodes
    },
  },

  actions: {
    async getTopAnime({ state, commit }) {
      if (!state.topAnime.length) {
        try {
          const res = await axios.get('https://api.jikan.moe/v4/top/anime')
          commit('setTopAnime', res.data.data)
        } catch (err) {
          console.error(err)
        }
      }
    },

    async getRecentEpisodes({ state, commit }) {
      if (!state.recentEpisodes.length) {
        try {
          const res = await axios.get('https://api.jikan.moe/v4/watch/episodes')
          commit('setRecentEpisodes', res.data.data)
        } catch (err) {
          console.error(err)
        }
      }
    },
  },
}
