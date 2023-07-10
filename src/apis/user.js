import axios from '@/plugins/axios'

const USER_INFO = '/user/me'
const UPDATE_USER_INFO = '/user/update'

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
