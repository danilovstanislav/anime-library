import { createStore } from 'vuex'
import { homePage } from '@/store/homePage'
import { animePage } from '@/store/animePage'
import { characterPage } from '@/store/characterPage'

export default createStore({
  modules: {
    homePage,
    animePage,
    characterPage,
  },
})
