import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  REMEMBER_ME,
  FCM_TOKEN,
  USER_ACCOUNT_ID
} from '@/constants/common'
import Cookie from 'js-cookie'
import dayjs from 'dayjs'

const getAccessToken = () => Cookie.get(ACCESS_TOKEN)
const getRefreshToken = () => Cookie.get(REFRESH_TOKEN)
const getRememberMe = () => Cookie.get(REMEMBER_ME)
const getFcmToken = () => Cookie.get(FCM_TOKEN)
const getUserAccountId = () => Cookie.get(USER_ACCOUNT_ID)

const removeAccessToken = () => {
  Cookie.remove(ACCESS_TOKEN)
  Cookie.remove(REMEMBER_ME)
  Cookie.remove(REFRESH_TOKEN)
  Cookie.remove(FCM_TOKEN)
  Cookie.remove(USER_ACCOUNT_ID)
}

const setAccessToken = (token, refreshToken, checkBox, userId) => {
  const now = new Date()
  const time = now.getTime()
  const expireTime = time + 1000 * 36000
  now.setTime(expireTime)
  if (checkBox) {
    Cookie.set(REMEMBER_ME, checkBox, {
      expires: now,
      secure: true
    })
    Cookie.set(ACCESS_TOKEN, token, {
      expires: now,
      secure: true
    })
    Cookie.set(REFRESH_TOKEN, refreshToken, {
      expires: now,
      secure: true
    })
    Cookie.set(USER_ACCOUNT_ID, userId, {
      expires: now,
      secure: true
    })
  } else {
    Cookie.set(REMEMBER_ME, checkBox, { secure: true })
    Cookie.set(ACCESS_TOKEN, token, { secure: true })
    Cookie.set(REFRESH_TOKEN, refreshToken, { secure: true })
    Cookie.set(USER_ACCOUNT_ID, userId, { secure: true })
  }
}

const setFcmToken = (token) => {
  Cookie.set(FCM_TOKEN, token)
}

export {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
  getRefreshToken,
  setFcmToken,
  getFcmToken,
  getRememberMe,
  getUserAccountId
}
