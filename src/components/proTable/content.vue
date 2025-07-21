<template>
  <ElTable
    v-if="!props.virtual"
    border
    ref="tableRef"
    :max-height="props.autoHeight ? undefined : props.bodyHeight"
    :height="props.sameMaxHeight ? props.bodyHeight : undefined"
    :data="props.tableData"
    :rowClassName="rowClassName"
    :default-expand-all="expandableProps.defaultExpandAllRows"
    :preserve-expanded-content="expandableProps.preserveExpandedContent"
    :expand-row-keys="expandedRowKeys"
    :rowKey="props.rowKey"
    @scroll="props.onScroll"
    @cell-contextmenu="handleCellContextMenu"
    @row-contextmenu="handleRowContextMenu"
    @header-contextmenu="handleHeaderContextMenu"
    @expand-change="handleExpandChange"
    v-bind="tableAttrs"
    @row-click="handleRowClick"
  >
    <RenderCustom :content="columnVNode" />
    <template #empty>
      <slot name="empty" />
      <component :is="getEmpty" />
    </template>
  </ElTable>
  <ElTableV2
    v-else
    :fixed="true"
    :rowKey="props.rowKey"
    :max-height="props.bodyHeight"
    :height="props.bodyHeight"
    :width="props.bodyWidth"
    :data="props.tableData"
    :columns="columnsV2"
    :row-class="rowClassName"
    :header-height="normalHeight"
    :row-height="normalHeight"
    @scroll="props.onScroll"
    v-bind="tableAttrs"
    :row-event-handlers="RowEventHandlers"
  >
    <template #empty>
      <slot name="empty" />
      <component :is="getEmpty" />
    </template>
  </ElTableV2>
  <div class="pro-table--loading" :class="waterfallStyle" v-if="props.loading">
    <div class="el-loading-spinner">
      <svg class="circular" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
      </svg>
    </div>
  </div>
  <TableMenu
    v-if="display"
    :class="className"
    :visible="visible"
    :options="options"
    :layoutCoord="layoutCoord"
    :changeVisible="changeVisible"
    :justOpen="justOpen"
  />
</template>
<style lang="less">
.pro-table--loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: var(--font-size-small);
  transition: opacity 0.3s;
  z-index: 99;

  &__waterfall {
    top: auto;
    height: 32px;

    .el-loading-spinner {
      margin-top: -12px;
    }

    .el-loading-spinner .circular {
      width: 24px;
      height: 24px;
    }
  }
}
.pro-table--empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
.pro-table--row--removed {
  color: var(--el-color-danger);
}
</style>
<script lang="ts" setup generic="T extends Record<string, any>">
import {
  computed,
  h,
  inject,
  useAttrs,
  ref,
  watch,
  useSlots,
  shallowRef,
  provide,
} from "vue";
import type { VNode, Ref } from "vue";
import { ElTable, ElTableV2 } from "element-plus";
import type { TableInstance } from "element-plus";
import { isEqual } from "lodash-unified";
import { ProColumn, TableMenu } from "./index";
import { useMenu } from "./useMenu";
import { removeInternalKey, getRealRowKey, getDataFromKeys } from "./utils";
import { getValue } from "../utils/value";
import { RenderCustom } from "../utils/renderCustom";
import type {
  ProTableProviderProps,
  ProTableContentProps,
  ProTableContentInstance,
  ProColumns,
  ProTableContentProvider,
  ProTableRowAndColumnType,
  ProV2Columns,
} from "./index";

defineOptions({
  name: "ProTableContent",
  inheritAttrs: false,
});
type AliasAny = any;
// 定义插槽类型
defineSlots<{
  // 展开行插槽
  expand: (props: {
    row: AliasAny;
    column: AliasAny;
    $index: number;
  }) => AliasAny;
  // 空状态插槽
  empty: () => AliasAny;
}>();
// 事件
const emit = defineEmits<{
  "current-change": [row: AliasAny, oldRow: AliasAny];
}>();
const normalHeight = 32;
const slots = useSlots();
const tableRef = ref<TableInstance>();
const setScrollTop = (rowIndex: number) => {
  const tableEl = tableRef.value?.$el;
  const wrapper = tableEl?.querySelector(".el-scrollbar__wrap");
  const rows = tableEl?.querySelectorAll(".el-table__body-wrapper tbody tr");
  const targetRow = rows?.[rowIndex];

  if (!wrapper || !targetRow) {
    return;
  }

  const wrapperTop = wrapper.scrollTop;
  const wrapperHeight = wrapper.clientHeight;
  const rowOffsetTop = targetRow.offsetTop;
  const rowHeight = targetRow.offsetHeight;

  // 判断是否在可视区域内
  const rowOffsetY = rowOffsetTop + rowHeight;
  const isAbove = rowOffsetTop < wrapperTop;
  const isBelow = rowOffsetY > wrapperTop + wrapperHeight;
  if (isAbove || isBelow) {
    tableRef.value?.setScrollTop(rowOffsetY - wrapperHeight);
  }
};
// 获取 old 选中的行
const getOldRow = () => {
  let oldRow = null;
  if (selectionRowKeys.value.length > 0) {
    const oldRows = getDataFromKeys(
      selectionRowKeys.value,
      props.tableData,
      getRowKey.value
    );
    if (oldRows.length) {
      oldRow = oldRows[0];
    }
  }
  return oldRow;
};

defineExpose<ProTableContentInstance>({
  getElTableInstance: () => tableRef,
  setScrollTop: setScrollTop,
  setCurrentRow: (row: AliasAny, isEmit?: boolean) => {
    // tableRef.value?.setCurrentRow(row)
    const needEmit = isEmit ?? true;
    if (needEmit) {
      emit("current-change", row, getOldRow());
    }
    selectionRowKeys.value = row ? [getRowKey.value(row)] : [];
  },
});
const ProTableData = inject<ProTableProviderProps>("ProTableData")!;
const rowSelectionProps = ProTableData.rowSelectionProps;
const selectionRowKeys = ProTableData.selectionRowKeys;
const getRowKey = ProTableData.getRowKey;
const columns = computed(() => {
  return ProTableData?.columns.value || [];
});
const columnsV2 = computed<ProV2Columns>(() => {
  const originColumns = ProTableData?.columns.value || [];
  // 把 width 转换成数字
  return originColumns.map((item) => {
    const { width, minWidth, ...rest } = item;
    let lastWidth = 1;
    if (width) {
      lastWidth = Number(width);
    } else if (minWidth) {
      lastWidth = Number(minWidth);
    }
    return { width: lastWidth, ...rest };
  }) as ProV2Columns;
});
const attrs = useAttrs();
const excludeKeys = ["onCurrentChange"];
const tableAttrs = computed(() => {
  return Object.fromEntries(
    Object.entries(attrs).filter(([key]) => !excludeKeys.includes(key))
  );
});
const props = withDefaults(defineProps<ProTableContentProps<T>>(), {
  loading: undefined,
  first: false,
  waterfall: false,
  virtual: false,
  highlightCurrentRow: true,
  emptyText: "暂无数据",
});
// 展开行
const expandableProps = computed(() => {
  const expandableOrigin = props.expandable;
  if (expandableOrigin) {
    const {
      defaultExpandAllRows = false,
      defaultExpandedRowKeys,
      expandedRowKeys,
      preserveExpandedContent,
      onExpandedRowsChange,
    } = expandableOrigin;
    return {
      defaultExpandAllRows,
      defaultExpandedRowKeys,
      expandedRowKeys,
      preserveExpandedContent,
      onExpandedRowsChange,
    };
  }
  return {};
});
const expandedRowKeys = ref<AliasAny[]>(
  expandableProps.value.expandedRowKeys ||
    expandableProps.value.defaultExpandedRowKeys ||
    []
);
// expandedRowKeys
watch(
  () => props.expandable?.expandedRowKeys,
  (newVal) => {
    if (!isEqual(newVal, expandedRowKeys.value)) {
      expandedRowKeys.value = newVal || [];
    }
  }
);
const handleExpandChange = (row: AliasAny, expandedRows: AliasAny[]) => {
  const rows = removeInternalKey(expandedRows);
  const keys = rows.map((item: AliasAny) =>
    getRealRowKey(getRowKey.value, item)
  );
  expandedRowKeys.value = keys;
  expandableProps.value.onExpandedRowsChange?.(keys, rows);
};

const {
  className,
  display,
  visible,
  options,
  justOpen,
  layoutCoord,
  rowAndColumn,
  changeVisible,
  handleRowContextMenu,
  handleCellContextMenu,
  handleHeaderContextMenu,
} = useMenu(props.menuConfig);

provide<ProTableContentProvider>("ProTableContentData", {
  rowAndColumn: rowAndColumn as Ref<ProTableRowAndColumnType>,
});
// 参数 row, rowIndex
// v2 参数 columns, rowData, rowIndex
const rowClassName = (data: AliasAny) => {
  const propsRowClassName = props.rowClassName;
  const { row, rowData, rowIndex } = data;
  const realData = removeInternalKey(rowData || row);
  const allCls = [];
  if (props.highlightCurrentRow && selectionRowKeys.value.length > 0) {
    const currentRowKey = getRowKey.value(rowData || row);
    if (selectionRowKeys.value.includes(currentRowKey)) {
      allCls.push("current-row");
    }
  }
  const cls = propsRowClassName({ row: realData, rowData: realData, rowIndex });
  if (cls) {
    allCls.push(cls);
  }
  const removedKey = props.removedKey;
  if (removedKey) {
    const isRemoved = getValue(realData, removedKey);
    if (isRemoved) {
      allCls.push("pro-table--row--removed");
    }
  }
  return allCls.join(" ");
};
// 单击行选中, v1 参数 row, column, event v2 参数 { rowData, rowIndex, rowKey, event }
const handleRowClick = (row: AliasAny, _column: AliasAny, event: Event) => {
  const { rowClick, type, selectable } = rowSelectionProps.value;
  const rowKey = getRowKey.value(row);
  // 单击 row 多选
  if (rowClick && type && type === "checkbox") {
    const hasSelected = selectable(row);
    if (hasSelected === false) {
      return;
    }
    const copyRowKeys = selectionRowKeys.value.slice();
    const matchIndex = copyRowKeys.findIndex((item) => item === rowKey);
    if (matchIndex > -1) {
      // 清除
      copyRowKeys.splice(matchIndex, 1);
    } else {
      // 选中
      copyRowKeys.push(rowKey);
    }
    selectionRowKeys.value = copyRowKeys;
  } else {
    // 单击 row 单选
    emit("current-change", row, getOldRow());
    selectionRowKeys.value = [rowKey];
  }
  if (typeof attrs.onRowClick === "function") {
    attrs.onRowClick(row, event);
  }
};
// RowEventHandlers 事件集合
const RowEventHandlers = {
  onClick: (data: AliasAny) => {
    const { rowData, event } = data;
    handleRowClick(rowData, undefined, event);
  },
  onContextmenu: (data: AliasAny) => {
    const { rowData, event } = data;
    handleRowContextMenu?.(rowData, undefined, event);
  },
};
const waterfallStyle = computed(() => {
  // 不是第一次请求且要展示 loading
  // console.log('==', props.first, props.waterfall, props.loading)
  const rl = !props.first && props.waterfall;
  return rl ? "pro-table--loading__waterfall" : "";
});
// empty
const getEmpty = () => {
  if (typeof slots.empty === "function") {
    return;
  }
  if (props.loading) {
    return h("div");
  }
  return h(
    "div",
    {
      class: "pro-table--empty",
    },
    {
      default: () => {
        return [h("span", props.emptyText)];
      },
    }
  );
};
// 递归处理 columns
const callColumns = (columns: ProColumns): VNode[] => {
  // 递归处理，可能会有 children
  const tagColumns = columns.map((column, index) => {
    if (column.children && column.children.length > 0) {
      return h(
        ProColumn,
        {
          key: `proChildren_${index}`,
          label: column.title,
        },
        {
          default: () => {
            const kids = callColumns(column.children as ProColumns);
            // console.log('==kids==', kids)
            return kids;
          },
        }
      );
    }
    const isOperate = column.valueType === "option";
    const key = isOperate
      ? "proColumn_option"
      : column.dataKey || `proColumn_${index}`;
    // console.log("=key=", key);
    return h(ProColumn, {
      key: key,
      ...column,
    });
  });
  if (slots.expand) {
    tagColumns.unshift(
      h(
        ProColumn,
        {
          type: "expand",
        },
        {
          default: slots.expand,
        }
      )
    );
  }
  return tagColumns;
};
// columns 存在
const getColumns = (columnsValue: ProColumns) => {
  if (columnsValue.length === 0) {
    return null;
  }
  return callColumns(columnsValue);
};
const columnVNode = shallowRef<() => VNode | VNode[] | null>(() =>
  getColumns(columns.value)
);
watch(
  () => columns.value,
  (newColumn) => {
    columnVNode.value = () => getColumns(newColumn);
  }
);
</script>
