# Tabs 标签页

分隔内容上有关联但属于不同类别的数据集合。

## 基础用法

基本的、简洁的标签页。

:::demo

```vue
<template>
  <SwyTabs v-model="activeTab">
    <SwyTabPane label="用户管理" name="user">
      <div style="padding: 20px;">用户管理内容</div>
    </SwyTabPane>
    <SwyTabPane label="配置管理" name="config">
      <div style="padding: 20px;">配置管理内容</div>
    </SwyTabPane>
    <SwyTabPane label="角色管理" name="role">
      <div style="padding: 20px;">角色管理内容</div>
    </SwyTabPane>
  </SwyTabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const activeTab = ref('user')
</script>
```

:::

## 卡片化

卡片化的标签页。

:::demo

```vue
<template>
  <SwyTabs v-model="activeTab" type="card">
    <SwyTabPane label="用户管理" name="user">
      <div style="padding: 20px;">用户管理内容</div>
    </SwyTabPane>
    <SwyTabPane label="配置管理" name="config">
      <div style="padding: 20px;">配置管理内容</div>
    </SwyTabPane>
    <SwyTabPane label="角色管理" name="role">
      <div style="padding: 20px;">角色管理内容</div>
    </SwyTabPane>
  </SwyTabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const activeTab = ref('user')
</script>
```

:::

## 带边框的卡片

带边框的卡片化标签页。

:::demo

```vue
<template>
  <SwyTabs v-model="activeTab" type="border-card">
    <SwyTabPane label="用户管理" name="user">
      <div style="padding: 20px;">用户管理内容</div>
    </SwyTabPane>
    <SwyTabPane label="配置管理" name="config">
      <div style="padding: 20px;">配置管理内容</div>
    </SwyTabPane>
    <SwyTabPane label="角色管理" name="role">
      <div style="padding: 20px;">角色管理内容</div>
    </SwyTabPane>
  </SwyTabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const activeTab = ref('user')
</script>
```

:::

## 点击事件

可以监听标签页的点击事件。

:::demo

```vue
<template>
  <div>
    <SwyTabs v-model="activeTab" @tab-click="handleTabClick">
      <SwyTabPane label="用户管理" name="user">
        <div style="padding: 20px;">用户管理内容</div>
      </SwyTabPane>
      <SwyTabPane label="配置管理" name="config">
        <div style="padding: 20px;">配置管理内容</div>
      </SwyTabPane>
      <SwyTabPane label="角色管理" name="role">
        <div style="padding: 20px;">角色管理内容</div>
      </SwyTabPane>
    </SwyTabs>
    <div style="margin-top: 10px; padding: 10px; background: #f5f7fa; border-radius: 4px;">
      当前激活的标签页：{{ activeTab }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeTab = ref('user')

const handleTabClick = (name: string | number) => {
  console.log('点击了标签页：', name)
}
</script>
```

:::

## Tabs 属性

| 属性名                | 说明                        | 类型            | 可选值                  | 默认值 |
| --------------------- | --------------------------- | --------------- | ----------------------- | ------ |
| model-value / v-model | 绑定值，选中的标签页的 name | string / number | —                       | —      |
| type                  | 标签页的类型                | string          | '' / card / border-card | ''     |

## Tabs 事件

| 事件名            | 说明                     | 回调参数                  |
| ----------------- | ------------------------ | ------------------------- |
| tab-click         | 标签页被点击时触发       | (name: string \| number)  |
| update:modelValue | 当前激活标签页改变时触发 | (value: string \| number) |

## TabPane 属性

| 属性名 | 说明                                      | 类型            | 可选值 | 默认值   |
| ------ | ----------------------------------------- | --------------- | ------ | -------- |
| label  | 标签页标题                                | string          | —      | —        |
| name   | 标签页的名称，与 Tabs 的 model-value 对应 | string / number | —      | — (必填) |
