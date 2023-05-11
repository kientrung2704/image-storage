// import HomeView from '../views/HomeView.vue'
// function views(path) {
//   return () => import(`@/views/${path}.vue`).then((m) => m.default || m)
// }
const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   meta: {
  //     title: 'Home'
  //   },
  //   component: views('HomeView')
  // },
  // {
  //   path: '/about',
  //   meta: {
  //     title: 'About'
  //   },
  //   name: 'about',
  //   component: views('AboutView')
  // }
  {
    path: '/dashboard',
    component: () => import('@/layouts/Layout.vue'),
    // component: () => import('@/layouts/DashboardLayout.vue'),
    meta: {
      name: 'Dashboard',
      requireAuth: false
    },
    children: [
      {
        path: '/test',
        name: 'Dashboard',
        component: () => import('@/views/index.vue'),
        meta: {
          title: 'Dashboard',
          requireAuth: false
        }
      },
      {
        path: '/test1',
        name: 'Dashboard1',
        component: () => import('@/views/index.vue'),
        meta: {
          title: 'Dashboard',
          requireAuth: false
        }
      },
      {
        path: '/test2',
        name: 'Dashboard2',
        component: () => import('@/views/index.vue'),
        meta: {
          title: 'Dashboard',
          requireAuth: false
        }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/profile/UserProfile.vue'),
        meta: {
          title: 'Profile',
          requireAuth: false
        }
      },
      {
        path: 'child',
        redirect: '/child/test-child',
        meta: {
          title: 'Child',
          requireAuth: false
        },
        children: [
          {
            path: 'test-child',
            name: 'Dashboard3',
            component: () => import('@/views/HomeView.vue'),
            meta: {
              title: 'Dashboard3',
              requireAuth: false
            }
          }
        ]
      }
    ]
  }
]

export default routes
