/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import Menu from './src/menu.vue'
import MenuItem from './src/menu-item.vue'
import SubMenu from './src/sub-menu.vue'

export const SwyMenu = Menu
export const SwyMenuItem = MenuItem
export const SwySubMenu = SubMenu

export default Menu

export * from './src/menu'
export * from './src/menu-item'
export * from './src/sub-menu'
export type { MenuInstance, MenuItemInstance, SubMenuInstance } from './src/instance'
