import { withNoopInstall } from '@swy-ui/utils'
import PageHeader from './src/page-header.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyPageHeader: SFCWithInstall<typeof PageHeader> = withNoopInstall(PageHeader)
export default PageHeader

export * from './src/page-header'
