import { withNoopInstall } from '@swy-ui/utils'
import Space from './src/space.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwySpace: SFCWithInstall<typeof Space> = withNoopInstall(Space)
export default Space

export * from './src/space'
