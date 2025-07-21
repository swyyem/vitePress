<template>
  <div class="pro-table--header" :class="props.className">
    <div class="pro-table--header__left">
      <div class="pro-table--header__title" v-if="showTitle">
        {{ props.title }}
      </div>
      <slot name="toolbar-filters" />
    </div>
    <div class="pro-table--header__right">
      <slot name="toolbar-search" />
      <ProTableToolbarSetting v-if="props.custom">
        <div class="el-table-toolbar-icon">
          <el-button :icon="SettingSvg" />
        </div>
      </ProTableToolbarSetting>
      <ProTableTollbarImport v-if="importDisplay" v-bind="props.import" />
      <ProTableToolbarExport v-if="exportDisplay" v-bind="exportProps" />
      <slot name="toolbar-buttons" />
    </div>
  </div>
</template>
<style lang="less">
.pro-table--header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 16px;
  min-height: 32px;

  &__left {
    display: flex;
    gap: 10px;
  }

  &__title {
    position: relative;
    padding-left: 7px;
    font-size: var(--global-font-size-large);
    color: var(--title-color);
    height: 32px;
    display: flex;
    align-items: center;
    white-space: nowrap;

    &:after {
      content: " ";
      position: absolute;
      left: 0;
      top: 50%;
      width: 3px;
      height: 16px;
      transform: translateY(-50%);
      background-color: var(--brand-color);
    }
  }

  & &__right {
    display: flex;
    gap: 10px;

    .el-button + .el-button {
      margin-left: 0;
    }
  }

  & &__bton {
    padding: 8px;
  }

  .el-button {
    margin-left: 0;
  }
}
</style>
<script setup lang="ts">
/**
 * @description: 表格工具栏和搜索表单
 * 右侧插槽分成两部分
 * 一个是右侧靠右的按钮组，内置了定制列、导入、导出，
 * 自定义按钮组始终靠右，如新建
 * 一个是右侧靠左的关键字搜索控件，回车触发搜索
 * 左侧插槽是表单中的筛选控件
 */
import { h, computed } from "vue";
import { ElButton } from "element-plus";
import { SettingIcon } from "./icons/index";
import {
  ProTableToolbarSetting,
  ProTableToolbarExport,
  ProTableTollbarImport,
} from "./index";
import type { ProTableToolbarProps } from "./table.types";

defineOptions({
  name: "ProTableToolbar",
});
const props = withDefaults(defineProps<ProTableToolbarProps>(), {
  custom: false,
  export: false,
});
const showTitle = !!props.title;
const SettingSvg = h(SettingIcon, { size: 16 });
const importDisplay = computed(() => (props.import ? true : false));
const exportDisplay = computed(() => {
  const isBool = typeof props.export === "boolean";
  return isBool ? props.export : true;
});
const exportProps = computed(() => {
  if (typeof props.export === "object") {
    return props.export;
  }
  return {};
});
</script>
