/** File: instance.ts - TypeScript File */

// ========== Dependencies Import ==========
import type Dropdown from './dropdown.vue'
import type DropdownItem from './dropdown-item.vue'

export type DropdownInstance = InstanceType<typeof Dropdown>
export type DropdownItemInstance = InstanceType<typeof DropdownItem>
