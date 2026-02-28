/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import Dropdown from './src/dropdown.vue'
import DropdownItem from './src/dropdown-item.vue'

export const SwyDropdown = Dropdown
export const SwyDropdownItem = DropdownItem

export default Dropdown

export * from './src/dropdown'
export * from './src/dropdown-item'
export type { DropdownInstance, DropdownItemInstance } from './src/instance'
