/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import { withNoopInstall } from '@swy-ui/utils'
import Transfer from './src/transfer.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyTransfer: SFCWithInstall<typeof Transfer> = withNoopInstall(Transfer)
export default Transfer

export * from './src/transfer'
