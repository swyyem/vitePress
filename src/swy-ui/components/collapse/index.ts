/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import Collapse from './src/collapse.vue'
import CollapseItem from './src/collapse-item.vue'

export const SwyCollapse = Collapse
export const SwyCollapseItem = CollapseItem

export default Collapse

export * from './src/collapse'
export * from './src/collapse-item'
export type { CollapseInstance, CollapseItemInstance } from './src/instance'
