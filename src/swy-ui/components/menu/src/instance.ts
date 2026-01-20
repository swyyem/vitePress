import type Menu from './menu.vue'
import type MenuItem from './menu-item.vue'
import type SubMenu from './sub-menu.vue'

export type MenuInstance = InstanceType<typeof Menu>
export type MenuItemInstance = InstanceType<typeof MenuItem>
export type SubMenuInstance = InstanceType<typeof SubMenu>
