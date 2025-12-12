<template>
  <div :class="['form__title--style', props.formTitleClass]" v-if="props.formTitle">
    {{ props.formTitle }}
  </div>
  <el-form ref="formRef" v-bind="ElFormProps" :model="formData" @submit.prevent>
    <template v-if="props.columns">
      <template v-if="props.searchForm">
        <slot name="search"></slot>
      </template>
      <template v-else>
        <ElRow
          v-if="props.grid"
          :gutter="Array.isArray(props.gutter) ? props.gutter[0] : props.gutter"
        >
          <FormFields :columns="props.columns"></FormFields>
        </ElRow>
        <FormFields v-else :columns="props.columns"></FormFields>
      </template>
    </template>
    <template v-else>
      <div v-if="props.grid" :style="{ ...setColLimit }">
        <slot></slot>
      </div>
      <slot v-else></slot>
    </template>
    <FormFooter
      v-if="props.submitter !== false"
      v-bind="formSubmitter"
      :onSubmit="onSubmit"
      :onReset="onReset"
    />
  </el-form>
</template>
<script lang="ts" setup>
import type { ProFormInstance, ProFormProps, ProFormValueType } from './index';
import type { FormValidateCallback, FormValidationResult, FormInstance } from 'element-plus';
import { ElForm, ElRow } from 'element-plus';
import {
  computed,
  provide,
  reactive,
  ref,
  toRaw,
  watch,
  onMounted,
  useSlots,
  onBeforeUnmount,
} from 'vue';
import type { Slots } from 'vue';
import FormStore from './formStore';
// import FormFooter from "./footer";
import { FormFooter } from './index';
import { FormFields } from './index';
import { disposeDataByEmpty, omitProps, getPureData } from './utils';
import { isEqual } from 'lodash-unified';

defineOptions({
  name: 'ProForm',
});

const slots: Slots = useSlots();

const props = withDefaults(defineProps<ProFormProps>(), {
  initialValues: () => ({}),
  grid: true,
  params: () => ({}),
  // syncToInitialValues: false,
  omitNil: true,
  autoFocusFirstInput: false,
  showMessage: true,
  validateOnRuleChange: true,
  gutter: 20,
  colLimit: 1,
  submitter: undefined,
  colon: undefined,
  initEffect: false,
  fieldErrorType: 'icon',
  formatValue: (v: ProFormValueType) => v,
});

const formSlots = computed(() => {
  return slots;
});

const ElFormProps = computed(() => {
  type Props = typeof props;
  const excluded: (keyof Props)[] = [
    'initialValues',
    'params',
    'mode',
    // 'syncToInitialValues',
    'omitNil',
    'autoFocusFirstInput',
    'rules',
    'submitter',
    'request',
    'initEffect',
    'colon',
    'colLimit',
    'gutter',
    'columns',
    'formTitle',
    'formTitleClass',
    'searchForm',
    'fieldErrorType',
    'emptyText',
    'searchBtn',
    'onInit',
    'onFinish',
    'onValuesChange',
    'onSubmit',
    'onReset',
  ];
  return omitProps(props, excluded);
});

const setColLimit = computed(() => {
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${props.colLimit}, 1fr)`,
    gap: Array.isArray(props.gutter)
      ? `${props.gutter[0]}px ${props.gutter[1]}px`
      : `${props.gutter}px`,
  };
});

const formStore = new FormStore(
  getPureData(props.initialValues, props.omitNil),
  props.rules,
  props.mode
);
const formData = formStore.getValues();
const realInitialValues = ref(getPureData(props.initialValues, props.omitNil));
const stopValueWatch = watch(
  () => props.initialValues,
  () => {
    const copyData = getPureData(props.initialValues, props.omitNil);
    realInitialValues.value = copyData;
    if (formStore) {
      formStore.setValues(copyData);
    }
  }
);
// 监听表单数据变化
const stopFormDataWatch = watch(
  formData,
  (newValue, oldValue) => {
    props.onValuesChange?.(toRaw(newValue), toRaw(oldValue));
  },
  { deep: true }
);

const getGroupLabel = {
  labelPosition: props.labelPosition,
  labelWidth: props.labelWidth,
  inline: props.inline,
  labelSuffix: props.labelSuffix,
  colon: props.colon,
  emptyText: props.emptyText,
  fieldErrorType: props.fieldErrorType,
  initEffect: props.initEffect,
  grid: props.grid,
};

provide('formStore', formStore);
provide('proformPosition', getGroupLabel);
provide('formSlots', formSlots);
// watchEffect(() => {
//   console.log('=formStore=', formStore.getInstances())
// })

const onRequest = () => {
  if (props.request) {
    props
      .request(props.params || {})
      .then(res => {
        formStore.setValues(res);
      })
      .catch(error => {
        console.error('获取表单数据失败:', error);
      });
  }
};
const getFormLogicValues = () => {
  return props.formatValue(toRaw(formStore?.getLogicValues()));
};
// 抛出对象
const currentInstance = {
  getFormFullValues: () => props.formatValue(formStore?.getNormalValues()),
  getFormValues: () => getFormLogicValues(),
  setFormValues: (data: ProFormValueType, isCover?: boolean) => {
    formStore.setValues(props.omitNil ? disposeDataByEmpty(data) : data, isCover);
  },
  removeFormValues: (data: ProFormValueType) => {
    formStore.deleteValues(data);
  },
  validate: (cb: FormValidateCallback) => {
    return formRef.value?.validate(cb) as FormValidationResult;
  },
  resetFields: () => {
    formRef.value?.resetFields();
  },
  submit: async (): Promise<any> => {
    return await onSubmit();
  },
  reset: (e: MouseEvent) => {
    onReset(e);
  },
  hasEditorStatus: () => {
    const status = isEqual(realInitialValues.value, formStore?.getNormalValues());
    // 相等就是没有编辑过
    return !status;
  },
  getFormInstances: () => {
    return formStore.getInstances();
  },
};
// 对外暴露方法
defineExpose<ProFormInstance>(currentInstance);

onMounted(() => {
  // console.log('=mounted=', formStore.getInstances(), props)
  onRequest();
  // 触发 onInit
  props.onInit?.(toRaw(formStore?.getValues()), currentInstance);
  // if (props.autoFocusFirstInput) {
  //   const firstInput = formStore.getInstances()[0]
  //   if (firstInput) {
  //     // 先不处理
  //     // firstInput.instance.focus()
  //   }
  // }
});

onBeforeUnmount(() => {
  stopValueWatch();
  stopFormDataWatch();
  stopParamsWatch();
  stopModeWatch();
});

const stopParamsWatch = watch(
  () => props.params,
  () => {
    onRequest();
  }
);

// 监听 mode 变化
const stopModeWatch = watch(
  () => props.mode,
  newMode => {
    formStore.setMode(newMode);
  }
);
// submitterButton
const submitButtonProps = reactive({
  loading: false,
});
// submitter
const formSubmitter = computed(() => {
  return {
    submitButtonProps,
    ...(props.submitter || {}),
  };
});

// 收集所有表单控件实例
// const formFieldControls = reactive([]);

const formRef = ref<FormInstance>();
const onSubmit = async () => {
  props.onSubmit?.(getFormLogicValues());
  try {
    const val = await formRef.value?.validate();
    if (val) {
      if (props.onFinish) {
        try {
          submitButtonProps.loading = true;
          await props.onFinish(getFormLogicValues());
          submitButtonProps.loading = false;
          return Promise.resolve(true);
        } catch {
          submitButtonProps.loading = false;
          return Promise.resolve(false);
        }
      }
    } else {
      props.onFinishFailed?.(getFormLogicValues());
    }
  } catch {
    return Promise.resolve(false);
  }
};

const onReset = (e: MouseEvent) => {
  formRef.value?.resetFields();
  props.onReset?.(e);
};
</script>

<style lang="less" scoped>
.operation {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 18px;
}

.form__title--style {
  color: #1d1e1f;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 16px;

  &::before {
    content: '';
    display: inline-block;
    width: 3px;
    height: 16px;
    background-color: var(--el-color-primary);
    margin-right: 4px;
  }
}
</style>
