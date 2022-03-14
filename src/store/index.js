import { createStore } from 'vuex'
import { homePage } from '@/store/homePage'
import { animePage } from '@/store/animePage'
import { searchPage } from '@/store/searchPage'

export default createStore({
  modules: {
    homePage,
    animePage,
    searchPage,
  },
})
