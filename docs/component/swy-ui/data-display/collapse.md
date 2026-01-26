# Collapse 折叠面板

通过折叠面板收纳内容区域。

## 基础用法

:::demo

```vue
<template>
  <SwyCollapse v-model="activeNames" @change="handleChange">
    <SwyCollapseItem name="1" title="一致性 Consistency">
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      <div>
        在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
      </div>
    </SwyCollapseItem>
    <SwyCollapseItem name="2" title="反馈 Feedback">
      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
      <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    </SwyCollapseItem>
    <SwyCollapseItem name="3" title="效率 Efficiency">
      <div>简化流程：设计简洁直观的操作流程；</div>
      <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策。</div>
    </SwyCollapseItem>
  </SwyCollapse>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeNames = ref(['1'])

const handleChange = (val: string[]) => {
  console.log('active names:', val)
}
</script>
```

:::

## 手风琴效果

:::demo

```vue
<template>
  <SwyCollapse v-model="activeName" accordion>
    <SwyCollapseItem name="1" title="一致性 Consistency">
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    </SwyCollapseItem>
    <SwyCollapseItem name="2" title="反馈 Feedback">
      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    </SwyCollapseItem>
    <SwyCollapseItem name="3" title="效率 Efficiency">
      <div>简化流程：设计简洁直观的操作流程；</div>
    </SwyCollapseItem>
  </SwyCollapse>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeName = ref('1')
</script>
```

:::

## API

### Collapse 属性

| 参数                  | 说明           | 类型                      | 默认值  |
| --------------------- | -------------- | ------------------------- | ------- |
| model-value / v-model | 当前激活的面板 | `string / number / array` | —       |
| accordion             | 是否手风琴模式 | `boolean`                 | `false` |

### Collapse 事件名

| 事件名 | 说明               | 参数                                       |
| ------ | ------------------ | ------------------------------------------ |
| change | 激活面板改变时触发 | `(activeNames: string \| number \| array)` |

### CollapseItem 属性

| 参数     | 说明       | 类型              | 默认值  |
| -------- | ---------- | ----------------- | ------- |
| name     | 唯一标识符 | `string / number` | —       |
| title    | 面板标题   | `string`          | —       |
| disabled | 是否禁用   | `boolean`         | `false` |
