/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import { withNoopInstall } from '@swy-ui/utils'
import Statistic from './src/statistic.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyStatistic: SFCWithInstall<typeof Statistic> = withNoopInstall(Statistic)
export default Statistic

export * from './src/statistic'
