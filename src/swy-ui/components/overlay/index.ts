/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import { withNoopInstall } from '@swy-ui/utils'
import Overlay from './src/overlay.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyOverlay: SFCWithInstall<typeof Overlay> = withNoopInstall(Overlay)
export default Overlay

export * from './src/overlay'
