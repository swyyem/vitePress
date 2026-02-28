/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import { withNoopInstall } from '@swy-ui/utils'
import Anchor from './src/anchor.vue'
import AnchorLink from './src/anchor-link.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyAnchor: SFCWithInstall<typeof Anchor> = withNoopInstall(Anchor)
export const SwyAnchorLink: SFCWithInstall<typeof AnchorLink> = withNoopInstall(AnchorLink)
export default Anchor

export * from './src/anchor'
export * from './src/anchor-link'
