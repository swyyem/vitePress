<style scoped>
.profield-tip {
  color: var(--el-color-danger);
  margin-right: 4px;
}

.profield-nolabel :deep(.el-form-item__content) {
  margin-left: 0 !important;
}

.profield-nolabel > :deep(.el-form-item__label) {
  display: none;
}

.profield-nolabel.el-form-item--label-top > :deep(.el-form-item__label) {
  display: none;
}

.label-tooltip {
  display: flex;
  align-items: center;
}

.el-form-item :deep(.el-form-item__content) {
  flex-wrap: nowrap;
}

.el-form-item--label-top :deep(.el-form-item__label) {
  display: flex;
  justify-content: flex-start;
}

:deep(.pro-tooltip--popper) {
  opacity: 0.1;
}

.component-box {
  width: 100%;
  height: 100%;
}

.error-box {
  display: flex;
  align-items: center;
  margin-left: 6px;
}
</style>
<template>
  <el-form-item
    ref="formItemRef"
    v-bind="ElFormItemProps"
    v-if="!isNone"
    v-show="!isHidden"
    :class="itemClass"
    :showMessage="props.showMessage"
    :required="isLayout ? false : fieldModel?.getState('required')"
    :prop="propName"
    :label="labelText"
    :rules="fieldModel?.getState('rules')"
  >
    <el-tooltip
      v-if="!isDisplayErrorIcon"
      placement="top"
      :content="errorMessage"
      :disabled="!errorMessage"
    >
      <div class="component-box">
        <component :is="getChildComponent" :key="propName" />
      </div>
    </el-tooltip>
    <div v-else class="component-box">
      <component :is="getChildComponent" :key="propName" />
    </div>
    <template #error="{ error }">
      <div class="error-box" v-if="isDisplayErrorIcon">
        <el-tooltip placement="top-end" :content="error">
          <el-icon color="#E8322E" size="16">
            <Warning />
          </el-icon>
        </el-tooltip>
      </div>
      <div v-else></div>
    </template>

    <template v-if="isLayout && !props.tooltip" #label>
      <span v-if="fieldModel?.getState('required')" class="profield-tip">*</span>
      {{ labelText }}
    </template>

    <template v-else-if="!isLayout && props.fieldProps?.tooltip" #label>
      <div class="label-tooltip">
        {{ labelText }}
        <el-tooltip
          v-if="props.fieldProps?.tooltip"
          :content="props.fieldProps?.tooltip"
          placement="top"
        >
          <el-icon>
            <Warning />
          </el-icon>
        </el-tooltip>
      </div>
    </template>
  </el-form-item>
</template>

<script lang="ts" setup>
/**
 * required 统一放入 rules 中处理
 * 默认 message 取 label 加上不能为空
 */
import type { PropFormFieldProps, ProFormValueType, EffectCallbackType, GroupProps } from './index';
import FormStore from './formStore';
import { ElFormItem, ElTooltip, ElIcon } from 'element-plus';
import type { FormItemInstance } from 'element-plus';
import { Warning } from '@element-plus/icons-vue';
import { isEqual, pick } from 'lodash-unified';
import {
  computed,
  inject,
  cloneVNode,
  useSlots,
  ref,
  onMounted,
  onUnmounted,
  watch,
  nextTick,
  onBeforeUnmount,
  useAttrs,
} from 'vue';
import type { Slots } from 'vue';
import { omitProps, transferParams, structuredClone } from './utils';

defineOptions({
  name: 'ProFormField',
});
// 定义 emit 事件
const emit = defineEmits<{
  'update:label': [value: string];
  'update:required': [value: boolean];
  'update:rules': [value: PropFormFieldProps['rules']];
  'update:params': [value: PropFormFieldProps['params']];
  'update:valueEnum': [value: PropFormFieldProps['valueEnum']];
  'update:fieldProps': [value: PropFormFieldProps['fieldProps']];
  'update:display': [value: PropFormFieldProps['display']];
  'keydown:enter': [];
}>();
const formItemRef = ref<FormItemInstance>();
const errorMessage = computed(() => {
  if (formItemRef.value?.validateState === 'error') {
    return formItemRef.value?.validateMessage || '';
  }
  return '';
});
// showMessage 如果不设置默认值 true，则会被设置成 false，required 同样的问题
const props = withDefaults(defineProps<PropFormFieldProps>(), {
  immFocus: false,
  showMessage: true,
  hasLabelSpace: true,
  required: undefined,
  colon: undefined,
  display: 'visible',
  for: 'proformnoexist',
});
// 当 label 为 undefined 时，添加样式
const itemClass = props.hasLabelSpace ? '' : 'profield-nolabel';
// console.log('=field=', props)
const slots: Slots = useSlots();
const formStore = inject<FormStore>('formStore');
const proformPosition = inject<GroupProps>('proformPosition');
const parentListName = inject<string>('ProFormListName', '');
const parentListIndex = inject<number>('ProFormListIndex', -1);
const currentListIndex = parentListIndex !== -1 ? `[${parentListIndex}]` : '';
const name = props.name;
const originName = Array.isArray(name) ? name.join('.') : name;
const colon = computed(() =>
  props.colon !== undefined ? props.colon : (proformPosition?.colon ?? false)
);
const emptyText = computed(() => {
  return proformPosition?.emptyText;
});
const isDisplayErrorIcon = computed(() => {
  return proformPosition?.fieldErrorType === 'icon';
});
// label 加冒号
const labelText = computed(() => {
  const label = fieldModel?.getState('label');
  return colon.value && label ? `${label}：` : label;
});
const realName = parentListName ? `${parentListName}${currentListIndex}.${originName}` : originName;
// 添加 prop 的计算属性
const propName = computed(() => {
  return realName.replace(/\[(\d+)\]/g, '.$1');
});
// 只是为了布局和联动，没有 value 和 rules
const isLayout = props.layout ? true : false;

// const visible = ref(false)

const ElFormItemProps = computed(() => {
  type Props = typeof props;
  const excluded: (keyof Props)[] = [
    'name',
    'effects',
    'fieldProps',
    'layout',
    'showMessage',
    'mode',
    'valueEnum',
    'request',
    'params',
    'hasLabelSpace',
    'ellipsis',
    'copyable',
    'lineClamp',
  ];
  return omitProps(props, excluded);
});
const attrs = useAttrs();
const textProps = computed(() => {
  const res = pick(attrs, ['ellipsis', 'copyable', 'lineClamp']);
  return res;
});
// watch(() => fieldsError, (newVal) => {
//   console.log(newVal, 'newVal')
// })
// 添加数据
formStore?.addModel(realName, {
  label: props.label,
  required: props.required,
  rules: props.rules,
  params: transferParams(props.params, formStore?.getValues()),
  valueEnum: props.valueEnum,
  fieldProps: structuredClone(props.fieldProps),
  display: props.display,
});
// 添加副作用
formStore?.addEffect(realName, props.effects);
// 添加 effect 的回调
formStore?.addEffectCb(realName, ((key, value) => {
  const eventName = `update:${key}` as keyof typeof emit;
  emit(eventName, value);
}) as EffectCallbackType);
// 如果触发时机为 blur，则需要设置 blur 事件透传至子组件
const hasBlur = props.effects ? props.effects.some(effect => effect.trigger === 'blur') : false;
const effectBlur = hasBlur
  ? () => {
      formStore?.runEffects(realName, 'blur');
    }
  : undefined;
const fieldModel = formStore?.getModel(realName);
// console.log('=fieldModel=', fieldModel)
const isHidden = computed(() => fieldModel?.getState('display') === 'hidden');
const isNone = computed(() => fieldModel?.getState('display') === 'none');
// 监听组件是否卸载
const stopNoneWatch = watch(isNone, newVal => {
  if (newVal) {
    // v-if 为 true 时组件将被卸载，对应的 value 逻辑移除
    formStore?.removeSnapshot(realName);
  }
});
// 监听 valueEnum, params, label, required, rules 的变化
const stopValueEnumWatch = watch(
  () => props.valueEnum,
  newValueEnum => {
    fieldModel?.setState('valueEnum', newValueEnum);
  }
);
const stopParamsWatch = watch(
  () => props.params,
  newParams => {
    fieldModel?.setState('params', newParams);
  }
);
const stopLabelWatch = watch(
  () => props.label,
  newLabel => {
    fieldModel?.setState('label', newLabel);
  }
);
const stopRequiredWatch = watch(
  () => props.required,
  newRequired => {
    fieldModel?.setState('required', newRequired);
  }
);
const stopRulesWatch = watch(
  () => props.rules,
  newRules => {
    fieldModel?.setState('rules', newRules);
  }
);
const stopFieldPropsWatch = watch(
  () => props.fieldProps,
  (newFieldProps, oldFieldProps) => {
    // 处理旧值中存在但新值中不存在的属性，设置为 undefined
    const newFieldMap: ProFormValueType = {};
    if (oldFieldProps) {
      Object.keys(oldFieldProps).forEach(key => {
        if (newFieldProps && !(key in newFieldProps)) {
          newFieldMap[key] = undefined;
        }
      });
    }
    if (newFieldProps) {
      Object.keys(newFieldProps).forEach(key => {
        newFieldMap[key] = newFieldProps[key];
      });
    }
    const oldFieldState = fieldModel?.getState('fieldProps');
    // oldFieldState 合并到 newFieldMap
    if (oldFieldState) {
      Object.keys(oldFieldState).forEach(key => {
        if (!newFieldMap[key]) {
          newFieldMap[key] = oldFieldState[key];
        }
      });
    }
    fieldModel?.setState('fieldProps', newFieldMap);
  },
  { deep: true }
);

const stopModelValueWatch = watch(
  () => formStore?.getValue(realName),
  (newValue, oldValue) => {
    if (!isEqual(newValue, oldValue)) {
      props.onValueChange?.(newValue);
    }
  }
);
const handleValueChange = (value: unknown) => {
  formStore?.setValue(realName, value);
  // props.onValueChange?.(value)
};
const handleEnhanceOptionChange = (option: unknown) => {
  fieldModel?.setState('option', option);
};
const handleKeydownEnter = () => {
  emit('keydown:enter');
};
const fieldComponentRef = ref();
// 监听 mode 变化
const stopModeWatch = watch(
  () => props.mode,
  newVal => {
    if (newVal === 'edit' && props.immFocus) {
      if (fieldComponentRef.value) {
        nextTick(() => {
          fieldComponentRef.value.getControlRef()?.focus?.();
        });
      }
    }
  }
);
onMounted(() => {
  if (!isLayout && fieldComponentRef.value) {
    const componentInstance = fieldComponentRef.value.childRef || fieldComponentRef.value;
    // 添加实例
    formStore?.addInstance(realName, componentInstance, () =>
      fieldComponentRef.value.getControlRef()
    );
    // 初始化 value
    if (props.initialValue) {
      formStore?.setValue(realName, props.initialValue);
    }
    if (proformPosition?.initEffect && props.effects && props.effects.length > 0) {
      formStore?.runEffects(realName, 'change');
      formStore?.runEffects(realName, 'blur');
    }
  }
});
// 清除 watch
onBeforeUnmount(() => {
  stopNoneWatch();
  stopValueEnumWatch();
  stopParamsWatch();
  stopLabelWatch();
  stopRequiredWatch();
  stopRulesWatch();
  stopFieldPropsWatch();
  stopModelValueWatch();
  stopModeWatch();
});

onUnmounted(() => {
  if (!isLayout) {
    // 移除实例
    formStore?.removeInstance(realName);
  }
  formStore?.removeModel(realName);
  formStore?.removeSnapshot(realName);
  // formStore?.removeValue(realName)
  formStore?.removeEffect(realName);
});

const getChildComponent = () => {
  const defaultSlots = slots.default?.();
  if (defaultSlots?.length === 1) {
    return cloneVNode(defaultSlots[0], {
      ...textProps.value,
      key: realName,
      ref: fieldComponentRef,
      modelValue: formStore?.getValue(realName),
      'onUpdate:modelValue': handleValueChange,
      'onUpdate:option': handleEnhanceOptionChange,
      'onKeydown:enter': handleKeydownEnter,
      request: props.request,
      mode: props.mode || formStore?.getMode(),
      fieldProps: fieldModel?.getState('fieldProps'),
      params: fieldModel?.getState('params'),
      valueEnum: fieldModel?.getState('valueEnum'),
      emptyText: emptyText.value,
      onBlur: effectBlur,
    });
  }
  return defaultSlots;
};
</script>
