import axios from 'axios'
import router from '@/router'
import { h } from 'vue'
import { getAccessToken, removeAccessToken, getRefreshToken, getUserAccountId } from '@/utils/token'
import store from '../store'

axios.defaults.baseURL = import.meta.env.VITE_VUE_APP_API_BASE_URL

let isRefreshing = false
let failedQueue = []
let userIsDelete = false

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

axios.interceptors.request.use(
  (request) => {
    const token = getAccessToken()
    request.headers['Access-Control-Allow-Origin'] = '*'
    request.headers['Access-Control-Allow-Methods'] = 'GET'
    request.headers['Cache-Control'] = 'no-store'
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }

    const userAccountId = getUserAccountId()
    if (userAccountId) {
      request.params = {
        ...request.params
        // user_auth_id: userAccountId
      }
    }

    return request
  },
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    console.log('errorrrr', error)
    const originalRequest = error.config
    const urlArray = originalRequest.url?.split('/')
    if (
      // eslint-disable-next-line
      error.response?.status &&
      // eslint-disable-next-line
      (!getAccessToken ||
        (urlArray !== undefined && urlArray[urlArray.length - 1] === 'refresh-token'))
    ) {
      await removeAccessToken()
      router.push({ name: 'login' })
      return Promise.reject(error)
    }
    switch (error.response.status) {
      case 401:
        if (getAccessToken() && !originalRequest._retry) {
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject })
            })
              .then(async (token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`
                return axios(originalRequest)
              })
              .catch((err) => {
                Promise.reject(err)
              })
          }
          originalRequest._retry = true
          isRefreshing = true
          return new Promise((resolve, reject) => {
            store
              .dispatch('auth/refreshToken', {
                refresh_token: getRefreshToken()
              })
              .then((res) => {
                error.config.headers.Authorization = `Bearer ${res.data.access_token}`
                processQueue(null, getAccessToken())
                resolve(axios(originalRequest))
              })
              .catch((err) => {
                processQueue(err, null)
                reject(err)
              })
              .finally(() => {
                isRefreshing = false
              })
          })
        }

        break
      case 403:
        // router.push({ name: '403' });
        break
      case 404:
        // if (error.response.data.errors !== "MFK_ERROR") {
        //   router.push({ name: 'NotFound' });
        // }
        break
      case 406: {
        // if (!userIsDelete && getAccessToken()) {
        //   userIsDelete = true;
        //   const res = new Promise((resolve, reject) => {
        //     const elm = [
        //       h('div', 'アカウント情報が更新されたため、ログアウトされました。'),
        //       h('div', 'ログイン画面に移動します。')
        //     ];
        //     Modal.confirm({
        //       title: '',
        //       content: h('div', {}, elm),
        //       okText: 'OK',
        //       cancelButtonProps: { style: { display: 'none' } },
        //       onOk: () => Promise.resolve(resolve(true)),
        //       afterClose: async () => {
        //         store.commit('modal/changeContinueActionStatus', true);
        //         userIsDelete = false;
        //         await removeAccessToken();
        //         router.push({ name: 'Login' });
        //       }
        //     });
        //   });
        // }
        break
      }
      default:
        break
    }
    return Promise.reject(error)
  }
)

export default axios
