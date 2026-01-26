import { buildProps, definePropType } from '@swy-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import type { ValueType } from '../../../proField'

export const tableColumnProps = buildProps({
  /**
   * @description 列标签
   */
  label: {
    type: String,
    default: '',
  },
  /**
   * @description 列属性名
   */
  prop: {
    type: String,
    default: '',
  },
  /**
   * @description 列宽度
   */
  width: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 最小宽度
   */
  minWidth: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 对齐方式
   */
  align: {
    type: String,
    values: ['left', 'center', 'right'],
    default: 'left',
  },
  /**
   * @description 是否可编辑
   */
  editable: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 编辑时的组件类型
   */
  valueType: {
    type: definePropType<ValueType>(String),
    default: 'Input',
  },
  /**
   * @description 编辑组件的属性
   */
  fieldProps: {
    type: definePropType<Record<string, any>>(Object),
    default: () => ({}),
  },
} as const)

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>
export type TableColumnPropsPublic = ExtractPublicPropTypes<typeof tableColumnProps>
