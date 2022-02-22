import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/anime/:animeId',
    name: 'AnimePage',
    component: () => import('@/pages/AnimePage.vue'),
  },
  {
    path: '/anime/:animeId/characters',
    name: 'CharactersList',
    component: () => import('@/pages/CharactersList.vue'),
  },
  {
    path: '/character/:charId',
    name: 'CharacterPage',
    component: () => import('@/pages/CharacterPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
