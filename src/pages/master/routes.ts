import areaRoutes from './areas/routes'

export default {
  name: 'Master',
  path: '/master',
  children: [
    {
      path: '',
      component: () => import('./index.vue'),
      meta: { requiresAuth: true }
    },
    areaRoutes
  ]
}
