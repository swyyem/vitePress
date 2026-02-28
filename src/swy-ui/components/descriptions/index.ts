/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import { withInstall, withNoopInstall } from '@swy-ui/utils'
import Descriptions from './src/descriptions.vue'
import DescriptionsItem from './src/description-item.vue'

export const SwyDescriptions = withInstall(Descriptions, {
  DescriptionsItem,
})
export const SwyDescriptionsItem = withNoopInstall(DescriptionsItem)

export default SwyDescriptions

export * from './src/descriptions'
export * from './src/description-item'
export type { DescriptionsInstance } from './src/instance'
