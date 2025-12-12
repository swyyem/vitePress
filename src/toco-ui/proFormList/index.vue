<style lang="less" scoped>
.pro-form-list {
  margin-bottom: 18px;
}

.pro-form-list__label {
  font-size: var(--el-font-size-base);
  margin-bottom: 8px;
}

.pro-form-list__add {
  width: 100%;
  border-style: dashed;
}

.pro-form-list__li {
  display: flex;
}

.pro-form-list__left {
  flex: 1;
}

.pro-form-list__right {
  padding-top: 6px;

  & > .el-icon {
    margin-left: 8px;
    cursor: pointer;
  }
}
</style>
<template>
  <div class="pro-form-list">
    <slot name="label" v-if="slots.label"></slot>
    <div v-else class="pro-form-list__label">{{ props.label }}</div>
    <div class="pro-form-list__li" v-for="(item, index) in list" :key="index">
      <div class="pro-form-list__left">
        <ProFormListProvide :index="index">
          <slot></slot>
        </ProFormListProvide>
      </div>
      <div class="pro-form-list__right">
        <el-tooltip content="复制此项" placement="top">
          <el-icon @click="copyItem(index)">
            <CopyDocument />
          </el-icon>
        </el-tooltip>
        <el-tooltip content="删除此项" placement="top">
          <el-icon @click="removeItem(index)">
            <Delete />
          </el-icon>
        </el-tooltip>
      </div>
    </div>
    <el-row>
      <el-button class="pro-form-list__add" @click="addItem">
        <el-icon>
          <Plus />
        </el-icon>
        添加一行数据
      </el-button>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, inject, provide, useSlots, onMounted } from 'vue';
import { ElButton, ElIcon, ElRow, ElTooltip } from 'element-plus';
import { Plus, CopyDocument, Delete } from '@element-plus/icons-vue';
import { structuredClone } from '../form/utils';
import { ProFormListProvide } from './index';
import FormStore from '../form/formStore';
import type { ProFormListProps } from './index';

// 基于 vue3 实现和 antd 的 ProFormList 组件一样的功能
const props = defineProps<ProFormListProps>();
const slots = useSlots();
const formStore = inject<FormStore>('formStore');
// 嵌套上级 ProFormList 的 name
const parentListName = inject<string>('ProFormListName', '');
// 嵌套上级 ProFormList 的 index
const parentListIndex = inject<number>('ProFormListIndex', -1);
const name = props.name;
const realName = Array.isArray(name) ? name.join('.') : name;
const currentListIndex = parentListIndex !== -1 ? `[${parentListIndex}]` : '';
const currentListName = `${
  parentListName ? parentListName + currentListIndex + '.' : ''
}${realName}`;
provide('ProFormListName', currentListName);
defineOptions({
  name: 'ProFormList',
});
const list = computed(() => {
  return formStore?.getValue(currentListName) || [];
});
const copyItem = (index: number) => {
  const newItem = structuredClone(list.value[index]);
  const newList = [...list.value];
  newList.splice(index + 1, 0, newItem);
  formStore?.setValue(currentListName, newList);
};
const removeItem = (index: number) => {
  const newList = list.value.filter((_: any, i: number) => i !== index);
  formStore?.setValue(currentListName, newList);
};
const addItem = () => {
  formStore?.setValue(currentListName, list.value.concat([{}]));
};
onMounted(() => {
  console.log('=proformlist=');
});
</script>
