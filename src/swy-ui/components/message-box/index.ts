/** File: index.ts - MessageBox 组件入口 */

// ========== 组件导入 ==========
import { withNoopInstall } from '@swy-ui/utils'
import MessageBox from './src/message-box.vue'
import type { SFCWithInstall } from '@swy-ui/utils'

// ========== Vue 组件导出（用于 app.component 全局注册） ==========
export const SwyMessageBoxComponent: SFCWithInstall<typeof MessageBox> = withNoopInstall(MessageBox)
export default MessageBox

// ========== 类型导出 ==========
export * from './src/message-box'

// ========== 命令式 API 导出（主要使用方式） ==========
// SwyMessageBox.alert() / SwyMessageBox.confirm() / SwyMessageBox.prompt()
export { SwyMessageBox } from './src/message-box.fn'
