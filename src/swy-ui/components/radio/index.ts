import { withNoopInstall } from '@swy-ui/utils'
import Radio from './src/radio.vue'
import RadioButton from './src/radio-button.vue'
import RadioGroup from './src/radio-group.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export default Radio
export const SwyRadioGroup: SFCWithInstall<typeof RadioGroup> = withNoopInstall(RadioGroup)
export const SwyRadioButton: SFCWithInstall<typeof RadioButton> = withNoopInstall(RadioButton)

export * from './src/radio'
export * from './src/radio-group'
export * from './src/radio-button'
export * from './src/constants'
