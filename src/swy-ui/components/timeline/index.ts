/** File: index.ts - TypeScript File */

// ========== Dependencies Import ==========
import { withNoopInstall } from '@swy-ui/utils'
import Timeline from './src/timeline.vue'
import TimelineItem from './src/timeline-item.vue'

import type { SFCWithInstall } from '@swy-ui/utils'

export const SwyTimeline: SFCWithInstall<typeof Timeline> = withNoopInstall(Timeline)
export const SwyTimelineItem: SFCWithInstall<typeof TimelineItem> = withNoopInstall(TimelineItem)
export default Timeline

export * from './src/timeline'
export * from './src/timeline-item'
