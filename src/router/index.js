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
    path: '/anime/:animeId/characters/:charId',
    name: 'CharacterInfoPage',
    component: () => import('@/pages/CharacterInfoPage.vue'),
  },
  {
    path: '/anime/:animeId/reviews',
    name: 'ReviewsPage',
    component: () => import('@/pages/ReviewsPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
