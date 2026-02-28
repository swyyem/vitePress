/** File: instance.ts - TypeScript File */

// ========== Dependencies Import ==========
import type Card from './card.vue'

export type CardInstance = InstanceType<typeof Card> & unknown
