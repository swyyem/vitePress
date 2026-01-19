# 表单组件使用示例

## Checkbox 复选框

```vue
<template>
  <div>
    <swy-checkbox v-model="checked1" label="选项1">选项1</swy-checkbox>
    <swy-checkbox v-model="checked2" label="选项2" disabled>选项2(禁用)</swy-checkbox>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const checked1 = ref(false)
const checked2 = ref(true)
</script>
```

### Props

- `modelValue`: 绑定值
- `label`: 标签文本
- `disabled`: 是否禁用
- `size`: 尺寸 (small / default / large)

### Events

- `update:modelValue`: 值变化时触发
- `change`: 值变化时触发

---

## Select 选择器

```vue
<template>
  <div>
    <swy-select
      v-model="selectedValue"
      :options="options"
      placeholder="请选择"
      @change="handleChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedValue = ref('')
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3', disabled: true },
])

const handleChange = value => {
  console.log('选择了:', value)
}
</script>
```

### Props

- `modelValue`: 绑定值
- `options`: 选项数组 `{ label: string, value: string | number, disabled?: boolean }[]`
- `placeholder`: 占位文本
- `disabled`: 是否禁用
- `size`: 尺寸 (small / default / large)

### Events

- `update:modelValue`: 值变化时触发
- `change`: 值变化时触发

---

## Switch 开关

```vue
<template>
  <div>
    <swy-switch
      v-model="switchValue"
      active-text="开启"
      inactive-text="关闭"
      @change="handleSwitch"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const switchValue = ref(false)

const handleSwitch = value => {
  console.log('开关状态:', value)
}
</script>
```

### Props

- `modelValue`: 绑定值
- `disabled`: 是否禁用
- `activeText`: 激活时的文字描述
- `inactiveText`: 关闭时的文字描述
- `activeValue`: 激活时的值 (默认 true)
- `inactiveValue`: 关闭时的值 (默认 false)
- `size`: 尺寸 (small / default / large)

### Events

- `update:modelValue`: 值变化时触发
- `change`: 值变化时触发

---

## 完整表单示例

```vue
<template>
  <swy-form :model="formData" label-width="100px">
    <swy-form-item label="用户名">
      <swy-input v-model="formData.username" placeholder="请输入用户名" />
    </swy-form-item>

    <swy-form-item label="性别">
      <swy-radio-group v-model="formData.gender">
        <swy-radio label="male">男</swy-radio>
        <swy-radio label="female">女</swy-radio>
      </swy-radio-group>
    </swy-form-item>

    <swy-form-item label="爱好">
      <swy-checkbox v-model="formData.hobby1" label="读书">读书</swy-checkbox>
      <swy-checkbox v-model="formData.hobby2" label="运动">运动</swy-checkbox>
      <swy-checkbox v-model="formData.hobby3" label="音乐">音乐</swy-checkbox>
    </swy-form-item>

    <swy-form-item label="城市">
      <swy-select v-model="formData.city" :options="cityOptions" placeholder="请选择城市" />
    </swy-form-item>

    <swy-form-item label="接收通知">
      <swy-switch v-model="formData.notification" />
    </swy-form-item>

    <swy-form-item>
      <swy-button type="primary" @click="handleSubmit">提交</swy-button>
      <swy-button @click="handleReset">重置</swy-button>
    </swy-form-item>
  </swy-form>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({
  username: '',
  gender: '',
  hobby1: false,
  hobby2: false,
  hobby3: false,
  city: '',
  notification: false,
})

const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
]

const handleSubmit = () => {
  console.log('提交表单:', formData)
}

const handleReset = () => {
  Object.assign(formData, {
    username: '',
    gender: '',
    hobby1: false,
    hobby2: false,
    hobby3: false,
    city: '',
    notification: false,
  })
}
</script>
```
