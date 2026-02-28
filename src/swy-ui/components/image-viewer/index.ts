/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import { withNoopInstall } from '@swy-ui/utils'
import ImageViewer from './src/image-viewer.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyImageViewer: SFCWithInstall<typeof ImageViewer> = withNoopInstall(ImageViewer)
export default ImageViewer

export * from './src/image-viewer'
