import { buildProps } from '@swy-ui/utils'
import { useSizeProp } from '@swy-ui/hooks'
import type { ExtractPropTypes } from 'vue'

export const autocompleteProps = buildProps({
  modelValue: String,
  placeholder: String,
  disabled: Boolean,
  size: useSizeProp,
  clearable: {
    type: Boolean,
    default: true,
  },
  valueKey: {
    type: String,
    default: 'value',
  },
  fetchSuggestions: Function,
  triggerOnFocus: {
    type: Boolean,
    default: true,
  },
  selectWhenUnmatched: Boolean,
  highlightFirstItem: {
    type: Boolean,
    default: false,
  },
  debounce: {
    type: Number,
    default: 300,
  },
} as const)

export const autocompleteEmits = {
  'update:modelValue': (_value: string) => true,
  input: (_value: string) => true,
  change: (_value: string) => true,
  focus: () => true,
  blur: () => true,
  clear: () => true,
  select: (_item: Record<string, unknown>) => true,
}

export type AutocompleteProps = ExtractPropTypes<typeof autocompleteProps>
export type AutocompleteEmits = typeof autocompleteEmits
