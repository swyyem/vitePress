/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import { withNoopInstall } from '@swy-ui/utils'
import Row from './src/row.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyRow: SFCWithInstall<typeof Row> = withNoopInstall(Row)
export default Row

export * from './src/row'
export * from './src/constants'
