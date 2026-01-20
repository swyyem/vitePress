import { withNoopInstall } from '@swy-ui/utils'
import Upload from './src/upload.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyUpload: SFCWithInstall<typeof Upload> = withNoopInstall(Upload)
export default Upload

export * from './src/upload'
