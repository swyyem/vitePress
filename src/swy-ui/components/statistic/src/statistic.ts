import { buildProps } from '@swy-ui/utils'
import type { ExtractPropTypes, StyleValue } from 'vue'

export const statisticProps = buildProps({
  value: {
    type: [Number, String],
    default: 0,
  },
  decimalSeparator: {
    type: String,
    default: '.',
  },
  groupSeparator: {
    type: String,
    default: ',',
  },
  precision: {
    type: Number,
    default: 0,
  },
  formatter: Function,
  prefix: String,
  suffix: String,
  title: String,
  valueStyle: Object as () => StyleValue,
} as const)

export type StatisticProps = ExtractPropTypes<typeof statisticProps>
