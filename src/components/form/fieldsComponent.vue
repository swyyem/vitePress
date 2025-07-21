<script setup lang="ts">
// import type { ProFieldValueTypeWithFieldComponentProps } from '../proField/index.type'
import type { FiledForm } from "./form.types";
import {
  computed,
  useSlots,
  h,
  type VNode,
  type ComputedRef,
  inject,
} from "vue";
import type { Ref, Slots } from "vue"; // 导入 Slots 类型
import { getComponentMap, defaultComponentMap } from "../components/utils";
import { ProFormCustom } from "../components/index";
// 添加组件名称
defineOptions({
  name: "FieldsComponent",
});

// 注入表单插槽（用于在表单上下文中共享插槽）
const formSlots = inject<Ref<Slots>>("formSlots");
// 获取当前组件的插槽
const slots: Slots = useSlots();

// 定义组件属性，设置默认值
const props = withDefaults(defineProps<FiledForm>(), {
  showMessage: undefined,
  colon: undefined,
  hasLabelSpace: undefined,
});

/**
 * 默认文本渲染函数
 * @param props 字段属性
 * @returns 渲染的VNode节点
 */
const defaultRenderText = (props: FiledForm): VNode => {
  // 生成唯一的key，用于查找插槽
  const key = Array.isArray(props.name) ? props.name.join("") : props.name;

  if (formSlots && key in formSlots.value) {
    // 获取插槽内容
    const slotContent = formSlots?.value[key]?.();

    // 使用ProFormCustom组件包装插槽内容
    return h(ProFormCustom, { ...props, custom: true }, () => {
      return slotContent;
    });

    // 没有插槽时的处理
  } else {
    // 获取全局组件映射（包含内置组件）
    const componentMap = getComponentMap();

    // 根据valueType获取对应的组件
    const Component = componentMap[props.valueType || "text"];

    // 如果是内置组件类型
    if (props?.valueType && props.valueType in defaultComponentMap) {
      // 直接渲染组件并传入插槽
      return h(Component, props, slots);
    } else {
      // 使用ProFormCustom包装自定义组件
      return h(ProFormCustom, props, () => {
        return h(Component, {}, slots);
      });
    }
  }
};


/**
 * 计算属性：渲染的DOM节点
 * 使用computed优化性能，只有props变化时才重新渲染
 */
const renderedDom: ComputedRef<VNode> = computed(() => {
  return defaultRenderText(props);
});
</script>

<template>
  <!-- 动态渲染计算得到的组件 -->
  <component :is="renderedDom" />
</template>
