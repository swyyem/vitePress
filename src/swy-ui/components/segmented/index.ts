/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import { withNoopInstall } from '@swy-ui/utils'
import Segmented from './src/segmented.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwySegmented: SFCWithInstall<typeof Segmented> = withNoopInstall(Segmented)
export default Segmented

export * from './src/segmented'
