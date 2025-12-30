import { withInstall } from '@swy-ui/utils'
import Card from './src/card.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyCard: SFCWithInstall<typeof Card> = withInstall(Card)
export default SwyCard

export * from './src/card'
export type { CardInstance } from './src/instance'
