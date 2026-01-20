import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const affixProps = buildProps({
  offset: {
    type: Number,
    default: 0,
  },
  position: {
    type: String,
    default: 'top',
    values: ['top', 'bottom'],
  },
  target: String,
  zIndex: {
    type: Number,
    default: 100,
  },
} as const)

export const affixEmits = {
  change: (fixed: boolean) => typeof fixed === 'boolean',
  scroll: (_value: { scrollTop: number; fixed: boolean }) => true,
}

export type AffixProps = ExtractPropTypes<typeof affixProps>
export type AffixEmits = typeof affixEmits
