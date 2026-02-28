/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import { withNoopInstall } from '@swy-ui/utils'
import Autocomplete from './src/autocomplete.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyAutocomplete: SFCWithInstall<typeof Autocomplete> = withNoopInstall(Autocomplete)
export default Autocomplete

export * from './src/autocomplete'
