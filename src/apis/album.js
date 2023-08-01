import axios from '@/plugins/axios'

const ALBUM = '/album'

export async function create(payload) {
  try {
    const { data } = await axios.post(`${ALBUM}`, payload)

    return data
  } catch (error) {
    return { error }
  }
}

export async function list(payload) {
  try {
    const { data } = await axios.get(`${ALBUM}`, { params: payload })

    return data
  } catch (error) {
    return { error }
  }
}

export async function detail(id) {
  try {
    const { data } = await axios.get(`${ALBUM}/${id}`)

    return data
  } catch (error) {
    return { error }
  }
}

export async function update(payload) {
  try {
    const { data } = await axios.put(`${ALBUM}/${payload.id}`, payload)

    return data
  } catch (error) {
    return { error }
  }
}