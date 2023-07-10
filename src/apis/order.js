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
