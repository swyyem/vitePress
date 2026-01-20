import { withNoopInstall } from '@swy-ui/utils'
import MessageBox from './src/message-box.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyMessageBox: SFCWithInstall<typeof MessageBox> = withNoopInstall(MessageBox)
export default MessageBox

export * from './src/message-box'
