import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
// import updateLocale from 'dayjs'

dayjs.locale('en')
// dayjs.extend(updateLocale)
// dayjs.updateLocale('en', {
//   weekdays: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
// })
dayjs.extend(utc)
dayjs.extend(timezone)
export default dayjs
