<script setup lang="ts">
import { useSlots, h, ref, computed } from 'vue';
import type { ProFieldPropsType, ProFieldControlInstance } from './index';
import { getComponentMap } from './utils';

// 组件配置
defineOptions({
  name: 'ProField',
});

// 类型定义扩展
type EmitEvents = {
  'update:modelValue': [value: unknown];
  'update:option': [option: unknown];
  'keydown:enter': [];
};

// 响应式引用和属性
const slots = useSlots();
const childRef = ref(null);
const selfRef = ref<ProFieldControlInstance>();

const props = withDefaults(defineProps<ProFieldPropsType>(), {
  valueType: 'text',
  mode: 'edit',
  fieldProps: {},
  emptyText: '',
});

const emit = defineEmits<EmitEvents>();

// 缓存的组件映射
const componentMap = computed(() => getComponentMap());

/**
 * 创建组件属性对象
 */
const createComponentProps = computed(() => {
  const baseProps = {
    ...props.fieldProps,
    modelValue: props.modelValue,
    'onUpdate:modelValue': (value: unknown) => emit('update:modelValue', value),
    'onUpdate:option': (option: unknown) => emit('update:option', option),
  };

  // 特殊处理 selectEnhance 组件
  if (props.valueType === 'selectEnhance') {
    baseProps['onKeydown:enter'] = () => emit('keydown:enter');
  }

  return baseProps;
});

/**
 * 默认文本渲染函数
 */
const defaultRenderText = computed(() => {
  const Component = componentMap.value[props.valueType || 'text'];
  if (!Component) return null;

  const mergeProps = {
    ...props,
    fieldProps: createComponentProps.value,
    ref: selfRef,
    childRef,
    ...(props.valueType !== 'selectEnhance'
      ? {
          'onKeydown:enter': () => emit('keydown:enter'),
        }
      : {}),
  };

  const component = h(Component, mergeProps, slots);

  // 处理自定义渲染模式
  if (props.mode === 'read' && props.render) {
    return props.render(props.modelValue, createComponentProps.value);
  }

  if (props.mode === 'edit' && props.renderFormItem) {
    return props.renderFormItem(props.modelValue, createComponentProps.value, component);
  }

  return component;
});

// 暴露的方法
defineExpose({
  childRef: computed(() => selfRef.value?.childRef || childRef),
  getControlRef: () => {
    if (selfRef.value) {
      return selfRef.value.getChild?.() || childRef.value;
    }
    return childRef.value;
  },
  getText: (v: any) => {
    return selfRef.value?.getText?.(v) ?? v;
  },
});
</script>

<template>
  <component :is="defaultRenderText" />
</template>
