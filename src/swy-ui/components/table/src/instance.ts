/** File: instance.ts - TypeScript File */

// ========== Dependencies Import ==========
import type Table from './table.vue'
import type TableColumn from './table-column.vue'

export type TableInstance = InstanceType<typeof Table>
export type TableColumnInstance = InstanceType<typeof TableColumn>
