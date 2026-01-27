import { withNoopInstall } from '@swy-ui/utils'
import ColorPickerPanel from './src/color-picker-panel.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyColorPickerPanel: SFCWithInstall<typeof ColorPickerPanel> =
  withNoopInstall(ColorPickerPanel)
export default ColorPickerPanel

export * from './src/color-picker-panel'
