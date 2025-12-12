import { renderSlot, h } from 'vue';
import type { AnyObject, ProColumn } from './table.types';
import { ElIcon, ElTooltip } from 'element-plus';
import { InfoFilled } from '@element-plus/icons-vue';

export type ProTabeHeaderCellProps = Pick<ProColumn, 'tooltip' | 'required'> & {
  column: AnyObject;
  columnIndex: number;
  class?: string;
};

const ProTabeHeaderCell = (props: ProTabeHeaderCellProps, { slots }: { slots: any }) => {
  return renderSlot(slots, 'default', props, () => {
    const title = props.column.title || props.column.label;
    const required = props.required;
    let titleEl = title;
    let tooltip = null;
    if (required) {
      titleEl = h('span', null, [
        h('span', { class: 'pro-column--required' }, () => '*'),
        h('span', null, () => title),
      ]);
    }

    if (props.tooltip) {
      tooltip = h(ElTooltip, { content: props.tooltip, placement: 'top' }, () =>
        h(ElIcon, { style: { marginInlineStart: '4px' }, size: 16 }, () => h(InfoFilled))
      );
    }
    // console.log('=procolumn header=', title)
    return [
      h(
        'div',
        {
          style: { display: 'inline-flex', alignItems: 'center' },
          class: props.class,
          title: title,
        },
        [titleEl, tooltip]
      ),
    ];
  });
};

ProTabeHeaderCell.displayName = 'ProTableHeaderCell';
ProTabeHeaderCell.inheritAttrs = false;

export default ProTabeHeaderCell;
