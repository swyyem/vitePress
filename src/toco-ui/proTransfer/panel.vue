<template>
  <div class="pro-transfer--panel">
    <ProTable v-bind="tableProps" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import ProTable, { type ProTableProps } from '../proTable';
import type { ProTransferPanelProps } from './transfer.types';
const props = withDefaults(defineProps<ProTransferPanelProps>(), {
  valueKey: 'value',
});

defineOptions({
  name: 'ProTransferPanel',
});

const checked = computed(() => {
  return props.checked.map(item => item[props.valueKey]);
});

const tableProps = computed(() => {
  return {
    toolbar: false,
    pagination: false,
    sameMaxHeight: true,
    emptyText: '',
    rowKey: props.valueKey,
    highlightCurrentRow: false,
    ...(props.tableProps || {}),
    data: props.data,
    rowSelection: {
      type: 'checkbox',
      selectedRowKeys: checked.value,
      reserveSelection: true,
      rowClick: true,
      onChange: props.checkedChange,
    },
  } as ProTableProps;
});
</script>
