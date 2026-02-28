/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import { withNoopInstall } from '@swy-ui/utils'
import TreeSelect from './src/tree-select.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyTreeSelect: SFCWithInstall<typeof TreeSelect> = withNoopInstall(TreeSelect)
export default TreeSelect

export * from './src/tree-select'
