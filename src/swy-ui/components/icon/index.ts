/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import { withInstall } from '@swy-ui/utils'
import Icon from './src/icon.vue'

// 导出所有图标
export * from './src/icons'

export const SwyIcon = withInstall(Icon)
export default SwyIcon

export * from './src/icon'
