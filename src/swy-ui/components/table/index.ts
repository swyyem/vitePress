/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import Table from './src/table.vue'
import TableColumn from './src/table-column.vue'

export const SwyTable = Table
export const SwyTableColumn = TableColumn

export default Table

export * from './src/table'
export * from './src/table-column'
export type { TableInstance, TableColumnInstance } from './src/instance'
