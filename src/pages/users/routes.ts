export default {
  path: '',
  children: [
    {
      path: 'profile',
      component: () => import('@/pages/users/profile/index.vue'),
      meta: { requiresAuth: true }
    }
  ]
}
