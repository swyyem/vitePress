# Switch 开�?

表示两种相互对立的状态间的切换，多用于触发「开/关」�?

## 基础用法

绑定 `v-model` 到一�?`Boolean` 类型的变量�?
:::demo

```vue
<template>
  <div>
    <SwySwitch v-model="value1" @change="handleChange" />
    <p>开关状�? {{ value1 ? '开�? : '关闭' }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(true)

const handleChange = val => {
  console.log('switch changed:', val)
}
</script>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div>
    <ProField valueType="Switch" v-model="value1" @change="handleChange" />
    <p>开关状�? {{ value1 ? '开�? : '关闭' }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(true)

const handleChange = val => {
  console.log('switch changed:', val)
}
</script>
```

:::

## 文字描述

使用 `active-text` �?`inactive-text` 属性来设置开关的文字描述�?
:::demo

```vue
<template>
  <div>
    <SwySwitch v-model="value2" active-text="开�? inactive-text="关闭" />
    <p style="margin-top: 10px;">当前状�? {{ value2 ? '已开�? : '已关�? }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value2 = ref(false)
</script>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div>
    <ProField
      valueType="Switch"
      v-model="value2"
      :filedProps="{ activeText: '开�?, inactiveText: '关闭' }"
    />
    <p style="margin-top: 10px;">当前状�? {{ value2 ? '已开�? : '已关�? }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value2 = ref(false)
</script>
```

:::

## 禁用状�?

设置 `disabled` 属性，接受一�?`Boolean`，设�?`true` 即可禁用�?
:::demo

```vue
<template>
  <div style="display: flex; gap: 20px;">
    <SwySwitch v-model="value3" disabled />
    <SwySwitch v-model="value4" disabled />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value3 = ref(true)
const value4 = ref(false)
</script>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div style="display: flex; gap: 20px;">
    <ProField valueType="Switch" v-model="value3" :filedProps="{ disabled: true }" />
    <ProField valueType="Switch" v-model="value4" :filedProps="{ disabled: true }" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value3 = ref(true)
const value4 = ref(false)
</script>
```

:::

## 扩展�?value 类型

可以设置 `active-value` �?`inactive-value` 属性，它们接受 `Boolean`、`String` �?`Number` 类型的值�?
:::demo

```vue
<template>
  <div>
    <SwySwitch
      v-model="value5"
      :active-value="1"
      :inactive-value="0"
      active-text="�?
      inactive-text="
      �?
    />
    <p style="margin-top: 10px;">当前�? {{ value5 }} (类型: {{ typeof value5 }})</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value5 = ref(1)
</script>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div>
    <ProField
      valueType="Switch"
      v-model="value5"
      :filedProps="{ activeValue: 1, inactiveValue: 0, activeText: '�?, inactiveText: '�? }"
    />
    <p style="margin-top: 10px;">当前�? {{ value5 }} (类型: {{ typeof value5 }})</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value5 = ref(1)
</script>
```

:::

## 字符串�?

使用字符串作为开关的值�?
:::demo

```vue
<template>
  <div>
    <SwySwitch
      v-model="value6"
      active-value="on"
      inactive-value="off"
      active-text="ON"
      inactive-text="OFF"
    />
    <p style="margin-top: 10px;">当前�? {{ value6 }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value6 = ref('off')
</script>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div>
    <ProField
      valueType="Switch"
      v-model="value6"
      :filedProps="{
        activeValue: 'on',
        inactiveValue: 'off',
        activeText: 'ON',
        inactiveText: 'OFF',
      }"
    />
    <p style="margin-top: 10px;">当前�? {{ value6 }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value6 = ref('off')
</script>
```

:::

## 不同尺寸

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 10px; align-items: flex-start;">
    <SwySwitch v-model="value7" size="large" active-text="大尺�? />
    <SwySwitch v-model="value7" size="default" active-text="默认" />
    <SwySwitch v-model="value7" size="small" active-text="�? />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value7 = ref(true)
</script>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 10px; align-items: flex-start;">
    <ProField
      valueType="Switch"
      v-model="value7"
      :filedProps="{ size: 'large', activeText: '大尺�? }"
    />
    <ProField
      valueType="Switch"
      v-model="value7"
      :filedProps="{ size: 'default', activeText: '默认' }"
    />
    <ProField
      valueType="Switch"
      v-model="value7"
      :filedProps="{ size: 'small', activeText: '�? }"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value7 = ref(true)
</script>
```

:::

## 实际应用示例

控制通知设置�?
:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 15px;">
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <span style="width: 150px;">邮件通知</span>
        <SwySwitch v-model="settings.email" active-text="开�? inactive-text="关闭" />
      </div>
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <span style="width: 150px;">短信通知</span>
        <SwySwitch v-model="settings.sms" active-text="开�? inactive-text="关闭" />
      </div>
      <div style="display: flex; align-items: center;">
        <span style="width: 150px;">推送通知</span>
        <SwySwitch v-model="settings.push" active-text="开�? inactive-text="关闭" />
      </div>
    </div>
    <div style="padding: 10px; background: #f5f5f5; border-radius: 4px;">
      <p style="margin: 0; font-weight: bold;">当前设置:</p>
      <p style="margin: 5px 0;">邮件: {{ settings.email ? '�? : '�? }}</p>
      <p style="margin: 5px 0;">短信: {{ settings.sms ? '�? : '�? }}</p>
      <p style="margin: 5px 0;">推�? {{ settings.push ? '�? : '�? }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const settings = ref({
  email: true,
  sms: false,
  push: true,
})
</script>
```

:::

## API

### Props

| 属性名               | 说明                 | 类型                            | 默认�?      |
| -------------------- | -------------------- | ------------------------------- | ----------- |
| modelValue / v-model | 绑定�?               | `boolean / string / number`     | `false`     |
| disabled             | 是否禁用             | `boolean`                       | `false`     |
| active-text          | 开关打开时的文字描述 | `string`                        | �?          |
| inactive-text        | 开关关闭时的文字描�? | `string`                        | �?          |
| active-value         | 开关打开时的�?       | `boolean / string / number`     | `true`      |
| inactive-value       | 开关关闭时的�?       | `boolean / string / number`     | `false`     |
| size                 | 尺寸                 | `'large' / 'default' / 'small'` | `'default'` |

### Events

| 事件�? | 说明               | 类型                                           |
| ------ | ------------------ | ---------------------------------------------- |
| change | 状态发生变化时触发 | `(value: boolean \| string \| number) => void` |

### Exposes

| 名称     | 说明                | 类型                    |
| -------- | ------------------- | ----------------------- |
| inputRef | switch �?input 元素 | `Ref<HTMLInputElement>` |
| checked  | 是否选中            | `ComputedRef<boolean>`  |
