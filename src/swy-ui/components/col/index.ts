import { withNoopInstall } from '@swy-ui/utils'
import Col from './src/col.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyCol: SFCWithInstall<typeof Col> = withNoopInstall(Col)
export default Col

export * from './src/col'
