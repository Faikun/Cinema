import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'default',
    redirect: { path: '/moviesPage/popular' }
  },
  {
    path: '/moviesPage/:type',
    name: 'movies',
    component: () => import('../views/MoviesPage.vue')
  },
  {
    path: '/search/:query',
    name: 'search',
    component: () => import('../views/SearchPage.vue')
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: () => import('../views/MovieInfo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
