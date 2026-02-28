/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import { withNoopInstall } from '@swy-ui/utils'
import InputTag from './src/input-tag.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyInputTag: SFCWithInstall<typeof InputTag> = withNoopInstall(InputTag)
export default InputTag

export * from './src/input-tag'
