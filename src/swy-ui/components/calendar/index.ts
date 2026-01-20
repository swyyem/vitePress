import { withNoopInstall } from '@swy-ui/utils'
import Calendar from './src/calendar.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyCalendar: SFCWithInstall<typeof Calendar> = withNoopInstall(Calendar)
export default Calendar

export * from './src/calendar'
