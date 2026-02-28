/** File: constants.ts - TypeScript File */

// ========== Dependencies Import ==========
import type { ComputedRef, InjectionKey } from 'vue'

export interface RowContext {
  gutter: ComputedRef<number>
}

export const rowContextKey: InjectionKey<RowContext> = Symbol('rowContextKey')
