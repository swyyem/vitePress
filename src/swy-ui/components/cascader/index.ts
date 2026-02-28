/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import { withNoopInstall } from '@swy-ui/utils'
import Cascader from './src/cascader.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyCascader: SFCWithInstall<typeof Cascader> = withNoopInstall(Cascader)
export default Cascader

export * from './src/cascader'
