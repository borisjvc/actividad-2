import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ErrorView from '@/views/ErrorView.vue'
import LoginView from '../views/LoginView.vue'
import RegistroView from '@/views/RegistroView.vue'
import { AuthStore } from '@/stores/AuthStore'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: { auth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { auth: false },
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegistroView,
      meta: { auth: false },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: ErrorView,
      meta: { auth: false },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !AuthStore().IsLogged) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
