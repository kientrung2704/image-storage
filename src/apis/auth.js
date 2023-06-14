import axios from '@/plugins/axios'

const LOGIN = '/auth/login'
const REFRESH_TOKEN = '/auth/refresh-token'
const ME = '/user'

export async function login(payload) {
  try {
    const { data } = await axios.post(`${LOGIN}`, payload)
    console.log('data', data)
    return data
  } catch (error) {
    console.log('er', error)
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
