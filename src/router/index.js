import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import store from '@/store'
import NProgress from 'nprogress'
import middlewareAuth from '@/middleware/auth'
NProgress.configure({ showSpinner: false })
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

function globalMiddleware() {
  return [middlewareAuth]
}

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    context.next(...parameters)
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({
      ...context,
      next: nextMiddleware
    })
  }
}

// eslint-disable-next-line
router.beforeEach(async (to, from, next) => {
  // window.$loadingBar?.start()
  NProgress.start()
  document.title = to.meta?.title ?? import.meta.env.VUE_APP_NAME ?? ''

  let middleware = null
  let routeMiddleware = null

  if (to.meta.middleware) {
    routeMiddleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]
  }
  middleware = routeMiddleware ? globalMiddleware().concat(routeMiddleware) : globalMiddleware()

  if (middleware.length > 0) {
    const context = {
      to,
      from,
      next,
      store
    }
    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({
      ...context,
      next: nextMiddleware
    })
  }

  // return next()
})
router.afterEach(() => {
  setTimeout(() => {
    NProgress.done()
    // window.$loadingBar?.finish()
  }, 200)
})
//
router.onError(() => {
  NProgress.done()
  // window.$loadingBar?.error()
})
export default router
