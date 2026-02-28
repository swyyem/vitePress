/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import { withNoopInstall } from '@swy-ui/utils'
import TimeSelect from './src/time-select.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyTimeSelect: SFCWithInstall<typeof TimeSelect> = withNoopInstall(TimeSelect)
export default TimeSelect

export * from './src/time-select'
