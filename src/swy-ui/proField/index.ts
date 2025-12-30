import { withInstall } from '@swy-ui/utils'
import ProField from './src/proField.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyProField: SFCWithInstall<typeof ProField> = withInstall(ProField)
export default SwyProField

// export * from './src/proField.ts'
