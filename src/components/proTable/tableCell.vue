<template>
  <div
    tabindex="-1"
    :class="cellClass"
    :style="props.style"
    @click="props.onClick"
    @dblclick="props.onDoubleClick"
  >
    <RenderCustom :content="domVNode" />
  </div>
</template>
<script lang="ts" setup>
import { computed, inject, h, toRefs, shallowRef, watch } from "vue";
import type { ComputedRef, CSSProperties, VNode } from "vue";
import { setValue } from "../utils/value";
import { RenderCustom } from "../utils/renderCustom";
import { omit, getRealRowKey } from "./utils";
import type {
  AnyObject,
  ProColumn,
  ProTableFieldProps,
  ProCellRendererParams,
  ProTableProviderProps,
} from "./table.types";
import { ProFormField } from "../form/index";
import ProField from "../proField/index";
import type {
  TextSpecifiledProps,
  ElTextProps,
} from "../proField/components/text/type";
import type {
  ProFieldPropsType,
  ProFieldValueType,
} from "../proField/index.type";

export type ProTableCellProps<
  T = AnyObject,
  ValueType extends ProFieldValueType = ProFieldValueType
> = ProCellRendererParams &
  Pick<
    ProColumn,
    "required" | "editable" | "cellRenderer" | "editCellRenderer"
  > &
  Omit<TextSpecifiledProps, "copyText"> &
  Pick<ElTextProps, "lineClamp"> &
  ProTableFieldProps<ValueType> & {
    class?: string;
    style?: CSSProperties;
    editing?: boolean;
    onClick?: () => void;
    onDoubleClick?: () => void;
    onBlur?: () => void;
    "onKeydown:enter"?: () => void;
    getRowKey: (record: T) => string;
  };

defineOptions({
  name: "TableCell",
  inheritAttrs: false,
});
const props = defineProps<ProTableCellProps>();
const ProTableData = inject<ProTableProviderProps>("ProTableData");
const handleValueChange = (value: any) => {
  const onValueChange = props.column.proFieldProps?.onValueChange;
  // 修改 table 的值，但不会触发 tableData 的 watch
  setValue(props.rowData, props.cellKey, value);
  ProTableData?.setEditRecord(props.rowData);
  if (onValueChange) {
    onValueChange(value, props.rowData);
  }
};

const {
  ellipsis,
  copyable,
  lineClamp,
  tooltip,
  required,
  column,
  getRowKey,
  rowData,
  cellKey,
  cellData,
  columns,
  columnIndex,
  rowIndex,
} = toRefs(props);
const params = computed(() => ({
  cellKey: cellKey.value,
  cellData: cellData.value,
  column: column.value,
  columns: columns.value,
  columnIndex: columnIndex.value,
  rowIndex: rowIndex.value,
  rowData: rowData.value,
}));
const mode: ComputedRef<ProFieldPropsType["mode"]> = computed(() => {
  return props.editing &&
    (typeof props.editable === "function"
      ? props.editable(params.value)
      : props.editable !== false)
    ? "edit"
    : "read";
});
const isCheckbox = computed(() => column.value.valueType === "checkbox");
const rowKeyValue = computed(
  () => getRealRowKey(getRowKey.value, rowData.value) as string
);
const columnFieldProps = computed(() => ({
  ellipsis: ellipsis.value,
  copyable: copyable.value,
  lineClamp: lineClamp.value,
  required: required.value,
  tooltip: tooltip.value,
  mode: isCheckbox.value ? "edit" : mode.value,
}));
const rules = computed(() => {
  return typeof column.value.rules === "function"
    ? column.value.rules(rowKeyValue.value)
    : column.value.rules;
});
const effects = computed(() => {
  const ief = column.value.effects
    ? column.value.effects(rowKeyValue.value)
    : undefined;
  return ief;
});
const proFieldProps = computed(() => {
  const proFieldProps = column.value.proFieldProps || {};
  // console.log('=proFieldProps=', column.value.dataKey, proFieldProps)
  const omitFieldProps = omit(proFieldProps, ["onValueChange"]);
  // const oldKeydown = omitFieldProps.fieldProps?.onKeydown
  const oldBlur = omitFieldProps.fieldProps?.onBlur;
  omitFieldProps.fieldProps = {
    ...omitFieldProps.fieldProps,
    onBlur: (e: FocusEvent) => {
      props.onBlur?.();
      oldBlur?.(e);
    },
  };
  // 如果是 checkbox，则不需要只读模式
  if (isCheckbox.value && mode.value === "read") {
    omitFieldProps.fieldProps.readContinue = true;
  }
  return omitFieldProps;
});
const mergeTextProps = computed(() => {
  return {
    ...proFieldProps.value,
    ellipsis: ellipsis.value,
    copyable: copyable.value,
    lineClamp: lineClamp.value,
  };
});

const dom = () => {
  const dataKey = column.value.dataKey;
  // 编辑态统一使用 ProFormField 包裹
  const type = ProTableData?.editableConfig.value?.type;
  if (type) {
    const formName = `${rowKeyValue.value}.${dataKey}`;
    let dom = h(ProField, {
      key: `${formName}_pro_field`,
      valueType: column.value.valueType,
    });
    if (props.editCellRenderer) {
      dom = props.editCellRenderer(
        omit(props, ["editCellRenderer", "cellRenderer", "render"])
      );
    }
    const title = column.value.title;
    const immFocus = type === "cell" ? true : false;
    return h(
      ProFormField,
      {
        ...columnFieldProps.value,
        ...mergeTextProps.value,
        key: formName,
        rules: rules.value,
        effects: effects.value,
        label: title,
        hasLabelSpace: false,
        style: { margin: "0" },
        name: formName,
        immFocus,
        onValueChange: handleValueChange,
        "onKeydown:enter": props["onKeydown:enter"],
      },
      {
        default: () => dom,
      }
    );
  }
  // 非编辑态表格导出需要对应的控件实例
  const setRef = (ref: any) => {
    if (ref) {
      ProTableData?.setCellRef(cellKey.value, ref);
    }
  };
  let dom = h(ProField, {
    mode: "read",
    ref: setRef,
    ...mergeTextProps.value,
    valueType: column.value.valueType,
    modelValue: cellData.value,
  });
  if (props.cellRenderer) {
    dom = props.cellRenderer(omit(props, ["editCellRenderer", "cellRenderer"]));
  }
  return dom;
};
const domVNode = shallowRef<() => VNode>(() => dom());
watch(
  () => [columnFieldProps.value, mergeTextProps.value, cellData.value],
  () => {
    domVNode.value = dom;
  }
);
const cellClass = computed(() => {
  const cClass = mode.value === "read" ? "pro-column--read" : "";
  const checkboxClass =
    props.column.valueType === "checkbox" ? "pro-column--checkbox" : "";
  return [props.class, cClass, checkboxClass];
});
// 移除样式 display: 'flex', alignItems: 'center'
</script>
