import axios from '@/plugins/axios'

const LOGIN = '/auth/login'
const REGISTER = '/auth/register'
const REFRESH_TOKEN = '/auth/refresh-token'
const ME = '/user'
const FORGOT_PASSWORD = 'auth/forgot-password'
const VERIFY_TOKEN = 'auth/verify-token'
const CHANGE_PASSWORD = 'auth/change-password'

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

export async function forgotPassword(payload) {
  try {
    const data = await axios.post(`${FORGOT_PASSWORD}`, payload)

    return data
  } catch (error) {
    return { error }
  }
}

export async function verifyToken(payload) {
  try {
    const data = await axios.post(`${VERIFY_TOKEN}`, payload)

    return data
  } catch (error) {
    return { error }
  }
}

export async function changePassword(payload) {
  try {
    const data = await axios.post(`${CHANGE_PASSWORD}`, payload)

    return data
  } catch (error) {
    return { error }
  }
}