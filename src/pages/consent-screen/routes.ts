export default {
  path: 'clients',
  children: [
    {
      path: '',
      component: () => import('./create/index.vue'),
      meta: { requiresAuth: true }
    }
  ]
}
