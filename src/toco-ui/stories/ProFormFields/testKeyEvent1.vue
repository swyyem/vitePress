<template>
  <el-form
    class="form-container"
    ref="formRef"
    :model="form"
    label-width="auto"
    style="max-width: 600px"
    @keydown="handleKeydown"
  >
    <el-form-item label="Activity name">
      <el-input v-model="form.name" ref="nameInput" />
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input v-model="form.desc" type="textarea" ref="descTextarea" />
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input v-model="form.num" type="number" ref="descNumber" />
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="form.region" placeholder="please select your zone" ref="regionSelect">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time">
      <el-col :span="11">
        <el-date-picker
          v-model="form.date1"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
          ref="date1Picker"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-time-picker
          v-model="form.date2"
          placeholder="Pick a time"
          style="width: 100%"
          ref="date2Picker"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="Instant delivery">
      <el-switch v-model="form.delivery" ref="deliverySwitch" />
    </el-form-item>
    <el-form-item label="Activity type">
      <el-checkbox-group v-model="form.type" ref="typeCheckboxGroup">
        <el-checkbox value="Online activities" name="type">Online activities</el-checkbox>
        <el-checkbox value="Promotion activities" name="type">Promotion activities</el-checkbox>
        <el-checkbox value="Offline activities" name="type">Offline activities</el-checkbox>
        <el-checkbox value="Simple brand exposure" name="type">Simple brand exposure</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Resources">
      <el-radio-group v-model="form.resource" ref="resourceRadioGroup">
        <el-radio value="Sponsor">Sponsor</el-radio>
        <el-radio value="Venue">Venue</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" ref="submitButton">Create</el-button>
      <el-button ref="cancelButton">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  ElForm,
  ElInput,
  ElRadio,
  ElRadioGroup,
  ElFormItem,
  ElButton,
  ElCheckbox,
  ElCheckboxGroup,
  ElSwitch,
  ElCol,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElTimePicker,
} from 'element-plus';
const form = ref({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
  num: 0,
});

const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const nameInput = ref<InstanceType<typeof ElInput> | null>(null);
const regionSelect = ref<InstanceType<typeof ElSelect> | null>(null);
const date1Picker = ref<InstanceType<typeof ElDatePicker> | null>(null);
const date2Picker = ref<InstanceType<typeof ElTimePicker> | null>(null);
const deliverySwitch = ref<InstanceType<typeof ElSwitch> | null>(null);
const typeCheckboxGroup = ref<InstanceType<typeof ElCheckboxGroup> | null>(null);
const resourceRadioGroup = ref<InstanceType<typeof ElRadioGroup> | null>(null);
const descTextarea = ref<InstanceType<typeof ElInput> | null>(null);
const submitButton = ref<InstanceType<typeof ElButton> | null>(null);
const cancelButton = ref<InstanceType<typeof ElButton> | null>(null);
const descNumber = ref<InstanceType<typeof ElInput> | null>(null);

const formItems = [
  nameInput,
  descTextarea,
  descNumber,
  regionSelect,
  // date1Picker,
  // date2Picker,
  deliverySwitch,
  // typeCheckboxGroup,
  // resourceRadioGroup,
  // submitButton,
  // cancelButton
];

// onMounted(() => {
//   for (const item of formItems) {
//     console.log(item.value?.$el.querySelector('input, textarea, select'));
//   }
// })

const handleKeydown = (event: KeyboardEvent) => {
  console.log('Key pressed:', event.key);
  // console.log(document.activeElement); // 输出当前焦点元素

  const actEl = document.activeElement;
  const currentIndex = formItems.findIndex(item => {
    const itemVal = item.value?.$el.querySelector('input, textarea, select');
    console.log('itemVal:', itemVal);
    console.log('actEl:', actEl);

    return itemVal === actEl || itemVal?.contains(actEl);
  });

  if (event.key === 'ArrowRight') {
    event.preventDefault();

    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % formItems.length;
      console.log(currentIndex, nextIndex);
      formItems[nextIndex]?.value?.focus();
    }
  }
};

const onSubmit = () => {
  console.log('Form submitted:', form.value);
};
</script>
