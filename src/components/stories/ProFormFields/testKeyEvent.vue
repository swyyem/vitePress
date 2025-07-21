<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px" ref="formRef">
    <el-form-item label="Activity name" ref="nameRef">
      <el-input v-model="form.name" @keydown.enter="focusNext('nameRef', 'regionRef')" />
    </el-form-item>
    <el-form-item label="Activity zone" ref="regionRef">
      <el-select
        v-model="form.region"
        ref="selectRef"
        filterable
        placeholder="please select your zone"
        @keydown="handleSelectKeydown"
      >
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time" ref="date1Ref">
      <el-col :span="11">
        <el-date-picker
          v-model="form.date1"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
          @keydown.enter="focusNext('date1Ref', 'date2Ref')"
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
          ref="date2Ref"
          @keydown.enter="focusNext('date2Ref', 'deliveryRef')"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="Instant delivery" ref="deliveryRef">
      <el-switch v-model="form.delivery" @keydown.enter="focusNext('deliveryRef', 'typeRef')" />
    </el-form-item>
    <el-form-item label="Activity type" ref="typeRef">
      <el-checkbox-group v-model="form.type" @keydown.enter="focusNext('typeRef', 'resourceRef')">
        <el-checkbox value="Online activities" name="type"> Online activities </el-checkbox>
        <el-checkbox value="Promotion activities" name="type"> Promotion activities </el-checkbox>
        <el-checkbox value="Offline activities" name="type"> Offline activities </el-checkbox>
        <el-checkbox value="Simple brand exposure" name="type"> Simple brand exposure </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Resources" ref="resourceRef">
      <el-radio-group v-model="form.resource" @keydown.enter="focusNext('resourceRef', 'descRef')">
        <el-radio value="Sponsor">Sponsor</el-radio>
        <el-radio value="Venue">Venue</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Activity form" ref="descRef">
      <el-input v-model="form.desc" type="textarea" @keydown.enter="onSubmit" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-explicit-any */
import { reactive, ref, onMounted } from 'vue'
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
} from 'element-plus'

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

// const handleKeydown = (event) => {
//   console.log('按键按下:', event.key);
//   // 自定义逻辑
//   if (event.key === 'Enter') {
//     console.log('Enter 键被按下');
//   }
// };

// 获取表单和表单项的 ref
const formRef = ref(null)
const nameRef = ref(null)
const regionRef = ref(null)
const date1Ref = ref(null)
const date2Ref = ref(null)
const deliveryRef = ref(null)
const typeRef = ref(null)
const resourceRef = ref(null)
const descRef = ref(null)
const selectRef = ref(null)

/**
 * 切换到下一个表单项
 * @param currentRef 当前表单项的 ref
 * @param nextRef 下一个表单项的 ref
 */
const focusNext = (currentRef: any, nextRef: any) => {
  console.log(currentRef, nextRef)
  if (nextRef == 'date2Ref' && currentRef == 'date1Ref') {
    console.log(eval(currentRef)?.value.$el)
    console.log(eval(nextRef)?.value.$el)
  } else {
    const current = eval(currentRef)?.value?.$el?.querySelector('input, textarea, select')
    const next = eval(nextRef)?.value?.$el?.querySelector('input, textarea, select')
    // console.log(current);
    // console.log(next);

    if (current && next) {
      current.blur() // 移除当前焦点
      next.focus() // 聚焦到下一个表单项
    }
  }
}

// 提交表单
const onSubmit = () => {
  console.log('Form submitted:', form)
}

// 处理 el-select 的 keydown 事件
const handleSelectKeydown = (event: KeyboardEvent) => {
  console.log('el-select 按键按下1:', event.key)

  if (event.key === 'ArrowRight') {
    event.preventDefault() // 阻止默认行为（展开下拉菜单）
    focusNext('regionRef', 'date1Ref') // 自定义焦点切换逻辑
  }
}

onMounted(() => {
  const inputElement = (selectRef.value as any)?.$el.querySelector('input')
  if (inputElement) {
    inputElement.addEventListener('keydown', (event: KeyboardEvent) => {
      console.log('el-select input 按键按下2:', event.key)
    })
  }
})
</script>

<style scoped>
.text-center {
  text-align: center;
}

.text-gray-500 {
  color: #6b7280;
}
</style>
