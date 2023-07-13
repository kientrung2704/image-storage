import axios from '@/plugins/axios'

const LOGIN = '/users/login'
const REGISTER = '/users/register'
const REFRESH_TOKEN = '/auth/refresh-token'
const ME = '/users/info'

export async function login(payload) {
  try {
    const data = await axios.post(`${LOGIN}`, payload)
    return data
  } catch (error) {
    return { error }
  }
}

export async function register(payload) {
  try {
    const data = await axios.post(`${REGISTER}`, payload)

    return data
  } catch (error) {
    return { error }
  }
}

export async function refreshToken(payload) {
  try {
    const data = await axios.post(`${REFRESH_TOKEN}`, payload)

    return data
  } catch (error) {
    return { error }
  }
}

export async function me() {
  try {
    const data = await axios.get('/users/info')

    return data
  } catch (error) {
    return { error }
  }
}
