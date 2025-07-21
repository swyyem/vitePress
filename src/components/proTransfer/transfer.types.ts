import type { ProTableProps, AnyObject, KeyType } from '../proTable/table.types'

type AnyValue = any
export type ProTransferValueType = AnyObject[]
export type ProTransferDirection = 'left' | 'right'
export type ProTransferChangeMethod = (
  value: ProTransferValueType,
  direction: ProTransferDirection,
  movedKeys: ProTransferValueType,
) => void
export type ProTransferPanelProps<T = AnyObject> = {
  data: T[]
  tableProps: Partial<ProTableProps<T>>
  valueKey?: string
  checked: AnyValue[]
  checkedChange: (keys: KeyType[], rows: AnyObject[]) => void
}

export type ProTransferFilterType = (arr: AnyObject[], item: AnyObject) => boolean

export type ProTransferProps<T = AnyObject> = Pick<
  ProTransferPanelProps<T>,
  'data' | 'tableProps' | 'valueKey'
> & {
  modelValue?: AnyValue[]
  'onUpdate:modelValue': (value: AnyValue) => void
  leftDefaultChecked?: AnyValue[]
  rightDefaultChecked?: AnyValue[]
  contentHeight?: number
}
