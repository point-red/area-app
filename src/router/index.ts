import { createRouter, createWebHistory } from 'vue-router'

import routesAuth from '@/pages/auth/routes'
import routesClient from '@/pages/clients/routes'
import routesHome from '@/pages/home/routes'
import routesMaster from '@/pages/master/routes'
import routesMyAccount from '@/pages/my-account/routes'
import routesUser from '@/pages/users/routes'
import { useAuthStore } from '@/stores/auth.store'
import { apiRequest } from '@/utils/api'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: () => import('../layouts/app.vue'),
      children: [routesHome, routesUser, routesMyAccount, routesClient, routesMaster]
    },
    {
      path: '/auth',
      component: () => import('../layouts/auth.vue'),
      children: [routesAuth]
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('@/pages/403.vue')
    },
    {
      path: '/:catchAll(.*)', // This handles all unknown routes
      name: 'not-found',
      component: () => import('@/pages/404.vue')
    }
  ]
})

const isAuthenticated = async () => {
  try {
    const authStore = useAuthStore()
    const response = await apiRequest.post('/v1/auth/verify-token')
    if (response.status === 200) {
      authStore.update({
        _id: response.data._id,
        name: response.data.name,
        username: response.data.username,
        email: response.data.email,
        role: response.data.role
      })
      return true
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false
  }
}

router.beforeEach(async (to, from, next) => {
  // 1. check if client is authenticated
  if (to.meta.requiresAuth && !(await isAuthenticated())) {
    // 1.1. redirect to signin page if not authenticated
    next()
    // next(`/signin?${new URLSearchParams(to.query as Record<string, string>).toString()}`)
  } else {
    // 1.2. continue
    next()
  }
})

export default router
