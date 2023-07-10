import axios from '@/plugins/axios'

const LIST = '/package'

export async function getListPackage() {
  try {
    const { data } = await axios.get(`${LIST}`)

    return data
  } catch (error) {
    return { error }
  }
}
