# Image 图片

用于展示图片。

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px;">
    <SwyImage
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      style="width: 200px; height: 200px;"
    />
  </div>
</template>
```

:::

## 图片适应方式

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <div v-for="fit in fits" :key="fit" style="width: 150px;">
      <div style="margin-bottom: 8px; text-align: center;">{{ fit }}</div>
      <SwyImage
        :src="url"
        :fit="fit"
        style="width: 150px; height: 150px; border: 1px solid #ddd;"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
</script>
```

:::

## 加载失败

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px;">
    <SwyImage src="invalid-url" style="width: 200px; height: 200px;" />
    <SwyImage src="invalid-url" style="width: 200px; height: 200px;">
      <template #error>
        <div style="text-align: center;">自定义错误提示</div>
      </template>
    </SwyImage>
  </div>
</template>
```

:::

## 懒加载

:::demo

```vue
<template>
  <div style="height: 400px; overflow-y: auto;">
    <div v-for="url in urls" :key="url" style="margin-bottom: 20px;">
      <SwyImage :src="url" lazy style="width: 100%; height: 200px;" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const urls = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff3720d5198c7d0b16750743f3jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c5d056063766061047e29382568c0jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]
</script>
```

:::

## API

### Image 属性

| 参数               | 说明                                      | 类型                   | 默认值  |
| ------------------ | ----------------------------------------- | ---------------------- | ------- |
| src                | 图片源地址                                | `string`               | —       |
| fit                | 确定图片如何适应容器框，同原生 object-fit | `string`               | —       |
| alt                | 原生 alt 属性                             | `string`               | —       |
| lazy               | 是否开启懒加载                            | `boolean`              | `false` |
| scroll-container   | 开启懒加载时，监听滚动的容器              | `string / HTMLElement` | —       |
| preview            | 是否开启预览功能                          | `boolean`              | `false` |
| preview-src-list   | 开启预览功能时的图片列表                  | `string[]`             | `[]`    |
| initial-index      | 开启预览功能时，初始预览图片的索引        | `number`               | `0`     |
| preview-teleported | 预览查看器是否插入至 body 节点            | `boolean`              | `false` |
| z-index            | 预览查看器层级                            | `number`               | —       |

### Image 事件名

| 事件名 | 说明               | 参数           |
| ------ | ------------------ | -------------- |
| load   | 图片加载成功时触发 | `(evt: Event)` |
| error  | 图片加载失败时触发 | `(evt: Event)` |

### Image 插槽

| 插槽名      | 说明                     |
| ----------- | ------------------------ |
| placeholder | 图片加载时的占位内容     |
| error       | 图片加载失败时的占位内容 |
