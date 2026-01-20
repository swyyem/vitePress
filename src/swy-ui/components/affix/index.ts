import { withNoopInstall } from '@swy-ui/utils'
import Affix from './src/affix.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyAffix: SFCWithInstall<typeof Affix> = withNoopInstall(Affix)
export default Affix

export * from './src/affix'
