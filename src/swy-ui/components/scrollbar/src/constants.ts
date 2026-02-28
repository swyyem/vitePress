/** File: constants.ts - TypeScript File */

// ========== Dependencies Import ==========
import type { InjectionKey } from 'vue'

export interface ScrollbarContext {
  scrollbarElement: HTMLDivElement | undefined
  wrapElement: HTMLDivElement | undefined
}

export const scrollbarContextKey: InjectionKey<ScrollbarContext> = Symbol('scrollbarContextKey')
