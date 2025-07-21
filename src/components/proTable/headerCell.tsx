import { renderSlot } from 'vue'
import type { AnyObject, ProColumn } from './table.types'
import { ElIcon, ElTooltip } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'

export type ProTabeHeaderCellProps = Pick<ProColumn, 'tooltip' | 'required'> & {
  column: AnyObject
  columnIndex: number
  class?: string
}

const ProTabeHeaderCell = (props: ProTabeHeaderCellProps, { slots }: { slots: any }) => {
  return renderSlot(slots, 'default', props, () => {
    const title = props.column.title || props.column.label
    const required = props.required
    let titleEl = title
    if (required) {
      titleEl = (
        <span>
          <span class="pro-column--required">*</span>
          {title}
        </span>
      )
    }
    // console.log('=procolumn header=', title)
    return [
      <div
        style={{ display: 'inline-flex', alignItems: 'center' }}
        class={props.class}
        title={title}
      >
        {titleEl}
        {props.tooltip && (
          <ElTooltip content={props.tooltip} placement="top">
            <ElIcon style={{ marginInlineStart: '4px' }} size={16}>
              <InfoFilled />
            </ElIcon>
          </ElTooltip>
        )}
      </div>,
    ]
  })
}

ProTabeHeaderCell.displayName = 'ProTableHeaderCell'
ProTabeHeaderCell.inheritAttrs = false

export default ProTabeHeaderCell
