/** File: instance.ts - TypeScript File */

// ========== Dependencies Import ==========
import type Breadcrumb from './breadcrumb.vue'
import type BreadcrumbItem from './breadcrumb-item.vue'

export type BreadcrumbInstance = InstanceType<typeof Breadcrumb>
export type BreadcrumbItemInstance = InstanceType<typeof BreadcrumbItem>
