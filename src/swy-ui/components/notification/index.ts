/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import Notification from './src/notification.vue'

export const SwyNotification = Notification

export default Notification

export * from './src/notification'
export * from './src/notification.fn'
export type { NotificationInstance } from './src/instance'
