import areaRoutes from './areas/routes'
import roleRoutes from './roles/routes'
import userRoutes from './users/routes'

export default {
  name: 'Master',
  path: '/master',
  children: [
    {
      path: '',
      component: () => import('./index.vue'),
      meta: { requiresAuth: true }
    },
    userRoutes,
    roleRoutes,
    areaRoutes
  ]
}
