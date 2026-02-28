/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import Card from './src/card.vue'

// export const SwyCard: SFCWithInstall<typeof Card> = withInstall(Card)
export default Card

export * from './src/card'
export type { CardInstance } from './src/instance'
