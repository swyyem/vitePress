import { withNoopInstall } from '@swy-ui/utils'
import Mention from './src/mention.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyMention: SFCWithInstall<typeof Mention> = withNoopInstall(Mention)
export default Mention

export * from './src/mention'
