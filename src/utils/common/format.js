import dayjs from '@/plugins/dayjs'

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function formatDate(x) {
  return dayjs(x).format('DD/MM/YYYY')
}
