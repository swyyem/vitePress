import { withNoopInstall } from '@swy-ui/utils'
import DatePicker from './src/date-picker.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyDatePicker: SFCWithInstall<typeof DatePicker> = withNoopInstall(DatePicker)
export default DatePicker

export * from './src/date-picker'
