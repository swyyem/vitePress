/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import { withNoopInstall } from '@swy-ui/utils'
import ColorPicker from './src/color-picker.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyColorPicker: SFCWithInstall<typeof ColorPicker> = withNoopInstall(ColorPicker)
export default ColorPicker

export * from './src/color-picker'
