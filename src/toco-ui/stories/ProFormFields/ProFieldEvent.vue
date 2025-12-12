<template>
  <el-form
    class="form-container"
    ref="formRef"
    :model="form"
    label-width="auto"
    style="max-width: 600px"
    @keydown="handleKeydown"
  >
    <el-form-item v-for="(item, index) in IPropsData" :key="index" :label="item.label">
      <ProField v-model="(form as any)[item.name]" v-bind="item" :ref="el => (item.ref = el)" />
    </el-form-item>
    <!-- <el-form-item>
      <el-button type="primary" @click="onSubmit" ref="submitButton">Create</el-button>
      <el-button ref="cancelButton">Cancel</el-button>
    </el-form-item> -->
  </el-form>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, type Ref, computed } from 'vue';
import { ElForm, ElFormItem } from 'element-plus';

import type { ProFieldPropsType } from '../../proField/index.type';
import { ProField } from '../../index';
interface itemType extends ProFieldPropsType {
  name: string;
  label?: string;
  ref?: Record<string, any> | any;
}

// interface LinkItem {
//   value: string
//   link: string
// }
// const links = ref<LinkItem[]>([
//   { value: 'vue', link: 'https://github.com/vuejs/vue' },
//   { value: 'element', link: 'https://github.com/ElemeFE/element' },
//   { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
//   { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
//   { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
//   { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
//   { value: 'babel', link: 'https://github.com/babel/babel' },
// ])
// const querySearch = (queryString: string, cb: (results: LinkItem[]) => void) => {
//   const results = queryString ? links.value.filter(createFilter(queryString)) : links.value
//   // call callback function to return suggestion objects
//   cb(results)
// }

// const createFilter = (queryString: string) => {
//   return (restaurant: LinkItem) => {
//     return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
//   }
// }
// const options = [
//   { label: '全部1', value: 'all', disabled: true, status: 'Default', color: 'red' },
//   { label: '未解决1', status: 'Error', color: 'red', value: 'open' },
//   { label: '已解决1', value: 'closed' },
//   {
//     label: '解决中1',
//     value: 'processing',
//   },
// ]

const IPropsData: Ref<itemType[]> = ref([
  {
    mode: 'edit',
    name: 'Input',
    label: 'Input',
    valueType: 'text',
    ref: ref(null),
    debounceTime: 20000,
    fieldProps: {},
  },
  // {
  //   mode: 'edit',
  //   name: 'Autocomplete',
  //   label: 'Autocomplete',
  //   valueType: 'autocomplete',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {fetchSuggestions: querySearch,},
  // },
  // {
  //   mode: 'edit',
  //   name: 'Checkbox',
  //   label: 'Checkbox',
  //   valueType: 'checkbox',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {options},
  // },
  {
    mode: 'edit',
    name: 'InputNumber',
    label: 'InputNumber',
    valueType: 'inputNumber',
    ref: ref(null),
    debounceTime: 20000,
    fieldProps: {},
  },
  // {
  //   mode: 'edit',
  //   name: 'Select',
  //   label: 'Select',
  //   valueType: 'select',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {},
  // },
  // {
  //   mode: 'edit',
  //   name: 'Radio',
  //   label: 'Radio',
  //   valueType: 'radio',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {},
  // },
  // {
  //   mode: 'edit',
  //   name: 'Rate',
  //   label: 'Rate',
  //   valueType: 'rate',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {},
  // },
  // {
  //   mode: 'edit',
  //   name: 'Slider',
  //   label: 'Slider',
  //   valueType: 'slider',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {},
  // },
  // {
  //   mode: 'edit',
  //   name: 'Avatar',
  //   label: 'Avatar',
  //   valueType: 'avatar',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {},
  // },

  // {
  //   mode: 'edit',
  //   name: 'Image',
  //   label: 'Image',
  //   valueType: 'image',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {},
  // },
  // {
  //   mode: 'edit',
  //   name: 'Cascader',
  //   label: 'Cascader',
  //   valueType: 'cascader',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {},
  // },
  // {
  //   mode: 'edit',
  //   name: 'ColorPicker',
  //   label: 'ColorPicker',
  //   valueType: 'colorPicker',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {},
  // },
  // {
  //   mode: 'edit',
  //   name: 'Segmented',
  //   label: 'Segmented',
  //   valueType: 'Segmented',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {},
  // },
  // {
  //   mode: 'edit',
  //   name: 'Divider',
  //   label: 'Divider',
  //   valueType: 'divider',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {},
  // },
  // {
  //   mode: 'edit',
  //   name: 'Mention',
  //   label: 'Mention',
  //   valueType: 'mention',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {},
  // },
  // {
  //   mode: 'edit',
  //   name: 'SelectV2',
  //   label: 'SelectV2',
  //   valueType: 'selectV2',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {},
  // },
  // {
  //   mode: 'edit',
  //   name: 'TimePicker',
  //   label: 'TimePicker',
  //   valueType: 'timePicker',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {},
  // },
  // {
  //   mode: 'edit',
  //   name: 'TimeSelect',
  //   label: 'TimeSelect',
  //   valueType: 'timeSelect',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {},
  // },
  // {
  //   mode: 'edit',
  //   name: 'TreeSelect',
  //   label: 'TreeSelect',
  //   valueType: 'treeSelect',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {},
  // },
  // {
  //   mode: 'edit',
  //   name: 'Transfer',
  //   label: 'Transfer',
  //   valueType: 'transfer',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {},
  // },
  // {
  //   mode: 'edit',
  //   name: 'Upload',
  //   label: 'Upload',
  //   valueType: 'upload',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {},
  // },
  // {
  //   mode: 'edit',
  //   name: 'DatePicker',
  //   label: 'DatePicker',
  //   valueType: 'datePicker',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {},
  // },
  // {
  //   mode: 'edit',
  //   name: 'Button',
  //   label: 'Button',
  //   valueType: 'button',
  //   ref: ref(null),
  //   debounceTime: 20000,
  //   fieldProps: {},
  // },
]);
const form = ref({
  Input: '',
  Autocomplete: '',
  Checkbox: [],
  InputNumber: 10,
  Select: '',
  Radio: '',
  Rate: 3,
  Slider: 30,
  Switch: '',
  Avatar: '',
  Image: '',
  Cascader: '',
  ColorPicker: '',
  Segmented: '',
  Divider: '',
  InputTag: '',
  Mention: '',
  SelectV2: '',
  TimePicker: '',
  TimeSelect: '',
  TreeSelect: '',
  Transfer: '10',
  Upload: '',
  Button: '',
  DatePicker: '',
});

const formRef = ref<InstanceType<typeof ElForm> | null>(null);

const formItems = computed(() => {
  return IPropsData.value.map(item => item.ref);
});

const handleKeydown = (event: KeyboardEvent) => {
  console.log('Key pressed:', event.key);
  // console.log(document.activeElement); // 输出当前焦点元素

  console.log('formItems', formItems.value[0].childRef.$el);
  const actEl = document.activeElement;
  const currentIndex = formItems.value.findIndex(item => {
    // const itemVal = item.childRef?.$el
    const itemVal = item.childRef?.$el.querySelector('input, textarea, select');
    console.log('itemVal:', item.childRef.$el.querySelector('input, textarea, select'));
    console.log('actEl:', actEl);

    return itemVal === actEl || itemVal?.contains(actEl);
  });

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    console.log(currentIndex);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % formItems.value.length;
      console.log(currentIndex, nextIndex, formItems.value[nextIndex]?.childRef);
      if (formItems.value[nextIndex]?.childRef.focus) {
        formItems.value[nextIndex]?.childRef?.focus();
      }
    }
  }
};

// const onSubmit = () => {
//   console.log('Form submitted:', form.value)
// }
</script>
