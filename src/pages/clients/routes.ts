export default {
  path: 'clients',
  children: [
    {
      path: '',
      component: () => import('./list/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'create',
      component: () => import('./create/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: ':id',
      component: () => import('./show/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: ':id/edit',
      component: () => import('./edit/index.vue'),
      meta: { requiresAuth: true }
    }
  ]
}
