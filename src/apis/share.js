import axios from '@/plugins/axios'

const USER = '/user/find-user'
const FAMILY = '/share/family'
const SHARE = '/share'
const TOME = '/share/tome'
const SHARED = '/share/shared'

export async function findUser(payload) {
  try {
    const { data } = await axios.post(`${USER}`, payload)

    return data
  } catch (error) {
    return { error }
  }
}

export async function share(payload) {
  try {
    const { data } = await axios.post(`${SHARE}`, payload)

    return data
  } catch (error) {
    return { error }
  }
}

export async function list() {
  try {
    const { data } = await axios.get(`${FAMILY}`)

    return data
  } catch (error) {
    return { error }
  }
}

export async function tome() {
  try {
    const { data } = await axios.get(`${TOME}`)

    return data
  } catch (error) {
    return { error }
  }
}

export async function shared() {
  try {
    const { data } = await axios.get(`${SHARED}`)

    return data
  } catch (error) {
    return { error }
  }
}
