# Backtop 回到顶部

返回页面顶部的操作按钮�?

## 基础用法

:::demo

```vue
<template>
  <div>
    <div
      style="height: 400px; overflow: auto; border: 1px solid #dcdfe6; border-radius: 4px; padding: 20px; position: relative;"
      id="container1"
    >
      <p v-for="i in 30" :key="i" style="line-height: 2;">
        �?{{ i }} 行内容，向下滚动查看回到顶部按钮
      </p>

      <SwyBacktop target="#container1" :visibility-height="100" />
    </div>

    <div style="margin-top: 10px; color: #909399; font-size: 14px;">提示：向下滚动容器查看效�?/div>
  </div>
</template>
```

:::

## 自定义内�?

:::demo

```vue
<template>
  <div
    style="height: 400px; overflow: auto; border: 1px solid #dcdfe6; border-radius: 4px; padding: 20px; position: relative;"
    id="container2"
  >
    <p v-for="i in 30" :key="i" style="line-height: 2;">
      �?{{ i }} 行内�?/p>

      <SwyBacktop target="#container2" :bottom="50" :right="50">
        <div
          style="
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      "
        >
          �?
        </div>
      </SwyBacktop>
    </p>
  </div>
</template>
```

:::

## 不同位置

:::demo

```vue
<template>
  <div style="display: flex; gap: 20px;">
    <div
      style="flex: 1; height: 300px; overflow: auto; border: 1px solid #dcdfe6; border-radius: 4px; padding: 20px; position: relative;"
      id="container3"
    >
      <p v-for="i in 20" :key="i" style="line-height: 2;">
        右下�?/p>
        <SwyBacktop target="#container3" :right="20" :bottom="20" />
      </p>
    </div>

    <div
      style="flex: 1; height: 300px; overflow: auto; border: 1px solid #dcdfe6; border-radius: 4px; padding: 20px; position: relative;"
      id="container4"
    >
      <p v-for="i in 20" :key="i" style="line-height: 2;">
        左下�?/p>
        <SwyBacktop target="#container4" :left="20" :bottom="20" />
      </p>
    </div>
  </div>
</template>
```

:::

## 自定义滚动距�?

:::demo

```vue
<template>
  <div>
    <div
      style="height: 300px; overflow: auto; border: 1px solid #dcdfe6; border-radius: 4px; padding: 20px; position: relative;"
      id="container5"
    >
      <div
        style="margin-bottom: 10px; padding: 10px; background: #ecf5ff; border-radius: 4px; color: #409eff;"
      >
        滚动200px后显示按�?
      </div>
      <p v-for="i in 25" :key="i" style="line-height: 2;">
        �?{{ i }} 行内�?/p>

        <SwyBacktop target="#container5" :visibility-height="200" @click="handleClick" />
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const handleClick = () => {
  console.log('点击了回到顶�?)
}
</script>
```

:::

## API

### Backtop Props

| 参数             | 说明                       | 类型     | 默认�? |
| ---------------- | -------------------------- | -------- | ------ |
| target           | 触发滚动的对�?             | `string` | �?     |
| visibilityHeight | 滚动高度达到此参数值才出现 | `number` | 200    |
| right            | 控制其距离右侧的位置       | `number` | 40     |
| bottom           | 控制其距离底部的位置       | `number` | 40     |
| left             | 控制其距离左侧的位置       | `number` | �?     |

### Backtop Events

| 事件�? | 说明           | 参数                  |
| ------ | -------------- | --------------------- |
| click  | 点击按钮时触�? | `(event: MouseEvent)` |

### Backtop Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义默认内�? |
