# ProField 原子组件

ProField 是一个强大的原子组件，通过统一的标签和不同的 `valueType` 属性，可以渲染出不同的表单组件，让页面结构更加清晰和统一。

## 特点

- 🎯 统一的组件标签，通过 `valueType` 属性渲染不同组件
- 📦 支持通过 JSON 配置渲染组件
- 🔄 支持只读和编辑两种模式
- 🎨 支持自定义渲染函数
- 🌐 支持远程数据加载

## 支持的组件类型

ProField 支持以下 `valueType` 类型：

- `SwyButton` - 按钮组件
- `SwyCard` - 卡片组件
- `SwyCheckbox` - 复选框组件
- `SwyForm` - 表单组件
- `SwyInput` - 输入框组件
- `SwyModal` - 模态框组件
- `SwySelect` - 选择器组件
- `SwySwitch` - 开关组件
- `SwyTable` - 表格组件
- `SwyTabs` - 标签页组件
- `SwyTag` - 标签组件
- `SwyTree` - 树形组件
- `SwyUpload` - 上传组件

## 基础用法

### 最简单示例

先从最简单的按钮开始测试：

:::demo

```vue
<template>
  <div>
    <ProField valueType="SwyButton">点击我</ProField>
  </div>
</template>

<script lang="ts" setup></script>
```

:::

### 输入框示例

:::demo

```vue
<template>
  <div>
    <ProField
      valueType="SwyInput"
      v-model="username"
      :filedProps="{ placeholder: '请输入用户名' }"
    />
    <p style="margin-top: 10px;">输入的内容: {{ username }}</p>
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
    <ProField valueType="SwyCheckbox" v-model="checked" :filedProps="{ label: '同意用户协议' }" />
    <p style="margin-top: 10px;">选中状态: {{ checked }}</p>
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
      valueType="SwySelect"
      v-model="selectedCity"
      :filedProps="{
        options: [
          { label: '北京', value: 'beijing' },
          { label: '上海', value: 'shanghai' },
          { label: '广州', value: 'guangzhou' },
          { label: '深圳', value: 'shenzhen' },
        ],
        placeholder: '请选择城市',
      }"
    />
    <p style="margin-top: 10px;">选中的城市: {{ selectedCity }}</p>
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
      valueType="SwySwitch"
      v-model="switchValue"
      :filedProps="{
        activeText: '开启',
        inactiveText: '关闭',
      }"
    />
    <p style="margin-top: 10px;">开关状态: {{ switchValue ? '开启' : '关闭' }}</p>
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
      valueType="SwyButton"
      :filedProps="{
        type: 'primary',
      }"
      @click="handleClick"
    >
      主要按钮
    </ProField>

    <ProField
      valueType="SwyButton"
      :filedProps="{
        type: 'success',
      }"
      @click="handleClick"
    >
      成功按钮
    </ProField>

    <ProField
      valueType="SwyButton"
      :filedProps="{
        type: 'warning',
      }"
      @click="handleClick"
    >
      警告按钮
    </ProField>

    <ProField
      valueType="SwyButton"
      :filedProps="{
        type: 'danger',
      }"
      @click="handleClick"
    >
      危险按钮
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

通过 JSON 配置渲染多个表单项，让代码更加简洁和可维护。

:::demo

```vue
<template>
  <div style="max-width: 500px;">
    <div v-for="field in fieldColumns" :key="field.prop" style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px;">{{ field.label }}:</label>
      <ProField
        :valueType="field.valueType"
        v-model="formData[field.prop]"
        :filedProps="field.filedProps"
      />
    </div>

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px; margin-top: 20px;">
      <h4 style="margin-top: 0;">表单数据：</h4>
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
    valueType: 'SwyInput',
    prop: 'username',
    filedProps: {
      placeholder: '请输入用户名',
      clearable: true,
    },
  },
  {
    label: '邮箱',
    valueType: 'SwyInput',
    prop: 'email',
    filedProps: {
      placeholder: '请输入邮箱',
      clearable: true,
    },
  },
  {
    label: '城市',
    valueType: 'SwySelect',
    prop: 'city',
    filedProps: {
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
    valueType: 'SwySwitch',
    prop: 'notification',
    filedProps: {
      activeText: '开',
      inactiveText: '关',
    },
  },
  {
    label: '',
    valueType: 'SwyCheckbox',
    prop: 'agree',
    filedProps: {
      label: '同意用户协议',
    },
  },
]
</script>
```

:::

## 综合示例

结合多种组件类型的完整表单示例。

:::demo

```vue
<template>
  <div style="max-width: 600px; padding: 20px; border: 1px solid #e4e7ed; border-radius: 4px;">
    <h3 style="margin-top: 0;">用户注册表单</h3>

    <div style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px;">用户名：</label>
      <ProField
        valueType="SwyInput"
        v-model="registerForm.username"
        :filedProps="{
          placeholder: '请输入用户名',
          clearable: true,
        }"
      />
    </div>

    <div style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px;">密码：</label>
      <ProField
        valueType="SwyInput"
        v-model="registerForm.password"
        :filedProps="{
          type: 'password',
          placeholder: '请输入密码',
          showPassword: true,
        }"
      />
    </div>

    <div style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px;">性别：</label>
      <ProField
        valueType="SwySelect"
        v-model="registerForm.gender"
        :filedProps="{
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' },
            { label: '保密', value: 'secret' },
          ],
          placeholder: '请选择性别',
        }"
      />
    </div>

    <div style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px;">城市：</label>
      <ProField
        valueType="SwySelect"
        v-model="registerForm.city"
        :filedProps="{
          options: [
            { label: '北京', value: 'beijing' },
            { label: '上海', value: 'shanghai' },
            { label: '广州', value: 'guangzhou' },
            { label: '深圳', value: 'shenzhen' },
            { label: '杭州', value: 'hangzhou' },
          ],
          placeholder: '请选择城市',
          clearable: true,
        }"
      />
    </div>

    <div style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px;">接收邮件通知：</label>
      <ProField
        valueType="SwySwitch"
        v-model="registerForm.emailNotification"
        :filedProps="{
          activeText: '开启',
          inactiveText: '关闭',
        }"
      />
    </div>

    <div style="margin-bottom: 15px;">
      <label style="display: block; margin-bottom: 5px;">接收短信通知：</label>
      <ProField
        valueType="SwySwitch"
        v-model="registerForm.smsNotification"
        :filedProps="{
          activeText: '是',
          inactiveText: '否',
        }"
      />
    </div>

    <div style="margin-bottom: 20px;">
      <ProField
        valueType="SwyCheckbox"
        v-model="registerForm.agree"
        :filedProps="{ label: '我已阅读并同意《用户协议》和《隐私政策》' }"
      />
    </div>

    <div style="display: flex; gap: 10px;">
      <ProField
        valueType="SwyButton"
        :filedProps="{
          type: 'primary',
          disabled: !registerForm.agree,
        }"
        @click="handleSubmit"
      >
        提交注册
      </ProField>

      <ProField valueType="SwyButton" @click="handleReset">重置</ProField>
    </div>

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px; margin-top: 20px;">
      <h4 style="margin-top: 0;">表单数据：</h4>
      <pre style="margin: 0; font-size: 12px;">{{ JSON.stringify(registerForm, null, 2) }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const registerForm = reactive({
  username: '',
  password: '',
  gender: '',
  city: '',
  emailNotification: true,
  smsNotification: false,
  agree: false,
})

const handleSubmit = () => {
  if (!registerForm.username) {
    alert('请输入用户名')
    return
  }
  if (!registerForm.password) {
    alert('请输入密码')
    return
  }
  alert('注册成功！')
  console.log('提交的表单数据:', registerForm)
}

const handleReset = () => {
  Object.assign(registerForm, {
    username: '',
    password: '',
    gender: '',
    city: '',
    emailNotification: true,
    smsNotification: false,
    agree: false,
  })
  alert('表单已重置')
}
</script>
```

:::

## TypeScript 类型提示

ProField 组件提供完整的 TypeScript 类型支持，在使用时会自动提示可用的 `valueType` 类型。

```typescript
import type { ValueType } from '@swy-ui/proField'

// 使用 ValueType 类型
const fieldType: ValueType = 'SwyInput'

// 动态配置
const config: { type: ValueType; props: any } = {
  type: 'SwySelect',
  props: { placeholder: '请选择' },
}
```

## API

### Props

| 属性名     | 说明                 | 类型        | 默认值 |
| ---------- | -------------------- | ----------- | ------ |
| valueType  | 组件类型             | `ValueType` | —      |
| filedProps | 传递给对应组件的属性 | `object`    | `{}`   |
| v-model    | 双向绑定的值         | `any`       | —      |

### Events

| 事件名 | 说明                           | 类型                        |
| ------ | ------------------------------ | --------------------------- |
| click  | 点击事件（仅 Button 类型有效） | `(evt: MouseEvent) => void` |

### Exposes

| 名称       | 说明         | 类型  |
| ---------- | ------------ | ----- |
| ref        | 组件元素引用 | `Ref` |
| filedProps | 字段属性     | `Ref` |
