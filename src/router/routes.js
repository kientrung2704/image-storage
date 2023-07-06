// import HomeView from '../views/HomeView.vue'
// function views(path) {
//   return () => import(`@/views/${path}.vue`).then((m) => m.default || m)
// }
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/layouts/Layout.vue'),
    // component: () => import('@/layouts/DashboardLayout.vue'),
    meta: {
      name: 'Dashboard'
    },
    children: [
      {
        path: 'image',
        name: 'image',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: 'Image'
        }
      },
      {
        path: 'explore',
        name: 'explore',
        component: () => import('@/views/dashboard/explore.vue'),
        meta: {
          title: 'Explore'
        }
      },
      {
        path: 'share',
        name: 'share',
        component: () => import('@/views/dashboard/explore.vue'),
        meta: {
          title: 'Share'
        }
      },
      {
        path: 'like',
        name: 'like',
        component: () => import('@/views/dashboard/like.vue'),
        meta: {
          title: 'Like'
        }
      },
      {
        path: 'trash',
        name: 'trash',
        component: () => import('@/views/dashboard/trash.vue'),
        meta: {
          title: 'Trash'
        }
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/cart/order.vue'),
        meta: {
          title: 'Order'
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'Profile'
        },
        children: [
          {
            path: 'general',
            name: 'general',
            component: () => import('@/views/profile/General.vue'),
            meta: {
              title: 'General'
            }
          },
          {
            path: 'security',
            name: 'security',
            component: () => import('@/views/profile/Security.vue'),
            meta: {
              title: 'Security'
            }
          },
          {
            path: 'plan',
            name: 'plan',
            component: () => import('@/views/profile/Plan.vue'),
            meta: {
              title: 'Plan'
            }
          },
          {
            path: 'login-history',
            name: 'login-history',
            component: () => import('@/views/profile/LoginHistory.vue'),
            meta: {
              title: 'LoginHistory'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/',
    name: 'main',
    component: () => import('@/layouts/MainLayout.vue'),
    // component: () => import('@/layouts/DashboardLayout.vue'),
    meta: {
      name: 'Main'
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/auth/login.vue'),
        meta: {
          title: 'Login'
        }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/auth/register.vue'),
        meta: {
          title: 'Register'
        }
      }
    ]
  }
]

export default routes
