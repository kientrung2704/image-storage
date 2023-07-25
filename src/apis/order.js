import axios from '@/plugins/axios'

const ORDER = '/order'

export async function order(payload) {
  try {
    const { data } = await axios.post(`${ORDER}`, payload)

    return data
  } catch (error) {
    return { error }
  }
}

export async function list(payload) {
  try {
    const { data } = await axios.get(`${ORDER}`, { params: payload })

    return data
  } catch (error) {
    return { error }
  }
}

export async function detail(id) {
  try {
    const { data } = await axios.get(`${ORDER}/${id}`)

    return data
  } catch (error) {
    return { error }
  }
}
