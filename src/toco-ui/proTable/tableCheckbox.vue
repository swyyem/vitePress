<template>
  <el-checkbox
    v-if="display"
    :disabled="disabled"
    :modelValue="checked"
    :indeterminate="indeterminate"
    @change="handleChange"
    @click.stop
  />
</template>
<script lang="ts" setup>
import { inject, computed, ref } from 'vue';
import { ElCheckbox, type CheckboxProps, type CheckboxValueType } from 'element-plus';
import { isPromise } from '../utils';
import { getRealRowKey, getDataFromKeys } from './utils';
import type { KeyType, AnyObject, ProTableProviderProps } from './table.types';

defineOptions({
  name: 'ProTableCheckbox',
});
type AllTrueProps = Partial<CheckboxProps> & {
  all: true;
  rowValue?: never;
  rowData?: never;
};
type AllFalseProps = Partial<CheckboxProps> & {
  all?: false;
  rowValue: KeyType;
  rowData: AnyObject;
};
type ProTableCheckboxProps = AllTrueProps | AllFalseProps;
const props = withDefaults(defineProps<ProTableCheckboxProps>(), {
  all: false,
});
const ProTableData = inject<ProTableProviderProps>('ProTableData')!;
const selectionRowKeys = ProTableData.selectionRowKeys;
const tableData = ProTableData.tableData;
const getRowKey = ProTableData.getRowKey;
const rowSelectionProps = ProTableData.rowSelectionProps;
// selectable
const selectableMethod = computed(() => {
  return rowSelectionProps.value.selectable;
});
// 隐藏全选
const display = computed(() => {
  if (props.all) {
    return rowSelectionProps.value.hideSelectAll ? false : true;
  }
  return true;
});
// 禁用
const disabled = computed(() => {
  if (props.all) {
    return false;
  }
  const res = selectableMethod.value(props.rowData);
  return res ? false : true;
});
const allKeys = computed(() => {
  const lastData = tableData.value.filter(item => selectableMethod.value(item));
  return lastData.map(item => getRealRowKey(getRowKey.value, item));
});
const isAll = computed(() => {
  const len = selectionRowKeys.value.length;
  return len > 0 && len === allKeys.value.length;
});
const indeterminate = computed(() => {
  if (props.all) {
    return selectionRowKeys.value.length > 0 && !isAll.value;
  }
  return false;
});
const checked = computed(() => {
  if (props.all) {
    return isAll.value;
  }
  return selectionRowKeys.value.includes(props.rowValue);
});
// checkbox 中间态
const loading = ref(false);
const handleSelect = (rows: AnyObject[], row: AnyObject, cb: () => void) => {
  const res = rowSelectionProps.value.onSelect?.(rows, row);
  // 如果返回 false，取消选中
  if (isPromise<boolean>(res)) {
    loading.value = true;
    res
      .then(res => {
        if (res !== false) {
          cb();
        }
      })
      .finally(() => {
        loading.value = false;
      });
  } else if (res !== false) {
    cb();
  }
};
const handleChange = (v: CheckboxValueType) => {
  if (props.all) {
    selectionRowKeys.value = v ? allKeys.value : [];
  } else {
    if (loading.value) {
      return;
    }
    const rowValue = props.rowValue;
    // 如果有 onSelect 方法需要等待返回结果
    const keys = selectionRowKeys.value.slice();
    const selectedRows = getDataFromKeys(keys, tableData.value, getRowKey.value);
    handleSelect(selectedRows, props.rowData, () => {
      if (v) {
        keys.push(rowValue);
        selectionRowKeys.value = keys;
      } else {
        const index = selectionRowKeys.value.indexOf(rowValue);
        if (index > -1) {
          selectionRowKeys.value = selectionRowKeys.value.filter((_item, i) => i !== index);
        }
      }
    });
  }
};
</script>
