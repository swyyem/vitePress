/** File: transfer.ts - TypeScript File */

// ========== Dependencies Import ==========
import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const transferProps = buildProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
  titles: {
    type: Array,
    default: () => ['列表1', '列表2'],
  },
  buttonTexts: {
    type: Array,
    default: () => [],
  },
  filterable: Boolean,
  filterPlaceholder: String,
  filterMethod: Function,
  props: {
    type: Object,
    default: () => ({
      key: 'key',
      label: 'label',
      disabled: 'disabled',
    }),
  },
} as const)

export const transferEmits = {
  'update:modelValue': (_value: unknown[]) => true,
  change: (_value: unknown[], _direction: string, _movedKeys: unknown[]) => true,
  leftCheckChange: (_value: unknown[], _movedKeys: unknown[]) => true,
  rightCheckChange: (_value: unknown[], _movedKeys: unknown[]) => true,
}

export type TransferProps = ExtractPropTypes<typeof transferProps>
export type TransferEmits = typeof transferEmits
