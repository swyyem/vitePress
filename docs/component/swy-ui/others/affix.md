# Affix 固钉

将元素固定在特定可见区域

## 基础用法

:::demo

```vue
<template>
  <div
    style="height: 400px; overflow: auto; border: 1px solid #dcdfe6; border-radius: 4px; position: relative;"
    id="affix-container"
  >
    <div style="height: 100px; padding: 20px; background: #f5f7fa;">
      顶部内容区域 - 向下滚动查看固钉效果
    </div>

    <SwyAffix :target="'#affix-container'" :offset="10">
      <div style="padding: 10px 20px; background: #409eff; color: white; border-radius: 4px;">
        📌 我被固定
      </div>
    </SwyAffix>

    <div style="padding: 20px;">
      <p v-for="i in 30" :key="i" style="line-height: 2;">{{ i }} 行内容</p>
    </div>
  </div>
</template>
```

:::

## 固定在底

:::demo

```vue
<template>
  <div
    style="height: 400px; overflow: auto; border: 1px solid #dcdfe6; border-radius: 4px; position: relative;"
    id="affix-bottom"
  >
    <div style="padding: 20px;">
      <p v-for="i in 30" :key="i" style="line-height: 2;">{{ i }} 行内容 - 向上滚动查看效果</p>
    </div>

    <SwyAffix :target="'#affix-bottom'" position="bottom" :offset="10">
      <div
        style="padding: 10px 20px; background: #67c23a; color: white; border-radius: 4px; text-align: center;"
      >
        📍 固定在底
      </div>
    </SwyAffix>

    <div style="height: 100px; padding: 20px; background: #f5f7fa;">底部内容区域</div>
  </div>
</template>
```

:::

## 固定状态改变

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div
      style="height: 300px; overflow: auto; border: 1px solid #dcdfe6; border-radius: 4px; position: relative;"
      id="affix-change"
    >
      <div style="height: 80px; padding: 20px; background: #f5f7fa;">向下滚动触发固定</div>

      <SwyAffix :target="'#affix-change'" :offset="0" @change="handleChange">
        <div style="padding: 15px; background: #e6a23c; color: white; text-align: center;">
          {{ affixed ? '已固定📌' : '未固定📍' }}
        </div>
      </SwyAffix>

      <div style="padding: 20px;">
        <p v-for="i in 20" :key="i">{{ i }} 内容</p>
      </div>
    </div>

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      当前状态：{{ affixed ? '固定' : '未固定' }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const affixed = ref(false)

const handleChange = (fixed: boolean) => {
  affixed.value = fixed
  console.log('固定状态改变：', fixed)
}
</script>
```

:::

## API

### Affix Props

| 参数     | 说明     | 类型           | 默认 |
| -------- | -------- | -------------- | ---- |
| offset   | 偏移距离 | `number`       | 0    |
| position | 固定位置 | `top / bottom` | top  |
| target   | 目标容器 | `string`       |      |
| zIndex   | 层级     | `number`       | 100  |

### Affix Events

| 事件   | 说明               | 参数                     |
| ------ | ------------------ | ------------------------ |
| change | 固定状态改变时触发 | `(fixed: boolean)`       |
| scroll | 滚动时触发         | `({ scrollTop, fixed })` |
