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
    children: [
      {
        path: '',
        name: 'AnimePageDefault',
        component: () => import('@/components/AnimePageDefault.vue'),
      },
      {
        path: 'characters',
        name: 'CharactersList',
        component: () => import('@/pages/CharactersList.vue'),
      },
      {
        path: 'reviews',
        name: 'ReviewsPage',
        component: () => import('@/pages/ReviewsPage.vue'),
      },
    ],
  },
  {
    path: '/anime/:animeId/characters/:charId',
    name: 'CharacterInfoPage',
    component: () => import('@/pages/CharacterInfoPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: () => import('@/pages/PageNotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
