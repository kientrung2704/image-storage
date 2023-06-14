import { getAccessToken } from '@/utils/token'
import * as screen from '@/constants/screen'

export default async function auth({ to, next, store }) {
  const token = getAccessToken()

  if (to.name !== screen.SCREEN_LOGIN) {
    if (!token) {
      if (screen.SCREEN_NO_AUTH_FOOTER.includes(to.name)) {
        return next()
      }
      return next({
        name: screen.SCREEN_LOGIN,
        params: {
          url: to.fullPath
        }
      })
    }

    // if (screen.SCREEN_NO_AUTH.includes(to.name)) {
    //   if (screen.SCREEN_NO_AUTH_AND_AUTH.includes(to.name)) {
    //     return next();
    //   }
    //   return next({ name: screen.SCREEN_HOME });
    // }

    // if (to.meta?.permission) {
    //   const permission = await store.dispatch('user/getPermission');
    //   if (!permission.error) {
    //     const module = permission?.find((item) => item.module_name === to.meta?.permission);
    //     if (module?.value === UN_PERMISSION) {
    //       return next({ name: '403' });
    //     }
    //     return next();
    //   }
    //   return next();
    // }
    // return next();
  } else {
    if (token) {
      return next({ name: screen.SCREEN_HOME })
    }
    return next()
  }

  return next()
}
