import { withNoopInstall } from '@swy-ui/utils'
import Tour from './src/tour.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyTour: SFCWithInstall<typeof Tour> = withNoopInstall(Tour)
export default Tour

export * from './src/tour'
