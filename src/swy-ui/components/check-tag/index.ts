import { withNoopInstall } from '@swy-ui/utils'
import CheckTag from './src/check-tag.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyCheckTag: SFCWithInstall<typeof CheckTag> = withNoopInstall(CheckTag)
export default CheckTag

export * from './src/check-tag'
