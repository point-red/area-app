export default {
  path: '/my-account',
  children: [
    {
      path: '',
      component: () => import('@/pages/my-account/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'profile',
      component: () => import('@/pages/my-account/profile/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'password',
      component: () => import('@/pages/my-account/password/index.vue'),
      meta: { requiresAuth: true }
    }
  ]
}
