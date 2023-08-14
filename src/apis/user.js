import axios from '@/plugins/axios'

const USER_INFO = '/user/me'
const UPDATE_USER_INFO = '/user/update'
const CHANGE_PASSWORD = '/user/change-password'

export async function getUserInfo() {
  try {
    const { data } = await axios.get(`${USER_INFO}`)

    return data
  } catch (error) {
    return { error }
  }
}

export async function updateUserInfo(payload) {
  try {
    const { data } = await axios.post(`${UPDATE_USER_INFO}`, payload)

    return data
  } catch (error) {
    return { error }
  }
}

export async function changePassword(payload) {
  try {
    const { data } = await axios.post(`${CHANGE_PASSWORD}`, payload)

    return data
  } catch (error) {
    return { error }
  }
}
