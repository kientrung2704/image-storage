import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash
        // behavior: 'smooth',
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return {
      top: 0
      // behavior: 'smooth',
    }
  }
})

// eslint-disable-next-line
router.beforeEach(async (to, from, next) => {
  window.$loadingBar?.start()
  document.title = to.meta?.title ?? import.meta.env.VUE_APP_NAME ?? ''

  // let middleware = null;
  // let routeMiddleware = null;

  // if (to.meta.middleware) {
  //   routeMiddleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
  // }
  // middleware = routeMiddleware ? globalMiddleware().concat(routeMiddleware) : globalMiddleware();

  // if (middleware.length > 0) {
  //   const context = {
  //     to,
  //     from,
  //     next,
  //     store,
  //   };
  //   const nextMiddleware = nextFactory(context, middleware, 1);

  //   return middleware[0]({
  //     ...context,
  //     next: nextMiddleware,
  //   });
  // }

  return next()
})
router.afterEach(() => {
  setTimeout(() => {
    window.$loadingBar?.finish()
  }, 200)
})

router.onError(() => {
  window.$loadingBar?.error()
})
export default router
