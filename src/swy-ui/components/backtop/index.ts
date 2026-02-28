/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import { withNoopInstall } from '@swy-ui/utils'
import Backtop from './src/backtop.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyBacktop: SFCWithInstall<typeof Backtop> = withNoopInstall(Backtop)
export default Backtop

export * from './src/backtop'
