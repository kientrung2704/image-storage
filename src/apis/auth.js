import axios from '@/plugins/axios'

const LOGIN = '/auth/login'
const REGISTER = '/auth/register'
const REFRESH_TOKEN = '/auth/refresh-token'
const ME = '/user'

export async function login(payload) {
  try {
    const { data } = await axios.post(`${LOGIN}`, payload)

    return data
  } catch (error) {
    return { error }
  }
}

export async function register(payload) {
  try {
    const { data } = await axios.post(`${REGISTER}`, payload)

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
    const data = await axios.get(`${ME}`)

    return data
  } catch (error) {
    return { error }
  }
}
