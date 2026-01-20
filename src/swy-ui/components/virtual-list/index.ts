import { withNoopInstall } from '@swy-ui/utils'
import VirtualList from './src/virtual-list.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyVirtualList: SFCWithInstall<typeof VirtualList> = withNoopInstall(VirtualList)
export default VirtualList

export * from './src/virtual-list'
