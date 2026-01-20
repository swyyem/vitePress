import { withNoopInstall } from '@swy-ui/utils'
import Steps from './src/steps.vue'
import Step from './src/step.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwySteps: SFCWithInstall<typeof Steps> = withNoopInstall(Steps)
export const SwyStep: SFCWithInstall<typeof Step> = withNoopInstall(Step)
export default Steps

export * from './src/steps'
export * from './src/step'
