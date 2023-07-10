import axios from '@/plugins/axios'

const DETAIL = '/payment'

export async function getPaymentDetail(orderId) {
  try {
    const { data } = await axios.get(`${DETAIL}/${orderId}`)

    return data
  } catch (error) {
    return { error }
  }
}
