import { buildProps } from '@swy-ui/utils'
import { useSizeProp } from '@swy-ui/hooks'
import type { ExtractPropTypes } from 'vue'

export const mentionProps = buildProps({
  modelValue: String,
  options: {
    type: Array,
    default: () => [],
  },
  prefix: {
    type: String,
    default: '@',
  },
  split: {
    type: String,
    default: ' ',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  disabled: Boolean,
  size: useSizeProp,
  filterOption: Function,
  loading: Boolean,
  placement: {
    type: String,
    default: 'bottom-start',
  },
} as const)

export const mentionEmits = {
  'update:modelValue': (_value: string) => true,
  search: (_value: string) => true,
  select: (_option: Record<string, unknown>) => true,
  focus: () => true,
  blur: () => true,
}

export type MentionProps = ExtractPropTypes<typeof mentionProps>
export type MentionEmits = typeof mentionEmits
