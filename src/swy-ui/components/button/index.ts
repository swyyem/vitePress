import { withInstall, withNoopInstall } from '@swy-ui/utils'
import Button from './src/button.vue'
import ButtonGroup from '../button/src/button-group.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const ElButton: SFCWithInstall<typeof Button> & {
  ButtonGroup: typeof ButtonGroup
} = withInstall(Button, {
  ButtonGroup,
})
export const ElButtonGroup: SFCWithInstall<typeof ButtonGroup> = withNoopInstall(ButtonGroup)
export default ElButton

export * from './src/button'
export * from './src/constants'
export type { ButtonInstance, ButtonGroupInstance } from './src/instance.ts'
