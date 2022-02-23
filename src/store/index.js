import { createStore } from 'vuex'
import { homePage } from '@/store/homePage'
import { animePage } from '@/store/animePage'

export default createStore({
  modules: {
    homePage,
    animePage,
  },
})
