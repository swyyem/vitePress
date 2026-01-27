# ProField 原子组件

ProField 是一个强大的原子组件，通过统一的标签和不同`valueType` 属性，可以渲染出不同的表单组件，让页面结构更加清晰和统一

## 特点

- 🎯 统一的组件标签，通过 `valueType` 属性渲染不同组件
- 📦 支持通过 JSON 配置渲染组件
- 🔄 支持只读和编辑两种模式
- 🎨 支持自定义渲染函数
- 🌐 支持远程数据加载

## 基础用法

### 最简单示例

先从最简单的按钮开始测试：

:::demo

```vue
<template>
  <div>
    <ProField valueType="Button">点击按钮</ProField>
  </div>
</template>
```

:::

### 输入框示

:::demo

```vue
<template>
  <div>
    <ProField valueType="Input" v-model="username" :fieldProps="{ placeholder: '请输入用户名' }" />
    <p style="margin-top: 10px;">输入的内容：{{ username }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const username = ref('')
</script>
```

:::

### 复选框示例

:::demo

```vue
<template>
  <div>
    <ProField valueType="Checkbox" v-model="checked">同意用户协议</ProField>
    <p style="margin-top: 10px;">选中状态：{{ checked }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked = ref(false)
</script>
```

:::

### 选择器示例

:::demo

```vue
<template>
  <div>
    <ProField
      valueType="Select"
      v-model="selectedCity"
      :fieldProps="{
        options: [
          { label: '北京', value: 'beijing' },
          { label: '上海', value: 'shanghai' },
          { label: '广州', value: 'guangzhou' },
          { label: '深圳', value: 'shenzhen' },
        ],
        placeholder: '请选择城市',
      }"
    />
    <p style="margin-top: 10px;">选中的城市：{{ selectedCity }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const selectedCity = ref('')
</script>
```

:::

### 开关示例

:::demo

```vue
<template>
  <div>
    <ProField
      valueType="Switch"
      v-model="switchValue"
      :fieldProps="{
        activeText: '开启',
        inactiveText: '关闭',
      }"
    />
    <p style="margin-top: 10px;">开关状态：{{ switchValue ? '开启' : '关闭' }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const switchValue = ref(false)
</script>
```

:::

## 按钮示例

:::demo

```vue
<template>
  <div style="display: flex; gap: 10px;">
    <ProField
      valueType="Button"
      :fieldProps="{
        type: 'primary',
      }"
      @click="handleClick"
    >
      主要按钮
    </ProField>
  </div>
</template>

<script lang="ts" setup>
const handleClick = () => {
  console.log('按钮被点击')
}
</script>
```

:::

## JSON 配置方式

通过 JSON 配置渲染多个表单项，让代码更加简洁和可维护
:::demo

```vue
<template>
  <div>
    <div v-for="field in fieldColumns" :key="field.prop" style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px;">{{ field.label }}:</label>
      <ProField
        :valueType="field.valueType"
        v-model="formData[field.prop]"
        :fieldProps="field.fieldProps"
      />
    </div>

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px; margin-top: 20px;">
      <h4 style="margin-top: 0;">表单数据</h4>
      <pre style="margin: 0;">{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const formData = ref({
  username: '',
  email: '',
  city: '',
  notification: false,
  agree: false,
})

const fieldColumns = [
  {
    label: '用户名',
    valueType: 'Input',
    prop: 'username',
    fieldProps: {
      placeholder: '请输入用户名',
      clearable: true,
    },
  },
  {
    label: '邮箱',
    valueType: 'Input',
    prop: 'email',
    fieldProps: {
      placeholder: '请输入邮箱',
      clearable: true,
    },
  },
  {
    label: '城市',
    valueType: 'Select',
    prop: 'city',
    fieldProps: {
      options: [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '广州', value: 'guangzhou' },
        { label: '深圳', value: 'shenzhen' },
      ],
      placeholder: '请选择城市',
    },
  },
  {
    label: '接收通知',
    valueType: 'Switch',
    prop: 'notification',
    fieldProps: {
      activeText: '开',
      inactiveText: '关',
    },
  },
  // {
  //   label: '',
  //   valueType: 'Checkbox',
  //   prop: 'agree',
  //   fieldProps: {
  //     label: '同意用户协议',
  //   },
  // },
]
</script>
```

:::

## TypeScript 类型提示

ProField 组件提供完整的 TypeScript 类型支持，在使用时会自动提示可用`valueType` 类型

```typescript
import type { ValueType } from '@swy-ui/proField'

// 使用 ValueType 类型
const fieldType: ValueType = 'Input'

// 动态配置
const config: { type: ValueType; props: any } = {
  type: 'Select',
  props: { placeholder: '请选择' },
}
```

## API

### Props

| 属性名     | 说明                 | 类型        | 默认 |
| ---------- | -------------------- | ----------- | ---- |
| valueType  | 组件类型             | `ValueType` |      |
| fieldProps | 传递给对应组件的属性 | `object`    | `{}` |
| v-model    | 双向绑定的数据       | `any`       |      |

### Events

| 事件  | 说明                           | 类型                        |
| ----- | ------------------------------ | --------------------------- |
| click | 点击事件（仅 Button 类型有效） | `(evt: MouseEvent) => void` |

### Exposes

| 名称       | 说明         | 类型  |
| ---------- | ------------ | ----- |
| ref        | 组件元素引用 | `Ref` |
| fieldProps | 字段属性     | `Ref` |
