import { withNoopInstall } from '@swy-ui/utils'
import Scrollbar from './src/scrollbar.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyScrollbar: SFCWithInstall<typeof Scrollbar> = withNoopInstall(Scrollbar)
export default Scrollbar

export * from './src/scrollbar'
