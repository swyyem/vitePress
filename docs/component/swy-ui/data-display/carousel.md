# Carousel 走马灯

在有限空间内，循环播放同一类型的图片、文字等内容。

## 基础用法

:::demo

```vue
<template>
  <SwyCarousel height="150px">
    <SwyCarouselItem v-for="item in 4" :key="item">
      <div
        :style="{
          height: '150px',
          background: colors[item - 1],
          lineHeight: '150px',
          textAlign: 'center',
          fontSize: '20px',
          color: '#fff',
        }"
      >
        幻灯片 {{ item }}
      </div>
    </SwyCarouselItem>
  </SwyCarousel>
</template>

<script lang="ts" setup>
const colors = ['#99A9BF', '#F7BA2A', '#FF9900', '#409EFF']
</script>
```

:::

## 指示器位置

:::demo

```vue
<template>
  <SwyCarousel height="150px" indicator-position="outside">
    <SwyCarouselItem v-for="item in 4" :key="item">
      <div
        :style="{
          height: '150px',
          background: colors[item - 1],
          lineHeight: '150px',
          textAlign: 'center',
          fontSize: '20px',
          color: '#fff',
        }"
      >
        幻灯片 {{ item }}
      </div>
    </SwyCarouselItem>
  </SwyCarousel>
</template>

<script lang="ts" setup>
const colors = ['#99A9BF', '#F7BA2A', '#FF9900', '#409EFF']
</script>
```

:::

## 切换箭头

:::demo

```vue
<template>
  <SwyCarousel height="150px" arrow="always">
    <SwyCarouselItem v-for="item in 4" :key="item">
      <div
        :style="{
          height: '150px',
          background: colors[item - 1],
          lineHeight: '150px',
          textAlign: 'center',
          fontSize: '20px',
          color: '#fff',
        }"
      >
        幻灯片 {{ item }}
      </div>
    </SwyCarouselItem>
  </SwyCarousel>
</template>

<script lang="ts" setup>
const colors = ['#99A9BF', '#F7BA2A', '#FF9900', '#409EFF']
</script>
```

:::

## API

### Carousel 属性

| 参数               | 说明                           | 类型                           | 默认值         |
| ------------------ | ------------------------------ | ------------------------------ | -------------- |
| height             | 走马灯的高度                   | `string`                       | —              |
| initial-index      | 初始状态激活的索引             | `number`                       | `0`            |
| trigger            | 指示器的触发方式               | `'hover' / 'click'`            | `'hover'`      |
| autoplay           | 是否自动切换                   | `boolean`                      | `true`         |
| interval           | 自动切换的时间间隔，单位为毫秒 | `number`                       | `3000`         |
| indicator-position | 指示器的位置                   | `'outside' / 'none'`           | —              |
| arrow              | 切换箭头的显示时机             | `'always' / 'hover' / 'never'` | `'hover'`      |
| loop               | 是否循环显示                   | `boolean`                      | `true`         |
| direction          | 展示的方向                     | `'horizontal' / 'vertical'`    | `'horizontal'` |

### Carousel 事件名

| 事件名 | 说明             | 参数                                        |
| ------ | ---------------- | ------------------------------------------- |
| change | 幻灯片切换时触发 | `(currentIndex: number, prevIndex: number)` |
