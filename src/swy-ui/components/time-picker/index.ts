/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import { withNoopInstall } from '@swy-ui/utils'
import TimePicker from './src/time-picker.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyTimePicker: SFCWithInstall<typeof TimePicker> = withNoopInstall(TimePicker)
export default TimePicker

export * from './src/time-picker'
